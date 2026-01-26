<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Blog;
use Illuminate\Support\Str;

class BlogSeeder extends Seeder
{
    public function run()
    {
        $blogs = [
            "top-10-things-to-do-in-andaman" => [
                "title" => "Top 10 Things to Do in Andaman",
                "author" => "Travel Expert",
                "published_at" => "2024-01-15",
                "image" => "/img/hero-1.jpg",
                "content" => '
                  <p class="mb-4">The Andaman and Nicobar Islands are a slice of paradise tucked away in the Bay of Bengal. From pristine beaches to historic jails, there\'s something for everyone.</p>
                  
                  <h3 class="text-xl font-bold mb-2">1. Visit Radhanagar Beach</h3>
                  <p class="mb-4">Consistently voted as one of the best beaches in Asia, Radhanagar Beach on Havelock Island is a must-visit. The white sand and turquoise waters are simply mesmerizing.</p>
            
                  <h3 class="text-xl font-bold mb-2">2. Scuba Diving</h3>
                  <p class="mb-4">Discover the vibrant underwater world of Andaman. With rich coral reefs and diverse marine life, it\'s a diver\'s dream come true.</p>
            
                  <h3 class="text-xl font-bold mb-2">3. Cellular Jail</h3>
                  <p class="mb-4">Step back in time and learn about India\'s freedom struggle at the historic Cellular Jail in Port Blair. The Light and Sound show in the evening is particularly moving.</p>
                ',
                "related_posts" => [
                  ["title" => "Best Time to Visit Andaman", "slug" => "best-time-to-visit"],
                  ["title" => "Andaman Packing List", "slug" => "packing-list"],
                  ["title" => "Havelock vs Neil Island", "slug" => "havelock-vs-neil"]
                ]
            ],
            "best-time-to-visit" => [
                "title" => "Best Time to Visit Andaman: A Seasonal Guide",
                "author" => "Island Guide",
                "published_at" => "2024-02-02",
                "image" => "/img/hero-2.jpg",
                "content" => '
                  <p class="mb-4">Planning a trip to the Andaman Islands? Timing is everything. While the islands are beautiful year-round, the experience varies significantly with the seasons.</p>
                  
                  <h3 class="text-xl font-bold mb-2">Winter (October to March)</h3>
                  <p class="mb-4">This is the peak tourist season. The weather is pleasant, with temperatures ranging from 20°C to 30°C. It\'s perfect for beach hopping, water sports, and sightseeing.</p>
            
                  <h3 class="text-xl font-bold mb-2">Summer (April to June)</h3>
                  <p class="mb-4">Summers can be warm, but the sea breeze keeps it comfortable. It\'s a great time for budget travelers as hotel rates drop. Early mornings and evenings are best for outdoor activities.</p>
            
                  <h3 class="text-xl font-bold mb-2">Monsoon (July to September)</h3>
                  <p class="mb-4">For nature lovers who enjoy lush greenery and solitude, monsoon is magical. However, heavy rains can disrupt ferry schedules and water sports are often closed.</p>
                ',
                "related_posts" => [
                  ["title" => "Top 10 Things to Do in Andaman", "slug" => "top-10-things-to-do-in-andaman"],
                  ["title" => "Andaman Packing List", "slug" => "packing-list"],
                  ["title" => "Havelock vs Neil Island", "slug" => "havelock-vs-neil"]
                ]
            ],
            "packing-list" => [
                "title" => "The Ultimate Andaman Packing List",
                "author" => "Travel Pro",
                "published_at" => "2024-03-10",
                "image" => "/img/hero-3.jpg",
                "content" => '
                  <p class="mb-4">Packing for an island vacation requires smart choices. Here\'s a checklist to ensure you have everything you need for your Andaman adventure.</p>
                  
                  <h3 class="text-xl font-bold mb-2">Clothing</h3>
                  <p class="mb-4">Light cotton clothes, swimwear, shorts, and comfortable flip-flops are essential. Don\'t forget a hat and sunglasses for sun protection.</p>
            
                  <h3 class="text-xl font-bold mb-2">Toiletries & Meds</h3>
                  <p class="mb-4">Sunscreen is a non-negotiable! Also carry insect repellent, motion sickness pills (for ferries), and your regular medications.</p>
            
                  <h3 class="text-xl font-bold mb-2">Documents</h3>
                  <p class="mb-4">Keep your ID proofs handy. If you\'re a foreign national, ensure your visa and permits are in order.</p>
                ',
                "related_posts" => [
                  ["title" => "Top 10 Things to Do in Andaman", "slug" => "top-10-things-to-do-in-andaman"],
                  ["title" => "Best Time to Visit Andaman", "slug" => "best-time-to-visit"],
                  ["title" => "Havelock vs Neil Island", "slug" => "havelock-vs-neil"]
                ]
            ],
            "havelock-vs-neil" => [
                "title" => "Havelock vs Neil Island: Which One to Choose?",
                "author" => "Island Hopper",
                "published_at" => "2024-04-05",
                "image" => "/img/hero-1.jpg",
                "content" => '
                    <p class="mb-4">Both Havelock and Neil Island are gems of the Andamans, but they offer different vibes. Havelock is buzzing with activity, while Neil is laid-back and rustic.</p>
                    <p class="mb-4">If you have time, visit both! But if you must choose, consider what kind of traveler you are.</p>
                ',
                "related_posts" => [
                  ["title" => "Top 10 Things to Do in Andaman", "slug" => "top-10-things-to-do-in-andaman"],
                  ["title" => "Best Time to Visit Andaman", "slug" => "best-time-to-visit"],
                  ["title" => "Andaman Packing List", "slug" => "packing-list"]
                ]
            ]
        ];

        foreach ($blogs as $slug => $data) {
            Blog::updateOrCreate(
                ['slug' => $slug],
                [
                    'title' => $data['title'],
                    'author' => $data['author'],
                    'published_at' => $data['published_at'],
                    'image' => $data['image'],
                    'content' => $data['content'],
                    'related_posts' => $data['related_posts']
                ]
            );
        }
    }
}
