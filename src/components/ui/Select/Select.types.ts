export type SelectOption = {
  value: string
  label: string
}

export type SelectProps = {
  options: SelectOption[]
  value?: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
  data_testid: string
}
