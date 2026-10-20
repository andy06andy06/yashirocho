// Single entry point for everything editable: the YAML files in /content
// and the photo sizes produced by scripts/build-assets.mjs.
import site from '../../content/site.yaml'
import home from '../../content/home.yaml'
import ui from '../../content/ui.yaml'
import faq from '../../content/faq.yaml'
import amenities from '../../content/amenities.yaml'
import media from '../generated/media.json'

const villaFiles = import.meta.glob('../../content/villas/*.yaml', { eager: true, import: 'default' })

export const villas = Object.values(villaFiles).sort((a, b) => (a.order ?? 99) - (b.order ?? 99))
export const findVilla = (id) => villas.find(v => v.id === id)

export { site, home, ui, faq, amenities }

export const LOCALES = [
  { code: 'zh', short: '中', name: '繁體中文', html: 'zh-Hant-TW' },
  { code: 'en', short: 'EN', name: 'English', html: 'en' },
  { code: 'ja', short: '日', name: '日本語', html: 'ja' }
]

// A text field is either a plain value or { zh, en, ja }. Missing translations fall back to zh.
export function pick(value, locale) {
  if (value == null) return ''
  if (typeof value !== 'object' || Array.isArray(value)) return value
  const text = value[locale]
  return text === undefined || text === null || text === '' ? (value.zh ?? '') : text
}

// Photos are referenced by their path under content/photos/, e.g. "red/IMG_2336.jpg".
export const asPhoto = (entry) => (typeof entry === 'string' ? { file: entry } : entry)

export function photoSrc(file, size = 'large') {
  const base = file.replace(/\.[^.\/]+$/, '')
  return encodeURI(`/media/${base}${size === 'thumb' ? '.thumb' : ''}.webp`)
}

const THUMB = 720

export function photoMeta(file) {
  const size = media[file]
  if (!size) return { width: undefined, height: undefined, srcSet: undefined }
  const scale = Math.min(1, THUMB / Math.max(size.w, size.h))
  const thumbW = Math.round(size.w * scale)
  return {
    width: size.w,
    height: size.h,
    srcSet: `${photoSrc(file, 'thumb')} ${thumbW}w, ${photoSrc(file)} ${size.w}w`
  }
}
