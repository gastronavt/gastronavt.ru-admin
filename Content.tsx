import { useState } from 'react'

type IssuePriority = 'critical' | 'warning' | 'info'
type IssueStatus = 'open' | 'fixed' | 'ignored'

interface Issue {
  id: number
  priority: IssuePriority
  page: string
  problem: string
  recommendation: string
  status: IssueStatus
}

const issues: Issue[] = [
  { id: 1, priority: 'critical', page: '/o-kompanii', problem: 'Нет мета-описания', recommendation: 'Добавить описание 120–160 символов', status: 'open' },
  { id: 2, priority: 'critical', page: '/partnery', problem: 'Нет тега H1', recommendation: 'Добавить основной заголовок страницы', status: 'open' },
  { id: 3, priority: 'critical', page: '/blog/crm-cafe', problem: '8 изображений без alt-текста', recommendation: 'Добавить описательный alt к каждому изображению', status: 'open' },
  { id: 4, priority: 'critical', page: '/old-blog-post', problem: 'Ссылка возвращает 404', recommendation: 'Настроить редирект 301 или удалить ссылку', status: 'open' },
  { id: 5, priority: 'warning', page: '/integracii', problem: 'Заголовок Title слишком длинный (74 символа)', recommendation: 'Сократить до 50–60 символов', status: 'open' },
  { id: 6, priority: 'warning', page: '/career', problem: 'Низкий SEO-рейтинг страницы (62/100)', recommendation: 'Добавить ключевые слова и расширить контент', status: 'open' },
  { id: 7, priority: 'warning', page: '/privacy', problem: 'Страница не включена в sitemap.xml', recommendation: 'Добавить URL в sitemap и переиндексировать', status: 'fixed' },
  { id: 8, priority: 'info', page: '/prices', problem: 'Нет Open Graph изображения', recommendation: 'Добавить og:image для красивого превью в соцсетях', status: 'open' },
  { id: 9, priority: 'info', page: '/contacts', problem: 'Нет Schema.org разметки', recommendation: 'Добавить LocalBusiness микроразметку', status: 'ignored' },
]

const priorityCfg: Record<IssuePriority, { label: string; dot: string; row: string; badge: string }> = {
  critical: { label: 'Критично', dot: 'bg-red-500', row: '', badge: 'bg-red-50 text-red-700' },
  warning: { label: 'Предупреждение', dot: 'bg-amber-400', row: '', badge: 'bg-amber-50 text-amber-700' },
  info: { label: 'Рекомендация', dot: 'bg-blue-400', row: '', badge: 'bg-blue-50 text-blue-700' },
}

const statusCfg: Record<IssueStatus, { label: string; cls: string }> = {
  open: { label: 'Открыта', cls: 'bg-slate-100 text-slate-600' },
  fixed: { label: 'Исправлена', cls: 'bg-emerald-50 text-emerald-700' },
  ignored: { label: 'Игнорируется', cls: 'bg-slate-50 text-slate-400' },
}

const healthMetrics = [
  { label: 'Всего страниц', value: '162', sub: 'на сайте', color: 'text-slate-900' },
  { label: 'Проиндексировано', value: '148', sub: '91% от общего числа', color: 'text-emerald-700' },
  { label: 'Без мета-описания', value: '12', sub: 'требуют внимания', color: 'text-red-600' },
  { label: 'Без alt-текста', value: '34', sub: 'изображения', color: 'text-amber-600' },
  { label: 'Битых ссылок', value: '8', sub: '404 ошибки', color: 'text-red-600' },
]

const systemStatus = [
  { label: 'Robots.txt', ok: true, detail: 'Настроен корректно' },
  { label: 'Sitemap.xml', ok: true, detail: 'Обновлён 1 авг 2026' },
  { label: 'SSL-сертификат', ok: true, detail: 'Действителен до дек 2026' },
  { label: 'Search Console', ok: true, detail: 'Подключён · 412 000 показов/мес' },
]

