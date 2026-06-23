import { useState } from 'react';
import { LogoutModal } from './LogoutModal';
import { useLogout } from '../model/logout';

export const LogoutButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useLogout();

  return (
    <>
      <span onClick={() => setIsOpen(true)}>Выйти</span>
      <LogoutModal
        open={isOpen}
        onConfirm={logout}
        onCancel={() => setIsOpen(false)}
      />
    </>
  );
};
