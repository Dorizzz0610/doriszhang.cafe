'use client';

import { useEffect, useRef, useState } from 'react';

type Props = {
  wechatId: string;
  className?: string;
};

export default function WeChatButton({ wechatId, className }: Props) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMouseDown = (e: MouseEvent) => {
      const target = e.target as Node;
      if (open && wrapperRef.current && !wrapperRef.current.contains(target)) {
        setOpen(false);
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };

    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <div ref={wrapperRef} className="relative inline-flex">
      <button
        type="button"
        className={className}
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M8.691 2C4.443 2 1 4.93 1 8.545c0 2.065 1.135 3.93 2.908 5.15l-.773 2.306 2.52-1.238c.923.24 1.91.372 2.947.372.207 0 .412-.006.616-.018-.27-.707-.416-1.469-.416-2.27 0-3.726 3.13-6.747 6.99-6.747.442 0 .874.04 1.292.117C16.202 3.76 12.797 2 8.691 2Zm-2.42 5.36c.663 0 1.2.518 1.2 1.157 0 .64-.537 1.158-1.2 1.158-.662 0-1.2-.518-1.2-1.158 0-.64.538-1.157 1.2-1.157Zm4.84 0c.663 0 1.2.518 1.2 1.157 0 .64-.537 1.158-1.2 1.158-.663 0-1.2-.518-1.2-1.158 0-.64.537-1.157 1.2-1.157Z" />
          <path d="M23 13.09c0-3.034-2.987-5.49-6.67-5.49-3.684 0-6.67 2.456-6.67 5.49 0 3.035 2.986 5.49 6.67 5.49.88 0 1.722-.14 2.5-.392l2.116 1.12-.6-2.02C22.333 16.26 23 14.74 23 13.09Zm-8.33-.45c-.57 0-1.033-.44-1.033-.983 0-.544.463-.984 1.033-.984.57 0 1.033.44 1.033.984 0 .543-.463.983-1.033.983Zm3.66 0c-.57 0-1.033-.44-1.033-.983 0-.544.463-.984 1.033-.984.57 0 1.033.44 1.033.984 0 .543-.463.983-1.033.983Z" />
        </svg>
        WeChat
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="WeChat ID"
          className="absolute z-40 top-full left-0 mt-3 min-w-[220px]
            bg-white/90 dark:bg-gray-800/90 p-3 rounded-lg shadow-lg
            border border-gray-200/60 dark:border-gray-700/60
            backdrop-blur-sm animate-fadeIn"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">WeChat ID</div>
              <div className="text-sm font-medium text-gray-800 dark:text-gray-200">{wechatId}</div>
            </div>

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}


