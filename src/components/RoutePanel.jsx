"use client"

import { useState } from "react"

const LOCATIONS = [
  "Reception",
  "Canteen",
  "Library",
  "Main Gate",
  "Parking",
  "Auditorium",
  "Computer Lab",
  "Admin Office",
]

export default function RoutePanel({ onFindRoute, route, isLoading }) {
  const [from, setFrom] = useState("Reception")
  const [to, setTo] = useState("Library")

  const handleFindRoute = () => {
    if (from && to && from !== to) {
      onFindRoute(from, to)
    }
  }

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-blue-900/30 bg-slate-900/50 p-6 backdrop-blur-sm shadow-xl">
        <h2 className="mb-4 text-lg font-semibold text-white">Find Route</h2>

        {/* From Dropdown */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-slate-300 mb-2">From</label>
          <select
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="w-full rounded-lg border border-blue-900/30 bg-slate-800/50 px-4 py-3 text-white placeholder-slate-500 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            {LOCATIONS.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        {/* To Dropdown */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-300 mb-2">To</label>
          <select
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="w-full rounded-lg border border-blue-900/30 bg-slate-800/50 px-4 py-3 text-white placeholder-slate-500 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            {LOCATIONS.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        {/* Find Route Button */}
        <button
          onClick={handleFindRoute}
          disabled={from === to || isLoading}
          className="w-full rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 px-4 py-3 font-medium text-white transition hover:from-blue-500 hover:to-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Finding Route...
            </span>
          ) : (
            "Find Route"
          )}
        </button>
      </div>

      {/* Route Steps */}
      {route && (
        <div className="rounded-2xl border border-blue-900/30 bg-slate-900/50 p-6 backdrop-blur-sm shadow-xl">
          <h3 className="mb-4 font-semibold text-white">Route Steps</h3>
          <div className="max-h-72 space-y-3 overflow-y-auto">
            {route.map((step, idx) => (
              <div
                key={step.id}
                className="flex gap-3 rounded-lg border border-blue-900/20 bg-slate-800/30 p-3 transition hover:border-blue-900/50 hover:bg-slate-800/50"
              >
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 text-sm font-bold text-white">
                  {idx + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-white text-sm">{step.name}</p>
                  <p className="text-xs text-slate-400">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
