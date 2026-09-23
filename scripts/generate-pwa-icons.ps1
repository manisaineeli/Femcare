# Generates the PWA icons (192 / 512 / maskable 512) from the FemCare brand
# mark so the app is installable offline. Run once:
#   powershell -File scripts/generate-pwa-icons.ps1
# Output: public/icon-192.png, public/icon-512.png, public/icon-512-maskable.png

$ErrorActionPreference = 'Stop'

Add-Type -AssemblyName System.Drawing

$root = Split-Path -Parent $PSScriptRoot
$out  = Join-Path $root 'public'
New-Item -ItemType Directory -Force -Path $out | Out-Null

function New-Icon([int]$size, [string]$path, [double]$symbolScale, [int]$cornerRadius) {
  $bmp = [System.Drawing.Bitmap]::new($size, $size)
  $g   = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = 'AntiAlias'
  $g.TextRenderingHint = 'AntiAliasGridFit'

  # Brand gradient: #b5497a → #f4a6b9 (diagonal)
  $rect  = [System.Drawing.Rectangle]::new(0, 0, $size, $size)
  $brush = [System.Drawing.Drawing2D.LinearGradientBrush]::new(
    $rect,
    [System.Drawing.Color]::FromArgb(255, 181, 73, 122),
    [System.Drawing.Color]::FromArgb(255, 244, 166, 185),
    45
  )

  if ($cornerRadius -gt 0) {
    $r = $cornerRadius
    $p = [System.Drawing.Drawing2D.GraphicsPath]::new()
    $p.AddArc(0, 0, $r * 2, $r * 2, 180, 90)
    $p.AddArc($size - $r * 2, 0, $r * 2, $r * 2, 270, 90)
    $p.AddArc($size - $r * 2, $size - $r * 2, $r * 2, $r * 2, 0, 90)
    $p.AddArc(0, $size - $r * 2, $r * 2, $r * 2, 90, 90)
    $p.CloseFigure()
    $g.SetClip($p)
  }

  $g.FillRectangle($brush, $rect)

  # Female symbol ♀ in white, centered — FemCare brand mark
  $fontSize = [float]($size * $symbolScale)
  $font = [System.Drawing.Font]::new('Segoe UI Symbol', $fontSize, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
  $fmt  = [System.Drawing.StringFormat]::new()
  $fmt.Alignment     = [System.Drawing.StringAlignment]::Center
  $fmt.LineAlignment = [System.Drawing.StringAlignment]::Center
  $area = [System.Drawing.RectangleF]::new(0, [float]($size * 0.04), [float]$size, [float]$size)
  $g.DrawString([string][char]0x2640, $font, [System.Drawing.Brushes]::White, $area, $fmt)

  $g.Dispose()
  $bmp.Save($path, [System.Drawing.Imaging.ImageFormat]::Png)
  $bmp.Dispose()
  Write-Host "saved $path ($size x $size)"
}

New-Icon 192 (Join-Path $out 'icon-192.png') 0.62 ([int](192 * 0.18))
New-Icon 512 (Join-Path $out 'icon-512.png') 0.62 ([int](512 * 0.18))
# Maskable: symbol kept inside the ~80% safe zone (no rounded corners — full bleed)
New-Icon 512 (Join-Path $out 'icon-512-maskable.png') 0.44 0

Write-Host 'PWA icons generated.'
