import { useState } from 'react'
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts'
import { Card, PageHeader, StatCard, Tabs } from '@/components/ui'

const trafficData = [
  { date: '1 июл', sessions: 1240, users: 1010, pageviews: 3200 },
  { date: '5 июл', sessions: 1560, users: 1280, pageviews: 4100 },
  { date: '10 июл', sessions: 1890, users: 1540, pageviews: 4980 },
  { date: '15 июл', sessions: 2100, users: 1720, pageviews: 5560 },
  { date: '20 июл', sessions: 2380, users: 1950, pageviews: 6200 },
  { date: '25 июл', sessions: 2890, users: 2380, pageviews: 7400 },
  { date: '31 июл', sessions: 3100, users: 2560, pageviews: 8200 },
]

const blogData = [
  { title: 'Telegram-бот', views: 4820, leads: 16 },
  { title: 'CRM-интеграция', views: 3610, leads: 11 },
  { title: 'Мобильное прил.', views: 2980, leads: 8 },
  { title: 'Доставка Яндекс', views: 1890, leads: 5 },
  { title: 'Программа лоял.', views: 1640, leads: 4 },
  { title: 'MAX-бот', views: 1120, leads: 3 },
]

const conversionData = [
  { date: '1 июл', cr: 0.32 }, { date: '5 июл', cr: 0.38 }, { date: '10 июл', cr: 0.41 },
  { date: '15 июл', cr: 0.45 }, { date: '20 июл', cr: 0.43 }, { date: '25 июл', cr: 0.48 },
  { date: '31 июл', cr: 0.51 },
]

const searchQueries = [
  { query: 'telegram бот для ресторана', clicks: 1840, impressions: 24200, ctr: '7.6%', position: '3.2' },
  { query: 'crm для кафе', clicks: 1240, impressions: 18400, ctr: '6.7%', position: '4.1' },
  { query: 'мобильное приложение ресторан', clicks: 980, impressions: 15600, ctr: '6.3%', position: '5.8' },
  { query: 'сайт для ресторана заказать', clicks: 820, impressions: 12000, ctr: '6.8%', position: '4.7' },
  { query: 'лояльность для кафе программа', clicks: 640, impressions: 9800, ctr: '6.5%', position: '6.2' },
  { query: 'gastronavt отзывы', clicks: 510, impressions: 6200, ctr: '8.2%', position: '2.1' },
]

const topLandingPages = [
  { path: '/blog/telegram-bot-restoran', sessions: 2840, bounce: '38%', duration: '4:22', cr: '3.2%' },
  { path: '/', sessions: 2100, bounce: '52%', duration: '2:15', cr: '1.9%' },
  { path: '/products/mobilnoe-prilozhenie', sessions: 1890, bounce: '41%', duration: '3:48', cr: '2.8%' },
  { path: '/blog/crm-dlya-cafe', sessions: 1640, bounce: '35%', duration: '5:10', cr: '4.1%' },
  { path: '/prices', sessions: 1420, bounce: '28%', duration: '3:02', cr: '3.8%' },
]

