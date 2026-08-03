import { useState } from 'react'
import { Badge, Button, Card, PageHeader, TableWrapper, Th, Td, Tabs, Drawer, FormField, Input, Select } from '@/components/ui'

const users = [
  { id: 1, name: 'Алексей Данилов', email: 'danilov@gastronavt.ru', role: 'admin', status: 'active', lastSeen: 'Сейчас онлайн', avatar: 'АД' },
  { id: 2, name: 'Екатерина Морозова', email: 'morozova@gastronavt.ru', role: 'content', status: 'active', lastSeen: '2 ч назад', avatar: 'ЕМ' },
  { id: 3, name: 'Иван Козлов', email: 'kozlov@gastronavt.ru', role: 'content', status: 'active', lastSeen: '1 д назад', avatar: 'ИК' },
  { id: 4, name: 'Марина Соколова', email: 'sokolova@gastronavt.ru', role: 'seo', status: 'active', lastSeen: '3 ч назад', avatar: 'МС' },
  { id: 5, name: 'Дмитрий Петров', email: 'petrov@gastronavt.ru', role: 'marketing', status: 'active', lastSeen: '5 ч назад', avatar: 'ДП' },
  { id: 6, name: 'Наталья Воробьёва', email: 'vorobyova@gastronavt.ru', role: 'editor', status: 'active', lastSeen: '2 д назад', avatar: 'НВ' },
  { id: 7, name: 'Андрей Смирнов', email: 'smirnov.a@gastronavt.ru', role: 'viewer', status: 'inactive', lastSeen: '10 д назад', avatar: 'АС' },
]

const roles = [
  { id: 'admin', label: 'Администратор', variant: 'red' as const, desc: 'Полный доступ ко всем разделам' },
  { id: 'content', label: 'Контент-менеджер', variant: 'blue' as const, desc: 'Управление контентом и блогом' },
  { id: 'seo', label: 'SEO-специалист', variant: 'purple' as const, desc: 'SEO-центр и аналитика' },
  { id: 'marketing', label: 'Маркетолог', variant: 'cyan' as const, desc: 'Лиды, аналитика, лендинги' },
  { id: 'editor', label: 'Редактор', variant: 'yellow' as const, desc: 'Редактирование без публикации' },
  { id: 'viewer', label: 'Наблюдатель', variant: 'slate' as const, desc: 'Только просмотр' },
]

const permissions = [
  { section: 'Панель управления', admin: true, content: true, seo: true, marketing: true, editor: true, viewer: true },
  { section: 'Блог (просмотр)', admin: true, content: true, seo: true, marketing: true, editor: true, viewer: true },
  { section: 'Блог (редактирование)', admin: true, content: true, seo: false, marketing: false, editor: true, viewer: false },
  { section: 'Блог (публикация)', admin: true, content: true, seo: false, marketing: false, editor: false, viewer: false },
  { section: 'Страницы сайта', admin: true, content: true, seo: false, marketing: false, editor: true, viewer: false },
  { section: 'Конструктор лендингов', admin: true, content: false, seo: false, marketing: true, editor: false, viewer: false },
  { section: 'Кейсы клиентов', admin: true, content: true, seo: false, marketing: true, editor: true, viewer: true },
  { section: 'SEO-центр', admin: true, content: false, seo: true, marketing: false, editor: false, viewer: false },
  { section: 'Аналитика', admin: true, content: false, seo: true, marketing: true, editor: false, viewer: true },
  { section: 'Лиды', admin: true, content: false, seo: false, marketing: true, editor: false, viewer: false },
  { section: 'Медиатека', admin: true, content: true, seo: false, marketing: true, editor: true, viewer: false },
  { section: 'Настройки сайта', admin: true, content: false, seo: false, marketing: false, editor: false, viewer: false },
  { section: 'Пользователи и роли', admin: true, content: false, seo: false, marketing: false, editor: false, viewer: false },
]

const roleColumns = ['admin', 'content', 'seo', 'marketing', 'editor', 'viewer'] as const

