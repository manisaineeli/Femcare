# Generates branded JPG card images for Products, Medicines & Awareness sections.
# ASCII-only (Windows PowerShell 5.1 reads .ps1 as ANSI without BOM).
# Run: powershell -ExecutionPolicy Bypass -File scripts\generate-product-images.ps1
Add-Type -AssemblyName System.Drawing

$outDir = Join-Path $PSScriptRoot "..\public\products"
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

$script:bgDark = [System.Drawing.ColorTranslator]::FromHtml('#0f0b14')

function Add-RoundedRectangle($path, $rect, $rad) {
  $d = $rad * 2
  $path.AddArc($rect.X, $rect.Y, $d, $d, 180, 90)
  $path.AddArc($rect.Right - $d, $rect.Y, $d, $d, 270, 90)
  $path.AddArc($rect.Right - $d, $rect.Bottom - $d, $d, $d, 0, 90)
  $path.AddArc($rect.X, $rect.Bottom - $d, $d, $d, 90, 90)
  $path.CloseFigure()
}

function Get-IconBrush { param($a = 255) New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb($a, 255, 255, 255)) }
function Get-DetailPen { param($a = 85) New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb($a, 18, 10, 30), 5) }

function Draw-Icon {
  param($g, $icon, $cx, $cy)
  $white = Get-IconBrush
  $detail = Get-DetailPen

  switch ($icon) {
    'pad' {
      $p = New-Object System.Drawing.Drawing2D.GraphicsPath
      $p.AddArc($cx - 35, $cy - 56, 70, 112, 0, 360)
      $g.FillPath($white, $p)
      $g.FillEllipse($white, ($cx - 74), ($cy - 21), 56, 42)
      $g.FillEllipse($white, ($cx + 18), ($cy - 21), 56, 42)
      $g.DrawLine($detail, ($cx), ($cy - 34), ($cx), ($cy + 34))
    }
    'cup' {
      $g.FillEllipse($white, ($cx - 47), ($cy - 58), 94, 28)
      $p = New-Object System.Drawing.Drawing2D.GraphicsPath
      $p.StartFigure()
      $p.AddBezier(($cx - 43), ($cy - 45), ($cx - 34), ($cy + 10), ($cx - 24), ($cy + 30), ($cx - 18), ($cy + 42))
      $p.AddLine(($cx - 18), ($cy + 42), ($cx + 18), ($cy + 42))
      $p.AddBezier(($cx + 18), ($cy + 42), ($cx + 24), ($cy + 30), ($cx + 34), ($cy + 10), ($cx + 43), ($cy - 45))
      $p.CloseFigure()
      $g.FillPath($white, $p)
      $r = New-Object System.Drawing.Drawing2D.GraphicsPath
      $r.AddArc($cx - 8, ($cy + 38), 16, 56, 0, 360)
      $g.FillPath($white, $r)
    }
    'tampon' {
      $p = New-Object System.Drawing.Drawing2D.GraphicsPath
      $p.AddArc($cx - 27, $cy - 62, 54, 54, 0, 360)
      $p.AddArc($cx - 27, ($cy + 8), 54, 54, 0, 360)
      $p.AddLine(($cx - 27), ($cy - 35), ($cx - 27), ($cy + 35))
      $p.AddLine(($cx + 27), ($cy + 35), ($cx + 27), ($cy - 35))
      $p.CloseFigure()
      $g.FillPath($white, $p)
      $pen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(235, 255, 255, 255), 6)
      $g.DrawBezier($pen, ($cx), ($cy + 55), ($cx - 26), ($cy + 78), ($cx + 26), ($cy + 92), ($cx), ($cy + 116))
    }
    'panty' {
      $pts = @(
        (New-Object System.Drawing.PointF(($cx - 60), ($cy - 52))),
        (New-Object System.Drawing.PointF(($cx + 60), ($cy - 52))),
        (New-Object System.Drawing.PointF(($cx + 46), ($cy - 8))),
        (New-Object System.Drawing.PointF(($cx + 18), ($cy + 36))),
        (New-Object System.Drawing.PointF(($cx), ($cy + 54))),
        (New-Object System.Drawing.PointF(($cx - 18), ($cy + 36))),
        (New-Object System.Drawing.PointF(($cx - 46), ($cy - 8)))
      )
      $g.FillPolygon($white, $pts)
      $g.FillRectangle((Get-IconBrush 140), ($cx - 60), ($cy - 52), 120, 13)
    }
    'bottle' {
      $p = New-Object System.Drawing.Drawing2D.GraphicsPath
      $p.AddArc($cx - 33, ($cy - 34), 66, 66, 0, 360)
      $g.FillPath($white, $p)
      $g.FillRectangle($white, ($cx - 33), ($cy - 10), 66, 92)
      $p2 = New-Object System.Drawing.Drawing2D.GraphicsPath
      $p2.AddArc($cx - 33, ($cy + 30), 66, 66, 0, 360)
      $g.FillPath($white, $p2)
      $p3 = New-Object System.Drawing.Drawing2D.GraphicsPath
      $p3.AddArc($cx - 20, ($cy - 76), 40, 40, 0, 360)
      $g.FillPath($white, $p3)
      $g.FillRectangle($white, ($cx - 20), ($cy - 62), 40, 34)
      $g.DrawLine($detail, ($cx - 22), ($cy + 18), ($cx + 22), ($cy + 18))
    }
    'pen' {
      $g.TranslateTransform($cx, $cy)
      $g.RotateTransform(-35)
      $p = New-Object System.Drawing.Drawing2D.GraphicsPath
      $p.AddArc(-16, -44, 32, 32, 0, 360)
      $p.AddArc(-16, 12, 32, 32, 0, 360)
      $p.AddLine(-16, -28, -16, 28)
      $p.AddLine(16, 28, 16, -28)
      $p.CloseFigure()
      $g.FillPath($white, $p)
      $tip = @(
        (New-Object System.Drawing.PointF(0, -78)),
        (New-Object System.Drawing.PointF(-15, -40)),
        (New-Object System.Drawing.PointF(15, -40))
      )
      $g.FillPolygon($white, $tip)
      $g.FillRectangle((Get-IconBrush 130), -16, 8, 32, 9)
      $g.ResetTransform()
    }
    'bag' {
      $p = New-Object System.Drawing.Drawing2D.GraphicsPath
      $p.AddArc($cx - 52, ($cy - 36), 104, 96, 0, 360)
      $g.FillPath($white, $p)
      $pen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(240, 255, 255, 255), 7)
      $pen.StartCap = 'Round'; $pen.EndCap = 'Round'
      $g.DrawArc($pen, ($cx - 27), ($cy - 76), 54, 60, 180, 180)
      $dashPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(120, 18, 10, 30), 5)
      $dashPen.DashStyle = 'Dash'
      $g.DrawLine($dashPen, ($cx - 44), ($cy - 18), ($cx + 44), ($cy - 18))
      $g.FillEllipse((Get-IconBrush 220), ($cx + 36), ($cy - 26), 17, 17)
    }
    'waves' {
      $p = New-Object System.Drawing.Drawing2D.GraphicsPath
      $p.AddArc($cx - 64, ($cy + 6), 128, 66, 0, 360)
      $g.FillPath($white, $p)
      $pen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(245, 255, 255, 255), 8)
      $pen.StartCap = 'Round'; $pen.EndCap = 'Round'
      foreach ($off in @(-34, 0, 34)) {
        $g.DrawBezier($pen, ($cx + $off), ($cy + 6), ($cx + $off - 24), ($cy - 16), ($cx + $off + 24), ($cy - 40), ($cx + $off), ($cy - 64))
      }
    }
    'capsule' {
      $g.TranslateTransform($cx, $cy)
      $g.RotateTransform(-45)
      $p = New-Object System.Drawing.Drawing2D.GraphicsPath
      $p.AddArc(-22, -56, 44, 44, 0, 360)
      $p.AddArc(-22, 12, 44, 44, 0, 360)
      $p.AddLine(-22, -34, -22, 34)
      $p.AddLine(22, 34, 22, -34)
      $p.CloseFigure()
      $g.FillPath($white, $p)
      $g.DrawLine((Get-DetailPen 95), -22, 0, 22, 0)
      $g.ResetTransform()
    }
    'tablet' {
      $g.FillEllipse($white, ($cx - 50), ($cy - 50), 100, 100)
      $g.DrawEllipse((Get-DetailPen 75), ($cx - 50), ($cy - 50), 100, 100)
      $g.DrawLine((Get-DetailPen 85), ($cx - 32), ($cy), ($cx + 32), ($cy))
    }
    'tube' {
      $body = @(
        (New-Object System.Drawing.PointF(($cx - 47), ($cy - 58))),
        (New-Object System.Drawing.PointF(($cx + 47), ($cy - 58))),
        (New-Object System.Drawing.PointF(($cx + 25), ($cy + 16))),
        (New-Object System.Drawing.PointF(($cx - 25), ($cy + 16)))
      )
      $g.FillPolygon($white, $body)
      $g.DrawLine((Get-DetailPen 90), ($cx - 47), ($cy - 49), ($cx + 47), ($cy - 49))
      $p = New-Object System.Drawing.Drawing2D.GraphicsPath
      $p.AddArc($cx - 23, ($cy + 10), 46, 30, 0, 360)
      $g.FillPath($white, $p)
      $p2 = New-Object System.Drawing.Drawing2D.GraphicsPath
      $p2.AddArc($cx - 13, ($cy + 30), 26, 46, 0, 360)
      $g.FillPath($white, $p2)
    }
    'female' {
      $pen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(250, 255, 255, 255), 11)
      $pen.StartCap = 'Round'; $pen.EndCap = 'Round'
      $g.DrawEllipse($pen, ($cx - 33), ($cy - 66), 66, 66)
      $g.DrawLine($pen, ($cx), ($cy + 4), ($cx), ($cy + 64))
      $g.DrawLine($pen, ($cx - 26), ($cy + 38), ($cx + 26), ($cy + 38))
    }
  }
}

