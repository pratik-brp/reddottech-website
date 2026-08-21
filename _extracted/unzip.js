const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Let's use PowerShell via a .ps1 script file
const psScript = `
Add-Type -AssemblyName System.IO.Compression.FileSystem
$zip = [System.IO.Compression.ZipFile]::OpenRead('reddot-ai-healthcare -20260819T040000Z-1-001.zip')
$out = 'C:\\Users\\acer\\OneDrive - Taylor''s Higher Education\\Desktop\\reddottech.com.np\\_extracted\\healthcare'
foreach ($entry in $zip.Entries) {
    $parts = $entry.FullName -split '/'
    $cleanParts = $parts | ForEach-Object { $_.Trim() }
    $cleanName = $cleanParts -join [System.IO.Path]::DirectorySeparatorChar
    $targetPath = [System.IO.Path]::Combine($out, $cleanName)
    if ($entry.FullName.EndsWith('/')) {
        [System.IO.Directory]::CreateDirectory($targetPath) | Out-Null
    } else {
        $parent = [System.IO.Path]::GetDirectoryName($targetPath)
        [System.IO.Directory]::CreateDirectory($parent) | Out-Null
        [System.IO.Compression.ZipFileExtensions]::ExtractToFile($entry, $targetPath, $true)
    }
}
$zip.Dispose()
Write-Host "Extraction complete"
`;

fs.writeFileSync(path.join(__dirname, 'unzip.ps1'), psScript, 'utf8');
try {
  const res = execSync('powershell -ExecutionPolicy Bypass -File unzip.ps1', { stdio: 'inherit' });
} catch (e) {
  console.error(e);
}
