import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getSessionStorageItem } from '../../helpers/sessionStorage';
import { access_token } from '../../constants';

export function AppLayout() {
  const { isLoggedIn } = useSelector((state) => state.userData);
  const token = getSessionStorageItem(access_token);
  return <>{!isLoggedIn && !token ? <Navigate to="/" /> : <Outlet />}</>;
}
