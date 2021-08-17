import { Roles } from "./roles";

export interface UserModel {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  token: string;
  type: string;
  roles: Roles;
  id: number;
  localityId: number;
}
