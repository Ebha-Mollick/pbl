"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronRight, MapPin } from "lucide-react"

interface Route {
  id: string
  name: string
  description: string
  thumbnail: string
  stops: number
}

interface RoutePanelProps {
  routes: Route[]
  currentRoute?: string
  onRouteSelect: (routeId: string) => void
}

export function RoutePanel({ routes, currentRoute, onRouteSelect }: RoutePanelProps) {
  const [isExpanded, setIsExpanded] = useState(true)

  return (
    <div
      className={`fixed left-0 top-0 h-full bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-r border-slate-700/50 transition-all duration-300 z-40 ${
        isExpanded ? "w-80" : "w-20"
      } shadow-2xl`}
    >
      {/* Header */}
      <div className="p-4 border-b border-slate-700/50">
        <div className="flex items-center justify-between">
          {isExpanded && (
            <div className="flex items-center gap-2 animate-fade-in">
              <MapPin className="w-5 h-5 text-teal-400" />
              <h2 className="text-lg font-semibold text-white">Routes</h2>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-slate-400 hover:text-white hover:bg-slate-800 button-glow"
          >
            <ChevronRight className={`w-5 h-5 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
          </Button>
        </div>
      </div>

      {/* Routes List */}
      {isExpanded && (
        <div className="overflow-y-auto h-[calc(100%-73px)]">
          <div className="p-3 space-y-2">
            {routes.map((route) => (
              <button
                key={route.id}
                onClick={() => onRouteSelect(route.id)}
                className={`w-full text-left p-3 rounded-lg transition-all duration-200 group route-card ${
                  currentRoute === route.id
                    ? "bg-teal-500/20 border border-teal-400/50 shadow-lg shadow-teal-500/20"
                    : "bg-slate-800/50 border border-slate-700/30 hover:bg-slate-800 hover:border-slate-600"
                }`}
              >
                {/* Thumbnail */}
                <div className="w-full h-32 rounded mb-2 bg-slate-700 overflow-hidden border border-slate-600">
                  <img
                    src={route.thumbnail || "/placeholder.svg"}
                    alt={route.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Route Info */}
                <h3 className="font-semibold text-white text-sm">{route.name}</h3>
                <p className="text-slate-400 text-xs mt-1 line-clamp-2">{route.description}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-teal-400 text-xs font-medium">{route.stops} stops</span>
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-teal-400 transition-colors" />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
