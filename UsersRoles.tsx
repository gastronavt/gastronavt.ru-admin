import { useState } from 'react'
import { Button, PageHeader, Badge } from '@/components/ui'

const blockLibrary = [
  { id: 'hero', label: 'Герой', icon: '🚀', desc: 'Главный блок с CTA' },
  { id: 'features', label: 'Преимущества', icon: '⭐', desc: 'Список возможностей' },
  { id: 'stats', label: 'Статистика', icon: '📊', desc: 'Числа и достижения' },
  { id: 'video', label: 'Видео', icon: '🎥', desc: 'YouTube или Vimeo' },
  { id: 'testimonials', label: 'Отзывы', icon: '💬', desc: 'Цитаты клиентов' },
  { id: 'pricing', label: 'Цены', icon: '💰', desc: 'Тарифные планы' },
  { id: 'faq', label: 'FAQ', icon: '❓', desc: 'Частые вопросы' },
  { id: 'cta', label: 'CTA-блок', icon: '🎯', desc: 'Призыв к действию' },
  { id: 'form', label: 'Форма связи', icon: '📝', desc: 'Контактная форма' },
  { id: 'partners', label: 'Партнёры', icon: '🤝', desc: 'Логотипы компаний' },
  { id: 'timeline', label: 'Таймлайн', icon: '📅', desc: 'Этапы процесса' },
  { id: 'gallery', label: 'Галерея', icon: '🖼️', desc: 'Сетка изображений' },
]

const initialBlocks = [
  { id: 'b1', type: 'hero', label: 'Герой', active: true },
  { id: 'b2', type: 'features', label: 'Преимущества', active: false },
  { id: 'b3', type: 'stats', label: 'Статистика', active: false },
  { id: 'b4', type: 'testimonials', label: 'Отзывы', active: false },
  { id: 'b5', type: 'pricing', label: 'Цены', active: false },
  { id: 'b6', type: 'faq', label: 'FAQ', active: false },
  { id: 'b7', type: 'cta', label: 'CTA-блок', active: false },
]

const landings = [
  { id: 1, title: 'Telegram-бот для ресторана', status: 'published', visits: 1240, leads: 18, updated: '28 июл' },
  { id: 2, title: 'CRM Premium', status: 'draft', visits: 0, leads: 0, updated: '25 июл' },
  { id: 3, title: 'Мобильное приложение 2026', status: 'published', visits: 890, leads: 12, updated: '20 июл' },
]

type View = 'list' | 'builder'

