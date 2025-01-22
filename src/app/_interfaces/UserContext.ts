import { UserDetail } from './User';

export interface UserDetailContextProps {
  userDetail: UserDetail;
  setUserDetail: React.Dispatch<React.SetStateAction<UserDetail>>;
}
