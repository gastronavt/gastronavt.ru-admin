import { useState } from 'react'
import { Badge, Button, PageHeader, Card, Drawer, FormField, Input, TextArea, Select } from '@/components/ui'

const news = [
  { id: 1, title: 'Gastronavt запускает поддержку MAX-ботов', category: 'Продукт', date: '28 июл 2026', status: 'published', pinned: true, views: 3200, cover: 'from-blue-500 to-violet-600' },
  { id: 2, title: 'Мы вошли в топ-10 IT-компаний для ресторанного бизнеса России', category: 'Компания', date: '20 июл 2026', status: 'published', pinned: false, views: 5800, cover: 'from-emerald-500 to-teal-600' },
  { id: 3, title: 'Обновление CRM: новые отчёты и интеграции', category: 'Продукт', date: '15 июл 2026', status: 'published', pinned: false, views: 1940, cover: 'from-cyan-500 to-blue-600' },
  { id: 4, title: 'Открытие офиса в Санкт-Петербурге', category: 'Компания', date: '5 июл 2026', status: 'published', pinned: false, views: 2100, cover: 'from-amber-500 to-orange-600' },
  { id: 5, title: 'Gastronavt на форуме Restaurant Tech 2026', category: 'Мероприятия', date: '1 июл 2026', status: 'draft', pinned: false, views: 0, cover: 'from-rose-500 to-pink-600' },
]

export default function CompanyNews() {
  const [drawer, setDrawer] = useState(false)
  const [selected, setSelected] = useState<typeof news[0] | null>(null)

  return (
    <div className="p-6">
      <PageHeader title="Новости компании" subtitle={`${news.length} новостей`}>
        <Button variant="primary">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Добавить новость
        </Button>
      </PageHeader>

      <div className="space-y-4">
        {news.map((n) => (
          <div
            key={n.id}
            className="bg-white rounded-xl border border-slate-200 shadow-sm flex overflow-hidden hover:shadow-md transition-shadow group cursor-pointer"
            onClick={() => { setSelected(n); setDrawer(true) }}
          >
            <div className={`w-2 flex-shrink-0 bg-gradient-to-b ${n.cover}`} />
            <div className="w-24 flex-shrink-0 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
              <span className="text-3xl">📰</span>
            </div>
            <div className="flex-1 p-5 min-w-0">
              <div className="flex items-start justify-between gap-4 mb-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-semibold text-slate-900">{n.title}</h3>
                  {n.pinned && (
                    <span className="text-xs bg-amber-100 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-md font-medium flex items-center gap-1">
                      📌 Закреплена
                    </span>
                  )}
                </div>
                <Badge variant={n.status === 'published' ? 'green' : 'slate'}>
                  {n.status === 'published' ? 'Опубликована' : 'Черновик'}
                </Badge>
              </div>
              <div className="flex items-center gap-4 text-sm text-slate-400">
                <span className="bg-slate-100 text-slate-600 text-xs px-2 py-0.5 rounded">{n.category}</span>
                <span>{n.date}</span>
                {n.views > 0 && <span>{n.views.toLocaleString('ru')} просмотров</span>}
              </div>
            </div>
            <div className="flex items-center gap-2 pr-5 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button variant="outline" size="sm">Редактировать</Button>
            </div>
          </div>
        ))}
      </div>

      <Drawer open={drawer} onClose={() => setDrawer(false)} title={selected ? 'Редактировать новость' : ''}>
        {selected && (
          <div className="space-y-4">
            <FormField label="Заголовок"><Input value={selected.title} /></FormField>
            <FormField label="Превью-текст"><TextArea rows={3} placeholder="Краткое описание для ленты..." /></FormField>
            <FormField label="Полный текст"><TextArea rows={8} /></FormField>
            <FormField label="Категория">
              <Select value={selected.category} onChange={() => {}} options={[
                { value: 'Продукт', label: 'Продукт' },
                { value: 'Компания', label: 'Компания' },
                { value: 'Мероприятия', label: 'Мероприятия' },
              ]} className="w-full" />
            </FormField>
            <FormField label="Дата публикации"><Input value={selected.date} /></FormField>
            <FormField label="Статус">
              <Select value={selected.status} onChange={() => {}} options={[{ value: 'published', label: 'Опубликована' }, { value: 'draft', label: 'Черновик' }]} className="w-full" />
            </FormField>
            <div className="flex items-center gap-3 py-3 border-t border-slate-100">
              <input type="checkbox" id="pinned" defaultChecked={selected.pinned} className="rounded cursor-pointer" />
              <label htmlFor="pinned" className="text-sm text-slate-700 cursor-pointer">Закрепить новость</label>
            </div>
            <div className="flex gap-3">
              <Button variant="primary" className="flex-1">Сохранить</Button>
              <Button variant="outline">Предпросмотр</Button>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  )
}
