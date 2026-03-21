'use client';

import { useEffect, useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';
import { getHongKongDateKey } from '../lib/hongKongTime';
import { dailyIndexFromKey } from '../lib/dailyIndex';

interface PhilosophyQuote {
  text: string;
  author: string;
  source: string;
}

const translations = {
  en: {
    title: 'Philosophy of the Day',
    loading: 'Loading…',
    error: 'Could not load quotes.',
    footnote: 'Curated philosophy quotes (static list).',
  },
  zh: {
    title: '今日哲学',
    loading: '加载中…',
    error: '无法加载语录。',
    footnote: '哲学语录静态列表，每日一条（香港时间）。',
  },
};

export default function PhilosophyOfTheDayWidget() {
  const pathname = usePathname();
  const locale = pathname?.includes('/zh') ? 'zh' : 'en';
  const t = translations[locale];

  const [quotes, setQuotes] = useState<PhilosophyQuote[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const dateKey = useMemo(() => getHongKongDateKey(), []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch('/data/philosophy-quotes.json');
        if (!res.ok) throw new Error(String(res.status));
        const data: PhilosophyQuote[] = await res.json();
        if (!cancelled) setQuotes(data);
      } catch (e) {
        if (!cancelled) setError((e as Error).message);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const quote = useMemo(() => {
    if (!quotes?.length) return null;
    const i = dailyIndexFromKey(dateKey, quotes.length);
    return quotes[i];
  }, [quotes, dateKey]);

  if (error) {
    return (
      <div className="modern-card p-6 hover:shadow-xl transition-all duration-500">
        <h3 className="text-xl font-semibold mb-2">{t.title}</h3>
        <p className="text-sm text-red-600 dark:text-red-400">{t.error}</p>
      </div>
    );
  }

  if (!quote) {
    return (
      <div className="modern-card p-6 hover:shadow-xl transition-all duration-500">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-violet-500" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
          </svg>
          {t.title}
        </h3>
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-violet-500" />
        </div>
      </div>
    );
  }

  return (
    <div className="modern-card p-6 hover:shadow-xl transition-all duration-500 h-full flex flex-col">
      <h3 className="text-xl font-semibold mb-4 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-violet-500 shrink-0" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
        </svg>
        {t.title}
      </h3>
      <div className="flex-1 flex flex-col rounded-xl bg-gradient-to-br from-violet-50 via-white to-purple-50/90 dark:from-violet-950/40 dark:via-gray-900/30 dark:to-purple-950/35 p-5 sm:p-6 border border-violet-100/80 dark:border-violet-800/40 shadow-inner shadow-violet-100/50 dark:shadow-none">
        <blockquote className="relative pl-4 sm:pl-5 border-l-[3px] border-violet-400/85 dark:border-violet-500/65">
          <span className="absolute -left-0.5 -top-1 text-4xl sm:text-5xl font-serif text-violet-200/90 dark:text-violet-700/45 leading-none select-none" aria-hidden>
            &ldquo;
          </span>
          <p className="font-serif text-[1.05rem] sm:text-lg md:text-xl leading-[1.65] text-gray-800 dark:text-gray-100 tracking-tight whitespace-pre-wrap pt-1">
            {quote.text}
          </p>
          <span className="sr-only">&rdquo;</span>
        </blockquote>
        <footer className="mt-6 pt-4 border-t border-violet-100/80 dark:border-violet-800/40">
          <p className="text-base sm:text-lg font-medium bg-gradient-to-r from-violet-800 to-purple-800 dark:from-violet-200 dark:to-purple-200 bg-clip-text text-transparent">
            {quote.author}
          </p>
          {quote.source ? (
            <cite className="mt-1.5 block not-italic text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-snug">
              {quote.source}
            </cite>
          ) : null}
        </footer>
        <p className="mt-4 text-xs text-gray-500 dark:text-gray-500 leading-relaxed">{t.footnote}</p>
      </div>
    </div>
  );
}
