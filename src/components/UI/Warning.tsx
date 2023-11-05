import Modal from "./Modal"
import YesNoBtnGroup from "./YesNoBtnGroup"
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
        <YesNoBtnGroup onClickConfirm={onConfirm} onClickDecline={onCancel} />
      </div>
    </Modal>
  )
}
