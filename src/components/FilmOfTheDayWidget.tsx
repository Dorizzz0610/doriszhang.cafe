'use client';

import { useEffect, useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';
import { getHongKongDateKey } from '../lib/hongKongTime';
import { dailyIndexFromKey } from '../lib/dailyIndex';

interface DoubanMovie {
  rank: number;
  title: string;
  original_title: string;
  year: string;
  rating_num: string;
  rating_count: string;
  dbid: string;
}

const translations = {
  en: {
    title: 'Film of the Day',
    doubanRating: 'Douban rating',
    viewOnDouban: 'View on Douban',
    rank: 'Rank',
    loading: 'Loading…',
    error: 'Could not load film data.',
    footnote: 'From a static snapshot of Douban Movie Top 250.',
    labelChinese: 'Chinese title',
    labelOriginal: 'Original title',
  },
  zh: {
    title: '今日电影',
    doubanRating: '豆瓣评分',
    viewOnDouban: '在豆瓣打开',
    rank: '排名',
    loading: '加载中…',
    error: '无法加载电影数据。',
    footnote: '来自豆瓣电影 Top250 静态榜单整理。',
    labelChinese: '中文片名',
    labelOriginal: '原名',
  },
};

/** 中文页：主标题中文 + 副标题原文；英文页：主标题偏外文原名 + 副标题中文（便于中英都看到） */
function getFilmHeadlines(film: DoubanMovie, locale: 'en' | 'zh') {
  const same =
    !film.original_title ||
    film.original_title.trim() === '' ||
    film.original_title === film.title;
  if (same) {
    return {
      primary: film.title,
      secondary: null as string | null,
      secondaryLabel: null as 'labelChinese' | 'labelOriginal' | null,
    };
  }
  if (locale === 'zh') {
    return {
      primary: film.title,
      secondary: film.original_title,
      secondaryLabel: 'labelOriginal' as const,
    };
  }
  const originalLooksLatin = /[a-zA-Z]/.test(film.original_title);
  if (originalLooksLatin) {
    return {
      primary: film.original_title,
      secondary: film.title,
      secondaryLabel: 'labelChinese' as const,
    };
  }
  return {
    primary: film.title,
    secondary: film.original_title,
    secondaryLabel: 'labelOriginal' as const,
  };
}

export default function FilmOfTheDayWidget() {
  const pathname = usePathname();
  const locale = pathname?.includes('/zh') ? 'zh' : 'en';
  const t = translations[locale];

  const [movies, setMovies] = useState<DoubanMovie[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const dateKey = useMemo(() => getHongKongDateKey(), []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch('/data/douban-top250.json');
        if (!res.ok) throw new Error(String(res.status));
        const data: DoubanMovie[] = await res.json();
        if (!cancelled) setMovies(data);
      } catch (e) {
        if (!cancelled) setError((e as Error).message);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const film = useMemo(() => {
    if (!movies?.length) return null;
    const i = dailyIndexFromKey(dateKey, movies.length);
    return movies[i];
  }, [movies, dateKey]);

  if (error) {
    return (
      <div className="modern-card p-6 hover:shadow-xl transition-all duration-500">
        <h3 className="text-xl font-semibold mb-2">{t.title}</h3>
        <p className="text-sm text-red-600 dark:text-red-400">{t.error}</p>
      </div>
    );
  }

  if (!film) {
    return (
      <div className="modern-card p-6 hover:shadow-xl transition-all duration-500">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-amber-500" viewBox="0 0 20 20" fill="currentColor">
            <path d="M2 6a2 2 0 012-2h6l2 2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
          </svg>
          {t.title}
        </h3>
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-amber-500" />
        </div>
      </div>
    );
  }

  const doubanUrl = `https://movie.douban.com/subject/${film.dbid}/`;
  const headlines = getFilmHeadlines(film, locale);

  return (
    <div className="modern-card p-6 hover:shadow-xl transition-all duration-500 h-full flex flex-col">
      <h3 className="text-xl font-semibold mb-4 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-amber-500 shrink-0" viewBox="0 0 20 20" fill="currentColor">
          <path d="M2 6a2 2 0 012-2h6l2 2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
        </svg>
        {t.title}
      </h3>
      <div className="flex-1 flex flex-col rounded-lg bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/25 dark:to-orange-900/20 p-4 border border-amber-100/50 dark:border-amber-800/30 ring-1 ring-amber-200/40 dark:ring-amber-700/25">
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
          {t.rank} #{film.rank} · {film.year}
        </p>
        <p className="font-bold text-lg text-gray-900 dark:text-gray-100 leading-snug">{headlines.primary}</p>
        {headlines.secondary && (
          <>
            {headlines.secondaryLabel && (
              <p className="text-[10px] uppercase tracking-wider text-gray-500 dark:text-gray-400 mt-2 mb-0.5">
                {t[headlines.secondaryLabel]}
              </p>
            )}
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-snug line-clamp-4">{headlines.secondary}</p>
          </>
        )}
        <div className="mt-4 flex items-baseline gap-2">
          <span className="text-sm text-gray-600 dark:text-gray-400">{t.doubanRating}</span>
          <span className="text-2xl font-semibold text-amber-700 dark:text-amber-300">{film.rating_num}</span>
        </div>
        <a
          href={doubanUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center justify-center rounded-full bg-amber-600 hover:bg-amber-700 dark:bg-amber-700 dark:hover:bg-amber-600 text-white text-sm font-medium py-2.5 px-4 transition-colors"
        >
          {t.viewOnDouban}
        </a>
        <p className="mt-3 text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{t.footnote}</p>
      </div>
    </div>
  );
}
