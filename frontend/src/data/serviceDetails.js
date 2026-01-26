export const getServiceData = (slug) => {
  const title = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  
  const services = {
    "ferries": {
      title: "Ferry Services",
      description: "Seamless island hopping with our premium ferry booking services. We partner with top operators like Makruzz, Green Ocean, and Nautika to ensure you have a comfortable journey.",
      features: [
        "Instant Booking Confirmation",
        "Multiple Ferry Operators",
        "Economy, Premium & Royal Classes",
        "Hassle-free Cancellation"
      ],
      image: "/img/hero-3.jpg"
    },
    "cabs": {
      title: "Cab Services",
      description: "Reliable and comfortable cab services for airport transfers and sightseeing. Our fleet includes sanitized sedans, SUVs, and tempo travellers driven by professional chauffeurs.",
      features: [
        "Airport Pick & Drop",
        "Full Day Sightseeing",
        "Clean & Sanitized Cars",
        "Experienced Drivers"
      ],
      image: "/img/hero-2.jpg"
    },
    "cruises": {
      title: "Cruise Packages",
      description: "Experience luxury on the high seas with our exclusive cruise packages. Dinner cruises, sunset cruises, and party boats available for booking.",
      features: [
        "Dinner Cruises",
        "Live Music & Entertainment",
        "Sunset Views",
        "Private Charter Available"
      ],
      image: "/img/hero-1.jpg"
    },
    "water-sports": {
      title: "Water Sports",
      description: "Adrenaline pumping water sports activities across Andaman. From jet skiing to parasailing, we have it all arranged for you.",
      features: [
        "Jet Skiing & Parasailing",
        "Banana Boat Rides",
        "Certified Instructors",
        "Safety Gear Included"
      ],
      image: "/img/hero-2.jpg"
    }
  };

  return services[slug] || {
    title: title,
    description: `Professional ${title} services to make your Andaman trip memorable.`,
    features: ["Professional Service", "Best Rates", "24/7 Support"],
    image: "/img/hero-1.jpg"
  };
};
