export interface UserBase {
  id: string;
  name: string;
  email: string;
  imageUrl: string;
}
  
export interface UserCredits {
  credits: number;
}
  
export type UserDetail = UserBase & UserCredits;