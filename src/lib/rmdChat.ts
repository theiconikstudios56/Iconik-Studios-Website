// Talking to RMD's website chat (Iconik's CRM, the `chat` function). The
// chat's id and secret stay in this browser (localStorage) so the
// conversation survives page changes and reloads; RMD keeps only a hash of
// the secret. JSON is sent as text/plain, so the browser needs no preflight.

const ENDPOINT: string | undefined =
  import.meta.env.VITE_RMD_CHAT_URL || (import.meta.env.PROD ? 'https://winicrmzmcgfwrrynoxd.supabase.co/functions/v1/chat' : undefined)

// RMD's Turnstile widget (a public key; theiconikstudios.com is on its list of
// allowed sites). Cloudflare's always-passes test key in development.
export const TURNSTILE_SITE_KEY: string =
  import.meta.env.VITE_TURNSTILE_SITE_KEY || (import.meta.env.PROD ? '0x4AAAAAAFIlIrYhPjhivfWY' : '1x00000000000000000000AA')

/** Without RMD's address (development without VITE_RMD_CHAT_URL) the bubble isn't shown. */
export const chatAvailable = Boolean(ENDPOINT)

export type ChatMessage = { id: string; kind: 'visitor' | 'team' | 'auto' | 'ai'; author: string | null; body: string; at: string }
export type SavedChat = { id: string; secret: string; firstName: string; lastActivity: number }

export class ChatError extends Error {
  constructor(
    message: string,
    public code: string,
  ) {
    super(message)
  }
}

async function call<T>(body: object): Promise<T> {
  if (!ENDPOINT) throw new ChatError('Chat isn’t available right now.', 'unavailable')
  let response: Response
  try {
    response = await fetch(ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'text/plain' }, body: JSON.stringify(body), credentials: 'omit' })
  } catch {
    throw new ChatError('You seem to be offline. We’ll keep trying.', 'offline')
  }
  const data = await response.json().catch(() => ({}))
  if (!response.ok) throw new ChatError(data.message ?? 'Something went wrong. Please try again.', data.error ?? 'failed')
  return data as T
}

export const getConfig = () => call<{ enabled: boolean; greeting: string }>({ t: 'config' })

export const startChat = (input: { name: string; email: string; company: string; message: string; page: string; turnstile: string; website: string }) =>
  call<{ id: string; secret: string; status: string; messages: ChatMessage[] }>({ t: 'start', ...input })

export const sendMessage = (chat: SavedChat, body: string) => call<{ message: ChatMessage }>({ t: 'send', id: chat.id, secret: chat.secret, body })

export const poll = (chat: SavedChat, after: string | null) =>
  call<{ status: string; messages: ChatMessage[] }>({ t: 'poll', id: chat.id, secret: chat.secret, ...(after ? { after } : {}) })

const KEY = 'iconik-chat'

export function loadChat(): SavedChat | null {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) ?? 'null')
    return saved && typeof saved.id === 'string' && typeof saved.secret === 'string' ? saved : null
  } catch {
    return null
  }
}

export function saveChat(chat: SavedChat | null) {
  try {
    if (chat) localStorage.setItem(KEY, JSON.stringify(chat))
    else localStorage.removeItem(KEY)
  } catch {
    // Private browsing: the chat lasts until the tab closes.
  }
}

/** Turnstile's script, loaded only when someone opens the chat. */
let turnstileScript: Promise<void> | null = null
export function loadTurnstile(): Promise<void> {
  turnstileScript ??= new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
    script.async = true
    script.onload = () => resolve()
    script.onerror = () => {
      turnstileScript = null
      reject(new Error('turnstile'))
    }
    document.head.appendChild(script)
  })
  return turnstileScript
}

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, options: Record<string, unknown>) => string
      reset: (id?: string) => void
      remove: (id?: string) => void
    }
  }
}
