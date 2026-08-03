import { useState } from 'react'
import { Drawer, FormField, Select } from '@/components/ui'

type SettingsTab = 'general' | 'navigation' | 'contacts' | 'seo' | 'technical'

const tabs: { id: SettingsTab; label: string }[] = [
  { id: 'general', label: 'Общие' },
  { id: 'navigation', label: 'Навигация' },
  { id: 'contacts', label: 'Контакты и соцсети' },
  { id: 'seo', label: 'SEO по умолчанию' },
  { id: 'technical', label: 'Технические' },
]

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="mb-5">
      <label className="block text-sm font-medium text-slate-700 mb-1.5">{label}</label>
      {children}
      {hint && <p className="mt-1 text-xs text-slate-400">{hint}</p>}
    </div>
  )
}

function TextInput({ value, placeholder }: { value?: string; placeholder?: string }) {
  return (
    <input
      defaultValue={value}
      placeholder={placeholder}
      className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    />
  )
}

function Toggle({ label, description, defaultOn = false }: { label: string; description?: string; defaultOn?: boolean }) {
  const [on, setOn] = useState(defaultOn)
  return (
    <div className="flex items-center justify-between py-3.5 border-b border-slate-100 last:border-0">
      <div>
        <div className="text-sm font-medium text-slate-700">{label}</div>
        {description && <div className="text-xs text-slate-400 mt-0.5">{description}</div>}
      </div>
      <button
        onClick={() => setOn(v => !v)}
        className={`w-10 h-5 rounded-full relative transition-colors cursor-pointer ${on ? 'bg-blue-600' : 'bg-slate-300'}`}
      >
        <span className={`absolute top-0.5 h-4 w-4 bg-white rounded-full shadow transition-all ${on ? 'right-0.5' : 'left-0.5'}`} />
      </button>
    </div>
  )
}

