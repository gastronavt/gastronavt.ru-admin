import { useState } from 'react'
import {
  Badge, Button, Card, Input, Select, PageHeader, TableWrapper, Th, Td, Tabs, Drawer, FormField, TextArea
} from '@/components/ui'

const articles = [
  { id: 1, title: 'Как Telegram-бот увеличил выручку ресторана на 40%', slug: 'telegram-bot-vyruchka-40', author: 'Екатерина Морозова', category: 'Telegram-боты', tags: ['бот', 'выручка', 'кейс'], status: 'published', date: '28 июл 2026', views: 4820, seo: 94 },
  { id: 2, title: 'CRM-интеграция для ресторанного бизнеса: полное руководство', slug: 'crm-integraciya-restoran', author: 'Иван Козлов', category: 'CRM', tags: ['crm', 'интеграция'], status: 'published', date: '25 июл 2026', views: 3610, seo: 88 },
  { id: 3, title: 'Мобильное приложение для доставки еды: зачем и как', slug: 'mobilnoe-prilozhenie-dostavka', author: 'Мария Сидорова', category: 'Мобильные приложения', tags: ['приложение', 'доставка'], status: 'published', date: '22 июл 2026', views: 2980, seo: 82 },
  { id: 4, title: '5 ошибок при запуске программы лояльности', slug: '5-oshibok-programma-loyalnosti', author: 'Алексей Данилов', category: 'Лояльность', tags: ['лояльность', 'ошибки'], status: 'draft', date: '—', views: 0, seo: 61 },
  { id: 5, title: 'MAX-бот для ресторана: возможности и настройка', slug: 'max-bot-restoran', author: 'Дмитрий Петров', category: 'MAX-боты', tags: ['max-бот'], status: 'review', date: '—', views: 0, seo: 75 },
  { id: 6, title: 'Сайт для кафе: что важно знать перед заказом', slug: 'sajt-dlya-kafe', author: 'Наталья Воробьёва', category: 'Сайты', tags: ['сайт', 'кафе'], status: 'scheduled', date: '5 авг 2026', views: 0, seo: 79 },
  { id: 7, title: 'Интеграция с Яндекс.Едой и Delivery Club', slug: 'integraciya-yandex-delivery', author: 'Екатерина Морозова', category: 'Интеграции', tags: ['яндекс', 'доставка'], status: 'published', date: '15 июл 2026', views: 1890, seo: 91 },
  { id: 8, title: 'Геймификация в ресторанном бизнесе', slug: 'gejmifikaciya-restoran', author: 'Иван Козлов', category: 'Лояльность', tags: ['геймификация'], status: 'draft', date: '—', views: 0, seo: 45 },
]

const statusMap: Record<string, { label: string; variant: 'green' | 'yellow' | 'blue' | 'cyan' | 'slate' }> = {
  published: { label: 'Опубликован', variant: 'green' },
  draft: { label: 'Черновик', variant: 'slate' },
  review: { label: 'На проверке', variant: 'yellow' },
  scheduled: { label: 'Запланирован', variant: 'cyan' },
}

const seoColor = (score: number) => score >= 85 ? 'text-emerald-600' : score >= 65 ? 'text-amber-600' : 'text-red-500'

type View = 'list' | 'editor'

