import { photoMeta, photoSrc } from '../lib/content'

export default function Photo({ file, alt = '', sizes = '100vw', eager = false, className }) {
  const { width, height, srcSet } = photoMeta(file)
  return (
    <img
      className={className}
      src={photoSrc(file)}
      srcSet={srcSet}
      sizes={sizes}
      width={width}
      height={height}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
    />
  )
}
