import { Roles } from "./roles";

export interface UserModel {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  token: string;
  type: string;
  role: Roles;
  id: number;
  localityId: number;
}