export default function LandingBuilder() {
  const [view, setView] = useState<View>('list')
  const [blocks, setBlocks] = useState(initialBlocks)
  const [activeBlock, setActiveBlock] = useState('b1')
  const [dragOver, setDragOver] = useState<string | null>(null)

  const addBlock = (type: string) => {
    const lib = blockLibrary.find(b => b.id === type)
    if (!lib) return
    const newBlock = { id: `b${Date.now()}`, type, label: lib.label, active: false }
    setBlocks(prev => [...prev, newBlock])
  }

  const removeBlock = (id: string) => {
    setBlocks(prev => prev.filter(b => b.id !== id))
  }

  const moveBlock = (id: string, dir: 'up' | 'down') => {
    setBlocks(prev => {
      const idx = prev.findIndex(b => b.id === id)
      if (dir === 'up' && idx === 0) return prev
      if (dir === 'down' && idx === prev.length - 1) return prev
      const arr = [...prev]
      const swap = dir === 'up' ? idx - 1 : idx + 1
      ;[arr[idx], arr[swap]] = [arr[swap], arr[idx]]
      return arr
    })
  }

  if (view === 'list') {
    return (
      <div className="p-6">
        <PageHeader title="Конструктор лендингов" subtitle="Визуальное создание посадочных страниц">
          <Button variant="primary" onClick={() => setView('builder')}>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Создать лендинг
          </Button>
        </PageHeader>

        <div className="grid grid-cols-1 gap-4">
          {landings.map(l => (
            <div key={l.id} className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 flex items-center gap-5 hover:shadow-md transition-shadow group">
              <div className="w-16 h-12 bg-gradient-to-br from-blue-100 to-violet-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">🚀</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-sm font-semibold text-slate-900">{l.title}</h3>
                  <Badge variant={l.status === 'published' ? 'green' : 'slate'}>
                    {l.status === 'published' ? 'Опубликован' : 'Черновик'}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-xs text-slate-400">
                  <span>{l.visits.toLocaleString('ru')} визитов</span>
                  <span>·</span>
                  <span>{l.leads} лидов</span>
                  <span>·</span>
                  <span>Обновлён {l.updated}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="outline" size="sm" onClick={() => setView('builder')}>Редактировать</Button>
                <Button variant="ghost" size="sm">Дублировать</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      {/* Builder top bar */}
      <div className="flex items-center justify-between px-6 py-3 bg-white border-b border-slate-200 flex-shrink-0">
        <div className="flex items-center gap-3">
          <button onClick={() => setView('list')} className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 cursor-pointer">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            Назад
          </button>
          <div className="w-px h-4 bg-slate-200" />
          <span className="text-sm font-medium text-slate-900">Telegram-бот для ресторана</span>
          <Badge variant="green">Опубликован</Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">Предпросмотр</Button>
          <Button variant="primary" size="sm">Сохранить</Button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Block library */}
        <div className="w-64 bg-white border-r border-slate-200 overflow-y-auto flex-shrink-0">
          <div className="p-4">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Блоки</div>
            <div className="space-y-1.5">
              {blockLibrary.map((b) => (
                <button
                  key={b.id}
                  onClick={() => addBlock(b.id)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-50 text-left transition-colors cursor-pointer group"
                >
                  <span className="text-lg flex-shrink-0">{b.icon}</span>
                  <div>
                    <div className="text-sm font-medium text-slate-700">{b.label}</div>
                    <div className="text-xs text-slate-400">{b.desc}</div>
                  </div>
                  <svg className="w-3.5 h-3.5 text-slate-300 ml-auto group-hover:text-blue-500 transition-colors flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Page preview / block list */}
        <div className="flex-1 overflow-y-auto bg-slate-100 p-6">
          <div className="max-w-2xl mx-auto space-y-3">
            {blocks.map((block, i) => (
              <div
                key={block.id}
                onClick={() => setActiveBlock(block.id)}
                className={`bg-white rounded-xl border-2 transition-all cursor-pointer ${activeBlock === block.id ? 'border-blue-500 shadow-lg' : 'border-slate-200 hover:border-blue-300'}`}
              >
                <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-100">
                  <span className="text-slate-400 cursor-grab text-lg">⠿</span>
                  <span className="text-sm font-medium text-slate-700">
                    {blockLibrary.find(b => b.id === block.type)?.icon} {block.label}
                  </span>
                  <div className="ml-auto flex items-center gap-1">
                    <button onClick={(e) => { e.stopPropagation(); moveBlock(block.id, 'up') }} className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer" disabled={i === 0}>
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" /></svg>
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); moveBlock(block.id, 'down') }} className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer" disabled={i === blocks.length - 1}>
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); removeBlock(block.id) }} className="p-1 text-slate-400 hover:text-red-500 cursor-pointer">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </div>
                </div>
                {/* Block preview */}
                <div className="px-4 py-5">
                  {block.type === 'hero' && (
                    <div className="bg-gradient-to-br from-slate-900 to-blue-900 rounded-lg p-6 text-white text-center">
                      <div className="text-lg font-bold mb-2">Telegram-бот для вашего ресторана</div>
                      <div className="text-sm text-slate-300 mb-4">Автоматизируйте заказы и программу лояльности</div>
                      <div className="inline-block bg-blue-500 text-white text-sm px-4 py-2 rounded-lg">Получить демо</div>
                    </div>
                  )}
                  {block.type === 'features' && (
                    <div className="grid grid-cols-3 gap-3">
                      {['Заказы онлайн', 'Программа лояльности', 'Push-уведомления'].map((f, j) => (
                        <div key={j} className="bg-slate-50 rounded-lg p-3 text-center">
                          <div className="text-2xl mb-1">⭐</div>
                          <div className="text-xs font-medium text-slate-700">{f}</div>
                        </div>
                      ))}
                    </div>
                  )}
                  {block.type === 'stats' && (
                    <div className="grid grid-cols-3 gap-3">
                      {[['500+', 'Клиентов'], ['40%', 'Рост выручки'], ['98%', 'Довольных']].map(([n, l], j) => (
                        <div key={j} className="text-center">
                          <div className="text-2xl font-bold text-blue-600">{n}</div>
                          <div className="text-xs text-slate-500">{l}</div>
                        </div>
                      ))}
                    </div>
                  )}
                  {!['hero', 'features', 'stats'].includes(block.type) && (
                    <div className="text-center py-4 text-slate-400 text-sm">
                      {blockLibrary.find(b => b.id === block.type)?.icon}{' '}
                      Блок «{block.label}» — нажмите для редактирования
                    </div>
                  )}
                </div>
              </div>
            ))}

            <button className="w-full border-2 border-dashed border-slate-300 rounded-xl py-6 text-sm text-slate-400 hover:border-blue-400 hover:text-blue-500 transition-colors cursor-pointer">
              + Добавить блок из библиотеки
            </button>
          </div>
        </div>

        {/* Properties panel */}
        <div className="w-64 bg-white border-l border-slate-200 overflow-y-auto flex-shrink-0 p-4">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Настройки блока</div>
          {activeBlock && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1.5">Заголовок</label>
                <input className="w-full text-sm border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" defaultValue="Telegram-бот для вашего ресторана" />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1.5">Подзаголовок</label>
                <textarea className="w-full text-sm border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" rows={3} defaultValue="Автоматизируйте заказы и программу лояльности" />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1.5">Кнопка CTA</label>
                <input className="w-full text-sm border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" defaultValue="Получить демо" />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1.5">Фон</label>
                <div className="flex gap-2">
                  {['#0f172a', '#1d4ed8', '#7c3aed', '#0891b2'].map(c => (
                    <button key={c} className="w-7 h-7 rounded-lg cursor-pointer border-2 border-white shadow hover:scale-110 transition-transform" style={{ background: c }} />
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1.5">Видимость</label>
                <div className="flex items-center gap-2">
                  <button className="w-9 h-5 bg-blue-600 rounded-full relative cursor-pointer">
                    <span className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full" />
                  </button>
                  <span className="text-xs text-slate-500">Показывать</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
