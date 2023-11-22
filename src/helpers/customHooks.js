import { useSelector } from 'react-redux';
import { getSessionStorageItem } from './sessionStorage';
import { access_token } from '../constants';

export function useIsLoggedIn() {
  const { isLoggedIn } = useSelector((state) => state.userData);
  const token = !!getSessionStorageItem(access_token);

  return isLoggedIn && token;
}
