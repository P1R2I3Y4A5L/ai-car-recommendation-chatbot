/**
 * Skeleton Loader Component
 * Polished pulsing placeholders for loading states.
 */

export function renderCarCardSkeleton() {
  return `
    <div class="rounded-3xl border border-slate-800/80 bg-slate-900/60 overflow-hidden animate-pulse flex flex-col h-[480px]">
      <div class="h-56 bg-slate-800/70 w-full relative">
        <div class="absolute top-4 left-4 h-6 w-24 bg-slate-700/60 rounded-full"></div>
        <div class="absolute top-4 right-4 h-9 w-9 bg-slate-700/60 rounded-xl"></div>
      </div>
      <div class="p-6 flex-1 flex flex-col justify-between">
        <div>
          <div class="h-4 w-20 bg-slate-700/50 rounded mb-2"></div>
          <div class="h-7 w-48 bg-slate-700/70 rounded mb-3"></div>
          <div class="h-5 w-28 bg-slate-700/60 rounded mb-6"></div>
          <div class="grid grid-cols-2 gap-2 mb-4">
            <div class="h-8 bg-slate-800/80 rounded-xl"></div>
            <div class="h-8 bg-slate-800/80 rounded-xl"></div>
            <div class="h-8 bg-slate-800/80 rounded-xl"></div>
            <div class="h-8 bg-slate-800/80 rounded-xl"></div>
          </div>
        </div>
        <div class="flex gap-3 pt-4 border-t border-slate-800">
          <div class="h-10 bg-slate-800 rounded-xl flex-1"></div>
          <div class="h-10 bg-slate-800 rounded-xl flex-1"></div>
        </div>
      </div>
    </div>
  `;
}

export function renderDashboardSkeleton() {
  return `
    <div class="space-y-8 animate-pulse">
      <div class="h-48 rounded-3xl bg-slate-800/60 w-full"></div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div class="h-32 rounded-2xl bg-slate-800/60"></div>
        <div class="h-32 rounded-2xl bg-slate-800/60"></div>
        <div class="h-32 rounded-2xl bg-slate-800/60"></div>
        <div class="h-32 rounded-2xl bg-slate-800/60"></div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        ${renderCarCardSkeleton()}
        ${renderCarCardSkeleton()}
        ${renderCarCardSkeleton()}
      </div>
    </div>
  `;
}
