import { Roles } from "./roles";

export interface LocalityDto {
  title: string;
  description: string;
  city: string;
  street: string;
  role: Roles;
}
