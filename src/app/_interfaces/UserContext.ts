import { UserDetail } from './user';

export interface UserDetailContextProps {
  userDetail: UserDetail;
  setUserDetail: React.Dispatch<React.SetStateAction<UserDetail>>;
}
