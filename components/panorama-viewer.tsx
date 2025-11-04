"use client"

import { useRef, useEffect, useState } from "react"
import * as THREE from "three"

interface PanoramaViewerProps {
  imageUrl: string
  onLocationChange?: (location: string) => void
}

export function PanoramaViewer({ imageUrl, onLocationChange }: PanoramaViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    sceneRef.current = scene

    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000,
    )
    camera.position.set(0, 0, 0.1)
    cameraRef.current = camera

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    renderer.setClearColor(0x0a0e27)
    containerRef.current.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Load panorama texture
    const textureLoader = new THREE.TextureLoader()
    textureLoader.load(
      imageUrl,
      (texture) => {
        const geometry = new THREE.SphereGeometry(500, 60, 40)
        geometry.scale(-1, 1, 1) // Invert for panorama
        const material = new THREE.MeshBasicMaterial({ map: texture })
        const panorama = new THREE.Mesh(geometry, material)
        scene.add(panorama)
        setIsLoading(false)
      },
      undefined,
      (error) => {
        console.error("Error loading panorama:", error)
        setIsLoading(false)
      },
    )

    // Mouse controls
    let isDragging = false
    let previousMousePosition = { x: 0, y: 0 }

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true
      previousMousePosition = { x: e.clientX, y: e.clientY }
    }

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return

      const deltaX = e.clientX - previousMousePosition.x
      const deltaY = e.clientY - previousMousePosition.y

      camera.rotation.order = "YXZ"
      camera.rotation.y -= (deltaX * Math.PI) / 300
      camera.rotation.x -= (deltaY * Math.PI) / 300

      camera.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, camera.rotation.x))

      previousMousePosition = { x: e.clientX, y: e.clientY }
    }

    const onMouseUp = () => {
      isDragging = false
    }

    renderer.domElement.addEventListener("mousedown", onMouseDown)
    renderer.domElement.addEventListener("mousemove", onMouseMove)
    renderer.domElement.addEventListener("mouseup", onMouseUp)
    renderer.domElement.addEventListener("mouseleave", onMouseUp)

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)
      renderer.render(scene, camera)
    }
    animate()

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return
      const width = containerRef.current.clientWidth
      const height = containerRef.current.clientHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      renderer.domElement.removeEventListener("mousedown", onMouseDown)
      renderer.domElement.removeEventListener("mousemove", onMouseMove)
      renderer.domElement.removeEventListener("mouseup", onMouseUp)
      containerRef.current?.removeChild(renderer.domElement)
    }
  }, [imageUrl])

  // return (
  //   // <div className="relative w-full h-full bg-black rounded-lg overflow-hidden shadow-2xl">
  //   //   <div ref={containerRef} className="w-full h-full" />
  //   //   {isLoading && (
  //   //     <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-black/80 to-black/40 backdrop-blur-sm animate-fade-in">
  //   //       <div className="text-center">
  //   //         <div className="w-12 h-12 border-3 border-teal-400/30 border-t-teal-400 rounded-full animate-spin mx-auto mb-4" />
  //   //         <p className="text-sm font-medium text-slate-300">Loading panorama...</p>
  //   //       </div>
  //   //     </div>
  //   //   )}
  //   // </div>
  // )
}
