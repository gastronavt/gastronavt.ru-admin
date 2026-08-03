import { useState } from 'react'
import { Card, PageHeader, Badge, Button, Drawer, FormField, Input, TextArea, Select } from '@/components/ui'

const cases = [
  { id: 1, company: 'Додо Пицца', city: 'Москва', industry: 'Пиццерия', products: ['Telegram-бот', 'CRM'], status: 'published', result: '+42% выручки', views: 3820, logo: '🍕' },
  { id: 2, company: 'Шоколадница', city: 'Санкт-Петербург', industry: 'Кофейня', products: ['Сайт', 'Программа лояльности'], status: 'published', result: '+18 тыс. участников лояльности', views: 2640, logo: '☕' },
  { id: 3, company: 'Бургер Кинг Россия', city: 'Москва', industry: 'Фастфуд', products: ['Мобильное приложение', 'Telegram-бот'], status: 'published', result: '60% заказов через цифровые каналы', views: 4110, logo: '🍔' },
  { id: 4, company: 'Якитория', city: 'Казань', industry: 'Суши', products: ['Сайт', 'CRM'], status: 'draft', result: 'В процессе оформления', views: 0, logo: '🍣' },
  { id: 5, company: 'Теремок', city: 'Екатеринбург', industry: 'Блины', products: ['MAX-бот', 'CRM'], status: 'published', result: '+28% среднего чека', views: 1890, logo: '🥞' },
  { id: 6, company: 'Кофе Хауз', city: 'Новосибирск', industry: 'Кофейня', products: ['Сайт', 'Telegram-бот'], status: 'published', result: '3x рост онлайн-заказов', views: 2100, logo: '☕' },
]

const industries = ['Все отрасли', 'Пиццерия', 'Кофейня', 'Фастфуд', 'Суши', 'Блины']
const cities = ['Все города', 'Москва', 'Санкт-Петербург', 'Казань', 'Екатеринбург', 'Новосибирск']

export default function CustomerCases() {
  const [industry, setIndustry] = useState('Все отрасли')
  const [city, setCity] = useState('Все города')
  const [drawer, setDrawer] = useState(false)
  const [selected, setSelected] = useState<typeof cases[0] | null>(null)

  const filtered = cases.filter(c => {
    if (industry !== 'Все отрасли' && c.industry !== industry) return false
    if (city !== 'Все города' && c.city !== city) return false
    return true
  })

  return (
    <div className="p-6">
      <PageHeader title="Кейсы клиентов" subtitle={`${cases.length} кейсов · ${cases.filter(c => c.status === 'published').length} опубликовано`}>
        <Button variant="primary">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Новый кейс
        </Button>
      </PageHeader>

      {/* Filters */}
      <div className="flex items-center gap-3 mb-6">
        <Select value={industry} onChange={setIndustry} options={industries.map(i => ({ value: i, label: i }))} />
        <Select value={city} onChange={setCity} options={cities.map(c => ({ value: c, label: c }))} />
        <Select value="all" onChange={() => {}} options={[
          { value: 'all', label: 'Все продукты' },
          { value: 'bot', label: 'Telegram-бот' },
          { value: 'site', label: 'Сайт' },
          { value: 'app', label: 'Мобильное приложение' },
          { value: 'crm', label: 'CRM' },
        ]} />
        <div className="ml-auto text-sm text-slate-500">{filtered.length} кейсов</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map((c) => (
          <div
            key={c.id}
            className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden group cursor-pointer"
            onClick={() => { setSelected(c); setDrawer(true) }}
          >
            {/* Cover */}
            <div className="h-28 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
              <span className="text-5xl">{c.logo}</span>
            </div>

            <div className="p-5">
              <div className="flex items-start justify-between gap-2 mb-3">
                <div>
                  <h3 className="font-semibold text-slate-900">{c.company}</h3>
                  <p className="text-sm text-slate-400">{c.city} · {c.industry}</p>
                </div>
                <Badge variant={c.status === 'published' ? 'green' : 'slate'}>
                  {c.status === 'published' ? 'Опубликован' : 'Черновик'}
                </Badge>
              </div>

              <div className="bg-emerald-50 border border-emerald-100 rounded-lg px-3 py-2 mb-3">
                <p className="text-sm font-medium text-emerald-800">{c.result}</p>
              </div>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {c.products.map((p) => (
                  <Badge key={p} variant="blue">{p}</Badge>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">{c.views > 0 ? `${c.views.toLocaleString('ru')} просмотров` : 'Не опубликован'}</span>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="outline" size="sm">Редактировать</Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Drawer open={drawer} onClose={() => setDrawer(false)} title={selected ? selected.company : ''}>
        {selected && (
          <div className="space-y-5">
            <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
              <div className="w-16 h-16 bg-slate-100 rounded-xl flex items-center justify-center text-4xl flex-shrink-0">
                {selected.logo}
              </div>
              <div>
                <h2 className="font-semibold text-slate-900">{selected.company}</h2>
                <p className="text-sm text-slate-500">{selected.city} · {selected.industry}</p>
                <div className="mt-1.5 flex flex-wrap gap-1">
                  {selected.products.map(p => <Badge key={p} variant="blue">{p}</Badge>)}
                </div>
              </div>
            </div>

            <FormField label="Название компании"><Input value={selected.company} /></FormField>
            <FormField label="Город"><Input value={selected.city} /></FormField>
            <FormField label="Отрасль"><Select value={selected.industry} onChange={() => {}} options={industries.slice(1).map(i => ({ value: i, label: i }))} className="w-full" /></FormField>
            <FormField label="Описание результата"><TextArea rows={3} /></FormField>
            <FormField label="Полное описание кейса"><TextArea rows={6} /></FormField>
            <FormField label="Статус">
              <Select value={selected.status} onChange={() => {}} options={[{ value: 'published', label: 'Опубликован' }, { value: 'draft', label: 'Черновик' }]} className="w-full" />
            </FormField>

            <div className="flex gap-3 pt-4 border-t border-slate-100">
              <Button variant="primary" className="flex-1">Сохранить</Button>
              <Button variant="danger">Удалить</Button>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  )
}
