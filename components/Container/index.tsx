import { FC } from "react"

type Props = {
  children: React.ReactNode
  className?: string
}

export const Container: FC<Props> = ({ children, ...props }) => {
  return (
    <div {...props} className={`container mx-auto px-4 ${props.className}`}>
      {children}
    </div>
  )
}