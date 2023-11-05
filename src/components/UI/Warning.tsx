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
  isLoading?: boolean
}

export default function Warning({
  isOpen,
  onCloseModal,
  warningMsg,
  onConfirm,
  onCancel,
  warningTitle,
  isLoading,
}: WarningProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onCloseModal}
      cardTitle={`Warning: ${warningTitle}`}
    >
      {isLoading ? (
        <div className="flex items-center">Loading...</div>
      ) : (
        <div className="w-full flex flex-col gap-2">
          <Text text={warningMsg} />
          <Text text="Are you sure?" />
          <YesNoBtnGroup onClickConfirm={onConfirm} onClickDecline={onCancel} />
        </div>
      )}
    </Modal>
  )
}

Warning.defaultProps = {
  isLoading: false,
}
