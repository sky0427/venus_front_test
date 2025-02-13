import { Cookies } from "react-cookie";

const cookies = new Cookies();

const setCookie = (name: any, value: any, options: any) => {
  return cookies.set(name, value, { ...options });
};

const getCookie = (name: any) => {
  return cookies.get(name);
};

const removeCookie = (name: any) => {
  return cookies.remove(name, { path: "/" });
};

export { getCookie, removeCookie, setCookie };