export default function UsersRoles() {
  const [tab, setTab] = useState('users')
  const [drawer, setDrawer] = useState(false)
  const [selectedUser, setSelectedUser] = useState<typeof users[0] | null>(null)

  return (
    <div className="p-6">
      <PageHeader title="Пользователи и роли" subtitle={`${users.length} пользователей`}>
        <Button variant="primary">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Пригласить пользователя
        </Button>
      </PageHeader>

      <Tabs
        active={tab}
        onChange={setTab}
        tabs={[
          { id: 'users', label: 'Пользователи', count: users.length },
          { id: 'permissions', label: 'Матрица прав' },
          { id: 'roles', label: 'Роли' },
        ]}
      />

      {tab === 'users' && (
        <Card padding={false}>
          <TableWrapper>
            <thead>
              <tr className="bg-slate-50">
                <Th>Пользователь</Th>
                <Th>Роль</Th>
                <Th>Статус</Th>
                <Th>Последняя активность</Th>
                <Th className="w-20" />
              </tr>
            </thead>
            <tbody>
              {users.map((u) => {
                const role = roles.find(r => r.id === u.role)
                return (
                  <tr key={u.id} className="hover:bg-slate-50 transition-colors group">
                    <Td>
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                          {u.avatar}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-slate-900">{u.name}</div>
                          <div className="text-xs text-slate-400">{u.email}</div>
                        </div>
                      </div>
                    </Td>
                    <Td>
                      {role && <Badge variant={role.variant}>{role.label}</Badge>}
                    </Td>
                    <Td>
                      <Badge variant={u.status === 'active' ? 'green' : 'slate'}>
                        {u.status === 'active' ? 'Активен' : 'Неактивен'}
                      </Badge>
                    </Td>
                    <Td>{u.lastSeen}</Td>
                    <Td>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => { setSelectedUser(u); setDrawer(true) }}
                          className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded cursor-pointer"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                        </button>
                      </div>
                    </Td>
                  </tr>
                )
              })}
            </tbody>
          </TableWrapper>
        </Card>
      )}

      {tab === 'permissions' && (
        <Card padding={false}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50">
                  <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider min-w-[200px]">Раздел</th>
                  {roles.map(r => (
                    <th key={r.id} className="px-3 py-3 text-center text-xs font-semibold uppercase tracking-wider whitespace-nowrap">
                      <Badge variant={r.variant}>{r.label}</Badge>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {permissions.map((p, i) => (
                  <tr key={i} className="hover:bg-slate-50 border-t border-slate-100">
                    <td className="px-5 py-3 text-sm font-medium text-slate-700">{p.section}</td>
                    {roleColumns.map(col => (
                      <td key={col} className="px-3 py-3 text-center">
                        {p[col] ? (
                          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-100 text-emerald-600">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                          </span>
                        ) : (
                          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-slate-100 text-slate-300">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {tab === 'roles' && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {roles.map(r => (
            <Card key={r.id}>
              <div className="flex items-start justify-between mb-3">
                <Badge variant={r.variant}>{r.label}</Badge>
                <span className="text-xs text-slate-400">{users.filter(u => u.role === r.id).length} чел.</span>
              </div>
              <p className="text-sm text-slate-600 mb-4">{r.desc}</p>
              <div className="flex -space-x-2">
                {users.filter(u => u.role === r.id).slice(0, 5).map(u => (
                  <div key={u.id} className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white text-xs font-bold border-2 border-white" title={u.name}>
                    {u.avatar}
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      )}

      <Drawer open={drawer} onClose={() => setDrawer(false)} title="Редактировать пользователя">
        {selectedUser && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white font-bold">
                {selectedUser.avatar}
              </div>
              <div>
                <div className="font-semibold text-slate-900">{selectedUser.name}</div>
                <div className="text-sm text-slate-500">{selectedUser.email}</div>
              </div>
            </div>
            <FormField label="Имя"><Input value={selectedUser.name} /></FormField>
            <FormField label="Email"><Input value={selectedUser.email} /></FormField>
            <FormField label="Роль">
              <Select value={selectedUser.role} onChange={() => {}} options={roles.map(r => ({ value: r.id, label: r.label }))} className="w-full" />
            </FormField>
            <FormField label="Статус">
              <Select value={selectedUser.status} onChange={() => {}} options={[{ value: 'active', label: 'Активен' }, { value: 'inactive', label: 'Деактивирован' }]} className="w-full" />
            </FormField>
            <div className="flex gap-3 pt-4 border-t border-slate-100">
              <Button variant="primary" className="flex-1">Сохранить</Button>
              <Button variant="danger">Удалить</Button>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  )
}
