// import { RefObject } from 'react'
// import { useVirtualizer } from '@tanstack/react-virtual'

// export const useRowVirtualizer = (
//   containerRef: RefObject<HTMLDivElement | null>,
//   totalItems: number,
//   columns: number,
//   size: number,
// ) => {
//   return useVirtualizer({
//     count: Math.ceil(totalItems / columns),
//     getScrollElement: () => containerRef.current,
//     estimateSize: () => size,
//     overscan: 1,
//   })
// }
