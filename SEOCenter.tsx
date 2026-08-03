import { useState } from 'react'

type CardStatus = 'idea' | 'draft' | 'review' | 'scheduled' | 'published'
type Priority = 'high' | 'medium' | 'low'
type ContentType = 'Статья' | 'Кейс' | 'Новость' | 'Страница'

interface PlanCard {
  id: number
  title: string
  status: CardStatus
  priority: Priority
  author: string
  date: string
  type: ContentType
}

const initialCards: PlanCard[] = [
  { id: 1, title: 'Как выбрать CRM для ресторана в 2026 году', status: 'idea', priority: 'high', author: 'Е. Морозова', date: '—', type: 'Статья' },
  { id: 2, title: 'Сравнение MAX-бота и Telegram-бота', status: 'idea', priority: 'medium', author: 'И. Козлов', date: '—', type: 'Статья' },
  { id: 3, title: 'Топ-10 ошибок при запуске доставки', status: 'draft', priority: 'high', author: 'М. Сидорова', date: '—', type: 'Статья' },
  { id: 4, title: 'Кейс: Теремок — рост среднего чека на 28%', status: 'draft', priority: 'medium', author: 'Е. Морозова', date: '—', type: 'Кейс' },
  { id: 5, title: 'Обновление раздела «Цены»', status: 'review', priority: 'high', author: 'А. Данилов', date: '—', type: 'Страница' },
  { id: 6, title: 'Программа лояльности через мобильное приложение', status: 'review', priority: 'low', author: 'Д. Петров', date: '—', type: 'Статья' },
  { id: 7, title: 'Gastronavt на форуме Restaurant Tech 2026', status: 'scheduled', priority: 'medium', author: 'А. Данилов', date: '10 авг 2026', type: 'Новость' },
  { id: 8, title: 'MAX-бот для ресторана: возможности', status: 'scheduled', priority: 'high', author: 'Д. Петров', date: '5 авг 2026', type: 'Статья' },
  { id: 9, title: 'Telegram-бот увеличил выручку на 40%', status: 'published', priority: 'high', author: 'Е. Морозова', date: '28 июл 2026', type: 'Статья' },
  { id: 10, title: 'Кейс: Додо Пицца — Telegram-бот', status: 'published', priority: 'high', author: 'И. Козлов', date: '25 июл 2026', type: 'Кейс' },
]

const columns: { id: CardStatus; label: string; color: string; dot: string }[] = [
  { id: 'idea', label: 'Идея', color: 'bg-slate-100', dot: 'bg-slate-400' },
  { id: 'draft', label: 'Черновик', color: 'bg-amber-50', dot: 'bg-amber-400' },
  { id: 'review', label: 'На проверке', color: 'bg-violet-50', dot: 'bg-violet-400' },
  { id: 'scheduled', label: 'Запланировано', color: 'bg-cyan-50', dot: 'bg-cyan-500' },
  { id: 'published', label: 'Опубликовано', color: 'bg-emerald-50', dot: 'bg-emerald-500' },
]

const priorityBadge: Record<Priority, { label: string; cls: string }> = {
  high: { label: 'Высокий', cls: 'bg-red-50 text-red-600' },
  medium: { label: 'Средний', cls: 'bg-amber-50 text-amber-600' },
  low: { label: 'Низкий', cls: 'bg-slate-100 text-slate-500' },
}

const typeBadge: Record<ContentType, string> = {
  'Статья': 'bg-blue-50 text-blue-600',
  'Кейс': 'bg-violet-50 text-violet-600',
  'Новость': 'bg-emerald-50 text-emerald-600',
  'Страница': 'bg-slate-100 text-slate-500',
}

