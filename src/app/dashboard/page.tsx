import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { SessionData, sessionOptions } from "@/lib/session";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function DashboardPage() {
    const session = await getIronSession<SessionData>(
        await cookies(),
        sessionOptions
    );

    if (!session.isLoggedIn) {
        redirect("/login");
    }

    return (
        <main className="min-h-screen bg-background p-6">
            <div className="max-w-lg mx-auto">
                <h1 className="text-2xl font-bold text-text-main mb-1">
                    Welcome back, {session.firstName}
                </h1>
                <p className="text-text-muted text-sm mb-8">
                    Ready to practice?
                </p>

                <Link
                    href="/setup"
                    className="block w-full bg-primary hover:bg-primary-hover text-white text-center rounded-2xl py-4 text-lg font-medium transition-colors"
                >
                    Start an Exercise
                </Link>
            </div>
        </main>
    );
}