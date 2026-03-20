<?php

// This script sets up the storage directories and permissions for Laravel

echo "Setting up Laravel storage directories...\n";

// Create necessary directories
$directories = [
    'storage/app/public/packages',
    'storage/app/public/packages/gallery',
    'storage/app/public/activities',
    'storage/app/public/activities/gallery',
    'storage/app/public/destinations',
    'storage/app/public/blogs',
    'storage/app/public/services',
    'storage/app/public/testimonials',
    'public/storage',
    'public/storage/packages',
    'public/storage/packages/gallery',
    'public/storage/activities',
    'public/storage/activities/gallery',
    'public/storage/destinations',
    'public/storage/blogs',
    'public/storage/services',
    'public/storage/testimonials'
];

foreach ($directories as $dir) {
    if (!is_dir($dir)) {
        mkdir($dir, 0755, true);
        echo "Created directory: $dir\n";
    } else {
        echo "Directory already exists: $dir\n";
    }
}

// Create .htaccess in public/storage to allow direct access
if (!file_exists('public/storage/.htaccess')) {
    $htaccess = "Options -Indexes\n";
    file_put_contents('public/storage/.htaccess', $htaccess);
    echo "Created public/storage/.htaccess\n";
}

echo "Storage setup complete!\n";
echo "Now run: php artisan storage:link\n";
echo "Then set proper permissions on storage directory\n";

?>
