import { Modal } from 'antd';

interface LogoutModalProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const LogoutModal = ({
  open,
  onConfirm,
  onCancel,
}: LogoutModalProps) => {
  return (
    <Modal
      title="Подтверждение выхода"
      open={open}
      onOk={onConfirm}
      onCancel={onCancel}
      cancelText="Назад"
      okText="Выйти"
      centered
    >
      <p>Вы действительно хотите выйти из аккаунта</p>
    </Modal>
  );
};
