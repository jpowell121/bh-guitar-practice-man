import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { SessionData, sessionOptions } from "@/lib/session";
import { redirect } from "next/navigation";

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

                <div className="bg-surface rounded-2xl shadow-sm border border-border p-6">
                    <p className="text-text-muted text-center">
                        Your practice dashboard is coming soon.
                    </p>
                </div>
            </div>
        </main>
    );
}