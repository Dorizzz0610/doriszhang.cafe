/**
 * 旅行目的地数据集合
 * 包含世界各地的热门旅游地点、自然风光和文化名胜
 */

export interface Destination {
  name: string;
  description: string;
  image: string;
  season: string;
}

const destinations: Destination[] = [
  // 亚洲
  {
    name: "Kyoto, Japan",
    description: "Ancient temples, traditional gardens, and beautiful cherry blossoms in spring. Experience authentic Japanese culture with tea ceremonies and geisha performances.",
    image: "/images/destinations/kyoto.jpg",
    season: "Spring"
  },
  {
    name: "Bali, Indonesia",
    description: "Tropical paradise with lush rice terraces, beautiful beaches, and vibrant culture. Famous for its yoga retreats, surf spots, and traditional Balinese dances.",
    image: "/images/destinations/bali.jpg",
    season: "Summer"
  },
  {
    name: "Seoul, South Korea",
    description: "Modern metropolis with centuries of history, amazing street food, and K-pop culture. Visit ancient palaces alongside futuristic skyscrapers and shopping districts.",
    image: "/images/destinations/seoul.jpg",
    season: "Fall"
  },
  {
    name: "Hoi An, Vietnam",
    description: "Ancient town known for its well-preserved architecture, colorful lanterns, and tailor shops. Stroll through the historic district and enjoy fresh Vietnamese cuisine.",
    image: "/images/destinations/hoian.jpg",
    season: "Winter"
  },
  {
    name: "Chiang Mai, Thailand",
    description: "Northern Thai city surrounded by mountains, famous for its temples, night markets, and elephant sanctuaries. Experience traditional Lanna culture and cuisine.",
    image: "/images/destinations/chiangmai.jpg",
    season: "Winter"
  },
  
  // 欧洲
  {
    name: "Santorini, Greece",
    description: "Stunning white buildings with blue domes overlooking the Aegean Sea. Experience breathtaking sunsets, volcanic beaches, and delicious Mediterranean cuisine.",
    image: "/images/destinations/santorini.jpg",
    season: "Summer"
  },
  {
    name: "Paris, France",
    description: "City of lights and romance, home to the Eiffel Tower, Louvre Museum, and Notre-Dame Cathedral. Enjoy world-class cuisine, art, and fashion.",
    image: "/images/destinations/paris.jpg",
    season: "Spring"
  },
  {
    name: "Prague, Czech Republic",
    description: "Fairytale city with medieval architecture, the famous Charles Bridge, and Prague Castle. Known for its rich history, beer culture, and Christmas markets.",
    image: "/images/destinations/prague.jpg",
    season: "Fall"
  },
  {
    name: "Amalfi Coast, Italy",
    description: "Dramatic coastline with colorful cliffside villages, lemon groves, and Mediterranean views. Visit Positano, Ravello, and enjoy authentic Italian cuisine.",
    image: "/images/destinations/amalfi.jpg",
    season: "Summer"
  },
  {
    name: "Reykjavik, Iceland",
    description: "Gateway to Iceland's natural wonders, including the Blue Lagoon, Northern Lights, and stunning waterfalls. Experience midnight sun in summer and geothermal pools year-round.",
    image: "/images/destinations/reykjavik.jpg",
    season: "Winter"
  },
  
  // 北美洲
  {
    name: "New York City, USA",
    description: "The city that never sleeps, home to iconic landmarks like Times Square, Central Park, and the Statue of Liberty. Experience world-class entertainment, dining, and shopping.",
    image: "/images/destinations/nyc.jpg",
    season: "Fall"
  },
  {
    name: "Vancouver, Canada",
    description: "Coastal city surrounded by mountains, offering perfect balance of urban comfort and outdoor adventure. Explore Stanley Park, Granville Island, and nearby ski resorts.",
    image: "/images/destinations/vancouver.jpg",
    season: "Summer"
  },
  {
    name: "Vermont, USA",
    description: "Beautiful fall foliage, charming small towns, and maple syrup farms. Experience quintessential New England with covered bridges, farmers markets, and cozy B&Bs.",
    image: "/images/destinations/vermont.jpg",
    season: "Fall"
  },
  {
    name: "Mexico City, Mexico",
    description: "Vibrant metropolis with rich history, colonial architecture, and world-class cuisine. Visit ancient Aztec ruins, Frida Kahlo's house, and enjoy authentic street tacos.",
    image: "/images/destinations/mexicocity.jpg",
    season: "Spring"
  },
  {
    name: "Banff, Canada",
    description: "Stunning national park in the Canadian Rockies, featuring turquoise lakes, snow-capped mountains, and abundant wildlife. Perfect for hiking, skiing, and photography.",
    image: "/images/destinations/banff.jpg",
    season: "Winter"
  },
  
  // 大洋洲
  {
    name: "Sydney, Australia",
    description: "Cosmopolitan city famous for its harbor, Opera House, and beautiful beaches. Enjoy world-class dining, surfing at Bondi Beach, and koala encounters.",
    image: "/images/destinations/sydney.jpg",
    season: "Summer"
  },
  {
    name: "Queenstown, New Zealand",
    description: "Adventure capital of the world, set against the dramatic Southern Alps. Experience bungee jumping, skiing, and Lord of the Rings landscapes.",
    image: "/images/destinations/queenstown.jpg",
    season: "Winter"
  },
  
  // 南美洲
  {
    name: "Rio de Janeiro, Brazil",
    description: "Vibrant city known for carnival, samba, and iconic landmarks like Christ the Redeemer and Copacabana Beach. Experience breathtaking views and Brazilian culture.",
    image: "/images/destinations/rio.jpg",
    season: "Summer"
  },
  {
    name: "Machu Picchu, Peru",
    description: "Ancient Incan citadel set high in the Andes Mountains. Experience one of the world's most famous archaeological sites, surrounded by breathtaking mountain scenery.",
    image: "/images/destinations/machupicchu.jpg",
    season: "Fall"
  },
  {
    name: "Patagonia, Argentina/Chile",
    description: "Vast wilderness region with stunning glaciers, mountains, and wildlife. Experience hiking in Torres del Paine, boat trips to glaciers, and gaucho culture.",
    image: "/images/destinations/patagonia.jpg",
    season: "Summer"
  },
  
  // 非洲
  {
    name: "Cape Town, South Africa",
    description: "Beautiful coastal city at the foot of Table Mountain. Experience diverse culture, wine regions, penguin beaches, and safaris just a short drive away.",
    image: "/images/destinations/capetown.jpg",
    season: "Spring"
  },
  {
    name: "Marrakech, Morocco",
    description: "Ancient imperial city with vibrant souks, palaces, and gardens. Experience the famous Jemaa el-Fnaa square, traditional hammams, and Moroccan cuisine.",
    image: "/images/destinations/marrakech.jpg",
    season: "Fall"
  },
  {
    name: "Serengeti, Tanzania",
    description: "Iconic savanna known for the annual wildebeest migration and big five safari experiences. Witness one of nature's most spectacular wildlife displays.",
    image: "/images/destinations/serengeti.jpg",
    season: "Summer"
  },
  
  // 风景/自然
  {
    name: "Swiss Alps, Switzerland",
    description: "Snow-capped mountains perfect for skiing, hiking, and scenic train journeys. Experience charming Alpine villages, fondue, and some of Europe's most dramatic landscapes.",
    image: "/images/destinations/swiss-alps.jpg",
    season: "Winter"
  },
  {
    name: "Maldives, Indian Ocean",
    description: "Tropical paradise with overwater bungalows, crystal clear waters, and vibrant coral reefs. Perfect for honeymoons, diving, and complete relaxation.",
    image: "/images/destinations/maldives.jpg",
    season: "Spring"
  },
  {
    name: "Grand Canyon, USA",
    description: "One of the world's most spectacular natural wonders, carved by the Colorado River. Experience breathtaking views, hiking trails, and geological marvels.",
    image: "/images/destinations/grandcanyon.jpg",
    season: "Spring"
  },
  {
    name: "Northern Lights, Norway",
    description: "Natural light display in the Earth's sky, particularly visible in the Arctic regions. Chase the aurora borealis while experiencing Norway's pristine fjords and mountains.",
    image: "/images/destinations/northernlights.jpg",
    season: "Winter"
  },
  {
    name: "Great Barrier Reef, Australia",
    description: "World's largest coral reef system, home to thousands of marine species. Experience incredible diving, snorkeling, and island-hopping adventures.",
    image: "/images/destinations/greatbarrierreef.jpg",
    season: "Summer"
  }
];

export default destinations; 