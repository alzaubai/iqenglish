param (
    [int]$LessonNum = 5,
    [string]$ImagePath = "",
    [int]$UnitNum = 2
)

Add-Type -AssemblyName System.Drawing

if (-not (Test-Path $ImagePath)) {
    Write-Error "Image file not found: $ImagePath"
    exit 1
}

$resolved = (Resolve-Path $ImagePath).Path
$bmp = [System.Drawing.Bitmap]::FromFile($resolved)
$W = $bmp.Width
$H = $bmp.Height
$cellW = [int]($W / 3)
$cellH = [int]($H / 2)

$baseDir = "C:\Users\Lenovo\.gemini\antigravity\scratch\english-for-iraq-unit-1"
$pubLessons = Join-Path $baseDir "public\images\lessons"
$pubDialogue = Join-Path $baseDir "public\images\dialogue"
$distLessons = Join-Path $baseDir "dist\images\lessons"
$distDialogue = Join-Path $baseDir "dist\images\dialogue"

New-Item -ItemType Directory -Force -Path $pubLessons, $pubDialogue, $distLessons, $distDialogue | Out-Null

$targets = @(
    @{ col = 0; row = 0; type = "lesson"; name = "u$UnitNum-lesson-$LessonNum.jpg" },
    @{ col = 1; row = 0; type = "dialogue"; name = "u$UnitNum-l$LessonNum-1.jpg" },
    @{ col = 2; row = 0; type = "dialogue"; name = "u$UnitNum-l$LessonNum-2.jpg" },
    @{ col = 0; row = 1; type = "dialogue"; name = "u$UnitNum-l$LessonNum-3.jpg" },
    @{ col = 1; row = 1; type = "dialogue"; name = "u$UnitNum-l$LessonNum-4.jpg" },
    @{ col = 2; row = 1; type = "dialogue"; name = "u$UnitNum-l$LessonNum-5.jpg" }
)

foreach ($t in $targets) {
    $x = $t.col * $cellW
    $y = $t.row * $cellH
    $rect = New-Object System.Drawing.Rectangle($x, $y, $cellW, $cellH)
    $cropped = $bmp.Clone($rect, $bmp.PixelFormat)
    
    $subDir = if ($t.type -eq "lesson") { "lessons" } else { "dialogue" }
    $pOut = Join-Path $baseDir "public\images\$subDir\$($t.name)"
    $dOut = Join-Path $baseDir "dist\images\$subDir\$($t.name)"
    
    $cropped.Save($pOut, [System.Drawing.Imaging.ImageFormat]::Jpeg)
    $cropped.Save($dOut, [System.Drawing.Imaging.ImageFormat]::Jpeg)
    $cropped.Dispose()
    Write-Host " [SAVED] $subDir/$($t.name)"
}

$bmp.Dispose()
Write-Host " SUCCESS: Sliced and deployed 6 images for Unit $UnitNum Lesson $LessonNum"
