export const PAGINATION_LIMIT = 12;

const HOME = "";
const LOGIN = "login";
const REGISTRATION = "registration";
const ANNOUNCEMENTS = "announcements";
const ISSUES = "issues";

export const USER_FACING_LOCATIONS: any = {
  [LOGIN]: "Login",
  [REGISTRATION]: "Registration",
  [HOME]: "Home",
  [ANNOUNCEMENTS]: "Announcements",
  [ISSUES]: "Issues",
};

export const IS_AUTHENTICATED_LOCATIONS = [
  {
    value: HOME,
    userFacing: USER_FACING_LOCATIONS[HOME],
  },
  {
    value: ANNOUNCEMENTS,
    userFacing: USER_FACING_LOCATIONS[ANNOUNCEMENTS],
  },
  {
    value: ISSUES,
    userFacing: USER_FACING_LOCATIONS[ISSUES],
  },
];

export const NOT_AUTHENTICATED_LOCATIONS = [
  {
    value: LOGIN,
    userFacing: USER_FACING_LOCATIONS[LOGIN],
  },
  {
    value: REGISTRATION,
    userFacing: USER_FACING_LOCATIONS[REGISTRATION],
  },
];
