# Self-hosts the web fonts used by FemCare so the app makes ZERO
# third-party requests and renders correctly with no internet.
# Run once (needs internet):  powershell -File scripts/download-fonts.ps1
# Output: public/fonts/fonts.css + public/fonts/*.woff2

$ErrorActionPreference = 'Stop'

$root     = Split-Path -Parent $PSScriptRoot
$outDir   = Join-Path $root 'public\fonts'
$cssOut   = Join-Path $outDir 'fonts.css'
$cssUrl   = 'https://fonts.googleapis.com/css2?family=Outfit:wght@400..800&family=Plus+Jakarta+Sans:wght@300..700&display=swap'
$ua       = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36'

New-Item -ItemType Directory -Force -Path $outDir | Out-Null

# 1) Fetch the Google Fonts stylesheet as a modern browser (woff2, variable)
$tmpCss = Join-Path $env:TEMP 'femcare-fonts-src.css'
Invoke-WebRequest -Uri $cssUrl -Headers @{ 'User-Agent' = $ua } -OutFile $tmpCss -UseBasicParsing
$css = Get-Content $tmpCss -Raw

# 2) Download every referenced woff2 and rewrite the URL to a local relative path
$urls = [regex]::Matches($css, 'url\((https://fonts\.gstatic\.com/[^)]+\.woff2)\)') |
        ForEach-Object { $_.Groups[1].Value } | Sort-Object -Unique

if ($urls.Count -eq 0) { throw 'No woff2 URLs found in the Google Fonts stylesheet.' }

$i = 0
foreach ($url in $urls) {
    $i++
    $name = 'femcare-' + [IO.Path]::GetFileName($url)
    # Keep family + weight distinct even if filenames collide
    if (Test-Path (Join-Path $outDir $name)) { $name = "femcare-$i-" + [IO.Path]::GetFileName($url) }
    $dest = Join-Path $outDir $name
    Invoke-WebRequest -Uri $url -Headers @{ 'User-Agent' = $ua } -OutFile $dest -UseBasicParsing
    $css = $css.Replace($url, "./$name")
    Write-Host "saved $name ($([Math]::Round((Get-Item $dest).Length / 1kb)) KB)"
}

# 3) Persist the rewritten stylesheet
Set-Content -Path $cssOut -Value $css -NoNewline -Encoding utf8
Write-Host "Wrote $cssOut ($($urls.Count) font files self-hosted)"
