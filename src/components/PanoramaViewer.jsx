export default function PanoramaViewer() {
  return (
    <div className="overflow-hidden rounded-2xl border border-blue-900/30 bg-gradient-to-br from-slate-900 to-slate-800 shadow-2xl">
      <div className="relative h-80 w-full sm:h-96 lg:h-[480px]">
        {/* PANOLENS will be integrated here */}
        <div className="flex h-full flex-col items-center justify-center bg-gradient-to-b from-slate-800 to-slate-900">
          <svg className="mb-4 h-16 w-16 text-blue-400/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14m-6-4h.01M9 15H7a2 2 0 01-2-2V7a2 2 0 012-2h2m6 0h2a2 2 0 012 2v6a2 2 0 01-2 2h-2m-6 0a2 2 0 01-2-2m2 2a2 2 0 002-2m0-6a2 2 0 00-2-2m2 2a2 2 0 002-2m0 0V5a2 2 0 00-2-2h-2a2 2 0 00-2 2v2"
            />
          </svg>
          <h2 className="text-center text-xl font-semibold text-slate-300">Panorama Viewer</h2>
          <p className="mt-2 text-center text-sm text-slate-400">360° preview will appear here</p>
          <p className="mt-4 text-xs text-blue-400/50">Ready for PANOLENS integration</p>
        </div>
      </div>
    </div>
  )
}
