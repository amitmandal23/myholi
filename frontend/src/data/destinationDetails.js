export const getDestinationData = (slug) => {
  const title = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  
  return {
    title: title,
    description: `Welcome to ${title}, a paradise waiting to be explored. Known for its pristine beaches, crystal clear waters, and lush greenery, ${title} offers a perfect escape from the hustle and bustle of city life.`,
    heroImage: "/img/hero-1.jpg",
    images: ["/img/hero-1.jpg", "/img/hero-2.jpg", "/img/hero-3.jpg"],
    attractions: [
      {
        title: "Main Beach",
        description: "A stunning stretch of white sand and turquoise water.",
        image: "/img/hero-1.jpg"
      },
      {
        title: "Sunset Point",
        description: "The best place to watch the sun go down over the horizon.",
        image: "/img/hero-2.jpg"
      },
      {
        title: "Local Market",
        description: "Explore the vibrant local culture and handicrafts.",
        image: "/img/hero-3.jpg"
      }
    ],
    bestTime: "October to May is considered the best time to visit, with pleasant weather perfect for sightseeing and water sports.",
    howToReach: "You can reach here by ferry from Port Blair. Private and government ferries operate daily."
  };
};
