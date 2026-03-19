<?php

// Test script to check file upload functionality
require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';

$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);

$kernel->bootstrap();

echo "Testing file upload functionality...\n";

// Check if storage directory exists and is writable
$storagePath = storage_path('app/public');
echo "Storage path: $storagePath\n";
echo "Storage exists: " . (is_dir($storagePath) ? 'YES' : 'NO') . "\n";
echo "Storage writable: " . (is_writable($storagePath) ? 'YES' : 'NO') . "\n";

// Check if public/storage exists and is writable
$publicStoragePath = public_path('storage');
echo "Public storage path: $publicStoragePath\n";
echo "Public storage exists: " . (is_dir($publicStoragePath) ? 'YES' : 'NO') . "\n";
echo "Public storage writable: " . (is_writable($publicStoragePath) ? 'YES' : 'NO') . "\n";

// Check storage link
$target = storage_path('app/public');
$link = public_path('storage');
echo "Storage link exists: " . (is_link($link) ? 'YES' : 'NO') . "\n";
if (is_link($link)) {
    echo "Link target: " . readlink($link) . "\n";
}

// Test file upload config
echo "\nFilesystem config:\n";
echo "Default disk: " . config('filesystems.default') . "\n";
echo "Public disk root: " . config('filesystems.disks.public.root') . "\n";
echo "Public disk URL: " . config('filesystems.disks.public.url') . "\n";

// Create test directories
$testDirs = [
    'storage/app/public/packages',
    'storage/app/public/packages/gallery',
    'public/storage/packages',
    'public/storage/packages/gallery'
];

foreach ($testDirs as $dir) {
    if (!is_dir($dir)) {
        mkdir($dir, 0755, true);
        echo "Created: $dir\n";
    } else {
        echo "Exists: $dir\n";
    }
}

echo "\nSetup complete!\n";

?>
