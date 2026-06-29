// import { useRef } from 'react'
// import { useResponsiveColumns } from '@/hooks/useResponsiveColumns'

// type VirtualizationProps<T> = {
//   items: T[]
//   size: number
//   component: (props: { item: T; size: number }) => JSX.Element
//   className?: string
//   columns?: number
// }

// export const Virtualization = <T,>({
//   items,
//   size,
//   component: Component,
//   className = '',
//   columns = 3,
// }: VirtualizationProps<T>) => {
//   const containerRef = useRef<HTMLDivElement | null>(null)
//   const dynamicColumns = useResponsiveColumns(columns)
//   const rowVirtualizer = useRowVirtualizer(containerRef, items.length, dynamicColumns, size)

//   return (
//     <div ref={containerRef} className={`overflow-y-auto ${className}`}>
//       <div
//         className='relative flex justify-center'
//         style={{ height: rowVirtualizer.getTotalSize() }}
//       >
//         {rowVirtualizer.getVirtualItems().map(row => {
//           const startIndex = row.index * dynamicColumns
//           const endIndex = Math.min(startIndex + dynamicColumns, items.length)
//           const rowItems = items.slice(startIndex, endIndex)

//           return (
//             <div key={row.index} className='absolute' style={{ top: `${row.start}px` }}>
//               <div
//                 className='grid gap-4'
//                 style={{ gridTemplateColumns: `repeat(${dynamicColumns}, minmax(0, 1fr))` }}
//               >
//                 {rowItems.map((item, columnIndex) => (
//                   <div key={`item-${startIndex + columnIndex}`} className='p-2'>
//                     <Component item={item} size={size} />
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )
//         })}
//       </div>
//     </div>
//   )
// }
