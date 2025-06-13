import { cn } from "@/lib/utils";

import SidebarComp from "@/components/layout/sidebar";

export default function VaaniLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "mx-auto flex w-screen flex-1 flex-col overflow-hidden rounded-md border border-neutral-200 bg-gray-100 md:flex-row dark:border-neutral-700 dark:bg-neutral-800",
        "h-screen" // for your use case, use `h-screen` instead of `h-[60vh]`
      )}
    >
      <SidebarComp />
      <main className="w-full h-[100vh] overflow-y-hidden bg-white pt-12">
        {children}
      </main>
    </div>
  );
}
