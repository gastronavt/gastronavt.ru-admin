import { useState } from 'react'
import { Badge, Button, PageHeader, Drawer, FormField, Input, TextArea, Select } from '@/components/ui'

const products = [
  {
    id: 1, name: 'Сайт', icon: '🌐', color: 'from-blue-500 to-cyan-500',
    description: 'Профессиональный сайт для ресторана с онлайн-меню, системой бронирования и SEO-оптимизацией.',
    features: ['Адаптивный дизайн', 'Онлайн-меню', 'Система бронирования', 'SEO-оптимизация', 'Интеграция с картами'],
    price: 'от 49 000 ₽', status: 'active', clients: 142,
  },
  {
    id: 2, name: 'Мобильное приложение', icon: '📱', color: 'from-violet-500 to-purple-600',
    description: 'Нативное приложение для iOS и Android с программой лояльности и push-уведомлениями.',
    features: ['iOS и Android', 'Программа лояльности', 'Push-уведомления', 'Онлайн-заказы', 'Аналитика'],
    price: 'от 120 000 ₽', status: 'active', clients: 58,
  },
  {
    id: 3, name: 'Telegram-бот', icon: '🤖', color: 'from-cyan-500 to-teal-500',
    description: 'Умный бот в Telegram для автоматизации заказов, доставки и общения с гостями.',
    features: ['Приём заказов', 'Меню с фото', 'Оплата картой', 'Программа лояльности', 'Статистика'],
    price: 'от 35 000 ₽', status: 'active', clients: 234,
  },
  {
    id: 4, name: 'MAX-бот', icon: '⚡', color: 'from-amber-500 to-orange-500',
    description: 'Бот для платформы MAX с расширенными возможностями автоматизации.',
    features: ['Интеграция с MAX', 'Автоматические ответы', 'Воронки продаж', 'CRM-синхронизация'],
    price: 'от 45 000 ₽', status: 'active', clients: 31,
  },
  {
    id: 5, name: 'CRM', icon: '💼', color: 'from-emerald-500 to-green-600',
    description: 'CRM-система для управления гостями, бронированиями и персоналом ресторана.',
    features: ['База гостей', 'История заказов', 'Управление столами', 'KPI сотрудников', 'Отчёты'],
    price: 'от 29 000 ₽/мес', status: 'active', clients: 89,
  },
  {
    id: 6, name: 'Программа лояльности', icon: '⭐', color: 'from-rose-500 to-pink-500',
    description: 'Система накопления баллов и вознаграждений для удержания постоянных гостей.',
    features: ['Баллы и скидки', 'Уровни участников', 'Реферальная система', 'Персонализация', 'Аналитика'],
    price: 'от 19 000 ₽/мес', status: 'active', clients: 175,
  },
]

export default function Products() {
  const [drawer, setDrawer] = useState(false)
  const [selected, setSelected] = useState<typeof products[0] | null>(null)

  return (
    <div className="p-6">
      <PageHeader title="Продукты" subtitle="Управление продуктами Gastronavt">
        <Button variant="primary">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Новый продукт
        </Button>
      </PageHeader>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {products.map((p) => (
          <div key={p.id} className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden group">
            {/* Header */}
            <div className={`h-3 bg-gradient-to-r ${p.color}`} />
            <div className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${p.color} flex items-center justify-center text-xl`}>
                    {p.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">{p.name}</h3>
                    <p className="text-xs text-slate-400">{p.clients} клиентов</p>
                  </div>
                </div>
                <Badge variant="green">Активен</Badge>
              </div>

              <p className="text-sm text-slate-600 mb-4 leading-relaxed">{p.description}</p>

              <div className="space-y-1.5 mb-4">
                {p.features.map((f) => (
                  <div key={f} className="flex items-center gap-2 text-sm text-slate-600">
                    <svg className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {f}
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <span className="text-sm font-semibold text-slate-900">{p.price}</span>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={() => { setSelected(p); setDrawer(true) }}>
                    Редактировать
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Drawer open={drawer} onClose={() => setDrawer(false)} title={selected ? `Редактировать: ${selected?.name}` : ''}>
        {selected && (
          <div className="space-y-4">
            <FormField label="Название продукта"><Input value={selected.name} /></FormField>
            <FormField label="Описание"><TextArea rows={4} /></FormField>
            <FormField label="Цена"><Input value={selected.price} /></FormField>
            <FormField label="Статус">
              <Select value="active" onChange={() => {}} options={[{ value: 'active', label: 'Активен' }, { value: 'draft', label: 'Черновик' }]} className="w-full" />
            </FormField>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Возможности</label>
              <div className="space-y-2">
                {selected.features.map((f, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <input className="flex-1 text-sm border border-slate-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500" defaultValue={f} />
                    <button className="p-1.5 text-slate-400 hover:text-red-500 cursor-pointer">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </div>
                ))}
                <button className="text-sm text-blue-600 hover:text-blue-700 cursor-pointer">+ Добавить возможность</button>
              </div>
            </div>
            <div className="flex gap-3 pt-4 border-t border-slate-100">
              <Button variant="primary" className="flex-1">Сохранить</Button>
              <Button variant="outline">Предпросмотр</Button>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  )
}
