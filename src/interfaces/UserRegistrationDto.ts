import { Roles } from "./roles";

export interface UserRegistrationDto {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  roles: Roles[];
}
