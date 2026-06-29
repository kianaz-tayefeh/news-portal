// import { useState } from 'react'

// import Image from 'next/image'

// import {
//   IMAGE_LOADER_MINIMUM_TIME_FOR_ANIMATION,
//   IMAGE_LOADER_STATES,
// } from '@/constants/image.constants'
// import { cn } from '@/helpers/common.helpers'

// import Skeleton from 'react-loading-skeleton'
// import 'react-loading-skeleton/dist/skeleton.css'

// type ImageLoaderProps = {
//   src: string
//   alt?: string
//   width?: number
//   height?: number
//   className?: string
// }

// export const ImageLoader: React.FC<ImageLoaderProps> = props => {
//   const { src, alt = 'image', className, width, height } = props

//   const [imageState, setImageState] = useState(IMAGE_LOADER_STATES.loading)
//   const [mountingTime] = useState(new Date().getTime())

//   const handleLoadImage = () => {
//     const loadedTime = new Date().getTime() - mountingTime
//     setImageState(
//       loadedTime < IMAGE_LOADER_MINIMUM_TIME_FOR_ANIMATION
//         ? IMAGE_LOADER_STATES.cached
//         : IMAGE_LOADER_STATES.loaded,
//     )
//   }

//   return (
//     <div className={cn('relative', className)} style={{ width, height }}>
//       {imageState === IMAGE_LOADER_STATES.loading && <Skeleton width={width} height={height} />}
//       <Image
//         src={src}
//         onLoad={handleLoadImage}
//         alt={alt}
//         width={width}
//         height={height}
//         priority
//         className={cn(
//           'max-w-full select-none transition-opacity duration-400',
//           imageState === IMAGE_LOADER_STATES.loading && 'opacity-0 w-0 h-0',
//           imageState === IMAGE_LOADER_STATES.cached && 'transition-none',
//         )}
//       />
//     </div>
//   )
// }
