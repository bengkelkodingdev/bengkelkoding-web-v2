import Cookies from "js-cookie";

const access_token = Cookies.get("access_token");

export const loggedIn = () => {
  return access_token !== undefined;
};
