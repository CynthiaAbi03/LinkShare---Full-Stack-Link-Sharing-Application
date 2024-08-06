export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  salt: string;
  profilePicture: string;
  createdAt: Date;
  updatedAt: Date;
};

export type User_Public = Omit<User, 'password' | 'salt'>;

export type AuthUser = {
  id: string;
  firstName: string | null;
  lastName: string | null;
  email: string;
  profilePicture: string | null;
};