export default function Blog() {
  const [view, setView] = useState<View>('list')
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selected, setSelected] = useState<number[]>([])
  const [editId, setEditId] = useState<number | null>(null)
  const [activeTab, setActiveTab] = useState('content')
  const [seoDrawer, setSeoDrawer] = useState(false)

  const filtered = articles.filter(a => {
    if (search && !a.title.toLowerCase().includes(search.toLowerCase())) return false
    if (statusFilter !== 'all' && a.status !== statusFilter) return false
    return true
  })

  const toggleSelect = (id: number) => {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }

  if (view === 'editor') {
    return <BlogEditor onBack={() => setView('list')} />
  }

  return (
    <div className="p-6">
      <PageHeader title="Блог" subtitle={`${articles.length} статей · ${articles.filter(a => a.status === 'published').length} опубликовано`}>
        <Button variant="outline">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
          Импорт
        </Button>
        <Button variant="primary" onClick={() => setView('editor')}>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Новая статья
        </Button>
      </PageHeader>

      <Tabs
        active={statusFilter === 'all' ? 'all' : statusFilter}
        onChange={(id) => setStatusFilter(id)}
        tabs={[
          { id: 'all', label: 'Все', count: articles.length },
          { id: 'published', label: 'Опубликованные', count: articles.filter(a => a.status === 'published').length },
          { id: 'draft', label: 'Черновики', count: articles.filter(a => a.status === 'draft').length },
          { id: 'review', label: 'На проверке', count: articles.filter(a => a.status === 'review').length },
          { id: 'scheduled', label: 'Запланированные', count: articles.filter(a => a.status === 'scheduled').length },
        ]}
      />

      <Card padding={false}>
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-100 flex items-center gap-3 flex-wrap">
          <Input
            value={search}
            onChange={setSearch}
            placeholder="Поиск по статьям..."
            className="w-64"
            icon={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>}
          />
          <Select value="all-cats" onChange={() => {}} options={[
            { value: 'all-cats', label: 'Все категории' },
            { value: 'bots', label: 'Telegram-боты' },
            { value: 'crm', label: 'CRM' },
            { value: 'apps', label: 'Мобильные приложения' },
            { value: 'loyalty', label: 'Лояльность' },
          ]} />
          <Select value="all-authors" onChange={() => {}} options={[
            { value: 'all-authors', label: 'Все авторы' },
            { value: 'morozova', label: 'Екатерина Морозова' },
            { value: 'kozlov', label: 'Иван Козлов' },
          ]} />

          {selected.length > 0 && (
            <div className="ml-auto flex items-center gap-2">
              <span className="text-sm text-slate-500">Выбрано: {selected.length}</span>
              <Button variant="outline" size="sm">Опубликовать</Button>
              <Button variant="danger" size="sm">Удалить</Button>
            </div>
          )}
        </div>

        <TableWrapper>
          <thead>
            <tr className="bg-slate-50">
              <Th className="w-10">
                <input type="checkbox" className="rounded border-slate-300 cursor-pointer" onChange={(e) => setSelected(e.target.checked ? articles.map(a => a.id) : [])} />
              </Th>
              <Th>Заголовок</Th>
              <Th>Автор</Th>
              <Th>Категория</Th>
              <Th>Статус</Th>
              <Th>Дата</Th>
              <Th className="text-right">Просмотры</Th>
              <Th className="text-right">SEO</Th>
              <Th className="w-10" />
            </tr>
          </thead>
          <tbody>
            {filtered.map((a) => (
              <tr key={a.id} className="hover:bg-slate-50 transition-colors group">
                <Td>
                  <input
                    type="checkbox"
                    checked={selected.includes(a.id)}
                    onChange={() => toggleSelect(a.id)}
                    className="rounded border-slate-300 cursor-pointer"
                  />
                </Td>
                <Td>
                  <div className="font-medium text-slate-900 hover:text-blue-600 cursor-pointer max-w-xs" onClick={() => setView('editor')}>
                    {a.title}
                  </div>
                  <div className="text-xs text-slate-400 font-mono mt-0.5">/{a.slug}</div>
                  <div className="flex gap-1 mt-1.5">
                    {a.tags.map(t => (
                      <span key={t} className="text-xs bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">{t}</span>
                    ))}
                  </div>
                </Td>
                <Td>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-violet-500 flex items-center justify-center text-white text-xs font-bold">
                      {a.author.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span className="text-sm">{a.author}</span>
                  </div>
                </Td>
                <Td><span className="text-slate-600">{a.category}</span></Td>
                <Td>
                  <Badge variant={statusMap[a.status].variant}>{statusMap[a.status].label}</Badge>
                </Td>
                <Td>{a.date}</Td>
                <Td className="text-right font-medium">{a.views > 0 ? a.views.toLocaleString('ru') : '—'}</Td>
                <Td className="text-right">
                  <span className={`text-sm font-semibold ${seoColor(a.seo)}`}>{a.seo}</span>
                </Td>
                <Td>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => setView('editor')} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded cursor-pointer">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                    </button>
                    <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded cursor-pointer">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </div>
                </Td>
              </tr>
            ))}
          </tbody>
        </TableWrapper>

        <div className="px-5 py-3.5 border-t border-slate-100 flex items-center justify-between text-sm text-slate-500">
          <span>Показано {filtered.length} из {articles.length}</span>
          <div className="flex items-center gap-1">
            {[1, 2, 3].map(p => (
              <button key={p} className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors cursor-pointer ${p === 1 ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'}`}>{p}</button>
            ))}
          </div>
        </div>
      </Card>
    </div>
  )
}