function New-CardImage {
  param($file, $title, $subtitle, $hex1, $hex2, $icon)
  $bmp = New-Object System.Drawing.Bitmap(800, 500)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = 'AntiAlias'
  $g.TextRenderingHint = 'AntiAliasGridFit'
  $g.PixelOffsetMode = 'HighQuality'

  # Dark app background behind rounded corners
  $g.Clear($script:bgDark)

  # Rounded card path + gradient
  $rect = New-Object System.Drawing.Rectangle(4, 4, 792, 492)
  $path = New-Object System.Drawing.Drawing2D.GraphicsPath
  Add-RoundedRectangle $path $rect 30
  $g.SetClip($path)

  $c1 = [System.Drawing.ColorTranslator]::FromHtml($hex1)
  $c2 = [System.Drawing.ColorTranslator]::FromHtml($hex2)
  $brush = New-Object System.Drawing.Drawing2D.LinearGradientBrush($rect, $c1, $c2, [System.Drawing.Drawing2D.LinearGradientMode]::ForwardDiagonal)
  $g.FillRectangle($brush, $rect)

  # Decorative glows
  $g.FillEllipse((New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(36, 255, 255, 255))), 560, -110, 360, 360)
  $g.FillEllipse((New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(22, 255, 255, 255))), -80, 300, 280, 280)
  $g.DrawEllipse((New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(50, 255, 255, 255), 4)), 610, -40, 240, 240)

  # Icon glow + icon
  $g.FillEllipse((New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(34, 255, 255, 255))), 305, 70, 190, 190)
  Draw-Icon $g $icon 400 165

  # Bottom scrim for readability
  $scrim = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
    (New-Object System.Drawing.Rectangle(0, 230, 800, 270)),
    [System.Drawing.Color]::FromArgb(0, 0, 0, 0),
    [System.Drawing.Color]::FromArgb(140, 0, 0, 0),
    [System.Drawing.Drawing2D.LinearGradientMode]::Vertical
  )
  $g.FillRectangle($scrim, 0, 230, 800, 270)

  # Subtitle
  $subFont = New-Object System.Drawing.Font('Segoe UI', 15, [System.Drawing.FontStyle]::Bold)
  $subBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(225, 255, 255, 255))
  $fmt = New-Object System.Drawing.StringFormat
  $fmt.Alignment = [System.Drawing.StringAlignment]::Center
  $fmt.LineAlignment = [System.Drawing.StringAlignment]::Center
  $fmt.Trimming = [System.Drawing.StringTrimming]::EllipsisWord
  $g.DrawString($subtitle.ToUpperInvariant(), $subFont, $subBrush, (New-Object System.Drawing.RectangleF(50, 284, 700, 30)), $fmt)

  # Title (auto size by length, vertically centered so 1-2 lines never clip)
  $len = $title.Length
  $size = 48
  if ($len -gt 16) { $size = 40 }
  if ($len -gt 26) { $size = 34 }
  if ($len -gt 38) { $size = 28 }
  $titleFont = New-Object System.Drawing.Font('Segoe UI', $size, [System.Drawing.FontStyle]::Bold)
  $whiteBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 255, 255, 255))
  $g.DrawString($title, $titleFont, $whiteBrush, (New-Object System.Drawing.RectangleF(50, 316, 700, 160)), $fmt)

  # Save JPEG
  $outPath = Join-Path $outDir $file
  $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
  $ep = New-Object System.Drawing.Imaging.EncoderParameters(1)
  $ep.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]90)
  $bmp.Save($outPath, $codec, $ep)

  $g.Dispose()
  $bmp.Dispose()
  Write-Host "  ok  $file"
}

