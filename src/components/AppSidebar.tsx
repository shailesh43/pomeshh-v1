
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Clock, Book, BookOpen, User, Settings } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import React from "react";
import clsx from "clsx";

const sections = [
  {
    label: "General",
    items: [
      { label: "Timer", icon: Clock, to: "/timer" },
      { label: "Tasks", icon: BookOpen, to: "/tasks" },
      { label: "Activity", icon: Book, to: "/activity" },
      // Removed profile!
    ],
  },
  {
    label: "Settings",
    items: [
      // Removed General!
      { label: "Appearance", icon: Settings, to: "/appearance" },
    ],
  },
];

const AppSidebar = () => {
  const location = useLocation();
  return (
    <Sidebar className="bg-[#201d1b] min-h-screen w-[230px] px-0 shadow-2xl rounded-xl m-2">
      <SidebarContent>
        <div className="flex flex-col items-start px-4 py-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="rounded-full bg-black w-8 h-8 flex justify-center items-center font-bold text-white text-lg">
              P
            </div>
            <div>
              <div className="font-semibold text-lg text-white leading-4">Pomeshh</div>
              <div className="text-xs text-white/60">v1.0.0</div>
            </div>
          </div>
        </div>
        {sections.map(section => (
          <SidebarGroup key={section.label}>
            <SidebarGroupLabel className="uppercase px-5 pt-3 pb-1 text-white/60 text-xs tracking-wider">
              {section.label}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map(item => (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton asChild>
                      {item.to === "#" ? (
                        <span className="flex items-center px-4 py-2 gap-2 text-white/60 cursor-not-allowed">
                          <item.icon size={18} strokeWidth={1.5} />
                          <span>{item.label}</span>
                        </span>
                      ) : (
                        <NavLink
                          to={item.to}
                          className={({ isActive }) =>
                            clsx(
                              "flex items-center px-4 py-2 gap-2 rounded-lg transition text-base font-medium",
                              isActive
                                ? "bg-white text-black"
                                : "text-white/90 hover:bg-[#23201d]"
                            )
                          }
                          end
                        >
                          <item.icon size={18} strokeWidth={1.5} />
                          <span>{item.label}</span>
                        </NavLink>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;

