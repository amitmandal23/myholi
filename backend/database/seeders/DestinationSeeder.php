<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Destination;
use Illuminate\Support\Str;

class DestinationSeeder extends Seeder
{
    public function run()
    {
        $destinations = [
            "Port Blair",
            "Havelock Island",
            "Neil Island",
            "Baratang Island",
            "Ross Island",
            "North Bay Island",
            "Jolly Buoy Island",
            "Red Skin Island",
            "Chidiya Tapu",
            "Wandoor Beach",
            "Mount Harriet",
            "Diglipur",
            "Rangat",
            "Mayabunder",
            "Little Andaman",
            "Long Island",
            "Barren Island",
            "Cinque Island",
            "Rutland Island",
            "Viper Island",
            "Ross & Smith Islands",
            "Elephant Beach",
            "Radhanagar Beach",
            "Kalapathar Beach",
            "Laxmanpur Beach"
        ];

        foreach ($destinations as $destinationName) {
            $slug = Str::slug($destinationName);
            
            Destination::updateOrCreate(
                ['slug' => $slug],
                [
                    'title' => $destinationName,
                    'description' => "Welcome to {$destinationName}, a paradise waiting to be explored. Known for its pristine beaches, crystal clear waters, and lush greenery, {$destinationName} offers a perfect escape from the hustle and bustle of city life.",
                    'hero_image' => '/img/hero-1.jpg',
                    'images' => [
                        '/img/hero-1.jpg',
                        '/img/hero-2.jpg',
                        '/img/hero-3.jpg'
                    ],
                    'attractions' => [
                        [
                            'title' => "Main Beach",
                            'description' => "A stunning stretch of white sand and turquoise water.",
                            'image' => "/img/hero-1.jpg"
                        ],
                        [
                            'title' => "Sunset Point",
                            'description' => "The best place to watch the sun go down over the horizon.",
                            'image' => "/img/hero-2.jpg"
                        ],
                        [
                            'title' => "Local Market",
                            'description' => "Explore the vibrant local culture and handicrafts.",
                            'image' => "/img/hero-3.jpg"
                        ]
                    ],
                    'best_time' => "October to May is considered the best time to visit, with pleasant weather perfect for sightseeing and water sports.",
                    'how_to_reach' => "You can reach here by ferry from Port Blair. Private and government ferries operate daily."
                ]
            );
        }
    }
}
