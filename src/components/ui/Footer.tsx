import Link from "next/link";
import { Zap } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-100 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-orange-500 rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold text-slate-900">
              Vroo<span className="text-orange-500">my</span>
            </span>
          </Link>

          <div className="flex items-center gap-6 text-sm text-slate-500">
            <Link href="/explore" className="hover:text-slate-900 transition-colors">
              Explore Cars
            </Link>
            <Link href="/compare" className="hover:text-slate-900 transition-colors">
              Compare
            </Link>
            <Link href="/chat" className="hover:text-slate-900 transition-colors">
              AI Chat
            </Link>
          </div>

          <p className="text-xs text-slate-400 text-center">
            Demo data only — prices & specs are illustrative.{" "}
            <br className="sm:hidden" />
            Verify with official sources before purchase.
          </p>
        </div>
      </div>
    </footer>
  );
}
