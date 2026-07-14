import { redirect } from "react-router-dom";

export function checkLogin() {
  if (!localStorage.access_token) {
    return redirect("/auth/login");
  }

  return null;
}

export function preventAuth() {
  if (localStorage.access_token) {
    return redirect("/");
  }

  return null;
}
