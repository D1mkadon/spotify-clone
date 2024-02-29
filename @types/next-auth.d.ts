import { DefaultSession } from "next-auth";
declare module "next-auth" {
  interface Session {
    expires_at: string | unknown;
    id: string | unknown;
    access_token: string | unknown;
    refresh_token: string | unknown;
    user: {} & DefaultSession["user"];
  }
}
