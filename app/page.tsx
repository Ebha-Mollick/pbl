"use client"

import { useState, useCallback } from "react"
import { PanoramaViewer } from "@/components/panorama-viewer"
import { RoutePanel } from "@/components/route-panel"
import { Minimap } from "@/components/minimap"
import { Button } from "@/components/ui/button"
import { Menu, Info, ChevronRight } from "lucide-react"

interface Route {
  id: string
  name: string
  description: string
  thumbnail: string
  stops: number
}

interface Location {
  id: string
  name: string
  x: number
  y: number
  image: string
}

export default function Home() {
  const [currentRoute, setCurrentRoute] = useState<string>("route-1")
  const [currentLocation, setCurrentLocation] = useState<string>("loc-1")
  const [showInfo, setShowInfo] = useState(false)
  const [isRoutePanelExpanded, setIsRoutePanelExpanded] = useState(true)
  const [autoRotate, setAutoRotate] = useState(false)
  const [visitedLocations, setVisitedLocations] = useState<Set<string>>(new Set(["loc-1"]))

  const routes: Route[] = [
    {
      id: "route-1",
      name: "Downtown Heritage Tour",
      description: "Explore historic landmarks and architecture",
      thumbnail: "/downtown-heritage-tour.jpg",
      stops: 8,
    },
    {
      id: "route-2",
      name: "Waterfront Experience",
      description: "Beautiful views along the scenic waterfront",
      thumbnail: "/waterfront-scenic-views.jpg",
      stops: 6,
    },
    {
      id: "route-3",
      name: "Arts & Culture District",
      description: "Museums, galleries, and cultural institutions",
      thumbnail: "/arts-culture-museums.jpg",
      stops: 10,
    },
  ]

  const locations: Location[] = [
    {
      id: "loc-1",
      name: "Main Plaza",
      x: 50,
      y: 30,
      image: "/main-plaza-panorama.jpg",
    },
    {
      id: "loc-2",
      name: "City Hall",
      x: 70,
      y: 50,
      image: "/city-hall-panorama.jpg",
    },
    {
      id: "loc-3",
      name: "Historic District",
      x: 30,
      y: 60,
      image: "/historic-district-panorama.jpg",
    },
    {
      id: "loc-4",
      name: "Central Park",
      x: 50,
      y: 80,
      image: "/central-park-panorama.jpg",
    },
  ]

  const currentLocationData = locations.find((l) => l.id === currentLocation)

  const handleLocationChange = useCallback((locationId: string) => {
    setCurrentLocation(locationId)
    setVisitedLocations((prev) => new Set([...prev, locationId]))
  }, [])

  const handleRouteSelect = useCallback((routeId: string) => {
    setCurrentRoute(routeId)
    setCurrentLocation("loc-1")
    setVisitedLocations(new Set(["loc-1"]))
  }, [])

  const currentRouteData = routes.find((r) => r.id === currentRoute)
  const routeProgress = currentRouteData ? Math.round((visitedLocations.size / currentRouteData.stops) * 100) : 0

  return (
    <div className="w-full h-screen bg-slate-950 flex flex-col overflow-hidden">
      {/* Header */}
      <header className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-900 border-b border-slate-700/50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">360</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">PanoramaView</h1>
              <p className="text-xs text-slate-400">360° Virtual Tour Platform</p>
            </div>
          </div>

          {/* Progress indicator and additional controls */}
          <div className="flex items-center gap-6">
            {/* Progress indicator */}
            <div className="hidden md:flex items-center gap-3">
              <span className="text-sm text-slate-400">Progress</span>
              <div className="w-32 h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-teal-400 to-cyan-500 transition-all duration-500"
                  style={{ width: `${routeProgress}%` }}
                />
              </div>
              <span className="text-sm font-medium text-teal-400 w-8">{routeProgress}%</span>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowInfo(!showInfo)}
                className="text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <Info className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setAutoRotate(!autoRotate)}
                className={
                  autoRotate
                    ? "text-teal-400 bg-teal-500/10 hover:bg-teal-500/20"
                    : "text-slate-400 hover:text-white hover:bg-slate-800"
                }
              >
                <Menu className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Route Panel */}
        {isRoutePanelExpanded && (
          <RoutePanel routes={routes} currentRoute={currentRoute} onRouteSelect={handleRouteSelect} />
        )}

        {/* Panorama Viewer */}
        <div className="flex-1 transition-all duration-300">
          <div className="w-full h-full relative">
            {currentLocationData && (
              <PanoramaViewer imageUrl={currentLocationData.image} onLocationChange={handleLocationChange} />
            )}

            {/* Toggle panel button */}
            {!isRoutePanelExpanded && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsRoutePanelExpanded(true)}
                className="absolute top-4 left-4 text-white bg-slate-900/50 hover:bg-slate-800 z-20"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            )}

            {/* Auto-rotate indicator */}
            {autoRotate && (
              <div className="absolute top-4 right-4 flex items-center gap-2 bg-slate-900/50 px-3 py-2 rounded-lg backdrop-blur z-20">
                <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse" />
                <span className="text-xs text-teal-300 font-medium">Auto-rotating</span>
              </div>
            )}
          </div>
        </div>

        {/* Info Panel */}
        {showInfo && (
          <div className="w-80 bg-slate-900 border-l border-slate-700/50 p-6 overflow-y-auto">
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-white mb-2">{currentLocationData?.name}</h2>
                <p className="text-slate-400 text-sm">
                  Location {visitedLocations.has(currentLocation) ? "(visited)" : "(not visited)"}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-slate-200 mb-3 uppercase tracking-wide">Route Progress</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-slate-400">Locations visited</span>
                      <span className="text-sm font-bold text-teal-400">
                        {visitedLocations.size} / {currentRouteData?.stops}
                      </span>
                    </div>
                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-teal-400 to-cyan-500 transition-all"
                        style={{ width: `${routeProgress}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-slate-200 mb-3 uppercase tracking-wide">Navigation Tips</h3>
                <ul className="space-y-2 text-sm text-slate-400">
                  <li className="flex gap-2">
                    <span className="text-teal-400 font-bold">→</span>
                    <span>Click and drag to look around</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-teal-400 font-bold">→</span>
                    <span>Use minimap to navigate to new locations</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-teal-400 font-bold">→</span>
                    <span>Select routes from the left panel</span>
                  </li>
                </ul>
              </div>

              <div className="bg-teal-500/10 border border-teal-500/30 rounded-lg p-4">
                <p className="text-xs text-teal-300">
                  <strong>Pro Tip:</strong> Collapse the route panel to expand the panorama view.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Minimap */}
      <Minimap
        locations={locations}
        currentLocation={currentLocation}
        onLocationClick={handleLocationChange}
        pathData="route-1"
      />
    </div>
  )
}
