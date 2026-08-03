import { useState } from 'react'

type AuthMode = 'login' | 'forgot'

interface AuthProps {
  onAuth: () => void
}

// ── Branding mark ─────────────────────────────────────────────────────────────

function LogoMark() {
  return (
    <div className="flex items-center gap-2.5">
      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center flex-shrink-0">
        <svg className="w-4.5 h-4.5 text-white" viewBox="0 0 18 18" fill="currentColor">
          <path d="M9 2L2 6v6l7 4 7-4V6L9 2z" opacity=".9"/>
          <path d="M9 2v14M2 6l7 4 7-4" stroke="white" strokeWidth="1.2" fill="none" strokeLinejoin="round"/>
        </svg>
      </div>
      <span className="font-bold text-lg tracking-tight text-white">Gastronavt</span>
    </div>
  )
}

// ── Input field ───────────────────────────────────────────────────────────────

function Field({
  label, type = 'text', value, onChange, placeholder, hint, autoComplete,
}: {
  label: string
  type?: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  hint?: string
  autoComplete?: string
}) {
  const [show, setShow] = useState(false)
  const isPassword = type === 'password'

  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1.5">{label}</label>
      <div className="relative">
        <input
          type={isPassword && show ? 'text' : type}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow pr-10"
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShow(v => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
            tabIndex={-1}
          >
            {show ? (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
              </svg>
            )}
          </button>
        )}
      </div>
      {hint && <p className="mt-1 text-xs text-slate-400">{hint}</p>}
    </div>
  )
}

// ── Left panel decoration ─────────────────────────────────────────────────────

