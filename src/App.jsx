"use client"

import { useState } from "react"
import PanoramaViewer from "./components/PanoramaViewer"
import RoutePanel from "./components/RoutePanel"
import Minimap from "./components/Minimap"
import "./App.css"

export default function App() {
  const [selectedNode, setSelectedNode] = useState(null)
  const [route, setRoute] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleFindRoute = (from, to) => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setRoute([
        { id: 1, name: from, description: "Starting point" },
        { id: 2, name: "Main Gate", description: "Cross main entrance" },
        { id: 3, name: "Main Corridor", description: "Walk along main hallway" },
        { id: 4, name: to, description: "Destination" },
      ])
      setIsLoading(false)
    }, 1200)
  }

  const handleNodeClick = (nodeId) => {
    setSelectedNode(selectedNode === nodeId ? null : nodeId)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      {/* Header */}
      <header className="border-b border-blue-900/30 bg-slate-950/50 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500">
              <span className="text-sm font-bold text-white">360</span>
            </div>
            <h1 className="text-2xl font-bold text-white">AIT Campus 360° Navigation</h1>
          </div>
          <p className="mt-2 text-sm text-slate-400">Explore your campus with interactive panoramic views</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Panorama and Route Panel Grid */}
        <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left: Panorama Viewer */}
          <div className="lg:col-span-2">
            <PanoramaViewer />
          </div>

          {/* Right: Route Panel */}
          <div className="lg:col-span-1">
            <RoutePanel onFindRoute={handleFindRoute} route={route} isLoading={isLoading} />
          </div>
        </div>

        {/* Bottom: Minimap */}
        <div>
          <Minimap selectedNode={selectedNode} onNodeClick={handleNodeClick} route={route} />
        </div>
      </main>
    </div>
  )
}
