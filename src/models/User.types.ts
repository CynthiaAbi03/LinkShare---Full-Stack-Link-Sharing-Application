export type User = {
  id: string;
  firstName: string | null;
  lastName: string | null;
  email: string;
  password: string;
  salt: string;
  profilePicture: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type User_Public = Omit<User, 'password' | 'salt' | 'profilePicture'>;

export type AuthUser = {
  id: string;
  firstName: string | null;
  lastName: string | null;
  email: string;
  profilePicture: string | null;
};
