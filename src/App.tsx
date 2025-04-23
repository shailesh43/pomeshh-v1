
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AppSidebar from "@/components/AppSidebar";
import { PomodoroProvider } from "@/context/PomodoroProvider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ThemeProvider } from "@/context/ThemeProvider";
import Notes from "./pages/Notes";
// Add imports for missing pages
import Timer from "./pages/Timer";
import Tasks from "./pages/Tasks";
import Activity from "./pages/Activity";
import Appearance from "./pages/Appearance";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <PomodoroProvider>
          <ThemeProvider>
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
                      <Route path="/appearance" element={<Appearance />} />
                      <Route path="/notes" element={<Notes />} />
                      <Route path="/profile" element={<Navigate to="/appearance" replace />} />
                      <Route path="/settings/general" element={<Navigate to="/appearance" replace />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </main>
                </div>
                <Toaster />
                <Sonner />
              </SidebarProvider>
            </BrowserRouter>
          </ThemeProvider>
        </PomodoroProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;

