import React from "react"

interface FormErrorMsgProps {
  text: string
}

export default function FormErrorMsg({ text }: FormErrorMsgProps) {
  return text.length > 0 ? <p className="text-red-500 text-xs">{text}</p> : null
}
