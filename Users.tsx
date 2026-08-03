import { useState } from 'react'
import { Button, PageHeader, Badge, Input } from '@/components/ui'

const categories = [
  { id: 'start', label: 'Начало работы', count: 8, icon: '🚀' },
  { id: 'bots', label: 'Telegram-боты', count: 15, icon: '🤖' },
  { id: 'apps', label: 'Мобильные приложения', count: 12, icon: '📱' },
  { id: 'crm', label: 'CRM', count: 10, icon: '💼' },
  { id: 'loyalty', label: 'Программа лояльности', count: 7, icon: '⭐' },
  { id: 'integrations', label: 'Интеграции', count: 20, icon: '🔗' },
  { id: 'billing', label: 'Оплата и тарифы', count: 5, icon: '💳' },
]

const articles: Record<string, { id: number; title: string; status: string; views: number; updated: string }[]> = {
  start: [
    { id: 1, title: 'Что такое Gastronavt и как начать', status: 'published', views: 4200, updated: '20 июл 2026' },
    { id: 2, title: 'Регистрация и настройка аккаунта', status: 'published', views: 3800, updated: '18 июл 2026' },
    { id: 3, title: 'Первые шаги: выбор продукта', status: 'published', views: 2900, updated: '15 июл 2026' },
    { id: 4, title: 'Личный кабинет клиента: обзор', status: 'published', views: 2400, updated: '12 июл 2026' },
  ],
  bots: [
    { id: 5, title: 'Создание Telegram-бота: пошаговая инструкция', status: 'published', views: 5100, updated: '25 июл 2026' },
    { id: 6, title: 'Настройка меню бота', status: 'published', views: 3600, updated: '22 июл 2026' },
    { id: 7, title: 'Интеграция с системой заказов', status: 'draft', views: 0, updated: '—' },
    { id: 8, title: 'Программа лояльности в боте', status: 'published', views: 2800, updated: '19 июл 2026' },
    { id: 9, title: 'Аналитика бота', status: 'published', views: 1900, updated: '16 июл 2026' },
  ],
  apps: [
    { id: 10, title: 'Функции мобильного приложения', status: 'published', views: 3200, updated: '28 июл 2026' },
    { id: 11, title: 'Публикация в App Store и Google Play', status: 'published', views: 4500, updated: '24 июл 2026' },
    { id: 12, title: 'Push-уведомления: настройка', status: 'published', views: 2100, updated: '20 июл 2026' },
  ],
  crm: [],
  loyalty: [],
  integrations: [],
  billing: [],
}

export default function KnowledgeBase() {
  const [activeCategory, setActiveCategory] = useState('start')
  const [search, setSearch] = useState('')
  const [showEditor, setShowEditor] = useState(false)

  const currentArticles = articles[activeCategory] ?? []
  const filtered = currentArticles.filter(a => !search || a.title.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="p-6">
      <PageHeader title="База знаний" subtitle="Документация и справочные статьи">
        <Input
          value={search}
          onChange={setSearch}
          placeholder="Поиск по статьям..."
          className="w-64"
          icon={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>}
        />
        <Button variant="primary" onClick={() => setShowEditor(true)}>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Новая статья
        </Button>
      </PageHeader>

      <div className="flex gap-6">
        {/* Category tree */}
        <div className="w-56 flex-shrink-0">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Разделы</div>
          <div className="space-y-1">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <span>{cat.icon}</span>
                <span className="text-sm font-medium flex-1 truncate">{cat.label}</span>
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${activeCategory === cat.id ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-400'}`}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Article list */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-slate-900">
              {categories.find(c => c.id === activeCategory)?.label}
              <span className="ml-2 text-slate-400 font-normal">({filtered.length} статей)</span>
            </h2>
          </div>

          {filtered.length === 0 ? (
            <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
              <div className="text-4xl mb-3">📚</div>
              <h3 className="text-sm font-semibold text-slate-700 mb-1">Нет статей в этом разделе</h3>
              <p className="text-sm text-slate-400">Создайте первую статью для этого раздела</p>
            </div>
          ) : (
            <div className="space-y-2">
              {filtered.map((a) => (
                <div
                  key={a.id}
                  className="bg-white rounded-xl border border-slate-200 px-5 py-4 flex items-center gap-4 hover:shadow-sm transition-shadow group cursor-pointer"
                  onClick={() => setShowEditor(true)}
                >
                  <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-slate-900 truncate">{a.title}</div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      {a.views > 0 ? `${a.views.toLocaleString('ru')} просм. ·` : ''} Обновлено {a.updated}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={a.status === 'published' ? 'green' : 'slate'}>
                      {a.status === 'published' ? 'Опубликована' : 'Черновик'}
                    </Badge>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded cursor-pointer">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                      </button>
                      <button className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded cursor-pointer">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
