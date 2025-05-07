import Image from "next/image";
import Link from "next/link";
import BackgroundAnimation from "../../components/BackgroundAnimation";
import NavBar from "../../components/NavBar";

export default function Gallery() {
  return (
    <>
      <BackgroundAnimation />
      <NavBar />
      
      <div className="min-h-screen pt-24 pb-10">
        <main className="container mx-auto px-4 sm:px-6">
          {/* 引子图片部分 */}
          <section className="mb-16 text-center">
            <div className="relative w-full max-w-2xl mx-auto overflow-hidden rounded-lg shadow-lg">
              <Image
                src="/images/about.jpg"
                alt="About"
                width={700}
                height={350}
                className="w-full h-auto object-cover"
                priority
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-6 text-center">
                <p className="mb-1">By the Seine River, Paris. Dec 31, 2023.</p>
                <p className="italic">"In the midst of winter, I found there was, within me, an invincible summer." - Camus</p>
              </div>
            </div>
          </section>
          
          {/* 画廊部分 */}
          <section>
            <h1 className="text-3xl font-bold mb-8 text-center">Gallery</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* 画廊图片1 */}
              <div className="overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:shadow-xl">
                <div className="relative">
                  <Image
                    src="/images/gallery1.png"
                    alt="Gallery Image 1"
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700 min-h-[100px] flex flex-col justify-between">
                  <h3 className="font-medium mb-1">Canals, Bikes & Cheerful Passersby at Night</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Amsterdam, Netherlands. 2024 Jan.
                  </p>
                </div>
              </div>
              

            </div>
          </section>
        </main>
        
        {/* 页脚 */}
        <footer className="container mx-auto px-4 sm:px-6 mt-20 border-t pt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          <div className="mb-4">
            <Link href="/" className="hover:text-gray-700 dark:hover:text-gray-300">← Back to home</Link>
          </div>
          
          <p>© 2025 Doris Zhang. Powered by Next.js</p>
        </footer>
      </div>
    </>
  );
} 