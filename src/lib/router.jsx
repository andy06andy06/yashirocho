// Two routes (/ and /villa/:id) don't justify a router dependency;
// this keeps URLs real so a villa page can be shared and reloaded.
import { useSyncExternalStore } from 'react'

const CHANGE = 'app:navigate'

const subscribe = (callback) => {
  window.addEventListener('popstate', callback)
  window.addEventListener(CHANGE, callback)
  return () => {
    window.removeEventListener('popstate', callback)
    window.removeEventListener(CHANGE, callback)
  }
}

const snapshot = () => window.location.pathname + window.location.hash

export function useLocation() {
  const value = useSyncExternalStore(subscribe, snapshot)
  const hashAt = value.indexOf('#')
  return hashAt === -1
    ? { pathname: value, hash: '' }
    : { pathname: value.slice(0, hashAt), hash: value.slice(hashAt + 1) }
}

// Scrolls to #hash once the target exists (it may only render after a route change),
// or to the top for a hashless page change.
export function scrollToHash(hash) {
  const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  let tries = 0
  const attempt = () => {
    if (!hash) return window.scrollTo({ top: 0 })
    const el = document.getElementById(hash)
    if (el) el.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto' })
    else if (tries++ < 30) requestAnimationFrame(attempt)
  }
  requestAnimationFrame(attempt)
}

export function navigate(to) {
  if (to !== snapshot()) {
    window.history.pushState({}, '', to)
    window.dispatchEvent(new Event(CHANGE))
  }
  const hashAt = to.indexOf('#')
  scrollToHash(hashAt === -1 ? '' : to.slice(hashAt + 1))
}

export function Link({ to, onClick, children, ...rest }) {
  const handleClick = (e) => {
    onClick?.(e)
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    e.preventDefault()
    navigate(to)
  }
  return <a href={to} onClick={handleClick} {...rest}>{children}</a>
}

export function matchVilla(pathname) {
  const m = pathname.match(/^\/villa\/([\w-]+)\/?$/)
  return m ? m[1] : null
}
