"use client"

import { useRef, useEffect } from "react"

interface Location {
  id: string
  name: string
  x: number
  y: number
  active?: boolean
}

interface MinimapProps {
  locations: Location[]
  currentLocation?: string
  onLocationClick?: (locationId: string) => void
  pathData?: string
}

export function Minimap({ locations, currentLocation, onLocationClick, pathData }: MinimapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const width = canvas.width
    const height = canvas.height
    const padding = 20

    // Clear canvas
    ctx.fillStyle = "#0f172a"
    ctx.fillRect(0, 0, width, height)

    // Draw border
    ctx.strokeStyle = "#334155"
    ctx.lineWidth = 2
    ctx.strokeRect(padding, padding, width - padding * 2, height - padding * 2)

    // Draw path if provided
    if (pathData) {
      ctx.strokeStyle = "#06b6d4"
      ctx.lineWidth = 2
      ctx.globalAlpha = 0.3
      ctx.beginPath()
      locations.forEach((loc, i) => {
        const x = padding + (loc.x * (width - padding * 2)) / 100
        const y = padding + (loc.y * (height - padding * 2)) / 100
        if (i === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      })
      ctx.stroke()
      ctx.globalAlpha = 1
    }

    // Draw locations
    locations.forEach((location) => {
      const x = padding + (location.x * (width - padding * 2)) / 100
      const y = padding + (location.y * (height - padding * 2)) / 100

      if (location.id === currentLocation) {
        // Current location - highlighted
        ctx.fillStyle = "#14b8a6"
        ctx.beginPath()
        ctx.arc(x, y, 8, 0, Math.PI * 2)
        ctx.fill()

        // Pulse ring
        ctx.strokeStyle = "#14b8a6"
        ctx.lineWidth = 1
        ctx.globalAlpha = 0.5
        ctx.beginPath()
        ctx.arc(x, y, 12, 0, Math.PI * 2)
        ctx.stroke()
        ctx.globalAlpha = 1
      } else {
        // Other locations
        ctx.fillStyle = "#64748b"
        ctx.beginPath()
        ctx.arc(x, y, 5, 0, Math.PI * 2)
        ctx.fill()
      }

      // Label
      ctx.fillStyle = "#cbd5e1"
      ctx.font = "11px sans-serif"
      ctx.textAlign = "center"
      ctx.fillText(location.name, x, y + 20)
    })
  }, [locations, currentLocation, pathData])

  return (
    <div className="fixed bottom-6 right-6 bg-slate-900/90 backdrop-blur border border-slate-700/50 rounded-lg p-4 shadow-2xl z-30">
      <h3 className="text-xs font-semibold text-slate-300 mb-3 uppercase tracking-wide">Route Map</h3>
      <canvas
        ref={canvasRef}
        width={200}
        height={180}
        onClick={(e) => {
          const rect = canvasRef.current?.getBoundingClientRect()
          if (!rect) return
          const x = ((e.clientX - rect.left) / rect.width) * 100
          const y = ((e.clientY - rect.top) / rect.height) * 100
          const nearestLocation = locations.reduce((nearest, loc) => {
            const distance = Math.sqrt(Math.pow(loc.x - x, 2) + Math.pow(loc.y - y, 2))
            const nearestDistance = Math.sqrt(Math.pow(nearest.x - x, 2) + Math.pow(nearest.y - y, 2))
            return distance < nearestDistance ? loc : nearest
          })
          onLocationClick?.(nearestLocation.id)
        }}
        className="w-full cursor-pointer"
      />
    </div>
  )
}
