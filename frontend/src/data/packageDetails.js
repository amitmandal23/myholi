import { MapPin, Calendar, Clock, CheckCircle, XCircle, Info, FileText, Shield, CreditCard, AlertCircle } from 'lucide-react';

export const packageDetails = {
  "honeymoon-packages": {
    "3-nights-4-days": {
      title: "Romantic Andaman Escape",
      duration: "3 Nights / 4 Days",
      price: 25000,
      discountedPrice: 18500,
      overview: "Experience the magic of Andaman with your partner on this short yet mesmerizing 4-day trip. Explore the pristine beaches of Havelock and the historic charm of Port Blair. Perfect for couples looking for a quick romantic getaway.",
      images: [
        "/img/havelockisland.png",
        "/img/neilisland.jpg",
        "/img/cellularjail.jpg"
      ],
      hotel: {
        name: "Symphony Palms Beach Resort",
        star: 4,
        location: "Havelock Island",
        image: "/img/havelockisland.png"
      },
      itinerary: [
        {
          day: 1,
          title: "Arrival in Port Blair & Cellular Jail Visit",
          activities: [
            "Welcome to Port Blair! Our representative will meet you at the airport.",
            "Transfer to your hotel and check-in.",
            "Visit the historic Cellular Jail in the afternoon.",
            "Witness the moving Light & Sound Show in the evening.",
            "Overnight stay at Port Blair."
          ]
        },
        {
          day: 2,
          title: "Port Blair to Havelock Island - Radhanagar Beach",
          activities: [
            "Early morning ferry to Havelock Island.",
            "Check-in to your beachside resort.",
            "Visit the world-famous Radhanagar Beach (Beach No. 7).",
            "Enjoy a romantic sunset on the white sands.",
            "Overnight stay at Havelock Island."
          ]
        },
        {
          day: 3,
          title: "Havelock to Port Blair - Shopping",
          activities: [
            "Morning at leisure or optional water sports.",
            "Return ferry to Port Blair in the afternoon.",
            "Evening free for shopping at local markets (Sagarika Emporium).",
            "Overnight stay at Port Blair."
          ]
        },
        {
          day: 4,
          title: "Departure",
          activities: [
            "Enjoy a final breakfast at the hotel.",
            "Transfer to the airport with sweet memories."
          ]
        }
      ],
      inclusions: [
        "3 Nights accommodation at 4-star hotels/resorts",
        "Daily Breakfast & Dinner",
        "All transfers in private AC vehicle",
        "Ferry tickets (Makruzz/Green Ocean) for inter-island transfer",
        "Entry permits and ferry tickets",
        "Honeymoon Cake and Flower Bed Decoration (One Night)"
      ],
      exclusions: [
        "Flight tickets",
        "Personal expenses (Laundry, Telephone, etc.)",
        "Water sports activities not mentioned",
        "Lunch",
        "GST 5%"
      ]
    },
    "4-nights-5-days": {
      title: "Tropical Love Story",
      duration: "4 Nights / 5 Days",
      price: 32000,
      discountedPrice: 26500,
      overview: "A perfectly balanced 5-day honeymoon package covering Port Blair, Havelock, and Neil Island. Enjoy candlelit dinners, beach walks, and the serene beauty of the islands.",
      images: [
        "/img/neilisland.jpg",
        "/img/havelockisland.png",
        "/img/baratang.avif"
      ],
      hotel: {
        name: "Sea Shell Resort",
        star: 4,
        location: "Havelock & Neil",
        image: "/img/neilisland.jpg"
      },
      itinerary: [
        {
          day: 1,
          title: "Arrival in Port Blair",
          activities: [
            "Airport pickup and hotel transfer.",
            "Visit Corbyn's Cove Beach.",
            "Cellular Jail Light & Sound Show.",
            "Overnight at Port Blair."
          ]
        },
        {
          day: 2,
          title: "Port Blair to Havelock - Radhanagar Beach",
          activities: [
            "Cruise to Havelock Island.",
            "Relax at Radhanagar Beach.",
            "Candlelight Dinner at the resort.",
            "Overnight at Havelock."
          ]
        },
        {
          day: 3,
          title: "Elephant Beach Water Sports",
          activities: [
            "Boat ride to Elephant Beach.",
            "Enjoy Snorkeling (complimentary) and other water sports.",
            "Evening at leisure.",
            "Overnight at Havelock."
          ]
        },
        {
          day: 4,
          title: "Havelock to Neil Island - Port Blair",
          activities: [
            "Cruise to Neil Island.",
            "Visit Bharatpur & Laxmanpur Beach.",
            "Return to Port Blair in the evening.",
            "Overnight at Port Blair."
          ]
        },
        {
          day: 5,
          title: "Departure",
          activities: [
            "Transfer to airport for your onward journey."
          ]
        }
      ],
      inclusions: [
        "Accommodation on double sharing basis",
        "Breakfast and Dinner",
        "All transfers and sightseeing by private AC vehicle",
        "Inter-island transfers by private cruise",
        "Snorkeling at Elephant Beach"
      ],
      exclusions: [
        "Airfare",
        "Lunch",
        "Personal expenses",
        "Guide charges"
      ]
    },
    // Default fallback for other durations to ensure "all" pages work
    "default": {
      title: "Andaman Bliss Package",
      duration: "Custom Duration",
      price: 20000,
      discountedPrice: 15000,
      overview: "Explore the emerald islands of Andaman with our specially curated packages. Pristine beaches, historic sites, and thrilling water sports await you.",
      images: ["/img/havelockisland.png", "/img/cellularjail.jpg"],
      hotel: {
        name: "Standard Deluxe Hotel",
        star: 3,
        location: "Port Blair",
        image: "/img/cellularjail.jpg"
      },
      itinerary: [
        { day: 1, title: "Arrival", activities: ["Welcome to Andaman", "Check-in to hotel"] },
        { day: 2, title: "Sightseeing", activities: ["Explore local attractions", "Beach visit"] },
        { day: 3, title: "Departure", activities: ["Transfer to airport"] }
      ],
      inclusions: ["Accommodation", "Breakfast", "Transfers"],
      exclusions: ["Flights", "Personal expenses"]
    }
  },
  "family-packages": {
     "5-nights-6-days": {
      title: "Family Fun in Andaman",
      duration: "5 Nights / 6 Days",
      price: 38000,
      discountedPrice: 32000,
      overview: "The ultimate family vacation package covering the best of Andaman. From history lessons at Cellular Jail to fun at Elephant Beach, this trip has something for everyone.",
      images: ["/img/havelockisland.png", "/img/neilisland.jpg"],
      hotel: {
        name: "Coral Reef Resort",
        star: 4,
        location: "Havelock",
        image: "/img/havelockisland.png"
      },
      itinerary: [
        { day: 1, title: "Arrival & Sightseeing", activities: ["Arrival at Port Blair", "Cellular Jail visit"] },
        { day: 2, title: "Port Blair to Havelock", activities: ["Ferry to Havelock", "Radhanagar Beach"] },
        { day: 3, title: "Elephant Beach Excursion", activities: ["Water sports at Elephant Beach"] },
        { day: 4, title: "Havelock to Neil Island", activities: ["Transfer to Neil Island", "Glass bottom boat ride"] },
        { day: 5, title: "Neil to Port Blair", activities: ["Return to Port Blair", "Chidiya Tapu sunset"] },
        { day: 6, title: "Departure", activities: ["Airport drop"] }
      ],
      inclusions: ["Family Suite Accommodation", "Breakfast & Dinner", "All Entry Tickets"],
      exclusions: ["Lunch", "Optional Activities"]
    }
  }
};

