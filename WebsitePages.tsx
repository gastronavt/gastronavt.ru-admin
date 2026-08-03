import { useState } from 'react'
import { Badge, Button, Card, Input, Select, PageHeader, TableWrapper, Th, Td, Drawer, FormField, TextArea } from '@/components/ui'

const leads = [
  { id: 1, name: 'Марина Васильева', company: 'Кафе «Уют»', phone: '+7 (912) 345-67-89', email: 'vasilieva@uyt-cafe.ru', source: 'Органика', utm: 'telegram-bot-blog', product: 'Сайт', date: '1 авг 2026, 14:22', status: 'new', comment: '' },
  { id: 2, name: 'Дмитрий Захаров', company: 'ООО «Вкусно и точка»', phone: '+7 (985) 456-78-90', email: 'zakharov@vkusno.com', source: 'Яндекс.Директ', utm: 'crm-search', product: 'Telegram-бот', date: '1 авг 2026, 11:05', status: 'working', comment: 'Созвонились, нужно КП' },
  { id: 3, name: 'Наталья Орлова', company: 'Ресторан «Берёзка»', phone: '+7 (903) 567-89-01', email: 'orlova@beryozka.ru', source: 'Органика', utm: '', product: 'CRM', date: '31 июл 2026, 18:47', status: 'new', comment: '' },
  { id: 4, name: 'Алексей Смирнов', company: 'Сеть «Пиццерия №1»', phone: '+7 (926) 678-90-12', email: 'smirnov@pizza1.ru', source: 'Реферал', utm: 'partner-pizza', product: 'Мобильное приложение', date: '31 июл 2026, 10:30', status: 'working', comment: 'Ждут демо 3 авг' },
  { id: 5, name: 'Светлана Кузнецова', company: 'Кофейня «Зёрна»', phone: '+7 (915) 789-01-23', email: 'kuznetsova@zerna.ru', source: 'ВКонтакте', utm: 'vk-loyalty', product: 'Программа лояльности', date: '30 июл 2026, 15:15', status: 'closed', comment: 'Подписали договор' },
  { id: 6, name: 'Игорь Петренко', company: 'Ресторан «Кавказ»', phone: '+7 (999) 890-12-34', email: 'petrenko@kavkaz.ru', source: 'Органика', utm: 'max-bot-article', product: 'MAX-бот', date: '29 июл 2026, 09:00', status: 'refused', comment: 'Выбрали другого подрядчика' },
  { id: 7, name: 'Анна Соколова', company: 'Суши-бар «Токио»', phone: '+7 (916) 901-23-45', email: 'sokolova@tokyo-bar.ru', source: 'Telegram', utm: 'tg-sushi', product: 'Сайт', date: '28 июл 2026, 20:11', status: 'new', comment: '' },
  { id: 8, name: 'Роман Новиков', company: 'Доставка «Вкусняшки»', phone: '+7 (977) 012-34-56', email: 'novikov@vkusniashki.ru', source: 'Яндекс.Директ', utm: 'delivery-app', product: 'Мобильное приложение', date: '28 июл 2026, 13:44', status: 'working', comment: 'На согласовании бюджета' },
]

const statusMap: Record<string, { label: string; variant: 'blue' | 'yellow' | 'green' | 'red' | 'slate' }> = {
  new: { label: 'Новый', variant: 'blue' },
  working: { label: 'В работе', variant: 'yellow' },
  closed: { label: 'Закрыт', variant: 'green' },
  refused: { label: 'Отказ', variant: 'red' },
}

