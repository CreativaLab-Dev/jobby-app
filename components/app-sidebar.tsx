"use client"

import { FileText, BarChart3, TrendingUp, Home } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"

const items = [
  {
    title: "Inicio",
    url: "/",
    icon: Home,
    iconColor: "text-blue-500",
    hoverColor: "hover:text-blue-600",
    bgHover: "hover:bg-blue-50",
    activeGradient: "bg-gradient-to-r from-blue-400 to-blue-600",
  },
  {
    title: "Mis CVs",
    url: "/cv",
    icon: FileText,
    iconColor: "text-emerald-500",
    hoverColor: "hover:text-emerald-600",
    bgHover: "hover:bg-emerald-50",
    activeGradient: "bg-gradient-to-r from-emerald-400 to-emerald-600",
  },
  {
    title: "Scores",
    url: "/scores",
    icon: BarChart3,
    iconColor: "text-purple-500",
    hoverColor: "hover:text-purple-600",
    bgHover: "hover:bg-purple-50",
    activeGradient: "bg-gradient-to-r from-purple-400 to-purple-600",
  },
  {
    title: "Ir por más",
    url: "/opportunities",
    icon: TrendingUp,
    iconColor: "text-orange-500",
    hoverColor: "hover:text-orange-600",
    bgHover: "hover:bg-orange-50",
    activeGradient: "bg-gradient-to-r from-orange-400 to-orange-600",
  },
]

export function AppSidebar() {
  return (
    <Sidebar
      side="left"
      variant="inset"
      collapsible="icon"
      className="z-[100] border-0 shadow-2xl bg-white/95 backdrop-blur-sm overflow-visible bg-gradient-to-br from-blue-50 via-white to-indigo-50"
    >
      {/*<SidebarHeader className="border-b border-gray-100">*/}
      {/*  <div className="flex items-center justify-center p-2">*/}
      {/*    <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center animate-pulse">*/}
      {/*      <span className="text-white font-bold text-sm">CV</span>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</SidebarHeader>*/}
      
      <SidebarContent className="bg-transparent overflow-visible">
        <SidebarGroup className="px-2 py-4 overflow-visible">
          <SidebarGroupContent className="overflow-visible">
            <SidebarMenu className="space-y-3 overflow-visible">
              {items.map((item) => (
                <SidebarMenuItem key={item.title} className="overflow-visible">
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    className={`
                      relative group h-12 w-12 rounded-xl transition-all duration-300
                      ${item.bgHover} hover:scale-110 hover:shadow-lg hover:-translate-y-1
                      border-0 justify-center items-center
                      data-[active=true]:${item.activeGradient}
                      data-[active=true]:text-white data-[active=true]:shadow-lg
                      overflow-visible z-[110]
                    `}
                  >
                    <Link href={item.url} className="flex items-center justify-center w-full h-full">
                      <item.icon
                        className={`w-10 h-10 ${item.iconColor} ${item.hoverColor} group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}
                      />
                      <span className="sr-only">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        {/* Decorative element */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <div className="w-8 h-1 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full opacity-30"></div>
        </div>
      </SidebarContent>
    </Sidebar>
  )
}
