import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

export default function CarNotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center py-20 px-4">
        <div className="text-center max-w-md">
          <p className="text-6xl mb-4">🔍</p>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Car Model Not Found</h1>
          <p className="text-slate-500 mb-6 text-sm">
            We couldn&apos;t locate that car profile. It may have been removed, renamed, or the identifier might be invalid.
          </p>
          <Link
            href="/explore"
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm"
          >
            <ChevronLeft className="w-4 h-4" />
            Return to Explore
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
