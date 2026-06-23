import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { rtkQueryApi } from 'app/api/rtkQueryApi';

export const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    dispatch(rtkQueryApi.util.resetApiState());
    navigate('/login');
  }, [dispatch, navigate]);

  return { logout };
};
