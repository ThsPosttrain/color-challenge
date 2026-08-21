param(
  [int]$MaxDimension = 640,
  [long]$Quality = 78
)

# Generate lightweight gallery thumbnails without modifying the originals.
Add-Type -AssemblyName System.Drawing

$projectRoot = Split-Path -Parent $PSScriptRoot
$colors = @([char]0x767d, [char]0x7ea2, [char]0x7eff, [char]0x84dd, [char]0x9ec4, [char]0x9ed1)
$jpegEncoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() |
  Where-Object { $_.MimeType -eq 'image/jpeg' }
$encoderParameters = New-Object System.Drawing.Imaging.EncoderParameters 1
$encoderParameters.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter(
  [System.Drawing.Imaging.Encoder]::Quality,
  $Quality
)

function Repair-ExifOrientation([System.Drawing.Image]$image) {
  $orientationId = 0x0112
  if ($image.PropertyIdList -contains $orientationId) {
    $orientation = [int]$image.GetPropertyItem($orientationId).Value[0]
    switch ($orientation) {
      2 { $image.RotateFlip([System.Drawing.RotateFlipType]::RotateNoneFlipX) }
      3 { $image.RotateFlip([System.Drawing.RotateFlipType]::Rotate180FlipNone) }
      4 { $image.RotateFlip([System.Drawing.RotateFlipType]::RotateNoneFlipY) }
      5 { $image.RotateFlip([System.Drawing.RotateFlipType]::Rotate90FlipX) }
      6 { $image.RotateFlip([System.Drawing.RotateFlipType]::Rotate90FlipNone) }
      7 { $image.RotateFlip([System.Drawing.RotateFlipType]::Rotate270FlipX) }
      8 { $image.RotateFlip([System.Drawing.RotateFlipType]::Rotate270FlipNone) }
    }
  }
}

foreach ($color in $colors) {
  $sourceDirectory = Join-Path $projectRoot ("data\$color")
  $thumbnailDirectory = Join-Path $sourceDirectory 'thumb'
  New-Item -ItemType Directory -Path $thumbnailDirectory -Force | Out-Null

  $sourceFiles = Get-ChildItem -LiteralPath $sourceDirectory -File -Filter "$color*.jpg" |
    Sort-Object Name

  foreach ($sourceFile in $sourceFiles) {
    $image = $null
    $bitmap = $null
    $graphics = $null
    $stream = $null

    try {
      $image = [System.Drawing.Image]::FromFile($sourceFile.FullName)
      Repair-ExifOrientation $image
      $scale = [Math]::Min(1.0, [Math]::Min($MaxDimension / $image.Width, $MaxDimension / $image.Height))
      $width = [Math]::Max(1, [int]($image.Width * $scale))
      $height = [Math]::Max(1, [int]($image.Height * $scale))
      $bitmap = New-Object System.Drawing.Bitmap $width, $height
      $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
      $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
      $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
      $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
      $graphics.DrawImage($image, 0, 0, $width, $height)

      $stream = New-Object System.IO.MemoryStream
      $bitmap.Save($stream, $jpegEncoder, $encoderParameters)
      $targetPath = Join-Path $thumbnailDirectory $sourceFile.Name
      [System.IO.File]::WriteAllBytes($targetPath, $stream.ToArray())
    }
    finally {
      if ($stream) { $stream.Dispose() }
      if ($graphics) { $graphics.Dispose() }
      if ($bitmap) { $bitmap.Dispose() }
      if ($image) { $image.Dispose() }
    }
  }
}

Write-Output "Thumbnails generated: max dimension $MaxDimension px, JPEG quality $Quality."