function LeftPanel() {
  const features = [
    { icon: '✦', text: 'Управление контентом сайта' },
    { icon: '✦', text: 'SEO-мониторинг и аудит' },
    { icon: '✦', text: 'Контент-план и публикации' },
    { icon: '✦', text: 'Медиатека и изображения' },
  ]

  return (
    <div
      className="hidden lg:flex flex-col justify-between p-10 relative overflow-hidden"
      style={{ background: '#0d1b2e' }}
    >
      {/* Grid texture */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Glow blobs */}
      <div className="absolute top-0 left-0 w-72 h-72 rounded-full opacity-20" style={{ background: 'radial-gradient(circle, #3b82f6 0%, transparent 70%)', transform: 'translate(-30%, -30%)' }} />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full opacity-15" style={{ background: 'radial-gradient(circle, #7c3aed 0%, transparent 70%)', transform: 'translate(30%, 30%)' }} />

      {/* Top */}
      <div className="relative z-10">
        <LogoMark />
        <p className="mt-2 text-sm text-white/40 ml-0.5">CMS · gastronavt.ru</p>
      </div>

      {/* Middle */}
      <div className="relative z-10 space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-white leading-snug tracking-tight">
            Система управления<br />сайтом Gastronavt
          </h2>
          <p className="mt-3 text-sm text-white/50 leading-relaxed max-w-xs">
            Публикуйте материалы, следите за SEO<br />и планируйте контент в одном месте.
          </p>
        </div>

        <div className="space-y-3">
          {features.map((f, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="text-blue-400 text-xs flex-shrink-0">{f.icon}</span>
              <span className="text-sm text-white/60">{f.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom */}
      <div className="relative z-10">
        <div className="flex items-center gap-3 p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center flex-shrink-0 text-white text-xs font-bold">
            Е
          </div>
          <div>
            <p className="text-sm font-medium text-white">Екатерина Морозова</p>
            <p className="text-xs text-white/40">Главный редактор</p>
          </div>
          <div className="ml-auto flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-xs text-white/30">Онлайн</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Main auth component ───────────────────────────────────────────────────────

export default function Auth({ onAuth }: AuthProps) {
  const [mode, setMode] = useState<AuthMode>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const [loading, setLoading] = useState(false)
  const [forgotSent, setForgotSent] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!email || !password) {
      setError('Заполните все поля')
      return
    }
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      onAuth()
    }, 900)
  }

  const handleForgot = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      setError('Введите email')
      return
    }
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setForgotSent(true)
    }, 800)
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Left branding panel */}
      <LeftPanel />

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center bg-slate-50 px-6 py-12">
        <div className="w-full max-w-sm">

          {/* Mobile logo */}
          <div className="lg:hidden mb-8">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
                <svg className="w-4 h-4 text-white" viewBox="0 0 18 18" fill="currentColor">
                  <path d="M9 2L2 6v6l7 4 7-4V6L9 2z" opacity=".9"/>
                  <path d="M9 2v14M2 6l7 4 7-4" stroke="white" strokeWidth="1.2" fill="none" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="font-bold text-lg text-slate-900">Gastronavt</span>
            </div>
          </div>

          {mode === 'login' ? (
            <>
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Вход в систему</h1>
                <p className="text-sm text-slate-400 mt-1.5">Войдите в панель управления сайтом</p>
              </div>

              {error && (
                <div className="mb-5 flex items-center gap-2.5 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
                  </svg>
                  {error}
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <Field
                  label="Email"
                  type="email"
                  value={email}
                  onChange={setEmail}
                  placeholder="kate@gastronavt.ru"
                  autoComplete="email"
                />
                <Field
                  label="Пароль"
                  type="password"
                  value={password}
                  onChange={setPassword}
                  placeholder="••••••••"
                  autoComplete="current-password"
                />

                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={remember}
                      onChange={e => setRemember(e.target.checked)}
                      className="w-4 h-4 rounded border-slate-300 text-blue-600 cursor-pointer focus:ring-blue-500"
                    />
                    <span className="text-sm text-slate-600">Запомнить меня</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => { setMode('forgot'); setError(''); setForgotSent(false) }}
                    className="text-sm text-blue-600 hover:text-blue-700 cursor-pointer transition-colors"
                  >
                    Забыли пароль?
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-sm font-semibold py-2.5 rounded-xl cursor-pointer transition-colors flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                      </svg>
                      Вход...
                    </>
                  ) : 'Войти'}
                </button>
              </form>

              <p className="mt-6 text-center text-xs text-slate-400">
                Доступ только для сотрудников Gastronavt.<br />
                Нет аккаунта?{' '}
                <a href="mailto:admin@gastronavt.ru" className="text-blue-600 hover:underline">
                  Свяжитесь с администратором
                </a>
              </p>
            </>
          ) : (
            <>
              <button
                onClick={() => { setMode('login'); setError(''); setForgotSent(false) }}
                className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-700 cursor-pointer transition-colors mb-8"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
                </svg>
                Назад ко входу
              </button>

              <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Восстановление пароля</h1>
                <p className="text-sm text-slate-400 mt-1.5">Введите email — мы пришлём ссылку для сброса</p>
              </div>

              {forgotSent ? (
                <div className="flex flex-col items-center text-center py-6 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center">
                    <svg className="w-7 h-7 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Письмо отправлено</p>
                    <p className="text-sm text-slate-400 mt-1">Проверьте почту {email}<br />и перейдите по ссылке в письме</p>
                  </div>
                  <button
                    onClick={() => setMode('login')}
                    className="text-sm text-blue-600 hover:text-blue-700 cursor-pointer transition-colors mt-2"
                  >
                    Вернуться ко входу
                  </button>
                </div>
              ) : (
                <>
                  {error && (
                    <div className="mb-5 flex items-center gap-2.5 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
                      <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
                      </svg>
                      {error}
                    </div>
                  )}
                  <form onSubmit={handleForgot} className="space-y-4">
                    <Field
                      label="Email"
                      type="email"
                      value={email}
                      onChange={setEmail}
                      placeholder="kate@gastronavt.ru"
                      autoComplete="email"
                    />
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full mt-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-sm font-semibold py-2.5 rounded-xl cursor-pointer transition-colors flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <>
                          <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                          </svg>
                          Отправка...
                        </>
                      ) : 'Отправить ссылку'}
                    </button>
                  </form>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
