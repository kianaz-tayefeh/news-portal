import { FALLBACK_IMAGE } from '@/constants/common.constants'

type ImageProps = {
  title: string
  imageUrl?: string
}

export const Image = ({ title, imageUrl }: ImageProps) => {
  if (!imageUrl) {
    return (
      <div className='flex h-48 w-full items-center justify-center rounded-t-lg bg-gray-100 text-sm text-gray-400'>
        No image available
      </div>
    )
  }

  return (
    <div className='overflow-hidden rounded-t-lg'>
      <img
        src={imageUrl}
        alt={title}
        loading='lazy'
        className='h-48 w-full object-cover'
        onError={event => {
          event.currentTarget.src = FALLBACK_IMAGE
        }}
      />
    </div>
  )
}
