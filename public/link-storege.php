<?php
// Custom storage link creator for reddottech.com.np

$targetFolder = __DIR__ . '/../reddottech/storage/app/public'; // points to Laravel's storage path
$linkFolder   = __DIR__ . '/storage'; // public/storage

if (file_exists($linkFolder)) {
    echo "⚠️ Storage link already exists at: $linkFolder";
} else {
    if (@symlink($targetFolder, $linkFolder)) {
        echo "✅ Storage link created successfully!";
    } else {
        echo "❌ Failed to create symlink. Check permissions or host restrictions.";
    }
}
?>
