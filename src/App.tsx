
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AppSidebar from "@/components/AppSidebar";
import { PomodoroProvider } from "@/context/PomodoroProvider";
import { SidebarProvider } from "@/components/ui/sidebar";

// Pages
import Timer from "@/pages/Timer";
import Tasks from "@/pages/Tasks";
import Activity from "@/pages/Activity";
import Profile from "@/pages/Profile";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <PomodoroProvider>
        <BrowserRouter>
          <SidebarProvider>
            <div className="flex min-h-screen bg-[#181615] text-white overflow-x-hidden w-full">
              <AppSidebar />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/timer" element={<Timer />} />
                  <Route path="/tasks" element={<Tasks />} />
                  <Route path="/activity" element={<Activity />} />
                  <Route path="/profile" element={<Profile />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </div>
            <Toaster />
            <Sonner />
          </SidebarProvider>
        </BrowserRouter>
      </PomodoroProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

