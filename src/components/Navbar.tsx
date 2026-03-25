import Link from "next/link";
import { WalletConnect } from "./WalletConnect";
import { ThemeToggle } from "./ThemeToggle";
import { NotificationToggle } from "./notifications/NotificationToggle";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "./ui/Button";

export function Navbar() {
  const { user, signOut } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-dark-900/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold text-white">
          <span className="text-brand-400">&#x2B21;</span> NeuroWealth
        </Link>

        <div className="hidden md:flex items-center gap-6 text-sm text-slate-400">
          <Link href="#features" className="hover:text-white transition-colors">Features</Link>
          <Link href="#how-it-works" className="hover:text-white transition-colors">How it works</Link>
          <Link href="#strategies" className="hover:text-white transition-colors">Strategies</Link>
          <Link href="/help" className="hover:text-white transition-colors">Help</Link>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/help" className="md:hidden text-sm text-slate-400 hover:text-white transition-colors">
            Help
          </Link>
          <NotificationToggle />
          <WalletConnect />
          {user ? (
            <div className="flex items-center gap-3 ml-2 pl-4 border-l border-white/10">
              <div className="flex flex-col items-end">
                <span className="text-[10px] text-slate-500 uppercase font-bold leading-none">Account</span>
                <span className="text-xs text-white font-medium">{user.name}</span>
              </div>
              <button
                onClick={signOut}
                className="text-[10px] text-slate-500 hover:text-red-400 transition-colors uppercase font-bold"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <Link href="/signin">
              <Button variant="secondary" size="sm" className="text-xs h-9">
                Sign In
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
