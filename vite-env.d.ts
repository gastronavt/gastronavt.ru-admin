import { useState } from 'react'
import { Card, PageHeader, Badge, Button, Drawer, FormField, Input, TextArea, Select } from '@/components/ui'

const pages = [
  { id: 1, title: 'Главная', path: '/', status: 'published', seo: 88, edited: '30 июл 2026', views: 3200, blocks: 8 },
  { id: 2, title: 'О компании', path: '/o-kompanii', status: 'published', seo: 72, edited: '25 июл 2026', views: 980, blocks: 5 },
  { id: 3, title: 'Продукты', path: '/products', status: 'published', seo: 91, edited: '28 июл 2026', views: 2540, blocks: 12 },
  { id: 4, title: 'Цены', path: '/prices', status: 'published', seo: 85, edited: '20 июл 2026', views: 1890, blocks: 4 },
  { id: 5, title: 'Контакты', path: '/contacts', status: 'published', seo: 68, edited: '18 июл 2026', views: 1240, blocks: 3 },
  { id: 6, title: 'Интеграции', path: '/integracii', status: 'published', seo: 79, edited: '22 июл 2026', views: 840, blocks: 7 },
  { id: 7, title: 'Партнёры', path: '/partnery', status: 'draft', seo: 45, edited: '15 июл 2026', views: 0, blocks: 3 },
  { id: 8, title: 'Карьера', path: '/career', status: 'published', seo: 62, edited: '10 июл 2026', views: 420, blocks: 4 },
  { id: 9, title: 'Политика конфиденциальности', path: '/privacy', status: 'published', seo: 54, edited: '1 июл 2026', views: 310, blocks: 1 },
]

const seoColor = (s: number) => s >= 80 ? 'text-emerald-600' : s >= 60 ? 'text-amber-600' : 'text-red-500'

export default function WebsitePages() {
  const [drawer, setDrawer] = useState(false)
  const [selectedPage, setSelectedPage] = useState<typeof pages[0] | null>(null)
  const [drawerTab, setDrawerTab] = useState('content')

  return (
    <div className="p-6">
      <PageHeader title="Страницы сайта" subtitle="Управление страницами и контентом">
        <Button variant="primary">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Новая страница
        </Button>
      </PageHeader>

      <div className="grid grid-cols-1 gap-3">
        {pages.map((page) => (
          <div
            key={page.id}
            className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 flex items-center gap-5 hover:shadow-md transition-shadow group"
          >
            <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-1">
                <h3 className="text-sm font-semibold text-slate-900">{page.title}</h3>
                <Badge variant={page.status === 'published' ? 'green' : 'slate'}>
                  {page.status === 'published' ? 'Опубликована' : 'Черновик'}
                </Badge>
              </div>
              <div className="flex items-center gap-4 text-xs text-slate-400">
                <span className="font-mono">{page.path}</span>
                <span>·</span>
                <span>{page.blocks} блоков</span>
                <span>·</span>
                <span>{page.views > 0 ? `${page.views.toLocaleString('ru')} просм.` : 'нет просмотров'}</span>
                <span>·</span>
                <span>Изменено {page.edited}</span>
              </div>
            </div>

            <div className="flex items-center gap-6 flex-shrink-0">
              <div className="text-center">
                <div className={`text-lg font-bold ${seoColor(page.seo)}`}>{page.seo}</div>
                <div className="text-xs text-slate-400">SEO</div>
              </div>

              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="outline" size="sm" onClick={() => { setSelectedPage(page); setDrawer(true) }}>
                  Редактировать
                </Button>
                <button className="p-1.5 text-slate-400 hover:text-slate-600 cursor-pointer">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Drawer open={drawer} onClose={() => setDrawer(false)} title={selectedPage ? `Редактировать: ${selectedPage.title}` : ''}>
        {selectedPage && (
          <div>
            <div className="flex gap-1 border-b border-slate-200 mb-5 -mx-6 px-6">
              {['content', 'seo', 'visibility'].map(t => (
                <button
                  key={t}
                  onClick={() => setDrawerTab(t)}
                  className={`px-3 py-2 text-sm font-medium border-b-2 -mb-px transition-colors cursor-pointer ${drawerTab === t ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                >
                  {{ content: 'Контент', seo: 'SEO', visibility: 'Видимость' }[t]}
                </button>
              ))}
            </div>

            {drawerTab === 'content' && (
              <div className="space-y-4">
                <FormField label="Заголовок страницы">
                  <Input value={selectedPage.title} />
                </FormField>
                <FormField label="URL-адрес">
                  <Input value={selectedPage.path} />
                </FormField>
                <FormField label="Описание">
                  <TextArea placeholder="Описание страницы..." rows={4} />
                </FormField>
                <div className="bg-slate-50 rounded-xl border border-slate-200 p-4">
                  <p className="text-sm text-slate-600 mb-3">Блоки страницы ({selectedPage.blocks})</p>
                  <div className="space-y-2">
                    {Array.from({ length: Math.min(selectedPage.blocks, 4) }).map((_, i) => (
                      <div key={i} className="flex items-center gap-3 bg-white rounded-lg border border-slate-200 px-3 py-2">
                        <span className="text-slate-400 cursor-grab">⠿</span>
                        <span className="text-sm text-slate-600">Блок {i + 1}</span>
                        <button className="ml-auto text-slate-400 hover:text-slate-600 cursor-pointer">
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {drawerTab === 'seo' && (
              <div className="space-y-4">
                <div className={`p-3 rounded-lg text-sm ${seoColor(selectedPage.seo) === 'text-emerald-600' ? 'bg-emerald-50 text-emerald-800' : 'bg-amber-50 text-amber-800'}`}>
                  SEO-оценка: <strong>{selectedPage.seo}/100</strong>
                </div>
                <FormField label="Meta Title"><Input value={selectedPage.title + ' | Gastronavt'} /></FormField>
                <FormField label="Meta Description"><TextArea rows={3} placeholder="Мета-описание страницы..." /></FormField>
                <FormField label="Canonical URL"><Input value={`https://gastronavt.ru${selectedPage.path}`} /></FormField>
                <FormField label="Robots"><Select value="index" onChange={() => {}} options={[{ value: 'index', label: 'index, follow' }, { value: 'noindex', label: 'noindex, nofollow' }]} className="w-full" /></FormField>
              </div>
            )}

            {drawerTab === 'visibility' && (
              <div className="space-y-4">
                <FormField label="Статус">
                  <Select value={selectedPage.status} onChange={() => {}} options={[{ value: 'published', label: 'Опубликована' }, { value: 'draft', label: 'Черновик' }]} className="w-full" />
                </FormField>
                <div className="flex items-center justify-between py-3 border-t border-slate-100">
                  <div>
                    <div className="text-sm font-medium text-slate-700">Отображать в навигации</div>
                    <div className="text-xs text-slate-400">Показывать ссылку в меню сайта</div>
                  </div>
                  <button className="w-10 h-5 bg-blue-600 rounded-full relative cursor-pointer">
                    <span className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full" />
                  </button>
                </div>
              </div>
            )}

            <div className="flex gap-3 mt-6 pt-5 border-t border-slate-100">
              <Button variant="primary" className="flex-1">Сохранить</Button>
              <Button variant="outline">Предпросмотр</Button>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  )
}
