import { Outlet, Navigate } from 'react-router-dom';
import { useIsLoggedIn } from '../../helpers/customHooks';

export function AppLayout() {
  const isLoggedIn = useIsLoggedIn();

  return <>{!isLoggedIn ? <Navigate to="/" /> : <Outlet />}</>;
}
