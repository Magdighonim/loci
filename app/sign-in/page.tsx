import Link from "next/link";
import { Map } from "lucide-react";
import { Button, Card } from "@/components/ui";

export default function SignInPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-slate-50 p-6">
      <Card className="w-full max-w-md">
        <div className="mb-8 flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-brand-600 text-white">
            <Map size={20} />
          </span>
          <div>
            <h1 className="text-xl font-bold">Sign in</h1>
            <p className="text-sm text-mutedInk">Mock auth screen for MVP demo.</p>
          </div>
        </div>
        <div className="space-y-4">
          <input className="w-full rounded-2xl border border-slate-200 px-4 py-3" placeholder="Email" />
          <input className="w-full rounded-2xl border border-slate-200 px-4 py-3" placeholder="Password" type="password" />
          <Link href="/dashboard" className="block">
            <Button className="w-full">Continue to dashboard</Button>
          </Link>
        </div>
        <p className="mt-6 text-center text-sm text-mutedInk">
          No account? <Link className="font-semibold text-brand-600" href="/sign-up">Create one</Link>
        </p>
      </Card>
    </main>
  );
}