export default function SEO() {
  const [statuses, setStatuses] = useState<Record<number, IssueStatus>>(
    Object.fromEntries(issues.map(i => [i.id, i.status]))
  )
  const [priorityFilter, setPriorityFilter] = useState<'all' | IssuePriority>('all')

  const visible = issues.filter(i => priorityFilter === 'all' || i.priority === priorityFilter)
  const openCount = Object.values(statuses).filter(s => s === 'open').length
  const criticalCount = issues.filter(i => i.priority === 'critical' && statuses[i.id] === 'open').length

  return (
    <div className="p-7 max-w-5xl mx-auto space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">SEO</h1>
          <p className="text-sm text-slate-400 mt-1">Здоровье сайта · {criticalCount} критичных проблем</p>
        </div>
        <button className="flex items-center gap-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 text-sm font-medium px-4 py-2 rounded-lg cursor-pointer transition-colors">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Обновить данные
        </button>
      </div>

      {/* Health bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-slate-900">Состояние сайта</h2>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-slate-900">76</span>
            <span className="text-sm text-slate-400">/ 100</span>
            <span className="text-xs text-amber-600 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md font-medium">Требует улучшений</span>
          </div>
        </div>
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden mb-5">
          <div className="h-full rounded-full" style={{ width: '76%', background: 'linear-gradient(90deg, #f59e0b, #3b82f6)' }} />
        </div>
        <div className="grid grid-cols-5 gap-4">
          {healthMetrics.map((m, i) => (
            <div key={i} className="text-center">
              <div className={`text-xl font-bold ${m.color}`}>{m.value}</div>
              <div className="text-xs font-medium text-slate-600 mt-0.5">{m.label}</div>
              <div className="text-xs text-slate-400">{m.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* System status */}
      <div className="grid grid-cols-4 gap-4">
        {systemStatus.map((s, i) => (
          <div key={i} className="bg-white rounded-xl border border-slate-200 px-5 py-4">
            <div className="flex items-center gap-2 mb-1">
              <span className={`w-2 h-2 rounded-full ${s.ok ? 'bg-emerald-500' : 'bg-red-500'}`} />
              <span className="text-sm font-semibold text-slate-800">{s.label}</span>
            </div>
            <div className="text-xs text-slate-400 leading-snug">{s.detail}</div>
          </div>
        ))}
      </div>

      {/* Issues table */}
      <div className="bg-white rounded-xl border border-slate-200">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <h2 className="text-sm font-semibold text-slate-900">
            Проблемы
            {openCount > 0 && <span className="ml-2 text-xs text-slate-400">({openCount} открытых)</span>}
          </h2>
          <div className="flex items-center gap-2">
            <select
              value={priorityFilter}
              onChange={e => setPriorityFilter(e.target.value as typeof priorityFilter)}
              className="text-xs border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-600 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              <option value="all">Все приоритеты</option>
              <option value="critical">Критичные</option>
              <option value="warning">Предупреждения</option>
              <option value="info">Рекомендации</option>
            </select>
          </div>
        </div>

        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider w-32">Приоритет</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider w-44">Страница</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Проблема</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Рекомендация</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider w-36">Статус</th>
            </tr>
          </thead>
          <tbody>
            {visible.map(issue => {
              const p = priorityCfg[issue.priority]
              const s = statusCfg[statuses[issue.id]]
              return (
                <tr key={issue.id} className="border-t border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-3.5">
                    <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2 py-0.5 rounded-md ${p.badge}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${p.dot}`} />
                      {p.label}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 font-mono text-xs text-slate-600">{issue.page}</td>
                  <td className="px-5 py-3.5 text-slate-700">{issue.problem}</td>
                  <td className="px-5 py-3.5 text-slate-500 text-xs leading-relaxed">{issue.recommendation}</td>
                  <td className="px-5 py-3.5">
                    <select
                      value={statuses[issue.id]}
                      onChange={e => setStatuses(prev => ({ ...prev, [issue.id]: e.target.value as IssueStatus }))}
                      className={`text-xs font-medium border rounded-md px-2 py-1 cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-400 ${s.cls} border-current/20`}
                    >
                      <option value="open">Открыта</option>
                      <option value="fixed">Исправлена</option>
                      <option value="ignored">Игнорируется</option>
                    </select>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
