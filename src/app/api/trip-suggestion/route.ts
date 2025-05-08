import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// Destination database
const destinations = [
  {
    name: 'Kyoto',
    country: 'Japan',
    description: 'Kyoto is the cultural heart of Japan, with numerous ancient temples, shrines, and traditional gardens. Walk through historic streets, admire traditional architecture, taste authentic Japanese cuisine, and experience traditional tea ceremonies and geisha culture.',
    imageUrl: 'https://images.unsplash.com/photo-1528164344705-47542687000d',
    coordinates: {
      lat: 35.0116,
      lon: 135.7680
    },
    tags: ['Culture', 'Temples', 'History', 'Food']
  },
  {
    name: 'Bali',
    country: 'Indonesia',
    description: 'Bali is known for its beautiful beaches, traditional dances, and rich culture. You can surf, explore sacred temples, taste local cuisine, or relax in luxury resorts.',
    imageUrl: 'https://images.unsplash.com/photo-1573790387438-4da905039392',
    coordinates: {
      lat: -8.3405,
      lon: 115.0920
    },
    tags: ['Beach', 'Surfing', 'Temples', 'Relaxation']
  },
  {
    name: 'Barcelona',
    country: 'Spain',
    description: 'Barcelona is famous for its unique architecture, vibrant culture, and delicious Spanish cuisine. From Gaudi\'s works like the Sagrada Familia and Park Güell to Las Ramblas and Barcelona beaches, the city offers a wealth of experiences.',
    imageUrl: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4',
    coordinates: {
      lat: 41.3851,
      lon: 2.1734
    },
    tags: ['Architecture', 'Art', 'Beach', 'Food']
  },
  {
    name: 'Maldives',
    country: 'Maldives',
    description: 'The Maldives offers crystal clear waters and white sand beaches, making it one of the most beautiful tropical paradises in the world. Enjoy overwater bungalows, snorkeling, deep sea diving, or simply admire the breathtaking sunsets.',
    imageUrl: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd',
    coordinates: {
      lat: 3.2028,
      lon: 73.2207
    },
    tags: ['Beach', 'Diving', 'Luxury', 'Relaxation']
  },
  {
    name: 'Cape Town',
    country: 'South Africa',
    description: 'Cape Town is located at the southernmost tip of South Africa and is known for its spectacular natural beauty, including Table Mountain, Cape of Good Hope, and beautiful beaches. It\'s also an ideal place to experience South African wildlife and wine culture.',
    imageUrl: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99',
    coordinates: {
      lat: -33.9249,
      lon: 18.4241
    },
    tags: ['Nature', 'Wildlife', 'Wine', 'Mountains']
  },
  {
    name: 'Venice',
    country: 'Italy',
    description: 'Venice is a unique city built on a lagoon, famous for its canals, gondolas, and Renaissance architecture. Stroll through the winding alleys, visit St. Mark\'s Square, or take a gondola ride along the Grand Canal.',
    imageUrl: 'https://images.unsplash.com/photo-1534113414509-0eec2bfb493f',
    coordinates: {
      lat: 45.4408,
      lon: 12.3155
    },
    tags: ['Canals', 'History', 'Art', 'Romance']
  },
  {
    name: 'Santorini',
    country: 'Greece',
    description: 'Santorini is known for its white buildings with blue domes perched on cliffs overlooking the Aegean Sea. Enjoy spectacular sunsets, explore ancient ruins, or taste local wine at the island\'s vineyards.',
    imageUrl: 'https://images.unsplash.com/photo-1570077188670-e3a8d3c6732c',
    coordinates: {
      lat: 36.3932,
      lon: 25.4615
    },
    tags: ['Island', 'Sunset', 'Architecture', 'Wine']
  },
  {
    name: 'New York',
    country: 'United States',
    description: 'New York is a vibrant metropolis known for its iconic skyline, Broadway shows, and world-class museums. Explore Central Park, visit the Statue of Liberty, or shop on Fifth Avenue.',
    imageUrl: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9',
    coordinates: {
      lat: 40.7128,
      lon: -74.0060
    },
    tags: ['City', 'Art', 'Shopping', 'Culture']
  },
  {
    name: 'Rome',
    country: 'Italy',
    description: 'Rome, known as the "Eternal City," has a rich historical and cultural heritage. Visit the Colosseum, Vatican Museums, and Sistine Chapel, and taste authentic Italian cuisine.',
    imageUrl: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5',
    coordinates: {
      lat: 41.9028,
      lon: 12.4964
    },
    tags: ['History', 'Art', 'Food', 'Religion']
  },
  {
    name: 'Sydney',
    country: 'Australia',
    description: 'Sydney is known for its iconic Opera House and Harbour Bridge. Enjoy the sunshine at Bondi Beach, visit Taronga Zoo, or take a boat tour of the beautiful Sydney Harbour.',
    imageUrl: 'https://images.unsplash.com/photo-1528072164453-f4e8ef0d475a',
    coordinates: {
      lat: -33.8688,
      lon: 151.2093
    },
    tags: ['Beach', 'Urban', 'Culture', 'Nature']
  },
  {
    name: 'Zurich',
    country: 'Switzerland',
    description: 'Zurich is situated on the shores of Lake Zurich, surrounded by the Alps, and is Switzerland\'s largest city. It features a charming old town, stylish shops and restaurants, and beautiful lakes and mountain views.',
    imageUrl: 'https://images.unsplash.com/photo-1620563099376-00fefb6f04e9',
    coordinates: {
      lat: 47.3769,
      lon: 8.5417
    },
    tags: ['Lakes', 'Mountains', 'City', 'Culture']
  },
  {
    name: 'Hong Kong',
    country: 'China',
    description: 'Hong Kong is a vibrant metropolis with an impressive skyline and rich culture. From Victoria Harbour to Victoria Peak, from bustling markets to peaceful islands, Hong Kong offers a unique blend of East and West.',
    imageUrl: 'https://images.unsplash.com/photo-1506970845248-c98828b2dcd0',
    coordinates: {
      lat: 22.3193,
      lon: 114.1694
    },
    tags: ['Urban', 'Shopping', 'Food', 'Culture']
  },
  {
    name: 'Istanbul',
    country: 'Turkey',
    description: 'Istanbul spans Europe and Asia, with a rich historical and cultural heritage. Visit Hagia Sophia, the Blue Mosque, and the Grand Bazaar, and experience Turkish baths and cuisine.',
    imageUrl: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b',
    coordinates: {
      lat: 41.0082,
      lon: 28.9784
    },
    tags: ['History', 'Culture', 'Food', 'Religion']
  },
  {
    name: 'Amsterdam',
    country: 'Netherlands',
    description: 'Amsterdam is known for its canals, bicycle-friendly streets, and historic buildings. Visit the Van Gogh Museum and Anne Frank House, or take a boat tour of the city\'s canal network.',
    imageUrl: 'https://images.unsplash.com/photo-1512470876302-972faa2aa9a4',
    coordinates: {
      lat: 52.3676,
      lon: 4.9041
    },
    tags: ['Canals', 'Art', 'Cycling', 'History']
  },
  {
    name: 'Beijing',
    country: 'China',
    description: 'Beijing is the capital of China with a rich historical and cultural heritage. Visit the Great Wall, the Forbidden City, and the Temple of Heaven, and experience traditional Chinese culture and cuisine.',
    imageUrl: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b',
    coordinates: {
      lat: 39.9042,
      lon: 116.4074
    },
    tags: ['History', 'Culture', 'Food', 'Architecture']
  }
];

export async function GET() {
  try {
    // In a real application, you could use the GeoNames API for city information
    // const geonamesUsername = process.env.GEONAMES_USERNAME;
    // const response = await fetch(`http://api.geonames.org/citiesJSON?north=90&south=-90&east=180&west=-180&maxRows=10&username=${geonamesUsername}`);
    // const data = await response.json();
    
    // Randomly select a destination
    const randomDestination = destinations[Math.floor(Math.random() * destinations.length)];
    
    // Add OpenStreetMap link to destination
    const osmLink = `https://www.openstreetmap.org/?mlat=${randomDestination.coordinates.lat}&mlon=${randomDestination.coordinates.lon}&zoom=12`;
    
    return NextResponse.json({
      ...randomDestination,
      osmLink
    });
  } catch (error) {
    console.error('Error fetching trip suggestion:', error);
    return NextResponse.json(
      { error: 'Failed to fetch trip suggestion' },
      { status: 500 }
    );
  }
} 