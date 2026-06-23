export interface UserData {
  _id: string;
  fullName: string;
  email: string;
  avatarUrl?: string;
  token?: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  fullName: string;
  email: string;
  password: string;
}
