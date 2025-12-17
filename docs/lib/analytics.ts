'use client'

export type AnalyticsPayload = Record<string, unknown> | undefined

export function track(event: string, data?: AnalyticsPayload) {
  if (typeof window === 'undefined') return
  const fn = (window as any)?.umami?.track
  if (typeof fn !== 'function') return
  fn(event, data)
}

