"use client"

export default function Minimap({ selectedNode, onNodeClick, route }) {
  const nodes = [
    { id: 1, name: "Reception", x: 30, y: 30 },
    { id: 2, name: "Main Gate", x: 70, y: 20 },
    { id: 3, name: "Canteen", x: 20, y: 60 },
    { id: 4, name: "Library", x: 80, y: 50 },
    { id: 5, name: "Parking", x: 60, y: 80 },
  ]

  const connections = [
    { from: 1, to: 2 },
    { from: 1, to: 3 },
    { from: 2, to: 4 },
    { from: 3, to: 5 },
    { from: 4, to: 5 },
  ]

  return (
    <div className="rounded-2xl border border-blue-900/30 bg-slate-900/50 p-6 backdrop-blur-sm shadow-xl">
      <h2 className="mb-4 text-lg font-semibold text-white">Campus Map</h2>

      <div className="relative aspect-video w-full rounded-lg border border-blue-900/20 bg-gradient-to-br from-slate-800 to-slate-900 p-4">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          className="absolute inset-0 h-full w-full"
          style={{ pointerEvents: "none" }}
        >
          {/* Connections/Paths */}
          {connections.map((conn, idx) => {
            const fromNode = nodes.find((n) => n.id === conn.from)
            const toNode = nodes.find((n) => n.id === conn.to)
            return (
              <line
                key={idx}
                x1={fromNode.x}
                y1={fromNode.y}
                x2={toNode.x}
                y2={toNode.y}
                stroke="#0ea5e9"
                strokeWidth="0.8"
                opacity="0.3"
              />
            )
          })}

          {/* Nodes */}
          {nodes.map((node) => (
            <g key={node.id} style={{ cursor: "pointer" }} onClick={() => onNodeClick(node.id)}>
              <circle
                cx={node.x}
                cy={node.y}
                r="2.5"
                fill={selectedNode === node.id ? "#06b6d4" : "#0ea5e9"}
                opacity={selectedNode === node.id ? 1 : 0.6}
                className="transition-all hover:opacity-100"
              />
              <circle
                cx={node.x}
                cy={node.y}
                r={selectedNode === node.id ? "3.5" : "2.5"}
                fill="none"
                stroke={selectedNode === node.id ? "#06b6d4" : "#0ea5e9"}
                strokeWidth="0.5"
                opacity="0.4"
              />
            </g>
          ))}
        </svg>

        {/* Legend/Overlay */}
        <div className="pointer-events-auto absolute inset-0 flex flex-col items-end justify-end gap-2 p-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-cyan-400" />
            <span className="text-slate-400">Campus Node</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-1 w-3 bg-blue-400/30" />
            <span className="text-slate-400">Path</span>
          </div>
        </div>
      </div>

      {/* Node List */}
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
        {nodes.map((node) => (
          <button
            key={node.id}
            onClick={() => onNodeClick(node.id)}
            className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
              selectedNode === node.id
                ? "bg-cyan-600/30 border border-cyan-500 text-cyan-100"
                : "bg-slate-800/30 border border-blue-900/20 text-slate-300 hover:border-blue-900/50 hover:bg-slate-800/50"
            }`}
          >
            {node.name}
          </button>
        ))}
      </div>
    </div>
  )
}
