// https://next-auth.js.org/tutorials/securing-pages-and-api-routes
export { default } from "next-auth/middleware";

const frontPrivate = ["/dashboard/:path*"];
const apiPrivate = ["/api/users/:path*"];

export const config = {
  matcher: [...apiPrivate, ...frontPrivate],
  redirect: "/",
};
