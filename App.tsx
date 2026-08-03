import { useState } from 'react'
import { Card, PageHeader, Button, FormField, Input, TextArea, Select, Tabs } from '@/components/ui'

export default function WebsiteSettings() {
  const [tab, setTab] = useState('general')

  return (
    <div className="p-6">
      <PageHeader title="Настройки сайта" subtitle="Глобальные параметры и конфигурация">
        <Button variant="primary">Сохранить изменения</Button>
      </PageHeader>

      <Tabs
        active={tab}
        onChange={setTab}
        tabs={[
          { id: 'general', label: 'Общие' },
          { id: 'navigation', label: 'Навигация' },
          { id: 'footer', label: 'Подвал' },
          { id: 'contacts', label: 'Контакты' },
          { id: 'social', label: 'Соцсети' },
          { id: 'technical', label: 'Технические' },
          { id: 'domains', label: 'Домены' },
        ]}
      />

      {tab === 'general' && (
        <div className="max-w-2xl space-y-6">
          <Card>
            <h2 className="text-sm font-semibold text-slate-900 mb-5">Логотип и фавикон</h2>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Логотип</label>
                <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-blue-400 cursor-pointer transition-colors">
                  <div className="text-3xl mb-2">🌐</div>
                  <p className="text-xs text-slate-500">PNG, SVG до 2 МБ</p>
                  <p className="text-xs text-blue-600 mt-1">Загрузить</p>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Фавикон</label>
                <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-blue-400 cursor-pointer transition-colors">
                  <div className="text-3xl mb-2">🔖</div>
                  <p className="text-xs text-slate-500">ICO, PNG 32×32</p>
                  <p className="text-xs text-blue-600 mt-1">Загрузить</p>
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <h2 className="text-sm font-semibold text-slate-900 mb-5">Основная информация</h2>
            <div className="space-y-4">
              <FormField label="Название сайта"><Input value="Gastronavt" /></FormField>
              <FormField label="Описание сайта" hint="Используется в мета-теге description для главной страницы">
                <TextArea rows={3} />
              </FormField>
              <FormField label="Язык по умолчанию">
                <Select value="ru" onChange={() => {}} options={[{ value: 'ru', label: 'Русский' }, { value: 'en', label: 'English' }]} className="w-full" />
              </FormField>
              <FormField label="Временная зона">
                <Select value="moscow" onChange={() => {}} options={[
                  { value: 'moscow', label: 'Москва (UTC+3)' },
                  { value: 'ekb', label: 'Екатеринбург (UTC+5)' },
                  { value: 'novosibirsk', label: 'Новосибирск (UTC+7)' },
                ]} className="w-full" />
              </FormField>
            </div>
          </Card>

          <Card>
            <h2 className="text-sm font-semibold text-slate-900 mb-5">Cookie-баннер</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-700">Показывать cookie-баннер</p>
                  <p className="text-xs text-slate-400">GDPR и российское законодательство</p>
                </div>
                <button className="w-10 h-5 bg-blue-600 rounded-full relative cursor-pointer">
                  <span className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full" />
                </button>
              </div>
              <FormField label="Текст баннера">
                <TextArea rows={2} />
              </FormField>
            </div>
          </Card>
        </div>
      )}

      {tab === 'navigation' && (
        <div className="max-w-2xl">
          <Card>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-sm font-semibold text-slate-900">Главное меню</h2>
              <Button variant="outline" size="sm">+ Добавить пункт</Button>
            </div>
            <div className="space-y-2">
              {['Главная', 'Продукты', 'Кейсы', 'Блог', 'Цены', 'О компании', 'Контакты'].map((item, i) => (
                <div key={i} className="flex items-center gap-3 bg-slate-50 rounded-lg px-4 py-3">
                  <span className="text-slate-400 cursor-grab">⠿</span>
                  <input className="flex-1 text-sm bg-transparent text-slate-700 focus:outline-none" defaultValue={item} />
                  <input className="w-48 text-sm border border-slate-200 rounded px-2 py-1 text-slate-500 focus:outline-none text-xs font-mono" defaultValue={`/${item.toLowerCase().replace(/\s/g, '-')}`} />
                  <button className="text-slate-400 hover:text-red-500 cursor-pointer">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {tab === 'contacts' && (
        <div className="max-w-2xl">
          <Card>
            <h2 className="text-sm font-semibold text-slate-900 mb-5">Контактная информация</h2>
            <div className="space-y-4">
              <FormField label="Телефон"><Input value="+7 (495) 123-45-67" /></FormField>
              <FormField label="Email"><Input value="hello@gastronavt.ru" /></FormField>
              <FormField label="Адрес"><Input value="Москва, Пресненская наб., 8с1" /></FormField>
              <FormField label="Режим работы"><Input value="Пн–Пт: 9:00–18:00" /></FormField>
            </div>
          </Card>
        </div>
      )}

      {tab === 'social' && (
        <div className="max-w-2xl">
          <Card>
            <h2 className="text-sm font-semibold text-slate-900 mb-5">Социальные сети</h2>
            <div className="space-y-4">
              {[
                { label: 'Telegram', placeholder: 'https://t.me/gastronavt', icon: '✈️' },
                { label: 'ВКонтакте', placeholder: 'https://vk.com/gastronavt', icon: '💙' },
                { label: 'YouTube', placeholder: 'https://youtube.com/@gastronavt', icon: '▶️' },
                { label: 'Дзен', placeholder: 'https://dzen.ru/gastronavt', icon: '🔴' },
              ].map(s => (
                <FormField key={s.label} label={`${s.icon} ${s.label}`}>
                  <Input placeholder={s.placeholder} />
                </FormField>
              ))}
            </div>
          </Card>
        </div>
      )}

      {tab === 'technical' && (
        <div className="max-w-2xl space-y-5">
          <Card>
            <h2 className="text-sm font-semibold text-slate-900 mb-5">Robots.txt</h2>
            <div className="bg-slate-900 rounded-lg p-4">
              <pre className="text-xs font-mono text-emerald-400">{`User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/

Sitemap: https://gastronavt.ru/sitemap.xml`}</pre>
            </div>
            <Button variant="outline" size="sm" className="mt-3">Редактировать</Button>
          </Card>

          <Card>
            <h2 className="text-sm font-semibold text-slate-900 mb-5">Редиректы</h2>
            <div className="space-y-2 mb-4">
              {[
                { from: '/old-page', to: '/new-page', code: '301' },
                { from: '/blog/old-article', to: '/blog/new-article', code: '301' },
                { from: '/products/old', to: '/products', code: '302' },
              ].map((r, i) => (
                <div key={i} className="flex items-center gap-2 text-xs">
                  <span className="font-mono text-slate-600 bg-slate-100 px-2 py-1 rounded flex-1">{r.from}</span>
                  <span className="text-slate-400">→</span>
                  <span className="font-mono text-slate-600 bg-slate-100 px-2 py-1 rounded flex-1">{r.to}</span>
                  <span className="bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded font-medium">{r.code}</span>
                </div>
              ))}
            </div>
            <Button variant="outline" size="sm">+ Добавить редирект</Button>
          </Card>
        </div>
      )}

      {tab === 'domains' && (
        <div className="max-w-2xl">
          <Card>
            <h2 className="text-sm font-semibold text-slate-900 mb-5">Домены</h2>
            <div className="space-y-3">
              {[
                { domain: 'gastronavt.ru', status: 'primary', ssl: true },
                { domain: 'www.gastronavt.ru', status: 'redirect', ssl: true },
                { domain: 'gastronavt.com', status: 'active', ssl: true },
              ].map((d, i) => (
                <div key={i} className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-slate-900 font-mono">{d.domain}</div>
                    <div className="text-xs text-slate-400">
                      {d.status === 'primary' ? 'Основной домен' : d.status === 'redirect' ? 'Редирект на основной' : 'Активен'}
                      {d.ssl && ' · SSL ✓'}
                    </div>
                  </div>
                  {d.status === 'primary' && <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-medium">Основной</span>}
                </div>
              ))}
            </div>
            <Button variant="outline" size="sm" className="mt-4">+ Добавить домен</Button>
          </Card>
        </div>
      )}

      {tab === 'footer' && (
        <div className="max-w-2xl">
          <Card>
            <h2 className="text-sm font-semibold text-slate-900 mb-5">Настройка подвала</h2>
            <div className="space-y-4">
              <FormField label="Текст копирайта"><Input value="© 2026 Gastronavt. Все права защищены." /></FormField>
              <FormField label="Политика конфиденциальности (URL)"><Input value="/privacy" /></FormField>
              <FormField label="Пользовательское соглашение (URL)"><Input value="/terms" /></FormField>
              <FormField label="Дополнительный текст в подвале"><TextArea rows={3} /></FormField>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
