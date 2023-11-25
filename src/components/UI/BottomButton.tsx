import PrimaryButton from "./PrimaryButton"

interface BottomButtonProps {
  onClick: () => void
  label: string
}

export default function BottomButton({ onClick, label }: BottomButtonProps) {
  return (
    <PrimaryButton
      onClick={onClick}
      type="button"
      label={label}
      className="fixed bottom-0 left-0 w-full rounded-t-2xl rounded-b-none py-6 flex items-center justify-center gap-2"
    />
  )
}
