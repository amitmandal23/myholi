<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Package;
use Illuminate\Support\Str;

class PackageSeeder extends Seeder
{
    public function run()
    {
        $categories = [
            'Honeymoon Packages',
            'Family Packages',
            'Group Packages',
            'Budget Packages',
            'Premium Packages'
        ];

        $durations = [
            '3 Nights 4 Days',
            '4 Nights 5 Days',
            '5 Nights 6 Days',
            '6 Nights 7 Days',
            '7 Nights 8 Days'
        ];

        foreach ($categories as $category) {
            foreach ($durations as $duration) {
                $categorySlug = Str::slug($category);
                $durationSlug = Str::slug($duration);
                $slug = $durationSlug; // The slug is just the duration part in the URL structure: /packages/honeymoon-packages/3-nights-4-days

                // Determine price based on duration and category
                $basePrice = 15000;
                $days = (int) filter_var($duration, FILTER_SANITIZE_NUMBER_INT);
                $price = $basePrice + ($days * 3000);
                
                if (str_contains($category, 'Premium')) $price *= 1.5;
                if (str_contains($category, 'Budget')) $price *= 0.8;

                Package::updateOrCreate(
                    [
                        'category' => $categorySlug,
                        'slug' => $slug
                    ],
                    [
                        'title' => "$category - $duration",
                        'duration' => $duration,
                        'price' => $price,
                        'discounted_price' => $price * 0.85,
                        'overview' => "Experience the best of Andaman with our $category. This $duration tour covers the most beautiful islands and beaches.",
                        'featured_image' => '/img/hero-1.jpg',
                        'images' => [
                            '/img/hero-1.jpg',
                            '/img/hero-2.jpg',
                            '/img/hero-3.jpg'
                        ],
                        'hotel_details' => [
                            [
                                'name' => 'Blue Sea Hotel',
                                'star' => 3,
                                'location' => 'Port Blair',
                                'image' => '/img/hero-1.jpg'
                            ]
                        ],
                        'itinerary' => [
                            [
                                'day' => 1,
                                'title' => 'Arrival',
                                'activities' => ['Airport Pickup', 'Cellular Jail Visit']
                            ],
                            [
                                'day' => 2,
                                'title' => 'Havelock Island',
                                'activities' => ['Ferry to Havelock', 'Radhanagar Beach']
                            ],
                            [
                                'day' => 3,
                                'title' => 'Neil Island',
                                'activities' => ['Ferry to Neil', 'Laxmanpur Beach']
                            ],
                            [
                                'day' => 4,
                                'title' => 'Departure',
                                'activities' => ['Airport Drop']
                            ]
                        ],
                        'inclusions' => [
                            'Accommodation',
                            'Breakfast',
                            'Transfers',
                            'Ferry Tickets'
                        ],
                        'exclusions' => [
                            'Lunch & Dinner',
                            'Personal Expenses',
                            'Airfare'
                        ],
                        'is_active' => true
                    ]
                );
            }
        }
    }
}