function BlogEditor({ onBack }: { onBack: () => void }) {
  const [tab, setTab] = useState('content')
  const [title, setTitle] = useState('Как Telegram-бот увеличил выручку ресторана на 40%')

  return (
    <div className="flex flex-col h-full">
      {/* Editor top bar */}
      <div className="flex items-center justify-between px-6 py-3 bg-white border-b border-slate-200 flex-shrink-0">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 cursor-pointer transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            Назад
          </button>
          <div className="w-px h-4 bg-slate-200" />
          <span className="text-sm font-medium text-slate-900 max-w-xs truncate">{title || 'Без названия'}</span>
          <Badge variant="yellow">Черновик</Badge>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">Сохранено только что</span>
          <Button variant="outline" size="sm">Предпросмотр</Button>
          <Button variant="primary" size="sm">Опубликовать</Button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Main editor */}
        <div className="flex-1 overflow-y-auto">
          {/* Tab nav */}
          <div className="border-b border-slate-200 bg-white px-6">
            <div className="flex gap-1">
              {[
                { id: 'content', label: 'Контент' },
                { id: 'seo', label: 'SEO' },
                { id: 'og', label: 'Open Graph' },
                { id: 'schema', label: 'Schema.org' },
              ].map(t => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors cursor-pointer ${tab === t.id ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="max-w-3xl mx-auto px-8 py-8">
            {tab === 'content' && (
              <div className="space-y-6">
                {/* Title */}
                <div>
                  <input
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="Заголовок статьи..."
                    className="w-full text-3xl font-bold text-slate-900 placeholder-slate-300 focus:outline-none border-0 bg-transparent"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField label="URL-адрес (slug)">
                    <Input value="telegram-bot-vyruchka-40" placeholder="/blog/" />
                  </FormField>
                  <FormField label="Категория">
                    <Select value="bots" onChange={() => {}} options={[
                      { value: 'bots', label: 'Telegram-боты' },
                      { value: 'crm', label: 'CRM' },
                      { value: 'apps', label: 'Мобильные приложения' },
                    ]} className="w-full" />
                  </FormField>
                </div>

                <FormField label="Краткое описание">
                  <TextArea placeholder="Краткое описание статьи для превью и RSS..." rows={3} />
                </FormField>

                {/* Cover image */}
                <FormField label="Обложка">
                  <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors cursor-pointer bg-slate-50">
                    <div className="w-12 h-12 bg-slate-200 rounded-xl mx-auto mb-3 flex items-center justify-center">
                      <svg className="w-6 h-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    </div>
                    <p className="text-sm text-slate-500">Перетащите изображение или <span className="text-blue-600">выберите файл</span></p>
                    <p className="text-xs text-slate-400 mt-1">PNG, JPG, WebP до 5 МБ · 1200×630px</p>
                  </div>
                </FormField>

                {/* Rich text editor mock */}
                <FormField label="Текст статьи">
                  <div className="border border-slate-300 rounded-xl overflow-hidden">
                    {/* Toolbar */}
                    <div className="flex items-center gap-1 px-3 py-2 border-b border-slate-200 bg-slate-50 flex-wrap">
                      {['B', 'I', 'U', '«»'].map(t => (
                        <button key={t} className="w-7 h-7 flex items-center justify-center text-xs font-bold text-slate-600 hover:bg-slate-200 rounded transition-colors cursor-pointer">{t}</button>
                      ))}
                      <div className="w-px h-5 bg-slate-300 mx-1" />
                      {['H1', 'H2', 'H3'].map(t => (
                        <button key={t} className="px-2 h-7 flex items-center text-xs font-bold text-slate-600 hover:bg-slate-200 rounded transition-colors cursor-pointer">{t}</button>
                      ))}
                      <div className="w-px h-5 bg-slate-300 mx-1" />
                      <button className="px-2 h-7 flex items-center text-xs text-slate-600 hover:bg-slate-200 rounded cursor-pointer">Ссылка</button>
                      <button className="px-2 h-7 flex items-center text-xs text-slate-600 hover:bg-slate-200 rounded cursor-pointer">Изображение</button>
                      <button className="px-2 h-7 flex items-center text-xs text-slate-600 hover:bg-slate-200 rounded cursor-pointer">Таблица</button>
                      <button className="px-2 h-7 flex items-center text-xs text-slate-600 hover:bg-slate-200 rounded cursor-pointer">Код</button>
                    </div>
                    <textarea
                      className="w-full px-5 py-4 text-slate-700 text-sm leading-relaxed focus:outline-none resize-none"
                      rows={18}
                      defaultValue="Telegram-боты стали мощным инструментом для ресторанного бизнеса. В этой статье мы разберём, как наши клиенты используют ботов для автоматизации заказов, программ лояльности и коммуникации с гостями.

## Почему рестораны выбирают Telegram

Аудитория Telegram в России превышает 80 миллионов активных пользователей. Большинство из них — платёжеспособная аудитория в возрасте 25–45 лет...

## Как работает бот

Наши боты интегрированы с системой заказов ресторана и позволяют..."
                    />
                  </div>
                </FormField>

                <div className="grid grid-cols-2 gap-4">
                  <FormField label="Теги">
                    <Input value="бот, выручка, кейс, telegram" placeholder="Введите теги..." />
                  </FormField>
                  <FormField label="Дата публикации">
                    <Input value="2026-07-28" />
                  </FormField>
                </div>

                <FormField label="Автор">
                  <Select value="morozova" onChange={() => {}} options={[
                    { value: 'morozova', label: 'Екатерина Морозова' },
                    { value: 'kozlov', label: 'Иван Козлов' },
                    { value: 'sidorova', label: 'Мария Сидорова' },
                  ]} className="w-full" />
                </FormField>
              </div>
            )}

            {tab === 'seo' && (
              <div className="space-y-5">
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800">
                  SEO-оценка статьи: <span className="font-bold text-blue-900">94 / 100</span> — отлично
                </div>
                <FormField label="Meta Title" hint="Рекомендуемая длина: 50–60 символов">
                  <Input value="Как Telegram-бот увеличил выручку ресторана на 40% | Gastronavt" />
                </FormField>
                <FormField label="Meta Description" hint="Рекомендуемая длина: 120–160 символов">
                  <TextArea rows={3} />
                </FormField>
                <FormField label="Canonical URL">
                  <Input value="https://gastronavt.ru/blog/telegram-bot-vyruchka-40" />
                </FormField>
                <FormField label="Robots">
                  <Select value="index" onChange={() => {}} options={[
                    { value: 'index', label: 'index, follow' },
                    { value: 'noindex', label: 'noindex, nofollow' },
                  ]} className="w-full" />
                </FormField>
              </div>
            )}

            {tab === 'og' && (
              <div className="space-y-5">
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <div className="bg-slate-100 h-32 flex items-center justify-center text-slate-400 text-sm">Open Graph Image Preview</div>
                  <div className="p-3 bg-white border-t border-slate-200">
                    <div className="text-xs text-slate-400 mb-1">gastronavt.ru</div>
                    <div className="text-sm font-semibold text-slate-900">Как Telegram-бот увеличил выручку ресторана на 40%</div>
                    <div className="text-xs text-slate-500 mt-0.5">Узнайте, как рестораны используют Telegram-ботов для роста продаж...</div>
                  </div>
                </div>
                <FormField label="OG Title"><Input value="Как Telegram-бот увеличил выручку ресторана на 40%" /></FormField>
                <FormField label="OG Description"><TextArea rows={2} /></FormField>
                <FormField label="OG Image"><Input value="https://gastronavt.ru/images/og/telegram-bot.jpg" /></FormField>
              </div>
            )}

            {tab === 'schema' && (
              <div className="space-y-4">
                <FormField label="Тип Schema">
                  <Select value="article" onChange={() => {}} options={[
                    { value: 'article', label: 'Article' },
                    { value: 'blogposting', label: 'BlogPosting' },
                    { value: 'faq', label: 'FAQPage' },
                  ]} className="w-full" />
                </FormField>
                <div className="bg-slate-900 rounded-xl p-4 text-xs font-mono text-emerald-400 overflow-x-auto">
                  <pre>{`{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Как Telegram-бот увеличил выручку...",
  "author": { "@type": "Person", "name": "Екатерина Морозова" },
  "datePublished": "2026-07-28",
  "publisher": { "@type": "Organization", "name": "Gastronavt" }
}`}</pre>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* SEO Score sidebar */}
        <div className="w-72 border-l border-slate-200 bg-white overflow-y-auto flex-shrink-0">
          <div className="p-5">
            <h3 className="text-sm font-semibold text-slate-900 mb-4">SEO-оценка</h3>
            <div className="flex items-center gap-3 mb-5">
              <div className="relative w-14 h-14">
                <svg viewBox="0 0 36 36" className="w-14 h-14 -rotate-90">
                  <circle cx="18" cy="18" r="15" fill="none" stroke="#f1f5f9" strokeWidth="3" />
                  <circle cx="18" cy="18" r="15" fill="none" stroke="#10b981" strokeWidth="3"
                    strokeDasharray={`${94 * 0.942} ${100 * 0.942}`} strokeLinecap="round" />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-slate-900">94</span>
              </div>
              <div>
                <div className="text-sm font-semibold text-emerald-600">Отлично</div>
                <div className="text-xs text-slate-400">из 100 баллов</div>
              </div>
            </div>

            <div className="space-y-2">
              {[
                { label: 'Ключевые слова в заголовке', ok: true },
                { label: 'Мета-описание заполнено', ok: true },
                { label: 'Длина статьи > 1000 слов', ok: true },
                { label: 'Изображения с alt-тегами', ok: true },
                { label: 'Внутренние ссылки', ok: true },
                { label: 'H1 присутствует', ok: true },
                { label: 'Canonical URL задан', ok: false },
                { label: 'FAQ-блок', ok: false },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2.5 text-sm">
                  <span className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${item.ok ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
                    {item.ok
                      ? <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                      : <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                    }
                  </span>
                  <span className={item.ok ? 'text-slate-600' : 'text-slate-400'}>{item.label}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-5 border-t border-slate-100 space-y-3">
              <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Публикация</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Видимость</span>
                  <span className="font-medium text-slate-900">Публичная</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Дата</span>
                  <span className="font-medium text-slate-900">28 июл 2026</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Статус</span>
                  <Badge variant="yellow">Черновик</Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
