import { createContext } from 'react';
import { UserDetailContextProps } from '@/app/_interfaces/userContext';
import { UserDetail } from '@/app/_interfaces/user';

const defaultUserDetail: UserDetail = {
  id: '',
  name: '',
  email: '',
  imageUrl: '',
  credits: 0,
};

export const UserDetailContext = createContext<UserDetailContextProps>({
  userDetail: defaultUserDetail,
  setUserDetail: () => {},
});
