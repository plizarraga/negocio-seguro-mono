import { Role } from './role.model';

// export interface User {
//   id?: string;
//   name: string;
//   email?: string;
//   role?: Role;
//   jwtToken?: string;
// }

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
}

export interface LoginResponse {
  user: User;
  accessToken: string;
}
