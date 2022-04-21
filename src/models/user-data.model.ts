export interface IUserData {
  id?: string;
  username?: string;
  email?: string;
  role?: string;
}

export interface IUserTips {
  id?: string;
  username?: string;
  tips?: any[];
  total?: number;
}

export interface IUserNameUpdate {
  id: string;
  newName: string;
}
