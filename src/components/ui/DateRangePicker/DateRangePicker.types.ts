export type DateRangePickerProps = {
  fromDate?: string
  toDate?: string
  disabled?: boolean
  onChange: (value: { fromDate?: string; toDate?: string }) => void
}
