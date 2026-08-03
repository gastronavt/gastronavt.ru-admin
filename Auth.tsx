import { useState } from 'react'
import { Drawer, FormField, Select } from '@/components/ui'

const roles = [
  { id: 'admin', label: 'Администратор', desc: 'Полный доступ', color: 'bg-red-50 text-red-700' },
  { id: 'content', label: 'Контент-менеджер', desc: 'Создание и редактирование контента', color: 'bg-blue-50 text-blue-700' },
  { id: 'seo', label: 'SEO-специалист', desc: 'SEO-настройки и аналитика', color: 'bg-violet-50 text-violet-700' },
  { id: 'viewer', label: 'Наблюдатель', desc: 'Только просмотр', color: 'bg-slate-100 text-slate-500' },
]

const users = [
  { id: 1, name: 'Алексей Данилов', email: 'danilov@gastronavt.ru', role: 'admin', status: 'active', lastSeen: 'Онлайн' },
  { id: 2, name: 'Екатерина Морозова', email: 'morozova@gastronavt.ru', role: 'content', status: 'active', lastSeen: '2 ч назад' },
  { id: 3, name: 'Иван Козлов', email: 'kozlov@gastronavt.ru', role: 'content', status: 'active', lastSeen: '1 д назад' },
  { id: 4, name: 'Марина Соколова', email: 'sokolova@gastronavt.ru', role: 'seo', status: 'active', lastSeen: '3 ч назад' },
  { id: 5, name: 'Дмитрий Петров', email: 'petrov@gastronavt.ru', role: 'viewer', status: 'inactive', lastSeen: '10 д назад' },
]

const perms: { section: string; admin: boolean; content: boolean; seo: boolean; viewer: boolean }[] = [
  { section: 'Обзор (дашборд)', admin: true, content: true, seo: true, viewer: true },
  { section: 'Контент — просмотр', admin: true, content: true, seo: true, viewer: true },
  { section: 'Контент — редактирование', admin: true, content: true, seo: false, viewer: false },
  { section: 'Контент — публикация', admin: true, content: true, seo: false, viewer: false },
  { section: 'Контент-план', admin: true, content: true, seo: false, viewer: true },
  { section: 'Медиатека — загрузка', admin: true, content: true, seo: false, viewer: false },
  { section: 'SEO-панель', admin: true, content: false, seo: true, viewer: false },
  { section: 'Настройки сайта', admin: true, content: false, seo: false, viewer: false },
  { section: 'Пользователи', admin: true, content: false, seo: false, viewer: false },
]

const roleColumns = ['admin', 'content', 'seo', 'viewer'] as const

function Check({ ok }: { ok: boolean }) {
  return ok ? (
    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 text-xs">✓</span>
  ) : (
    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-slate-100 text-slate-300 text-xs">—</span>
  )
}

export default function Users() {
  const [drawer, setDrawer] = useState(false)
  const [selected, setSelected] = useState<typeof users[0] | null>(null)
  const [showInvite, setShowInvite] = useState(false)

  return (
    <div className="p-7 max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Пользователи</h1>
          <p className="text-sm text-slate-400 mt-1">{users.length} сотрудников</p>
        </div>
        <button
          onClick={() => setShowInvite(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg cursor-pointer transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Пригласить
        </button>
      </div>

      {/* User list */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Пользователь</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Роль</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Статус</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Активность</th>
              <th className="px-5 py-3 w-10" />
            </tr>
          </thead>
          <tbody>
            {users.map(u => {
              const role = roles.find(r => r.id === u.role)!
              return (
                <tr key={u.id} className="border-t border-slate-100 hover:bg-slate-50 transition-colors group">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                        {u.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-slate-900">{u.name}</div>
                        <div className="text-xs text-slate-400">{u.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-md ${role.color}`}>{role.label}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`flex items-center gap-1.5 text-xs font-medium ${u.status === 'active' ? 'text-emerald-600' : 'text-slate-400'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${u.status === 'active' ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                      {u.status === 'active' ? 'Активен' : 'Неактивен'}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-sm text-slate-500">{u.lastSeen}</td>
                  <td className="px-5 py-4">
                    <button
                      onClick={() => { setSelected(u); setDrawer(true) }}
                      className="p-1 text-slate-300 hover:text-blue-500 rounded cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Permissions matrix */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100">
          <h2 className="text-sm font-semibold text-slate-900">Права доступа</h2>
          <p className="text-xs text-slate-400 mt-0.5">Что каждая роль может делать в системе</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Раздел</th>
                {roles.map(r => (
                  <th key={r.id} className="px-5 py-3 text-center">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-md ${r.color}`}>{r.label}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {perms.map((p, i) => (
                <tr key={i} className="border-t border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-3 text-sm text-slate-700">{p.section}</td>
                  {roleColumns.map(col => (
                    <td key={col} className="px-5 py-3 text-center">
                      <Check ok={p[col]} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit drawer */}
      <Drawer open={drawer} onClose={() => setDrawer(false)} title="Редактировать пользователя">
        {selected && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white font-bold">
                {selected.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </div>
              <div>
                <div className="font-semibold text-slate-900">{selected.name}</div>
                <div className="text-sm text-slate-500">{selected.email}</div>
              </div>
            </div>
            <FormField label="Роль">
              <Select value={selected.role} onChange={() => {}} options={roles.map(r => ({ value: r.id, label: r.label }))} className="w-full" />
            </FormField>
            <FormField label="Статус">
              <Select value={selected.status} onChange={() => {}} options={[{ value: 'active', label: 'Активен' }, { value: 'inactive', label: 'Деактивирован' }]} className="w-full" />
            </FormField>
            <div className="flex gap-3 pt-4 border-t border-slate-100">
              <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 rounded-lg cursor-pointer transition-colors">Сохранить</button>
              <button className="bg-red-50 hover:bg-red-100 text-red-600 text-sm font-medium px-4 py-2 rounded-lg cursor-pointer transition-colors">Удалить</button>
            </div>
          </div>
        )}
      </Drawer>

      {/* Invite drawer */}
      <Drawer open={showInvite} onClose={() => setShowInvite(false)} title="Пригласить пользователя">
        <div className="space-y-4">
          <FormField label="Email">
            <input type="email" placeholder="colleague@company.ru" className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </FormField>
          <FormField label="Роль">
            <Select value="content" onChange={() => {}} options={roles.map(r => ({ value: r.id, label: r.label }))} className="w-full" />
          </FormField>
          <div className="bg-slate-50 rounded-xl p-4 text-xs text-slate-500">
            Пользователь получит письмо с приглашением и ссылкой для регистрации.
          </div>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2.5 rounded-lg cursor-pointer transition-colors">
            Отправить приглашение
          </button>
        </div>
      </Drawer>
    </div>
  )
}
