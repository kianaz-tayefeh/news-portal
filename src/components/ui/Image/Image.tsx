import type { ImageProps } from './Image.types'

const fallbackImage = '/images/fallback-news.svg'

export const Image = ({ title, imageUrl }: ImageProps) => {
  return (
    <div className='overflow-hidden rounded-t-lg'>
      <img
        src={imageUrl || fallbackImage}
        alt={title}
        loading='lazy'
        className='h-48 w-full object-cover'
        onError={event => {
          event.currentTarget.src = fallbackImage
        }}
      />
    </div>
  )
}
