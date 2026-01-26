const blogPosts = {
  "top-10-things-to-do": {
    title: "Top 10 Things to Do in Andaman",
    author: "Travel Expert",
    date: "January 15, 2024",
    image: "/img/hero-1.jpg",
    content: `
      <p class="mb-4">The Andaman and Nicobar Islands are a slice of paradise tucked away in the Bay of Bengal. From pristine beaches to historic jails, there's something for everyone.</p>
      
      <h3 class="text-xl font-bold mb-2">1. Visit Radhanagar Beach</h3>
      <p class="mb-4">Consistently voted as one of the best beaches in Asia, Radhanagar Beach on Havelock Island is a must-visit. The white sand and turquoise waters are simply mesmerizing.</p>

      <h3 class="text-xl font-bold mb-2">2. Scuba Diving</h3>
      <p class="mb-4">Discover the vibrant underwater world of Andaman. With rich coral reefs and diverse marine life, it's a diver's dream come true.</p>

      <h3 class="text-xl font-bold mb-2">3. Cellular Jail</h3>
      <p class="mb-4">Step back in time and learn about India's freedom struggle at the historic Cellular Jail in Port Blair. The Light and Sound show in the evening is particularly moving.</p>
    `,
    relatedPosts: [
      { title: "Best Time to Visit Andaman", slug: "best-time-to-visit" },
      { title: "Andaman Packing List", slug: "packing-list" },
      { title: "Havelock vs Neil Island", slug: "havelock-vs-neil" }
    ]
  },
  "best-time-to-visit": {
    title: "Best Time to Visit Andaman: A Seasonal Guide",
    author: "Island Guide",
    date: "February 2, 2024",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    content: `
      <p class="mb-4">Planning a trip to the Andaman Islands? Timing is everything. While the islands are beautiful year-round, the experience varies significantly with the seasons.</p>
      
      <h3 class="text-xl font-bold mb-2">Winter (October to March)</h3>
      <p class="mb-4">This is the peak tourist season. The weather is pleasant, with temperatures ranging from 20°C to 30°C. It's perfect for beach hopping, water sports, and sightseeing.</p>

      <h3 class="text-xl font-bold mb-2">Summer (April to June)</h3>
      <p class="mb-4">Summers can be warm, but the sea breeze keeps it comfortable. It's a great time for budget travelers as hotel rates drop. Early mornings and evenings are best for outdoor activities.</p>

      <h3 class="text-xl font-bold mb-2">Monsoon (July to September)</h3>
      <p class="mb-4">For nature lovers who enjoy lush greenery and solitude, monsoon is magical. However, heavy rains can disrupt ferry schedules and water sports are often closed.</p>
    `,
    relatedPosts: [
      { title: "Top 10 Things to Do in Andaman", slug: "top-10-things-to-do" },
      { title: "Andaman Packing List", slug: "packing-list" },
      { title: "Havelock vs Neil Island", slug: "havelock-vs-neil" }
    ]
  },
  "packing-list": {
    title: "The Ultimate Andaman Packing List",
    author: "Travel Pro",
    date: "March 10, 2024",
    image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    content: `
      <p class="mb-4">Packing for an island vacation requires smart choices. Here's a checklist to ensure you have everything you need for your Andaman adventure.</p>
      
      <h3 class="text-xl font-bold mb-2">Clothing</h3>
      <p class="mb-4">Light cotton clothes, swimwear, shorts, and comfortable flip-flops are essential. Don't forget a hat and sunglasses for sun protection.</p>

      <h3 class="text-xl font-bold mb-2">Toiletries & Meds</h3>
      <p class="mb-4">Sunscreen is a non-negotiable! Also carry insect repellent, motion sickness pills (for ferries), and your regular medications.</p>

      <h3 class="text-xl font-bold mb-2">Documents</h3>
      <p class="mb-4">Keep your ID proofs handy. If you're a foreign national, ensure your visa and permits are in order.</p>
    `,
    relatedPosts: [
      { title: "Top 10 Things to Do in Andaman", slug: "top-10-things-to-do" },
      { title: "Best Time to Visit Andaman", slug: "best-time-to-visit" },
      { title: "Havelock vs Neil Island", slug: "havelock-vs-neil" }
    ]
  },
  "havelock-vs-neil": {
    title: "Havelock vs Neil Island: Which One to Choose?",
    author: "Island Hopper",
    date: "April 5, 2024",
    image: "https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    content: `
      <p class="mb-4">Can't decide between Havelock (Swaraj Dweep) and Neil Island (Shaheed Dweep)? Both offer unique experiences. Here's a comparison to help you choose.</p>
      
      <h3 class="text-xl font-bold mb-2">Havelock Island</h3>
      <p class="mb-4">Famous for Radhanagar Beach and Elephant Beach, Havelock is bustling with activity. It's the hub for scuba diving and has a vibrant nightlife. Choose Havelock if you want adventure and energy.</p>

      <h3 class="text-xl font-bold mb-2">Neil Island</h3>
      <p class="mb-4">Neil is the quieter, more rustic cousin. Known for its natural rock formation (Howrah Bridge) and sunset views at Laxmanpur Beach. Choose Neil if you want to unwind and relax in a village-like setting.</p>

      <h3 class="text-xl font-bold mb-2">Verdict</h3>
      <p class="mb-4">Why choose? Most itineraries cover both! Spend 2-3 nights in Havelock and 1-2 nights in Neil for the perfect balance.</p>
    `,
    relatedPosts: [
      { title: "Top 10 Things to Do in Andaman", slug: "top-10-things-to-do" },
      { title: "Best Time to Visit Andaman", slug: "best-time-to-visit" },
      { title: "Andaman Packing List", slug: "packing-list" }
    ]
  }
};

export const getBlogData = (slug) => {
  return blogPosts[slug] || blogPosts["top-10-things-to-do"];
};