export default function Leads() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [selectedLead, setSelectedLead] = useState<typeof leads[0] | null>(null)
  const [statuses, setStatuses] = useState<Record<number, string>>(Object.fromEntries(leads.map(l => [l.id, l.status])))

  const filtered = leads.filter(l => {
    if (search && !l.name.toLowerCase().includes(search.toLowerCase()) && !l.company.toLowerCase().includes(search.toLowerCase())) return false
    if (statusFilter !== 'all' && statuses[l.id] !== statusFilter) return false
    return true
  })

  const counts = {
    all: leads.length,
    new: leads.filter(l => statuses[l.id] === 'new').length,
    working: leads.filter(l => statuses[l.id] === 'working').length,
    closed: leads.filter(l => statuses[l.id] === 'closed').length,
    refused: leads.filter(l => statuses[l.id] === 'refused').length,
  }

  return (
    <div className="p-6">
      <PageHeader title="Лиды" subtitle={`${leads.length} заявок · ${counts.new} новых`}>
        <Button variant="outline">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Экспорт в CSV
        </Button>
        <Button variant="primary">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Добавить лид
        </Button>
      </PageHeader>

      {/* Summary cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Всего', value: counts.all, color: 'text-slate-900', bg: 'bg-slate-50 border-slate-200' },
          { label: 'Новых', value: counts.new, color: 'text-blue-700', bg: 'bg-blue-50 border-blue-200' },
          { label: 'В работе', value: counts.working, color: 'text-amber-700', bg: 'bg-amber-50 border-amber-200' },
          { label: 'Закрыто', value: counts.closed, color: 'text-emerald-700', bg: 'bg-emerald-50 border-emerald-200' },
        ].map((c, i) => (
          <div key={i} className={`rounded-xl border p-4 ${c.bg}`}>
            <div className={`text-2xl font-bold ${c.color}`}>{c.value}</div>
            <div className="text-sm text-slate-500 mt-0.5">{c.label}</div>
          </div>
        ))}
      </div>

      <Card padding={false}>
        <div className="p-4 border-b border-slate-100 flex items-center gap-3 flex-wrap">
          <Input
            value={search}
            onChange={setSearch}
            placeholder="Поиск по имени или компании..."
            className="w-72"
            icon={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>}
          />
          <Select value={statusFilter} onChange={setStatusFilter} options={[
            { value: 'all', label: 'Все статусы' },
            { value: 'new', label: 'Новые' },
            { value: 'working', label: 'В работе' },
            { value: 'closed', label: 'Закрытые' },
            { value: 'refused', label: 'Отказы' },
          ]} />
          <Select value="all-products" onChange={() => {}} options={[
            { value: 'all-products', label: 'Все продукты' },
            { value: 'site', label: 'Сайт' },
            { value: 'bot', label: 'Telegram-бот' },
            { value: 'app', label: 'Мобильное приложение' },
            { value: 'crm', label: 'CRM' },
          ]} />
          <Select value="all-sources" onChange={() => {}} options={[
            { value: 'all-sources', label: 'Все источники' },
            { value: 'organic', label: 'Органика' },
            { value: 'direct', label: 'Директ' },
            { value: 'referral', label: 'Реферал' },
          ]} />
        </div>

        <TableWrapper>
          <thead>
            <tr className="bg-slate-50">
              <Th>Имя / Компания</Th>
              <Th>Контакт</Th>
              <Th>Источник</Th>
              <Th>Продукт</Th>
              <Th>Дата</Th>
              <Th>Статус</Th>
              <Th>Комментарий</Th>
              <Th className="w-10" />
            </tr>
          </thead>
          <tbody>
            {filtered.map((l) => (
              <tr key={l.id} className="hover:bg-slate-50 transition-colors group">
                <Td>
                  <div className="font-medium text-slate-900">{l.name}</div>
                  <div className="text-xs text-slate-400">{l.company}</div>
                </Td>
                <Td>
                  <div className="text-sm text-slate-700">{l.phone}</div>
                  <div className="text-xs text-slate-400">{l.email}</div>
                </Td>
                <Td>
                  <div className="text-sm text-slate-700">{l.source}</div>
                  {l.utm && <div className="text-xs text-slate-400 font-mono">{l.utm}</div>}
                </Td>
                <Td>
                  <Badge variant="purple">{l.product}</Badge>
                </Td>
                <Td>
                  <div className="text-sm text-slate-700 whitespace-nowrap">{l.date}</div>
                </Td>
                <Td>
                  <select
                    value={statuses[l.id]}
                    onChange={e => setStatuses(prev => ({ ...prev, [l.id]: e.target.value }))}
                    className={`text-xs font-medium border rounded-md px-2 py-1 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      statuses[l.id] === 'new' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                      statuses[l.id] === 'working' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                      statuses[l.id] === 'closed' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                      'bg-red-50 text-red-700 border-red-200'
                    }`}
                  >
                    <option value="new">Новый</option>
                    <option value="working">В работе</option>
                    <option value="closed">Закрыт</option>
                    <option value="refused">Отказ</option>
                  </select>
                </Td>
                <Td>
                  <div className="text-sm text-slate-500 max-w-[180px] truncate">{l.comment || '—'}</div>
                </Td>
                <Td>
                  <button
                    onClick={() => { setSelectedLead(l); setDrawerOpen(true) }}
                    className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded cursor-pointer opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                  </button>
                </Td>
              </tr>
            ))}
          </tbody>
        </TableWrapper>

        <div className="px-5 py-3.5 border-t border-slate-100 flex items-center justify-between text-sm text-slate-500">
          <span>Показано {filtered.length} из {leads.length}</span>
          <div className="flex items-center gap-1">
            {[1, 2].map(p => (
              <button key={p} className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors cursor-pointer ${p === 1 ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'}`}>{p}</button>
            ))}
          </div>
        </div>
      </Card>

      {/* Lead detail drawer */}
      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title="Карточка лида">
        {selectedLead && (
          <div className="space-y-5">
            <div className="flex items-center gap-3 pb-5 border-b border-slate-100">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white font-bold">
                {selectedLead.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <div className="font-semibold text-slate-900">{selectedLead.name}</div>
                <div className="text-sm text-slate-500">{selectedLead.company}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><div className="text-slate-400 mb-1">Телефон</div><div className="font-medium">{selectedLead.phone}</div></div>
              <div><div className="text-slate-400 mb-1">Email</div><div className="font-medium truncate">{selectedLead.email}</div></div>
              <div><div className="text-slate-400 mb-1">Источник</div><div className="font-medium">{selectedLead.source}</div></div>
              <div><div className="text-slate-400 mb-1">UTM</div><div className="font-medium font-mono text-xs">{selectedLead.utm || '—'}</div></div>
              <div><div className="text-slate-400 mb-1">Продукт</div><Badge variant="purple">{selectedLead.product}</Badge></div>
              <div><div className="text-slate-400 mb-1">Дата</div><div className="font-medium">{selectedLead.date}</div></div>
            </div>

            <FormField label="Статус">
              <Select value={statuses[selectedLead.id]} onChange={v => setStatuses(prev => ({ ...prev, [selectedLead.id]: v }))} options={[
                { value: 'new', label: 'Новый' },
                { value: 'working', label: 'В работе' },
                { value: 'closed', label: 'Закрыт' },
                { value: 'refused', label: 'Отказ' },
              ]} className="w-full" />
            </FormField>

            <FormField label="Комментарий">
              <TextArea placeholder="Добавьте комментарий..." rows={4} />
            </FormField>

            <div className="pt-4 flex gap-3">
              <Button variant="primary" className="flex-1">Сохранить</Button>
              <Button variant="outline">Позвонить</Button>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  )
}
