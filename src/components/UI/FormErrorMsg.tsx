import { twMerge } from "tailwind-merge"
interface FormErrorMsgProps {
  text: string
  className?: string
}

export default function FormErrorMsg({ text, className }: FormErrorMsgProps) {
  return text.length > 0 ? (
    <p className={twMerge("text-red-500 text-xs", className)}>{text}</p>
  ) : null
}
