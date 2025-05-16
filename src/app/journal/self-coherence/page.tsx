import Link from 'next/link';
import BackgroundAnimation from "../../../components/BackgroundAnimation";
import NavBar from "../../../components/NavBar";
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

// 增强markdown处理函数
async function getPostData() {
  const filePath = path.join(process.cwd(), 'journal', '2025-05-06-self-coherence.md');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);
  
  // 转换基础markdown到HTML
  const processedContent = await remark()
    .use(html)
    .process(content);
  let contentHtml = processedContent.toString();
  
  // 处理标题样式
  contentHtml = contentHtml.replace(/<h1>(.*?)<\/h1>/g, 
    '<h1 class="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">$1</h1>');
  
  contentHtml = contentHtml.replace(/<h2>(.*?)<\/h2>/g, 
    '<h2 class="text-2xl font-bold mt-10 mb-4 text-gray-800 dark:text-gray-200">$1</h2>');
  
  // 处理引用区块 - 使其成为突出引用，替换所有匹配项
  let quoteRegex = /<blockquote>\s*<p>([\s\S]*?)<\/p>\s*<\/blockquote>/g;
  let match;
  let lastIndex = 0;
  let result = '';
  
  while ((match = quoteRegex.exec(contentHtml)) !== null) {
    result += contentHtml.slice(lastIndex, match.index);
    result += '<div class="my-8 p-6 bg-gray-50 dark:bg-gray-800/50 rounded-lg border-l-4 border-indigo-400 dark:border-indigo-500 shadow-sm">' +
      '<blockquote class="text-lg italic font-medium text-gray-700 dark:text-gray-300">' + match[1] + '</blockquote>' +
      '</div>';
    lastIndex = match.index + match[0].length;
  }
  
  result += contentHtml.slice(lastIndex);
  contentHtml = result;
  
  // 处理分隔线，使其更美观
  contentHtml = contentHtml.replace(/<hr>/g, 
    '<div class="flex items-center my-12">' +
    '<div class="flex-grow h-px bg-gradient-to-r from-transparent via-gray-400 dark:via-gray-500 to-transparent"></div>' +
    '<div class="px-4 text-gray-500 dark:text-gray-400">✦</div>' +
    '<div class="flex-grow h-px bg-gradient-to-r from-transparent via-gray-400 dark:via-gray-500 to-transparent"></div>' +
    '</div>');
     
  // 先检测H2标题是否为理论标题（如1. xxx理论）
  contentHtml = contentHtml.replace(/<h2.*?>(.*?)<\/h2>/g, function(match, p1) {
    // 检查是否包含理论编号标记
    if (/^\d+\.\s*.*?(理论|过程|主义)/.test(p1)) {
      return '<div class="theory-block my-10 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800/90 dark:to-gray-800/70 rounded-xl overflow-hidden border border-gray-100 dark:border-gray-700">' +
        '<div class="theory-content p-6">' +
        '<h2 class="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">' + p1 + '</h2>';
    }
    return match;
  });
  
  // 查找理论内容结束位置，添加结束标签
  let sections = contentHtml.split(/<div class="theory-block/);
  for (let i = 1; i < sections.length; i++) {
    // 查找下一个理论块或分隔线或H2标题开始的位置
    let endIndex = sections[i].search(/<div class="theory-block|<div class="flex items-center my-12"|<hr>|<h2/);
    if (endIndex === -1) {
      // 如果没有找到下一个区块，则关闭当前区块
      sections[i] += '</div></div>';
    } else {
      // 如果找到了下一个区块，在它之前关闭当前区块
      sections[i] = sections[i].slice(0, endIndex) + '</div></div>' + sections[i].slice(endIndex);
    }
  }
  contentHtml = sections[0] + sections.slice(1).map(s => '<div class="theory-block' + s).join('');
  
  // 处理所有无序列表，使其更美观
  let ulRegex = /<ul>([\s\S]*?)<\/ul>/g;
  lastIndex = 0;
  result = '';
  
  while ((match = ulRegex.exec(contentHtml)) !== null) {
    result += contentHtml.slice(lastIndex, match.index);
    result += '<ul class="my-6 space-y-3 list-none pl-0">' + match[1] + '</ul>';
    lastIndex = match.index + match[0].length;
  }
  
  result += contentHtml.slice(lastIndex);
  contentHtml = result;
  
  // 处理所有列表项 - 修改为浅蓝色圆点风格
  contentHtml = contentHtml.replace(/<li>([\s\S]*?)<\/li>/g, function(match, p1) {
    return '<li class="flex items-start">' +
    '<span class="mr-3 mt-1 flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-500 dark:text-blue-300">•</span>' +
    '<span>' + p1 + '</span>' +
    '</li>';
  });
  
  // 查找和处理以 "～" 开头的段落（个人解读）
  // 先将相邻的解读段落标记出来
  contentHtml = contentHtml.replace(/<p>～([\s\S]*?)<\/p>/g, '<p class="interpretation-para">～$1</p>');
  
  // 将相邻的解读段落组合成区块
  const paragraphRegex = /<p class="interpretation-para">([\s\S]*?)<\/p>/g;
  let paragraphs = [];
  while ((match = paragraphRegex.exec(contentHtml)) !== null) {
    paragraphs.push({
      content: match[0],
      index: match.index,
      length: match[0].length
    });
  }
  
  // 处理相邻段落，从后向前处理以避免索引问题
  for (let i = paragraphs.length - 1; i >= 0; i--) {
    let startPara = paragraphs[i];
    let endIndex = startPara.index + startPara.length;
    let combinedContent = startPara.content;
    
    // 检查是否有相邻段落
    while (i > 0 && paragraphs[i-1].index + paragraphs[i-1].length + 1 >= startPara.index) {
      i--;
      startPara = paragraphs[i];
      combinedContent = startPara.content + combinedContent;
    }
    
    // 如果找到多个相邻段落，替换它们
    if (startPara.index < endIndex) {
      const interpretationBlock = 
        '<div class="my-6 px-5 py-4 bg-indigo-50/50 dark:bg-indigo-900/10 rounded-lg text-gray-700 dark:text-gray-300 leading-relaxed border-l-4 border-indigo-200 dark:border-indigo-800">' +
        combinedContent.replace(/<p class="interpretation-para">/g, '<p class="mb-3">').replace(/<\/p>/g, '</p>') +
        '</div>';
      
      contentHtml = contentHtml.substring(0, startPara.index) + 
                   interpretationBlock + 
                   contentHtml.substring(endIndex);
    }
  }
  
  // 处理可能遗漏的单独解读段落
  contentHtml = contentHtml.replace(/<p class="interpretation-para">([\s\S]*?)<\/p>/g, 
    '<div class="my-6 px-5 py-4 bg-indigo-50/50 dark:bg-indigo-900/10 rounded-lg text-gray-700 dark:text-gray-300 leading-relaxed border-l-4 border-indigo-200 dark:border-indigo-800">' +
    '<p class="mb-3">$1</p>' +
    '</div>'
  );
  
  // 处理图片，使其更美观
  contentHtml = contentHtml.replace(/<img src="(.*?)".*?>/g,
    '<div class="my-8 flex justify-center">' +
    '<img src="$1" class="rounded-lg shadow-md max-w-full max-h-[60vh] object-contain" />' +
    '</div>');
  
  // 处理链接 - 使用更简约的样式
  contentHtml = contentHtml.replace(/<a href="(.*?)">(.*?)<\/a>/g, 
    '<a href="$1" class="text-indigo-600 dark:text-indigo-400 hover:underline">$2</a>');
  
  // 去掉解读段落中的 "～" 符号
  contentHtml = contentHtml.replace(/>～/g, '>');
  
  return {
    title: data.title || '自洽',
    date: data.date || '2025-05-06',
    contentHtml
  };
}

export default async function SelfCoherence() {
  const { title, date, contentHtml } = await getPostData();

  return (
    <>
      <BackgroundAnimation />
      <NavBar />
      
      <div className="min-h-screen pt-28 pb-10">
        <main className="container mx-auto px-4 sm:px-6">
          <div 
            id="journal-content"
            className="max-w-4xl mx-auto"
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold gradient-text inline-block">Journal</h2>
              <Link 
                href="/journal" 
                className="text-sm text-indigo-500 dark:text-indigo-400 hover:underline flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Journal
              </Link>
            </div>
            
            <article className="journal-article backdrop-blur-sm bg-white/30 dark:bg-gray-800/10 rounded-2xl p-8 mb-12">
              {date && (
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  {new Date(date).toLocaleDateString('zh-CN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
              )}
              
              <div className="prose prose-lg dark:prose-invert max-w-none prose-p:text-gray-700 prose-p:dark:text-gray-300 prose-strong:text-indigo-600 prose-strong:dark:text-indigo-400">
                <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
              </div>
            </article>
          </div>
        </main>
        
        <footer className="container mx-auto px-4 sm:px-6 mt-20 pt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          <div className="modern-divider mb-8"></div>
          
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