export default function Settings() {
  const [tab, setTab] = useState<SettingsTab>('general')

  return (
    <div className="p-7 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Настройки</h1>
          <p className="text-sm text-slate-400 mt-1">Конфигурация сайта gastronavt.ru</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg cursor-pointer transition-colors">
          Сохранить изменения
        </button>
      </div>

      <div className="flex gap-6">
        {/* Tab nav */}
        <div className="w-44 flex-shrink-0">
          <nav className="space-y-0.5">
            {tabs.map(t => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors cursor-pointer ${tab === t.id ? 'bg-blue-50 text-blue-700 font-medium' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'}`}
              >
                {t.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {tab === 'general' && (
            <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-1">
              <h2 className="text-sm font-semibold text-slate-900 mb-5">Основная информация</h2>

              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Логотип</label>
                  <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center hover:border-blue-400 cursor-pointer transition-colors">
                    <div className="text-3xl mb-1">🌐</div>
                    <p className="text-xs text-slate-400">SVG, PNG до 2 МБ</p>
                    <p className="text-xs text-blue-600 mt-1 cursor-pointer">Загрузить</p>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Фавикон</label>
                  <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center hover:border-blue-400 cursor-pointer transition-colors">
                    <div className="text-3xl mb-1">🔖</div>
                    <p className="text-xs text-slate-400">ICO, PNG 32×32</p>
                    <p className="text-xs text-blue-600 mt-1 cursor-pointer">Загрузить</p>
                  </div>
                </div>
              </div>

              <Field label="Название сайта"><TextInput value="Gastronavt" /></Field>
              <Field label="Описание сайта" hint="Используется в мета-теге description главной страницы">
                <textarea
                  className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  rows={3}
                  defaultValue="Gastronavt — платформа для цифровизации ресторанного бизнеса. Сайты, приложения, Telegram-боты и CRM для кафе и ресторанов."
                />
              </Field>

              <div className="pt-4 border-t border-slate-100">
                <Toggle label="Cookie-баннер" description="Показывать баннер для новых посетителей" defaultOn />
                <Toggle label="Индексация сайта" description="Разрешить поисковым системам индексировать сайт" defaultOn />
              </div>
            </div>
          )}

          {tab === 'navigation' && (
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-sm font-semibold text-slate-900">Главное меню</h2>
                <button className="text-sm text-blue-600 hover:text-blue-700 cursor-pointer">+ Добавить пункт</button>
              </div>
              <div className="space-y-2">
                {['Главная → /', 'Продукты → /products', 'Кейсы → /cases', 'Блог → /blog', 'Цены → /prices', 'О компании → /about', 'Контакты → /contacts'].map((item, i) => {
                  const [label, path] = item.split(' → ')
                  return (
                    <div key={i} className="flex items-center gap-3 bg-slate-50 rounded-lg px-4 py-3">
                      <span className="text-slate-300 cursor-grab select-none">⠿</span>
                      <input defaultValue={label} className="flex-1 text-sm bg-transparent text-slate-700 focus:outline-none min-w-0" />
                      <input defaultValue={path} className="w-36 text-xs border border-slate-200 rounded px-2 py-1 text-slate-500 font-mono focus:outline-none" />
                      <button className="text-slate-300 hover:text-red-500 cursor-pointer flex-shrink-0">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                      </button>
                    </div>
                  )
                })}
              </div>

              <div className="mt-6 pt-5 border-t border-slate-100">
                <h3 className="text-sm font-semibold text-slate-900 mb-3">Подвал</h3>
                <Field label="Текст копирайта"><TextInput value="© 2026 Gastronavt. Все права защищены." /></Field>
                <Field label="Ссылка на политику конфиденциальности"><TextInput value="/privacy" /></Field>
              </div>
            </div>
          )}

          {tab === 'contacts' && (
            <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-1">
              <h2 className="text-sm font-semibold text-slate-900 mb-5">Контактная информация</h2>
              <Field label="Телефон"><TextInput value="+7 (495) 123-45-67" /></Field>
              <Field label="Email"><TextInput value="hello@gastronavt.ru" /></Field>
              <Field label="Адрес"><TextInput value="Москва, Пресненская набережная, 8с1" /></Field>
              <Field label="Ссылка на Telegram" hint="Главная кнопка CTA на сайте">
                <TextInput value="https://t.me/gastronavt_bot" />
              </Field>

              <div className="pt-4 border-t border-slate-100">
                <h3 className="text-sm font-semibold text-slate-900 mb-4">Социальные сети</h3>
                {[
                  { label: '✈️ Telegram-канал', placeholder: 'https://t.me/gastronavt' },
                  { label: '💙 ВКонтакте', placeholder: 'https://vk.com/gastronavt' },
                  { label: '▶️ YouTube', placeholder: 'https://youtube.com/@gastronavt' },
                  { label: '🔴 Дзен', placeholder: 'https://dzen.ru/gastronavt' },
                ].map(s => (
                  <Field key={s.label} label={s.label}><TextInput placeholder={s.placeholder} /></Field>
                ))}
              </div>
            </div>
          )}

          {tab === 'seo' && (
            <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-1">
              <h2 className="text-sm font-semibold text-slate-900 mb-5">Глобальные SEO-настройки</h2>
              <Field label="Шаблон мета-заголовка" hint="Используйте {title} для подстановки названия страницы">
                <TextInput value="{title} | Gastronavt" />
              </Field>
              <Field label="Мета-описание по умолчанию">
                <textarea
                  className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  rows={3}
                  defaultValue="Gastronavt помогает ресторанам и кафе запускать сайты, приложения и Telegram-ботов для роста продаж."
                />
              </Field>
              <Field label="OG-изображение по умолчанию" hint="1200×630px · используется при шаринге в соцсетях">
                <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 text-center hover:border-blue-400 cursor-pointer transition-colors">
                  <p className="text-xs text-slate-400">Загрузить изображение</p>
                </div>
              </Field>
              <div className="pt-4 border-t border-slate-100">
                <Toggle label="Автоматический sitemap.xml" description="Перегенерировать при каждой публикации" defaultOn />
                <Toggle label="Canonical URL" description="Автоматически добавлять canonical ко всем страницам" defaultOn />
              </div>
            </div>
          )}

          {tab === 'technical' && (
            <div className="space-y-5">
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h2 className="text-sm font-semibold text-slate-900 mb-4">Robots.txt</h2>
                <div className="bg-slate-900 rounded-xl p-4 font-mono text-xs text-emerald-400 leading-relaxed">
                  <pre>{`User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/

Sitemap: https://gastronavt.ru/sitemap.xml`}</pre>
                </div>
                <button className="mt-3 text-sm text-blue-600 hover:text-blue-700 cursor-pointer">Редактировать →</button>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-sm font-semibold text-slate-900">Редиректы (301)</h2>
                  <button className="text-sm text-blue-600 hover:text-blue-700 cursor-pointer">+ Добавить</button>
                </div>
                <div className="space-y-2">
                  {[
                    { from: '/old-page', to: '/new-page' },
                    { from: '/blog/old-article', to: '/blog/new-article' },
                  ].map((r, i) => (
                    <div key={i} className="flex items-center gap-3 text-xs">
                      <span className="font-mono bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg flex-1">{r.from}</span>
                      <span className="text-slate-400">→</span>
                      <span className="font-mono bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg flex-1">{r.to}</span>
                      <button className="text-slate-300 hover:text-red-500 cursor-pointer">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h2 className="text-sm font-semibold text-slate-900 mb-4">Домены</h2>
                <div className="space-y-2.5">
                  {[
                    { domain: 'gastronavt.ru', primary: true, ssl: true },
                    { domain: 'www.gastronavt.ru', primary: false, ssl: true },
                  ].map((d, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" />
                      <span className="text-sm font-mono text-slate-700 flex-1">{d.domain}</span>
                      {d.primary && <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-medium">Основной</span>}
                      {d.ssl && <span className="text-xs text-emerald-600">SSL ✓</span>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
