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
                <p className="mb-2 text-gray-200 font-light">By the Seine River, Paris. Dec 2023.</p>
                <p className="italic text-lg">"In the midst of winter, I found there was, within me, an invincible summer." - Camus</p>
              </div>
            </div>
          </section>
          
          {/* 画廊部分 */}
          <section>
            <h2 className="text-2xl font-bold mb-10 gradient-text inline-block">Gallery</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* 画廊图片1 */}
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