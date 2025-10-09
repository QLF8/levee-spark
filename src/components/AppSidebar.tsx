import { 
  Building2, 
  Heart, 
  Leaf, 
  Cpu, 
  Wallet, 
  GraduationCap,
  Utensils,
  Shield,
  Sparkles,
  Home
} from "lucide-react";
import { NavLink } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const industries = [
  { title: "Tous les secteurs", url: "/deals", icon: Home, param: "" },
  { title: "CleanTech", url: "/deals?industry=CleanTech", icon: Leaf, param: "CleanTech" },
  { title: "HealthTech", url: "/deals?industry=HealthTech", icon: Heart, param: "HealthTech" },
  { title: "FinTech", url: "/deals?industry=FinTech", icon: Wallet, param: "FinTech" },
  { title: "EdTech", url: "/deals?industry=EdTech", icon: GraduationCap, param: "EdTech" },
  { title: "FoodTech", url: "/deals?industry=FoodTech", icon: Utensils, param: "FoodTech" },
  { title: "CyberSecurity", url: "/deals?industry=CyberSecurity", icon: Shield, param: "CyberSecurity" },
  { title: "AI & ML", url: "/deals?industry=AI", icon: Cpu, param: "AI" },
  { title: "SaaS", url: "/deals?industry=SaaS", icon: Building2, param: "SaaS" },
];

const stages = [
  { title: "Pre-seed", url: "/deals?stage=Pre-seed", icon: Sparkles, param: "Pre-seed" },
  { title: "Seed", url: "/deals?stage=Seed", icon: Sparkles, param: "Seed" },
  { title: "Series A", url: "/deals?stage=Series A", icon: Sparkles, param: "Series A" },
  { title: "Series B+", url: "/deals?stage=Series B", icon: Sparkles, param: "Series B" },
];

export function AppSidebar() {
  return (
    <Sidebar className="border-r border-border">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-base font-semibold">Secteurs</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {industries.map((item) => {
                const Icon = item.icon;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink 
                        to={item.url}
                        className={({ isActive }) => 
                          isActive ? "bg-accent/10 text-accent font-medium" : ""
                        }
                      >
                        <Icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-base font-semibold">Stades</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {stages.map((item) => {
                const Icon = item.icon;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink 
                        to={item.url}
                        className={({ isActive }) => 
                          isActive ? "bg-accent/10 text-accent font-medium" : ""
                        }
                      >
                        <Icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
