import Image from "next/image";
import Link from "next/link";
import BackgroundAnimation from "../components/BackgroundAnimation";
import NavBar from "../components/NavBar";
import AvatarCarousel from "../components/AvatarCarousel";
import SpaceExplorationWidget from "../components/SpaceExplorationWidget";
import TripSuggestionWidget from "../components/TripSuggestionWidget";
import CountdownWidget from "../components/CountdownWidget";

export default function Home() {
  return (
    <>
      <BackgroundAnimation />
      <NavBar />
      
      <div className="min-h-screen pt-28 pb-10">
        <main className="container mx-auto px-4 sm:px-6">
          {/* 个人资料部分 */}
          <section className="flex flex-col md:flex-row gap-16 items-center md:items-start mb-20 animate-fadeIn">
            <div className="w-full md:w-1/3 flex justify-center">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur opacity-20 animate-pulse-scale"></div>
                <div className="relative">
                  <Image
                    src="/images/profile.png"
                    alt="Liyu Zhang"
                    width={300}
                    height={300}
                    className="rounded-full shadow-lg border-2 border-white/20 dark:border-black/20"
                    priority
                  />
                </div>
              </div>
            </div>
            
            <div className="w-full md:w-2/3">
              <h1 className="text-4xl font-bold mb-4 gradient-text">Liyu Zhang</h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
                Final year Computer Science student at HKUST
              </p>
              
              <div className="flex flex-wrap gap-3 mb-8">
                <span className="inline-flex items-center px-4 py-1.5 glass-effect rounded-full text-sm font-medium">
                  Hong Kong
                </span>
                <span className="inline-flex items-center px-4 py-1.5 glass-effect rounded-full text-sm font-medium">
                  HKUST
                </span>
              </div>
              
              <div className="flex flex-wrap gap-4 mb-10">
                <a href="lzhangcx@connect.ust.hk" className="btn-outline flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Email
                </a>
                <a href="https://github.com/Dorizzz0610" target="_blank" rel="noopener noreferrer" className="btn-outline flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.237 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  Github
                </a>
                <a href="https://www.instagram.com/dorizzz0610/" target="_blank" rel="noopener noreferrer" className="btn-outline flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  Instagram
                </a>
                <a href="https://www.linkedin.com/in/doris-liyu-zhang/" target="_blank" rel="noopener noreferrer" className="btn-outline flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                  LinkedIn
                </a>
                <a href="https://scholar.google.com/citations?hl=zh-CN&view_op=list_works&gmla=AIfU4H6_kUGs57vJgTFqzSjC6lnlw_7P2nIBcjA4NCDAHG4zeyRKZcR62dU5hpkAHwp2NGM28RwPpOmbdy50TQRXxDQ&user=WKPRBtgAAAAJ" target="_blank" rel="noopener noreferrer" className="btn-outline flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z"/>
                    <path d="M12 12c-1.385 0-2.695.288-3.885.806a8 8 0 0 0-2.542 2.063A6 6 0 0 1 12 12z"/>
                  </svg>
                  Google Scholar
                </a>
              </div>
              
              <div className="modern-card p-6 animate-slideInRight">
                <h2 className="text-2xl font-semibold mb-4">Welcome to Doris Zhang&apos;s homepage<span className="ml-2">☀️</span></h2>
                <p className="mb-4 text-gray-800 dark:text-gray-200">
                  Hi! I&apos;m an final year undergraduate student in Computer Science, with minor in Business, at HKUST.
                </p>
                <p className="text-gray-800 dark:text-gray-200">
                  As a group member of the MINSys Lab led by Professor Xiaomin Ouyang, I&apos;m currently interested in AI-enhanced IoT systems and their applications, with the sense of making AI more accessible to daily activities.
                </p>
              </div>
            </div>
          </section>
          
          {/* 头像轮播 */}
          <AvatarCarousel />
          
          {/* 教育背景 */}
          <section className="mb-20 animate-fadeIn" style={{ animationDelay: "0.2s" }}>
            <h2 className="text-2xl font-bold mb-8 gradient-text inline-block">Education</h2>
            
            <div className="space-y-8">
              <div className="modern-card p-6 hover:shadow-xl transition-all duration-500">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                    </svg>
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-xl font-semibold">The Hong Kong University of Science and Technology (HKUST)</h3>
                    <p className="text-gray-600 dark:text-gray-300 mt-1">Bachelor of Engineering in Computer Science</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">Sep. 2021 – Jun. 2025 (expected)</p>
                  </div>
                </div>
              </div>
              
              <div className="modern-card p-6 hover:shadow-xl transition-all duration-500">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="w-16 h-16 flex items-center justify-center rounded-full bg-green-100 dark:bg-green-900 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h.5A2.5 2.5 0 0020 5.5v-1.65" />
                    </svg>
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-xl font-semibold">École polytechnique fédérale de Lausanne (EPFL)</h3>
                    <p className="text-gray-600 dark:text-gray-300 mt-1">Exchange student in School of Computer and Communication Sciences</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">Sep. 2023 - Feb. 2024</p>
                  </div>
                </div>
              </div>
              
              <div className="modern-card p-6 hover:shadow-xl transition-all duration-500">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="w-16 h-16 flex items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-xl font-semibold">Shenzhen Senior High School</h3>
                    <p className="text-gray-600 dark:text-gray-300 mt-1">International Baccalaureate Diploma Programme (IBDP)</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">Sep. 2018 - May. 2021</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* 获奖情况 */}
          <section className="mb-20 animate-fadeIn" style={{ animationDelay: "0.4s" }}>
            <h2 className="text-2xl font-bold mb-8 gradient-text inline-block">Awards</h2>
            
            <div className="modern-card p-6">
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>HKSAR Government Scholarship Fund - Reaching Out Award (2024)</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Champion Award in HackUST 2023 Powered by OKX (2023)</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Women Hacker Award in HackUST 2023 Powered by OKX (2023)</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>University&apos;s Scholarship Scheme for Continuing Undergraduate Students (2022-2024)</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>University Admissions Scholarship Scheme for IB Diploma Holders (2021)</span>
                </li>
              </ul>
            </div>
          </section>
          
          {/* 教学经历 */}
          <section className="mb-20 animate-fadeIn" style={{ animationDelay: "0.6s" }}>
            <h2 className="text-2xl font-bold mb-8 gradient-text inline-block">Teaching</h2>
            
            <div className="space-y-4">
              <div className="modern-card p-6 flex items-center gap-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium">Teaching Assistant</p>
                  <p className="text-gray-600 dark:text-gray-300">COMP6611C Advanced Topics in Embedded AI Systems (2025 Spring)</p>
                </div>
              </div>
              
              <div className="modern-card p-6 flex items-center gap-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium">Undergraduate Teaching Assistant</p>
                  <p className="text-gray-600 dark:text-gray-300">COMP1021 Introduction to Computer Science (2022 Spring)</p>
                </div>
              </div>
            </div>
          </section>
          
          {/* Fun Widgets */}
          <section className="mb-20 animate-fadeIn" style={{ animationDelay: "1.4s" }}>
            <h2 className="text-2xl font-bold mb-8 gradient-text inline-block">小组件</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* 太空探索 */}
              <SpaceExplorationWidget />
              
              {/* 旅行建议 */}
              <TripSuggestionWidget />
              
              {/* 事件倒计时 */}
              <CountdownWidget />
            </div>
          </section>
        </main>
        
        {/* 页脚 */}
        <footer className="container mx-auto px-4 sm:px-6 mt-20 pt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          <div className="modern-divider mb-8"></div>
          
          <div className="flex flex-col items-center justify-center gap-6">
            <div className="text-center">
              <h3 className="font-semibold mb-3">Sitemap</h3>
              <div className="flex gap-4 justify-center">
                <Link href="/" className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors">Home</Link>
                <Link href="/gallery" className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors">Gallery</Link>
              </div>
            </div>
            
            <div className="text-center">
              <p className="mb-2">Follow: <a href="https://github.com/" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">GitHub Feed</a></p>
              <p>© 2025 Doris Zhang. Powered by Next.js</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
