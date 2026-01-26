// Helper to generate activity details
export const getActivityData = (location, slug) => {
  // Convert slug back to readable format for title (approximate)
  const title = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  const locationName = location.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  // Base data structure
  const baseData = {
    title: title,
    location: locationName,
    duration: "2-3 Hours",
    price: 1500,
    discountedPrice: 1200,
    overview: `Experience the thrill of ${title} in ${locationName}. This activity offers a unique perspective of the Andaman Islands, allowing you to explore the vibrant marine life or stunning landscapes. Perfect for adventure seekers and nature lovers alike.`,
    highlights: [
      "Professional guide/instructor included",
      "Safety equipment provided",
      "Suitable for beginners",
      "Memorable photo opportunities"
    ],
    inclusions: [
      "Hotel pickup and drop (if selected)",
      "Safety Gear & Equipment",
      "Professional Instructor",
      "Complimentary Photos/Video (limited)",
      "Bottled Water"
    ],
    exclusions: [
      "Personal Expenses",
      "Tips/Gratuities",
      "Meals (unless specified)",
      "Swimwear/Personal Clothing"
    ],
    guidelines: [
      "Wear comfortable clothing suitable for the activity.",
      "Bring a change of clothes and a towel.",
      "Avoid heavy meals 2 hours before the activity.",
      "Follow the instructor's safety guidelines at all times.",
      "Not recommended for pregnant women or people with heart conditions."
    ],
    slots: ["08:00 AM", "10:00 AM", "02:00 PM", "04:00 PM"],
    images: [
      "/img/hero-1.jpg",
      "/img/hero-2.jpg",
      "/img/hero-3.jpg"
    ]
  };

  // Specific overrides can be added here based on slug/location if needed
  // For example, if slug contains "scuba", adjust price and highlights
  if (slug.includes('scuba')) {
    baseData.price = 4500;
    baseData.discountedPrice = 3500;
    baseData.duration = "1 Hour Underwater";
    baseData.highlights.push("Dive up to 12 meters deep", "See Nemo and coral reefs");
  }

  return baseData;
};
