import { SvgIcon } from '@mui/material'

export function Logo(props: {className?: string}) {
  return (
    <SvgIcon {...props} viewBox="0 0 24 24">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      <path d="M13 8H7" />
      <path d="M17 12H7" />
    </SvgIcon>
  )
}