export default function ContentPlan() {
  const [view, setView] = useState<'kanban' | 'table'>('kanban')
  const [cards, setCards] = useState(initialCards)
  const [dragging, setDragging] = useState<number | null>(null)
  const [over, setOver] = useState<CardStatus | null>(null)

  const moveCard = (id: number, newStatus: CardStatus) => {
    setCards(prev => prev.map(c => c.id === id ? { ...c, status: newStatus } : c))
  }

  return (
    <div className="p-7 max-w-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Контент-план</h1>
          <p className="text-sm text-slate-400 mt-1">{cards.length} материалов · {cards.filter(c => c.status === 'scheduled').length} запланировано</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-slate-100 rounded-lg p-1 gap-1">
            <button
              onClick={() => setView('kanban')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors cursor-pointer ${view === 'kanban' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path d="M2 4a1 1 0 011-1h3a1 1 0 011 1v12a1 1 0 01-1 1H3a1 1 0 01-1-1V4zM8 4a1 1 0 011-1h3a1 1 0 011 1v7a1 1 0 01-1 1H9a1 1 0 01-1-1V4zM14 4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" /></svg>
              Канбан
            </button>
            <button
              onClick={() => setView('table')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors cursor-pointer ${view === 'table' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>
              Таблица
            </button>
          </div>
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg cursor-pointer transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
            Добавить идею
          </button>
        </div>
      </div>

      {view === 'kanban' && (
        <div className="flex gap-4 overflow-x-auto pb-4">
          {columns.map(col => {
            const colCards = cards.filter(c => c.status === col.id)
            const isOver = over === col.id
            return (
              <div
                key={col.id}
                className={`flex-shrink-0 w-64 rounded-xl transition-all ${isOver ? 'ring-2 ring-blue-400' : ''}`}
                onDragOver={e => { e.preventDefault(); setOver(col.id) }}
                onDragLeave={() => setOver(null)}
                onDrop={() => { if (dragging !== null) { moveCard(dragging, col.id); setDragging(null); setOver(null) } }}
              >
                <div className="flex items-center gap-2 px-3 py-3 mb-2">
                  <span className={`w-2 h-2 rounded-full ${col.dot}`} />
                  <span className="text-sm font-semibold text-slate-700">{col.label}</span>
                  <span className="ml-auto text-xs text-slate-400 bg-white border border-slate-200 px-1.5 py-0.5 rounded-full">{colCards.length}</span>
                </div>

                <div className="space-y-2.5">
                  {colCards.map(card => {
                    const p = priorityBadge[card.priority]
                    return (
                      <div
                        key={card.id}
                        draggable
                        onDragStart={() => setDragging(card.id)}
                        onDragEnd={() => { setDragging(null); setOver(null) }}
                        className={`bg-white rounded-xl border border-slate-200 p-4 cursor-grab hover:shadow-md transition-all ${dragging === card.id ? 'opacity-50 rotate-1' : ''}`}
                      >
                        <div className="flex items-start justify-between gap-2 mb-3">
                          <p className="text-sm font-medium text-slate-800 leading-snug">{card.title}</p>
                        </div>
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${typeBadge[card.type]}`}>{card.type}</span>
                          <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${p.cls}`}>{p.label}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs text-slate-400">
                          <span>{card.author}</span>
                          {card.date !== '—' && <span>{card.date}</span>}
                        </div>
                      </div>
                    )
                  })}
                  <button className="w-full text-xs text-slate-400 hover:text-blue-600 py-2 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer border border-dashed border-slate-200">
                    + Добавить
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {view === 'table' && (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Название</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Тип</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Статус</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Приоритет</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Автор</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Дата</th>
                <th className="px-5 py-3 w-8" />
              </tr>
            </thead>
            <tbody>
              {cards.map(card => {
                const col = columns.find(c => c.id === card.status)!
                const p = priorityBadge[card.priority]
                return (
                  <tr key={card.id} className="border-t border-slate-100 hover:bg-slate-50 transition-colors group">
                    <td className="px-5 py-3.5 font-medium text-slate-800">{card.title}</td>
                    <td className="px-5 py-3.5">
                      <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${typeBadge[card.type]}`}>{card.type}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="flex items-center gap-1.5 text-xs font-medium text-slate-600">
                        <span className={`w-1.5 h-1.5 rounded-full ${col.dot}`} />
                        {col.label}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${p.cls}`}>{p.label}</span>
                    </td>
                    <td className="px-5 py-3.5 text-slate-500">{card.author}</td>
                    <td className="px-5 py-3.5 text-slate-400">{card.date}</td>
                    <td className="px-5 py-3.5">
                      <button className="p-1 text-slate-300 hover:text-blue-500 rounded cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
