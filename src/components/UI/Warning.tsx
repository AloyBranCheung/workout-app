import Modal from "./Modal"
import PrimaryButton from "./PrimaryButton"
import SecondaryButton from "./SecondaryButton"
import Text from "./typography/Text"

interface WarningProps {
  isOpen: boolean
  onCloseModal: () => void
  warningMsg: string
  onConfirm: () => void
  onCancel: () => void
  warningTitle: string
}

export default function Warning({
  isOpen,
  onCloseModal,
  warningMsg,
  onConfirm,
  onCancel,
  warningTitle,
}: WarningProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onCloseModal}
      cardTitle={`Warning: ${warningTitle}`}
    >
      <div className="w-full flex flex-col gap-2">
        <Text text={warningMsg} />
        <Text text="Are you sure?" />
        <div className="w-full flex gap-2 items-center justify-end">
          <SecondaryButton
            className="w-10"
            type="button"
            label="No"
            onClick={onCancel}
          />
          <PrimaryButton
            className="w-10"
            type="button"
            label="Yes"
            onClick={onConfirm}
          />
        </div>
      </div>
    </Modal>
  )
}