export default function Analytics() {
  const [period, setPeriod] = useState('30d')
  const [tab, setTab] = useState('traffic')

  return (
    <div className="p-6 space-y-6">
      <PageHeader title="Аналитика" subtitle="Данные за последние 30 дней">
        <select
          value={period}
          onChange={e => setPeriod(e.target.value)}
          className="text-sm border border-slate-300 rounded-lg px-3 py-2 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
        >
          <option value="7d">7 дней</option>
          <option value="30d">30 дней</option>
          <option value="90d">Квартал</option>
        </select>
      </PageHeader>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Сессий" value="68 420" change={{ value: '12%', positive: true }} color="blue"
          icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>} />
        <StatCard label="Отказы" value="41.3%" change={{ value: '2.1%', positive: false }} color="amber"
          icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" /></svg>} />
        <StatCard label="Время на сайте" value="3:24" change={{ value: '0:18', positive: true }} color="green"
          icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} />
        <StatCard label="Конверсия" value="0.45%" change={{ value: '0.08%', positive: true }} color="purple"
          icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>} />
      </div>

      <Tabs
        active={tab}
        onChange={setTab}
        tabs={[
          { id: 'traffic', label: 'Трафик' },
          { id: 'blog', label: 'Блог' },
          { id: 'search', label: 'Поиск' },
          { id: 'leads', label: 'Лиды' },
        ]}
      />

      {tab === 'traffic' && (
        <div className="space-y-5">
          <Card padding={false}>
            <div className="p-5 border-b border-slate-100">
              <h2 className="text-sm font-semibold text-slate-900">Трафик сайта</h2>
              <p className="text-xs text-slate-400 mt-0.5">Сессии, пользователи и просмотры страниц</p>
            </div>
            <div className="p-5">
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={trafficData}>
                  <defs>
                    <linearGradient id="gSessions" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gUsers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.12} />
                      <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: 12 }} />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Area type="monotone" dataKey="sessions" stroke="#3b82f6" strokeWidth={2} fill="url(#gSessions)" name="Сессии" />
                  <Area type="monotone" dataKey="users" stroke="#7c3aed" strokeWidth={2} fill="url(#gUsers)" name="Пользователи" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <div className="grid grid-cols-2 gap-5">
            <Card padding={false}>
              <div className="p-5 border-b border-slate-100">
                <h2 className="text-sm font-semibold text-slate-900">Топ посадочных страниц</h2>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase">URL</th>
                    <th className="px-5 py-3 text-right text-xs font-semibold text-slate-500 uppercase">Сессии</th>
                    <th className="px-5 py-3 text-right text-xs font-semibold text-slate-500 uppercase">Отказы</th>
                    <th className="px-5 py-3 text-right text-xs font-semibold text-slate-500 uppercase">CR</th>
                  </tr>
                </thead>
                <tbody>
                  {topLandingPages.map((p, i) => (
                    <tr key={i} className="hover:bg-slate-50 border-t border-slate-100">
                      <td className="px-5 py-3">
                        <div className="text-xs font-mono text-slate-700 max-w-[200px] truncate">{p.path}</div>
                      </td>
                      <td className="px-5 py-3 text-right text-sm font-medium">{p.sessions.toLocaleString('ru')}</td>
                      <td className="px-5 py-3 text-right text-sm text-amber-600">{p.bounce}</td>
                      <td className="px-5 py-3 text-right text-sm font-medium text-emerald-600">{p.cr}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>

            <Card padding={false}>
              <div className="p-5 border-b border-slate-100">
                <h2 className="text-sm font-semibold text-slate-900">Динамика конверсии</h2>
              </div>
              <div className="p-5">
                <ResponsiveContainer width="100%" height={230}>
                  <LineChart data={conversionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} />
                    <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: 12 }} formatter={v => [`${v}%`, 'CR']} />
                    <Line type="monotone" dataKey="cr" stroke="#06b6d4" strokeWidth={2.5} dot={{ r: 4, fill: '#06b6d4' }} name="Конверсия" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
        </div>
      )}

      {tab === 'blog' && (
        <Card padding={false}>
          <div className="p-5 border-b border-slate-100">
            <h2 className="text-sm font-semibold text-slate-900">Эффективность блога</h2>
            <p className="text-xs text-slate-400 mt-0.5">Просмотры и лиды по статьям</p>
          </div>
          <div className="p-5">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={blogData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="title" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} width={120} />
                <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="views" fill="#3b82f6" radius={[0, 4, 4, 0]} name="Просмотры" />
                <Bar dataKey="leads" fill="#7c3aed" radius={[0, 4, 4, 0]} name="Лиды" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      )}

      {tab === 'search' && (
        <Card padding={false}>
          <div className="p-5 border-b border-slate-100">
            <h2 className="text-sm font-semibold text-slate-900">Поисковые запросы</h2>
            <p className="text-xs text-slate-400 mt-0.5">Данные Google Search Console</p>
          </div>
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50">
                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Запрос</th>
                <th className="px-5 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Клики</th>
                <th className="px-5 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Показы</th>
                <th className="px-5 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">CTR</th>
                <th className="px-5 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Позиция</th>
              </tr>
            </thead>
            <tbody>
              {searchQueries.map((q, i) => (
                <tr key={i} className="hover:bg-slate-50 border-t border-slate-100">
                  <td className="px-5 py-3.5 text-sm font-medium text-slate-800">{q.query}</td>
                  <td className="px-5 py-3.5 text-right text-sm font-medium text-slate-900">{q.clicks.toLocaleString('ru')}</td>
                  <td className="px-5 py-3.5 text-right text-sm text-slate-600">{q.impressions.toLocaleString('ru')}</td>
                  <td className="px-5 py-3.5 text-right text-sm font-medium text-blue-600">{q.ctr}</td>
                  <td className="px-5 py-3.5 text-right">
                    <span className={`text-sm font-bold ${parseFloat(q.position) <= 3 ? 'text-emerald-600' : parseFloat(q.position) <= 10 ? 'text-amber-600' : 'text-slate-500'}`}>
                      {q.position}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}

      {tab === 'leads' && (
        <div className="grid grid-cols-2 gap-5">
          <Card>
            <h2 className="text-sm font-semibold text-slate-900 mb-4">Лиды по источникам</h2>
            <div className="space-y-3">
              {[
                { label: 'Органика', value: 62, count: 87 },
                { label: 'Яндекс.Директ', value: 18, count: 25 },
                { label: 'Реферал', value: 12, count: 17 },
                { label: 'ВКонтакте', value: 5, count: 7 },
                { label: 'Telegram', value: 3, count: 4 },
              ].map((s, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-slate-600">{s.label}</span>
                    <span className="font-medium text-slate-900">{s.count} лидов</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: `${s.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>
          <Card>
            <h2 className="text-sm font-semibold text-slate-900 mb-4">Лиды по продуктам</h2>
            <div className="space-y-3">
              {[
                { label: 'Telegram-бот', value: 34, count: 48 },
                { label: 'Сайт', value: 22, count: 31 },
                { label: 'Мобильное приложение', value: 20, count: 28 },
                { label: 'CRM', value: 14, count: 20 },
                { label: 'Программа лояльности', value: 10, count: 13 },
              ].map((s, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-slate-600">{s.label}</span>
                    <span className="font-medium text-slate-900">{s.count} лидов</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-violet-500 rounded-full" style={{ width: `${s.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
