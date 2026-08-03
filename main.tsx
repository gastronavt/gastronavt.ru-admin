import type { PageId } from '@/types'

const pageMeta: Record<PageId, string> = {
  dashboard: 'Обзор',
  content: 'Контент',
  'content-plan': 'Контент-план',
  'media-library': 'Медиатека',
  seo: 'SEO',
  settings: 'Настройки',
  users: 'Пользователи',
}

export default function TopBar({ currentPage }: { currentPage: PageId }) {
  const title = pageMeta[currentPage] ?? currentPage

  return (
    <header className="flex items-center justify-between h-13 px-6 bg-white border-b border-slate-200 flex-shrink-0" style={{ height: 52 }}>
      <span className="text-sm font-medium text-slate-700">{title}</span>

      <div className="flex items-center gap-3">
        <button className="flex items-center gap-2 text-sm text-slate-400 hover:text-slate-600 transition-colors cursor-pointer bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg px-3 py-1.5">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <span>Поиск</span>
          <kbd className="text-xs bg-white text-slate-400 border border-slate-200 px-1 rounded">⌘K</kbd>
        </button>

        <button className="relative text-slate-400 hover:text-slate-600 transition-colors cursor-pointer">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
        </button>

        <a
          href="https://gastronavt.ru"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg px-3 py-1.5 transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          Открыть сайт
        </a>
      </div>
    </header>
  )
}
