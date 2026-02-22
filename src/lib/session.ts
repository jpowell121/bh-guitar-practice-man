import { SessionOptions } from "iron-session";

export interface SessionData {
    userId: number;
    email: string;
    firstName: string;
    isLoggedIn: boolean;
}

export const sessionOptions: SessionOptions = {
    password: process.env.SESSION_SECRET as string,
    cookieName: "guitar-practice-session",
    cookieOptions: {
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
    },
};
