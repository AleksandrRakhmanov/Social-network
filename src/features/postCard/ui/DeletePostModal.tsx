import { Modal } from 'antd';

interface DeletePostModalProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const DeletePostModal = ({
  open,
  onConfirm,
  onCancel,
}: DeletePostModalProps) => {
  return (
    <Modal
      title="Подтверждение удаления"
      open={open}
      onOk={onConfirm}
      onCancel={onCancel}
      cancelText="Отмена"
      okText="Удалить"
      okButtonProps={{ danger: true }}
      centered
    >
      <p>Вы действительно хотите удалить пост?</p>
    </Modal>
  );
};
