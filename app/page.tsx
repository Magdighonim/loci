import Link from "next/link";
import { ArrowRight, BarChart3, Map, ShieldCheck, Sparkles } from "lucide-react";
import { Button, Card } from "@/components/ui";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_right,#E0E7FF,transparent_35%),#F8FAFC]">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <Link href="/" className="flex items-center gap-3 text-xl font-bold text-ink">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-brand-600 text-white">
            <Map size={20} />
          </span>
          LocIntel
        </Link>
        <div className="flex items-center gap-3">
          <Link href="/sign-in" className="text-sm font-semibold text-mutedInk">
            Sign in
          </Link>
          <Link href="/dashboard">
            <Button>Open demo</Button>
          </Link>
        </div>
      </nav>

      <section className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-16 lg:grid-cols-[1fr_0.9fr]">
        <div>
          <p className="mb-4 inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold text-brand-700 shadow-sm">
            Synthetic location intelligence MVP
          </p>
          <h1 className="max-w-3xl text-5xl font-bold tracking-tight text-ink md:text-7xl">
            Understand locations before you bet on them.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-mutedInk">
            Search locations, estimate traffic trends, compare competitors, visualize visitor origins,
            and generate decision-ready reports using safe synthetic demo data.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/dashboard">
              <Button className="px-6 py-3">
                Launch MVP demo <ArrowRight size={18} />
              </Button>
            </Link>
            <Link href="/map">
              <Button variant="secondary" className="px-6 py-3">
                Explore map
              </Button>
            </Link>
          </div>
        </div>

        <Card className="p-4">
          <div className="rounded-3xl bg-ink p-5 text-white">
            <div className="mb-5 flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-300">Location score</p>
              <Sparkles className="text-brand-100" size={18} />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-white/10 p-4">
                <BarChart3 size={20} />
                <p className="mt-8 text-3xl font-bold">26.4K</p>
                <p className="text-sm text-slate-300">Monthly visits</p>
              </div>
              <div className="rounded-2xl bg-white/10 p-4">
                <ShieldCheck size={20} />
                <p className="mt-8 text-3xl font-bold">Safe</p>
                <p className="text-sm text-slate-300">Synthetic data mode</p>
              </div>
            </div>
            <div className="mt-4 h-64 rounded-3xl bg-[linear-gradient(135deg,rgba(99,102,241,.35),rgba(16,185,129,.2)),url('https://tile.openstreetmap.org/11/1202/860.png')] bg-cover" />
          </div>
        </Card>
      </section>
    </main>
  );
}
