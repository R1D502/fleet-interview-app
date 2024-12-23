import React from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background">
        <AppSidebar />
        <main className="flex-1">
          <div className="flex h-16 lg:h-[70px] items-center border-b px-6">
            <SidebarTrigger />
          </div>
          <div className="p-4 md:p-6 lg:p-8 max-w-[1400px] mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}
