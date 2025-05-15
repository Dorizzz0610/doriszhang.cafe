import React from 'react';

export function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'zh' },
  ];
}

export default function JournalPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Journal</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-8">Building...</p>
    </div>
  );
}