// Helper to get data or fallback
export const getPackageData = (category, duration) => {
  // Normalize keys
  const catKey = category.toLowerCase().replace(/\s+/g, '-');
  const durKey = duration.toLowerCase().replace(/\s+/g, '-');
  
  if (packageDetails[catKey] && packageDetails[catKey][durKey]) {
    return packageDetails[catKey][durKey];
  }
  
  // Return a generated fallback based on duration if specific data missing
  const daysMatch = duration.match(/(\d+)[-\s]*days/i);
  const nightsMatch = duration.match(/(\d+)[-\s]*nights/i);
  const days = daysMatch ? parseInt(daysMatch[1]) : 4;
  const nights = nightsMatch ? parseInt(nightsMatch[1]) : days - 1;
  
  // Generate a generic itinerary
  const genericItinerary = [];
  
  // Day 1: Arrival
  genericItinerary.push({ 
    day: 1, 
    title: "Arrival in Port Blair", 
    activities: ["Airport Pickup", "Check-in to Hotel", "Cellular Jail Light & Sound Show"] 
  });

  // Pool of activities for middle days
  const activitiesPool = [
    { title: "Havelock Island Excursion", activities: ["Ferry to Havelock", "Radhanagar Beach Sunset"] },
    { title: "Elephant Beach Water Sports", activities: ["Snorkeling", "Glass Bottom Boat Ride", "Beach Relaxation"] },
    { title: "Neil Island Tour", activities: ["Cruise to Neil Island", "Bharatpur Beach", "Laxmanpur Beach"] },
    { title: "Return to Port Blair", activities: ["Return Ferry", "Sagarika Emporium Shopping", "Chidiya Tapu Sunset"] },
    { title: "Baratang Day Trip", activities: ["Trip through Jarawa Reserve", "Limestone Caves", "Mud Volcano"] },
    { title: "Ross & North Bay Island", activities: ["Coral Reef Viewing", "Historical Ruins of Ross Island"] },
    { title: "Wandoor Beach & Marine Park", activities: ["Visit Marine Museum", "Beach Picnic", "Relaxation"] },
    { title: "Mount Harriet National Park", activities: ["Trekking", "Bird Watching", "Panoramic Views"] }
  ];

  // Fill middle days
  for (let i = 2; i < days; i++) {
    const poolIndex = (i - 2) % activitiesPool.length;
    genericItinerary.push({
      day: i,
      ...activitiesPool[poolIndex]
    });
  }
  
  // Last Day: Departure
  if (days > 1) {
    genericItinerary.push({ 
      day: days, 
      title: "Departure", 
      activities: ["Breakfast", "Hotel Checkout", "Airport Drop"] 
    });
  }

  return {
    title: `${category.replace(/-/g, ' ')} - ${duration}`,
    duration: duration,
    price: 15000 + (days * 3000),
    discountedPrice: 12000 + (days * 2500),
    overview: `Enjoy a wonderful ${duration} trip with our ${category}. We ensure the best experience with premium hotels and hassle-free transfers.`,
    images: ["/img/havelockisland.png", "/img/neilisland.jpg", "/img/cellularjail.jpg"],
    hotel: {
      name: "Andaman Premium Hotel",
      star: 3,
      location: "Port Blair / Havelock",
      image: "/img/cellularjail.jpg"
    },
    itinerary: genericItinerary,
    inclusions: [
      `Accommodation for ${nights} Nights`,
      "Daily Breakfast",
      "Airport Pick up and Drop",
      "Inter-Island Ferry Transfers"
    ],
    exclusions: [
      "Flight Fare",
      "Personal Expenses",
      "Lunch and Dinner (unless specified)"
    ]
  };
};
