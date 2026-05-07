import Link from "next/link";
import { Button, Card } from "@/components/ui";

export default function SignUpPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-slate-50 p-6">
      <Card className="w-full max-w-md">
        <h1 className="text-2xl font-bold">Create account</h1>
        <p className="mt-2 text-sm text-mutedInk">Replace this screen with Clerk, Supabase Auth, or NextAuth.</p>
        <div className="mt-6 space-y-4">
          <input className="w-full rounded-2xl border border-slate-200 px-4 py-3" placeholder="Company name" />
          <input className="w-full rounded-2xl border border-slate-200 px-4 py-3" placeholder="Work email" />
          <input className="w-full rounded-2xl border border-slate-200 px-4 py-3" placeholder="Password" type="password" />
          <Link href="/dashboard" className="block">
            <Button className="w-full">Create demo account</Button>
          </Link>
        </div>
      </Card>
    </main>
  );
}
