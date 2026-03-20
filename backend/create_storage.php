<?php

// Simple script to create all necessary storage directories
echo "Creating storage directories...\n";

$directories = [
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
        if (mkdir($dir, 0755, true)) {
            echo "✓ Created: $dir\n";
        } else {
            echo "✗ Failed to create: $dir\n";
        }
    } else {
        echo "✓ Already exists: $dir\n";
    }
}

// Create .htaccess to allow access
if (!file_exists('public/storage/.htaccess')) {
    file_put_contents('public/storage/.htaccess', "Options -Indexes\n");
    echo "✓ Created public/storage/.htaccess\n";
} else {
    echo "✓ public/storage/.htaccess already exists\n";
}

echo "\nStorage setup complete!\n";
echo "Files will be stored directly in public/storage/ without symbolic links.\n";

?>
