Add-Type -AssemblyName System.IO.Compression.FileSystem

$zipPath = "D:\dr water care\aqua-solve-theme.zip"
if (Test-Path $zipPath) {
    Remove-Item $zipPath -Force
}

$archive = [System.IO.Compression.ZipFile]::Open($zipPath, 'Create')
$themeFolder = Get-Item "D:\dr water care\aqua-solve-theme"
$baseLen = $themeFolder.Parent.FullName.Length + 1

$files = Get-ChildItem -Path "D:\dr water care\aqua-solve-theme" -Recurse | Where-Object { -not $_.PSIsContainer }

foreach ($file in $files) {
    $relPath = $file.FullName.Substring($baseLen).Replace('\', '/')
    [System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile($archive, $file.FullName, $relPath)
}

$archive.Dispose()
Write-Host "POSIX Zip Created Successfully!"
