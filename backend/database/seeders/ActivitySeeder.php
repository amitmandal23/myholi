<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Activity;
use Illuminate\Support\Str;

class ActivitySeeder extends Seeder
{
    public function run()
    {
        // Data from menuData.js
        $activitiesData = [
            'Port Blair' => [
                "Cellular Jail Visit",
                "Light & Sound Show",
                "Corbyn's Cove Jet Ski",
                "Sea Walk at North Bay",
                "Scuba Diving at North Bay",
                "Glass Bottom Boat",
                "Semi Submarine Ride"
            ],
            'Havelock Island' => [
                "Scuba Diving",
                "Snorkeling at Elephant Beach",
                "Sea Walk at Elephant Beach",
                "Kayaking in Mangroves",
                "Parasailing",
                "Night Kayaking",
                "Game Fishing"
            ],
            'Neil Island' => [
                "Glass Bottom Boat",
                "Snorkeling at Bharatpur",
                "Scuba Diving",
                "Jet Ski Ride",
                "Banana Boat Ride"
            ],
            'Other Locations' => [
                "Limestone Caves (Baratang)",
                "Mud Volcano (Baratang)",
                "Turtle Nesting (Diglipur)",
                "Trekking at Mount Harriet",
                "Bird Watching (Chidiya Tapu)"
            ]
        ];

        // Flatten the array and map location
        $activities = [];
        foreach ($activitiesData as $location => $items) {
            foreach ($items as $item) {
                // Determine specific location from item name or category
                $specificLocation = $location;
                if (str_contains($item, 'North Bay')) $specificLocation = 'North Bay Island';
                if (str_contains($item, 'Elephant Beach')) $specificLocation = 'Havelock Island'; // Elephant beach is in Havelock
                if (str_contains($item, 'Bharatpur')) $specificLocation = 'Neil Island';
                if (str_contains($item, 'Baratang')) $specificLocation = 'Baratang Island';
                if (str_contains($item, 'Diglipur')) $specificLocation = 'Diglipur';
                if (str_contains($item, 'Mount Harriet')) $specificLocation = 'Mount Harriet';
                if (str_contains($item, 'Chidiya Tapu')) $specificLocation = 'Chidiya Tapu';
                if ($location === 'Other Locations' && $specificLocation === 'Other Locations') {
                    // Fallback for others if not caught above
                     $specificLocation = 'Andaman'; 
                }

                // Handle images based on keywords
                $image = '/img/cellularjail.jpg'; // Default
                if (stripos($item, 'beach') !== false || stripos($item, 'snorkeling') !== false) $image = '/img/havelockisland.png';
                if (stripos($item, 'scuba') !== false || stripos($item, 'sea walk') !== false) $image = '/img/havelockisland.png'; // Use underwater placeholder if available, else beach
                if (stripos($item, 'jail') !== false) $image = '/img/cellularjail.jpg';
                if (stripos($item, 'neil') !== false) $image = '/img/neilisland.jpg';
                if (stripos($item, 'baratang') !== false || stripos($item, 'cave') !== false) $image = '/img/baratang.avif';

                $activities[] = [
                    'title' => $item,
                    'location' => $specificLocation,
                    'slug' => Str::slug($item), // Using Str::slug for clean URLs
                    'location_slug' => Str::slug($specificLocation),
                    'image' => $image,
                    'rating' => '4.' . rand(5, 9),
                ];
            }
        }

        foreach ($activities as $activity) {
            Activity::updateOrCreate(
                ['slug' => $activity['slug']],
                [
                    'title' => $activity['title'],
                    'location' => $activity['location'],
                    'price' => rand(500, 5000),
                    'discounted_price' => rand(400, 4500),
                    'duration' => '2-4 Hours',
                    'overview' => "Experience the amazing {$activity['title']} at {$activity['location']}. One of the best things to do in Andaman.",
                    'highlights' => [
                        "Professional guidance included",
                        "Safety equipment provided",
                        "Suitable for all age groups",
                        "Memorable experience guaranteed"
                    ],
                    'inclusions' => [
                        "Entry tickets (if applicable)",
                        "Safety Gear",
                        "Guide charges",
                        "Bottled Water"
                    ],
                    'exclusions' => [
                        "Personal Expenses",
                        "Transfers (unless specified)",
                        "Meals"
                    ],
                    'guidelines' => [
                        "Report 30 minutes before the scheduled time.",
                        "Wear comfortable clothing.",
                        "Follow safety instructions strictly."
                    ],
                    'slots' => ["09:00 AM", "11:00 AM", "02:00 PM", "04:00 PM"],
                    'images' => [
                        $activity['image'],
                        $activity['image']
                    ],
                    'featured_image' => $activity['image'],
                    'is_active' => true,
                ]
            );
        }
    }
}