$images = @(
  # -- Products --
  @{ f = 'suvidha-pads.jpg';      t = 'Suvidha Biodegradable Pads';    s = 'Govt  |  Rs 1 per pad';    c1 = '#d65d95'; c2 = '#7a2f52'; i = 'pad' },
  @{ f = 'menstrual-cup.jpg';     t = 'Menstrual Cup';                 s = 'Reusable  |  12-hour';     c1 = '#8b5cf6'; c2 = '#4c1d95'; i = 'cup' },
  @{ f = 'organic-pads.jpg';      t = 'Organic Cotton Pads';           s = 'Chlorine-free  |  Wings';  c1 = '#ec4899'; c2 = '#831843'; i = 'pad' },
  @{ f = 'period-panties.jpg';    t = 'Period Panties';                s = '4-layer  |  Night safe';   c1 = '#f472b6'; c2 = '#9d174d'; i = 'panty' },
  @{ f = 'heatpatch-rollon.jpg';  t = 'Roll-On + Heat Patch';          s = '8-hour warmth';            c1 = '#f59e0b'; c2 = '#9a3412'; i = 'bottle' },
  @{ f = 'organic-tampons.jpg';   t = 'Organic Tampons';               s = 'Applicator-free';          c1 = '#fb7185'; c2 = '#9f1239'; i = 'tampon' },
  @{ f = 'intimate-wash.jpg';     t = 'Intimate Wash';                 s = 'pH-balanced daily care';   c1 = '#14b8a6'; c2 = '#134e4a'; i = 'bottle' },
  @{ f = 'stain-remover-pen.jpg'; t = 'Stain Remover Pen';             s = 'Treat then wash';          c1 = '#0ea5e9'; c2 = '#0c4a6e'; i = 'pen' },
  @{ f = 'disposal-bags.jpg';     t = 'Disposal Bags';                 s = 'Odor-lock  |  discreet';   c1 = '#22c555'; c2 = '#14532d'; i = 'bag' },
  @{ f = 'heating-belt.jpg';      t = 'Heating Belt';                  s = '20-min sooth';             c1 = '#f97316'; c2 = '#7c2d12'; i = 'waves' },
  # -- Medicines --
  @{ f = 'med-mefenamic.jpg';     t = 'Mefenamic Acid 250 mg';         s = 'NSAID  |  cramp care';     c1 = '#e11d48'; c2 = '#881337'; i = 'capsule' },
  @{ f = 'med-ibuprofen.jpg';     t = 'Ibuprofen 400 mg';              s = 'NSAID  |  pain relief';    c1 = '#ef4444'; c2 = '#7f1d1d'; i = 'tablet' },
  @{ f = 'med-paracetamol.jpg';   t = 'Paracetamol 500 mg';            s = 'Analgesic  |  fever';      c1 = '#64748b'; c2 = '#1e293b'; i = 'tablet' },
  @{ f = 'med-drotaverine.jpg';   t = 'Drotaverine 40 mg';             s = 'Antispasmodic';            c1 = '#fbbf24'; c2 = '#92400e'; i = 'capsule' },
  @{ f = 'med-iron-folic.jpg';    t = 'Iron + Folic Acid';             s = 'Heavy-flow energy';        c1 = '#10b981'; c2 = '#064e3b'; i = 'tablet' },
  @{ f = 'med-diclofenac-gel.jpg';t = 'Topical NSAID Gel';             s = 'Local pain relief';        c1 = '#6366f1'; c2 = '#312e81'; i = 'tube' },
  # -- Awareness --
  @{ f = 'aw-pcos.jpg';           t = 'PCOS / PCOD';                   s = 'Hormones  |  metabolism';  c1 = '#a855f7'; c2 = '#581c87'; i = 'female' },
  @{ f = 'aw-pmdd.jpg';           t = 'PMDD';                          s = 'Severe PMS is real';       c1 = '#6366f1'; c2 = '#1e1b4b'; i = 'female' },
  @{ f = 'aw-endometriosis.jpg';  t = 'Endometriosis';                 s = 'Pain  |  fertility';       c1 = '#e11d48'; c2 = '#4c0519'; i = 'female' },
  @{ f = 'aw-cramps.jpg';         t = 'Menstrual Cramps';              s = 'Dysmenorrhea';             c1 = '#f97316'; c2 = '#7c2d12'; i = 'waves' }
)

Write-Host "Generating $($images.Count) images into $outDir ..."
foreach ($img in $images) {
  New-CardImage -file $img.f -title $img.t -subtitle $img.s -hex1 $img.c1 -hex2 $img.c2 -icon $img.i
}
Write-Host "Done."
