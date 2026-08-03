import { useState, type ReactNode } from 'react'
import { Card, PageHeader, Badge, Button, Tabs } from '@/components/ui'

const seoIssues = {
  pages: [
    { type: 'error', title: 'Страницы без мета-описания', count: 12, pages: ['О компании', 'Партнёры', 'Карьера +9'] },
    { type: 'error', title: 'Дублирующиеся заголовки', count: 4, pages: ['/products/sayt', '/products/sayt-premium'] },
    { type: 'warning', title: 'Отсутствует H1', count: 7, pages: ['Интеграции', 'Партнёры +5'] },
    { type: 'warning', title: 'Слишком длинный meta title', count: 3, pages: ['/blog/..', '/blog/..'] },
    { type: 'info', title: 'Страницы без Open Graph', count: 18, pages: ['Цены', 'Контакты +16'] },
  ],
  links: [
    { type: 'error', title: 'Битые ссылки (404)', count: 8, pages: ['/old-page', '/blog/removed +6'] },
    { type: 'warning', title: 'Внешние ссылки без nofollow', count: 22, pages: ['Различные страницы'] },
    { type: 'info', title: 'Редиректы (301)', count: 14, pages: ['Настроены корректно'] },
  ],
  images: [
    { type: 'error', title: 'Изображения без alt-текста', count: 34, pages: ['Медиатека', 'Блог'] },
    { type: 'warning', title: 'Изображения > 500 КБ', count: 11, pages: ['Кейсы', 'Главная'] },
    { type: 'info', title: 'Изображения без WebP', count: 45, pages: ['Весь сайт'] },
  ],
  technical: [
    { type: 'error', title: 'Страницы закрытые от индексации', count: 2, pages: ['/test-page', '/old-landing'] },
    { type: 'info', title: 'Canonical URL задан', count: 148, pages: ['Все страницы блога'] },
    { type: 'info', title: 'Sitemap.xml', count: 1, pages: ['Обновлён 1 авг 2026'] },
    { type: 'info', title: 'Robots.txt', count: 1, pages: ['Настроен корректно'] },
  ],
}

const typeMap: Record<string, { label: string; variant: 'red' | 'yellow' | 'blue'; icon: ReactNode }> = {
  error: {
    label: 'Ошибка',
    variant: 'red',
    icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>,
  },
  warning: {
    label: 'Предупреждение',
    variant: 'yellow',
    icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>,
  },
  info: {
    label: 'Информация',
    variant: 'blue',
    icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>,
  },
}

export default function SEOCenter() {
  const [tab, setTab] = useState('pages')

  const currentIssues = seoIssues[tab as keyof typeof seoIssues] ?? []
  const allErrors = Object.values(seoIssues).flat().filter(i => i.type === 'error').reduce((a, i) => a + i.count, 0)
  const allWarnings = Object.values(seoIssues).flat().filter(i => i.type === 'warning').reduce((a, i) => a + i.count, 0)

  return (
    <div className="p-6 space-y-6">
      <PageHeader title="SEO-центр" subtitle="Мониторинг технического SEO и оптимизация сайта">
        <Button variant="outline">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Сканировать сайт
        </Button>
        <Button variant="primary">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Скачать отчёт
        </Button>
      </PageHeader>

      {/* Score overview */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-slate-900 to-slate-700 rounded-xl p-5 text-white">
          <div className="text-3xl font-bold mb-1">76</div>
          <div className="text-sm text-slate-300">SEO-оценка сайта</div>
          <div className="mt-3 h-1.5 bg-white/20 rounded-full overflow-hidden">
            <div className="h-full bg-white rounded-full" style={{ width: '76%' }} />
          </div>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-xl p-5">
          <div className="text-3xl font-bold text-red-600 mb-1">{allErrors}</div>
          <div className="text-sm text-red-600">Критических ошибок</div>
          <div className="text-xs text-red-400 mt-1">Требуют исправления</div>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
          <div className="text-3xl font-bold text-amber-600 mb-1">{allWarnings}</div>
          <div className="text-sm text-amber-600">Предупреждений</div>
          <div className="text-xs text-amber-400 mt-1">Рекомендуется исправить</div>
        </div>
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5">
          <div className="text-3xl font-bold text-emerald-600 mb-1">148</div>
          <div className="text-sm text-emerald-600">Оптимизированных страниц</div>
          <div className="text-xs text-emerald-400 mt-1">Успешно индексируются</div>
        </div>
      </div>

      <Tabs
        active={tab}
        onChange={setTab}
        tabs={[
          { id: 'pages', label: 'Страницы', count: seoIssues.pages.filter(i => i.type === 'error').reduce((a, i) => a + i.count, 0) },
          { id: 'links', label: 'Ссылки', count: seoIssues.links.filter(i => i.type === 'error').reduce((a, i) => a + i.count, 0) },
          { id: 'images', label: 'Изображения', count: seoIssues.images.filter(i => i.type === 'error').reduce((a, i) => a + i.count, 0) },
          { id: 'technical', label: 'Технические' },
        ]}
      />

      <div className="space-y-4">
        {currentIssues.map((issue, i) => {
          const t = typeMap[issue.type]
          return (
            <Card key={i} className={`border-l-4 ${issue.type === 'error' ? 'border-l-red-500' : issue.type === 'warning' ? 'border-l-amber-500' : 'border-l-blue-400'}`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className={`mt-0.5 flex-shrink-0 ${issue.type === 'error' ? 'text-red-500' : issue.type === 'warning' ? 'text-amber-500' : 'text-blue-500'}`}>
                    {t.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2.5 mb-1">
                      <h3 className="text-sm font-semibold text-slate-900">{issue.title}</h3>
                      <Badge variant={t.variant}>{t.label}</Badge>
                      <span className="text-xs text-slate-400">{issue.count} шт.</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {issue.pages.map((p, j) => (
                        <span key={j} className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono">{p}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  {issue.type !== 'info' && (
                    <Button variant="outline" size="sm">Исправить</Button>
                  )}
                  <Button variant="ghost" size="sm">Подробнее</Button>
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Status cards */}
      <div className="grid grid-cols-2 gap-5">
        <Card>
          <h2 className="text-sm font-semibold text-slate-900 mb-4">Статус индексации</h2>
          <div className="space-y-3">
            {[
              { label: 'Индексируется', value: 148, color: 'bg-emerald-500' },
              { label: 'Закрыто robots.txt', value: 12, color: 'bg-slate-300' },
              { label: 'Noindex', value: 2, color: 'bg-red-500' },
              { label: 'Ошибки 404', value: 8, color: 'bg-amber-500' },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${s.color}`} />
                <span className="text-sm text-slate-600 flex-1">{s.label}</span>
                <span className="text-sm font-semibold text-slate-900">{s.value}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="text-sm font-semibold text-slate-900 mb-4">Системные файлы</h2>
          <div className="space-y-3">
            {[
              { label: 'Sitemap.xml', status: 'ok', detail: 'Обновлён 1 авг 2026' },
              { label: 'Robots.txt', status: 'ok', detail: 'Настроен корректно' },
              { label: 'SSL-сертификат', status: 'ok', detail: 'Действителен до 12 дек 2026' },
              { label: 'Страница 404', status: 'warning', detail: 'Нет ссылки на главную' },
            ].map((s, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${s.status === 'ok' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                  <span className="text-sm font-medium text-slate-700">{s.label}</span>
                </div>
                <span className="text-xs text-slate-400">{s.detail}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
