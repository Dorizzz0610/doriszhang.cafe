import Image from "next/image";
import Link from "next/link";
import BackgroundAnimation from "../../components/BackgroundAnimation";
import NavBar from "../../components/NavBar";

export default function Gallery() {
  return (
    <>
      <BackgroundAnimation />
      <NavBar />
      
      <div className="min-h-screen pt-28 pb-10">
        <main className="container mx-auto px-4 sm:px-6">
          <p className="text-center text-sm font-light text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-10 md:mb-12 leading-relaxed">
            My mind is a gallery of everything I have ever seen
          </p>

          {/* 引子图片部分 */}
          <section className="mb-20 text-center">
            <div className="relative w-full max-w-3xl mx-auto overflow-hidden rounded-2xl shadow-lg transition-all duration-500 hover:shadow-xl">
              <Image
                src="/images/about.jpg"
                alt="About"
                width={800}
                height={400}
                className="w-full h-auto object-cover"
                priority
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white p-8 text-center">
                <p className="italic text-lg">"In the midst of winter, I found there was, within me, an invincible summer." - Camus</p>
                <p className="text-sm mt-4 text-gray-300 font-light">For someone who's always loved summer, this year has planted an invincible winter inside me.</p>
                <p className="text-sm mt-4 text-gray-300 font-light">By the Seine River, Paris. Dec 31, 2023.</p>
              </div>
            </div>
          </section>
          
          {/* 画廊部分 */}
          <section>
            <h2 className="text-2xl font-bold mb-10 gradient-text inline-block">Gallery</h2>
            
            {/* 顶部区域 - 竖向照片放在一起 */}
            <div className="mb-16">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                {/* 画廊图片21 - Dec 2023 竖向照片 */}
                                <div className="card-modern group">
                  <div className="relative overflow-hidden">
                    <Image
                      src="/images/gallery21.png"
                      alt="Gallery Image 21"
                      width={600}
                      height={400}
                      className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6 bg-white/90 dark:bg-gray-800/90 border-t border-gray-100/20 dark:border-gray-700/20 min-h-[120px] flex flex-col justify-between backdrop-blur-sm">
                    <h3 className="font-medium mb-2 text-lg">Star-Like Lights Soaring into Blue Sky</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 font-light">
                      Zurich, Switzerland. Dec 2023.
                    </p>
                  </div>
                </div>
                {/* 竖向照片 */}
                <div className="card-modern group">
                  <div className="relative overflow-hidden">
                    <Image
                      src="/images/gallery1.png"
                      alt="Gallery Image 1"
                      width={600}
                      height={400}
                      className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6 bg-white/90 dark:bg-gray-800/90 border-t border-gray-100/20 dark:border-gray-700/20 min-h-[120px] flex flex-col justify-between backdrop-blur-sm">
                    <h3 className="font-medium mb-2 text-lg">Canals, Bikes & Cheerful Passersby at Night</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 font-light">
                      Amsterdam, Netherlands. Jan 2024.
                    </p>
                  </div>
                </div>
                

              </div>
            </div>
            
            {/* 横向照片布局 - 按时间排序：Dec < Christmas < New Year's Eve < Jan */}
            <div className="mb-16">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* 画廊图片17 - Dec 2023 */}
                <div className="card-modern group">
                  <div className="relative overflow-hidden">
                    <Image
                      src="/images/gallery17.png"
                      alt="Gallery Image 17"
                      width={600}
                      height={400}
                      className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6 bg-white/90 dark:bg-gray-800/90 border-t border-gray-100/20 dark:border-gray-700/20 min-h-[120px] flex flex-col justify-between backdrop-blur-sm">
                    <h3 className="font-medium mb-2 text-lg">Pigeons, People & Flurry on Charles Bridge</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 font-light">
                      Prague, Czech. Dec 2023.
                    </p>
                  </div>
                </div>
                
                {/* 画廊图片19 - Dec 2023 */}
                <div className="card-modern group">
                  <div className="relative overflow-hidden">
                    <Image
                      src="/images/gallery19.png"
                      alt="Gallery Image 19"
                      width={600}
                      height={400}
                      className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6 bg-white/90 dark:bg-gray-800/90 border-t border-gray-100/20 dark:border-gray-700/20 min-h-[120px] flex flex-col justify-between backdrop-blur-sm">
                    <h3 className="font-medium mb-2 text-lg">Sagrada Família Glimpsed Through a Casa Milà Bookmark</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 font-light">
                      Barcelona, Spain. Dec 2023.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* 圣诞节和新年前夕照片 */}
            <div className="mb-16">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* 画廊图片18 - Christmas 2023 */}
                <div className="card-modern group">
                  <div className="relative overflow-hidden">
                    <Image
                      src="/images/gallery18.png"
                      alt="Gallery Image 18"
                      width={600}
                      height={400}
                      className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6 bg-white/90 dark:bg-gray-800/90 border-t border-gray-100/20 dark:border-gray-700/20 min-h-[120px] flex flex-col justify-between backdrop-blur-sm">
                    <h3 className="font-medium mb-2 text-lg">Santa Taking Off & Sunset Glow on Christmas Eve in Montreux</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 font-light">
                      Montreux, Switzerland. Christmas🎄 2023.
                    </p>
                  </div>
                </div>
                
                {/* 画廊图片20 - New Year's Eve 2024 */}
                <div className="card-modern group">
                  <div className="relative overflow-hidden">
                    <Image
                      src="/images/gallery20.png"
                      alt="Gallery Image 20"
                      width={600}
                      height={400}
                      className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6 bg-white/90 dark:bg-gray-800/90 border-t border-gray-100/20 dark:border-gray-700/20 min-h-[120px] flex flex-col justify-between backdrop-blur-sm">
                    <h3 className="font-medium mb-2 text-lg">Crowds & Dreamy Fireworks at the Arc de Triomphe</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 font-light">
                      Paris, France. New Year's Eve 🎆 2024.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            
            {/* 🌅 Sunrise Collection */}
            <section className="mb-16">
              <h3 className="text-xl font-bold mb-6 gradient-text-yellow inline-block">🌅 Sunrise Collection</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* 按时间顺序排列 */}
                {/* 画廊图片14 - Dec 2023 */}
                <div className="card-modern group">
                  <div className="relative overflow-hidden">
                    <Image
                      src="/images/gallery14.png"
                      alt="Gallery Image 14"
                      width={600}
                      height={400}
                      className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6 bg-white/90 dark:bg-gray-800/90 border-t border-gray-100/20 dark:border-gray-700/20 min-h-[120px] flex flex-col justify-between backdrop-blur-sm">
                    <h3 className="font-medium mb-2 text-lg">Lac Léman</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 font-light">
                      Lausanne, Switzerland. Dec 2023.
                    </p>
                  </div>
                </div>
                
                {/* 画廊图片6 - Jan 2024 */}
                <div className="card-modern group">
                  <div className="relative overflow-hidden">
                    <Image
                      src="/images/gallery6.png"
                      alt="Gallery Image 6"
                      width={600}
                      height={400}
                      className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6 bg-white/90 dark:bg-gray-800/90 border-t border-gray-100/20 dark:border-gray-700/20 min-h-[120px] flex flex-col justify-between backdrop-blur-sm">
                    <h3 className="font-medium mb-2 text-lg">Sahara Desert</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 font-light">
                      Morocco. Jan 2024.
                    </p>
                  </div>
                </div>
                
                {/* 画廊图片26 - Jan 2026 */}
                <div className="card-modern group">
                  <div className="relative overflow-hidden">
                    <Image
                      src="/images/gallery26.png"
                      alt="Gallery Image 26"
                      width={600}
                      height={400}
                      className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6 bg-white/90 dark:bg-gray-800/90 border-t border-gray-100/20 dark:border-gray-700/20 min-h-[120px] flex flex-col justify-between backdrop-blur-sm">
                    <h3 className="font-medium mb-2 text-lg">Odaiba Seaside Park</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 font-light">
                      Tokyo, Japan. Jan 1st 🎍 2026.
                    </p>
                  </div>
                </div>
              </div>
            </section>
            
            {/* 🌇 Sunset Collection */}
            <section className="mb-16">
              <h3 className="text-xl font-bold mb-6 gradient-text-orange inline-block">🌇 Sunset Collection</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* 按时间顺序排列 */}
                
                {/* 画廊图片2 - Sep 2023 */}
                <div className="card-modern group">
                  <div className="relative overflow-hidden">
                    <Image
                      src="/images/gallery2.png"
                      alt="Gallery Image 2"
                      width={600}
                      height={400}
                      className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6 bg-white/90 dark:bg-gray-800/90 border-t border-gray-100/20 dark:border-gray-700/20 min-h-[120px] flex flex-col justify-between backdrop-blur-sm">
                    <h3 className="font-medium mb-2 text-lg">Bahnhofstrasse</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 font-light">
                      Zurich, Switzerland. Sep 2023.
                    </p>
                  </div>
                </div>
                
                {/* 画廊图片3 - Oct 2023 */}
                <div className="card-modern group">
                  <div className="relative overflow-hidden">
                    <Image
                      src="/images/gallery3.png"
                      alt="Gallery Image 3"
                      width={600}
                      height={400}
                      className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6 bg-white/90 dark:bg-gray-800/90 border-t border-gray-100/20 dark:border-gray-700/20 min-h-[120px] flex flex-col justify-between backdrop-blur-sm">
                    <h3 className="font-medium mb-2 text-lg">Piazzale Michelangelo</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 font-light">
                      Florence, Italy. Oct 2023.
                    </p>
                  </div>
                </div>
                
                {/* 画廊图片22 - Nov 2023 */}
                <div className="card-modern group">
                  <div className="relative overflow-hidden">
                    <Image
                      src="/images/gallery22.png"
                      alt="Gallery Image 22"
                      width={600}
                      height={400}
                      className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6 bg-white/90 dark:bg-gray-800/90 border-t border-gray-100/20 dark:border-gray-700/20 min-h-[120px] flex flex-col justify-between backdrop-blur-sm">
                    <h3 className="font-medium mb-2 text-lg">The Little Mermaid</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 font-light">
                      Copenhagen, Denmark. Nov 2023.
                    </p>
                  </div>
                </div>
                
                {/* 画廊图片4 - Dec 2023 */}
                <div className="card-modern group">
                  <div className="relative overflow-hidden">
                    <Image
                      src="/images/gallery4.png"
                      alt="Gallery Image 4"
                      width={600}
                      height={400}
                      className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6 bg-white/90 dark:bg-gray-800/90 border-t border-gray-100/20 dark:border-gray-700/20 min-h-[120px] flex flex-col justify-between backdrop-blur-sm">
                    <h3 className="font-medium mb-2 text-lg">Tibidabo</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 font-light">
                      Barcelona, Spain. Dec 2023.
                    </p>
                  </div>
                </div>
                
                {/* 画廊图片5 - Christmas 2023 - 从圣诞节照片区域移过来的 */}
                <div className="card-modern group">
                  <div className="relative overflow-hidden">
                    <Image
                      src="/images/gallery5.png"
                      alt="Gallery Image 5"
                      width={600}
                      height={400}
                      className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6 bg-white/90 dark:bg-gray-800/90 border-t border-gray-100/20 dark:border-gray-700/20 min-h-[120px] flex flex-col justify-between backdrop-blur-sm">
                    <h3 className="font-medium mb-2 text-lg">On the way to Montreux Christmas market</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 font-light">
                      Montreux, Switzerland. Christmas🎄 2023.
                    </p>
                  </div>
                </div>
                
                {/* 画廊图片10 - Dec 2023 */}
                <div className="card-modern group">
                  <div className="relative overflow-hidden">
                    <Image
                      src="/images/gallery10.png"
                      alt="Gallery Image 10"
                      width={600}
                      height={400}
                      className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6 bg-white/90 dark:bg-gray-800/90 border-t border-gray-100/20 dark:border-gray-700/20 min-h-[120px] flex flex-col justify-between backdrop-blur-sm">
                    <h3 className="font-medium mb-2 text-lg">Lac Léman</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 font-light">
                      Lausanne, Switzerland. Dec 2023.
                    </p>
                  </div>
                </div>
                
                {/* 画廊图片11 - Dec 2023 */}
                <div className="card-modern group">
                  <div className="relative overflow-hidden">
                    <Image
                      src="/images/gallery11.png"
                      alt="Gallery Image 11"
                      width={600}
                      height={400}
                      className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6 bg-white/90 dark:bg-gray-800/90 border-t border-gray-100/20 dark:border-gray-700/20 min-h-[120px] flex flex-col justify-between backdrop-blur-sm">
                    <h3 className="font-medium mb-2 text-lg">Citadella</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 font-light">
                      Budapest, Hungary. Dec 2023.
                    </p>
                  </div>
                </div>
                
                {/* 画廊图片7 - Jan 2024 - 从一月照片区域移过来的 */}
                <div className="card-modern group">
                  <div className="relative overflow-hidden">
                    <Image
                      src="/images/gallery7.png"
                      alt="Gallery Image 7"
                      width={600}
                      height={400}
                      className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6 bg-white/90 dark:bg-gray-800/90 border-t border-gray-100/20 dark:border-gray-700/20 min-h-[120px] flex flex-col justify-between backdrop-blur-sm">
                    <h3 className="font-medium mb-2 text-lg">Belém Tower</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 font-light">
                      Lisbon, Portugal. Jan 2024.
                    </p>
                  </div>
                </div>
                
                {/* 画廊图片8 - Jan 2024 */}
                <div className="card-modern group">
                  <div className="relative overflow-hidden">
                    <Image
                      src="/images/gallery8.png"
                      alt="Gallery Image 8"
                      width={600}
                      height={400}
                      className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6 bg-white/90 dark:bg-gray-800/90 border-t border-gray-100/20 dark:border-gray-700/20 min-h-[120px] flex flex-col justify-between backdrop-blur-sm">
                    <h3 className="font-medium mb-2 text-lg">Lac Léman</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 font-light">
                      Lausanne, Switzerland. Jan 2024.
                    </p>
                  </div>
                </div>
                
                {/* 画廊图片15 - Jun 2024 */}
                <div className="card-modern group">
                  <div className="relative overflow-hidden">
                    <Image
                      src="/images/gallery15.png"
                      alt="Gallery Image 15"
                      width={600}
                      height={400}
                      className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6 bg-white/90 dark:bg-gray-800/90 border-t border-gray-100/20 dark:border-gray-700/20 min-h-[120px] flex flex-col justify-between backdrop-blur-sm">
                    <h3 className="font-medium mb-2 text-lg">Kata Beach</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 font-light">
                      Phuket, Thailand. Jun 2024.
                    </p>
                  </div>
                </div>
                
                {/* 画廊图片23 - Christmas 2025 */}
                <div className="card-modern group">
                  <div className="relative overflow-hidden">
                    <Image
                      src="/images/gallery23.png"
                      alt="Gallery Image 23"
                      width={600}
                      height={400}
                      className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6 bg-white/90 dark:bg-gray-800/90 border-t border-gray-100/20 dark:border-gray-700/20 min-h-[120px] flex flex-col justify-between backdrop-blur-sm">
                    <h3 className="font-medium mb-2 text-lg">Fushimi Inari Shrine</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 font-light">
                      Kyoto, Japan. Christmas🎄 2025.
                    </p>
                  </div>
                </div>
                
                {/* 画廊图片25 - Dec 2025 */}
                <div className="card-modern group">
                  <div className="relative overflow-hidden">
                    <Image
                      src="/images/gallery25.png"
                      alt="Gallery Image 25"
                      width={600}
                      height={400}
                      className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6 bg-white/90 dark:bg-gray-800/90 border-t border-gray-100/20 dark:border-gray-700/20 min-h-[120px] flex flex-col justify-between backdrop-blur-sm">
                    <h3 className="font-medium mb-2 text-lg">Outside Tokyo Big Sight (Comiket 107)</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 font-light">
                      Tokyo, Japan. Dec 2025. 
                    </p>
                  </div>
                </div>
                
                {/* 画廊图片27 - Jan 2026 */}
                <div className="card-modern group">
                  <div className="relative overflow-hidden">
                    <Image
                      src="/images/gallery27.png"
                      alt="Gallery Image 27"
                      width={600}
                      height={400}
                      className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6 bg-white/90 dark:bg-gray-800/90 border-t border-gray-100/20 dark:border-gray-700/20 min-h-[120px] flex flex-col justify-between backdrop-blur-sm">
                    <h3 className="font-medium mb-2 text-lg">Shenzhen Bay Park</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 font-light">
                      Shenzhen, China. Jan 2026.
                    </p>
                  </div>
                </div>
                
                {/* 画廊图片28 - Mar 2026 */}
                <div className="card-modern group">
                  <div className="relative overflow-hidden">
                    <Image
                      src="/images/gallery28.jpg"
                      alt="Gallery Image 28"
                      width={600}
                      height={400}
                      className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6 bg-white/90 dark:bg-gray-800/90 border-t border-gray-100/20 dark:border-gray-700/20 min-h-[120px] flex flex-col justify-between backdrop-blur-sm">
                    <h3 className="font-medium mb-2 text-lg">Kennedy Town</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 font-light">
                      Hong Kong SAR, China. Mar 2026.
                    </p>
                  </div>
                </div>
              </div>
            </section>
            
            {/* 🌃 Night Collection */}
            <section className="mb-16">
              <h3 className="text-xl font-bold mb-6 gradient-text-blue inline-block">🌃 Night Collection</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* 按时间顺序排列 */}
                {/* 画廊图片9 - Sep 2023 */}
                <div className="card-modern group">
                  <div className="relative overflow-hidden">
                    <Image
                      src="/images/gallery9.png"
                      alt="Gallery Image 9"
                      width={600}
                      height={400}
                      className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6 bg-white/90 dark:bg-gray-800/90 border-t border-gray-100/20 dark:border-gray-700/20 min-h-[120px] flex flex-col justify-between backdrop-blur-sm">
                    <h3 className="font-medium mb-2 text-lg">Rosengarten</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 font-light">
                      Bern, Switzerland. Sep 2023.
                    </p>
                  </div>
                </div>
                
                {/* 画廊图片12 - Dec 2023 */}
                <div className="card-modern group">
                  <div className="relative overflow-hidden">
                    <Image
                      src="/images/gallery12.png"
                      alt="Gallery Image 12"
                      width={600}
                      height={400}
                      className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6 bg-white/90 dark:bg-gray-800/90 border-t border-gray-100/20 dark:border-gray-700/20 min-h-[120px] flex flex-col justify-between backdrop-blur-sm">
                    <h3 className="font-medium mb-2 text-lg">Danube River</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 font-light">
                      Budapest, Hungary. Dec 2023.
                    </p>
                  </div>
                </div>
                
                {/* 画廊图片13 - Dec 2023 */}
                <div className="card-modern group">
                  <div className="relative overflow-hidden">
                    <Image
                      src="/images/gallery13.png"
                      alt="Gallery Image 13"
                      width={600}
                      height={400}
                      className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6 bg-white/90 dark:bg-gray-800/90 border-t border-gray-100/20 dark:border-gray-700/20 min-h-[120px] flex flex-col justify-between backdrop-blur-sm">
                    <h3 className="font-medium mb-2 text-lg">Top of Astronomical Clock</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 font-light">
                      Prague, Czech. Dec 2023.
                    </p>
                  </div>
                </div>
                
                {/* 画廊图片16 - Jan 2024 - 从一月照片区域移过来的 */}
                <div className="card-modern group">
                  <div className="relative overflow-hidden">
                    <Image
                      src="/images/gallery16.png"
                      alt="Gallery Image 16"
                      width={600}
                      height={400}
                      className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6 bg-white/90 dark:bg-gray-800/90 border-t border-gray-100/20 dark:border-gray-700/20 min-h-[120px] flex flex-col justify-between backdrop-blur-sm">
                    <h3 className="font-medium mb-2 text-lg">Damrak Canal</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 font-light">
                      Amsterdam, Netherlands. Jan 2024.
                    </p>
                  </div>
                </div>
                
                {/* 画廊图片24 - Dec 2025 */}
                <div className="card-modern group">
                  <div className="relative overflow-hidden">
                    <Image
                      src="/images/gallery24.png"
                      alt="Gallery Image 24"
                      width={600}
                      height={400}
                      className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6 bg-white/90 dark:bg-gray-800/90 border-t border-gray-100/20 dark:border-gray-700/20 min-h-[120px] flex flex-col justify-between backdrop-blur-sm">
                    <h3 className="font-medium mb-2 text-lg">Top of Tokyo Skytree</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 font-light">
                      Tokyo, Japan. Dec 2025.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </section>
        </main>
        
        {/* 页脚 */}
        <footer className="container mx-auto px-4 sm:px-6 mt-20 pt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          <div className="modern-divider"></div>
          
          <div className="flex flex-col items-center justify-center gap-6">
            <div className="text-center">
              <h3 className="font-semibold mb-3">Sitemap</h3>
              <div className="flex gap-4 justify-center">
                <Link href="/" className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors">Home</Link>
                <Link href="/gallery" className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors">Gallery</Link>
                <Link href="/journal" className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors">Journal</Link>
              </div>
            </div>
            
            <div className="text-center">
              <p>© 2025 Doris Zhang. Powered by Next.js</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
} 