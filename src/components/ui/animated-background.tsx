"use client"

import { useState, useEffect } from "react"
import { MeshGradient, DotOrbit } from "@paper-design/shaders-react"

interface AnimatedBackgroundProps {
  className?: string;
  children?: React.ReactNode;
}

export function AnimatedBackground({ className = '', children }: AnimatedBackgroundProps) {
  const [intensity, setIntensity] = useState(1.5)
  const [speed, setSpeed] = useState(1.0)
  const [activeEffect, setActiveEffect] = useState("mesh")
  const [showText, setShowText] = useState(false)
  const [textOpacity, setTextOpacity] = useState(0)

  useEffect(() => {
    // Show text after 2 seconds
    const showTimer = setTimeout(() => {
      setShowText(true)
      setTextOpacity(1)
    }, 2000)

    // Hide text after staying for 3 seconds (2s delay + 3s display = 5s)
    const hideTimer = setTimeout(() => {
      setTextOpacity(0)
    }, 5000)

    // Remove from DOM after fade out (1s fade out duration)
    const removeTimer = setTimeout(() => {
      setShowText(false)
    }, 6000)

    return () => {
      clearTimeout(showTimer)
      clearTimeout(hideTimer)
      clearTimeout(removeTimer)
    }
  }, [])

  return (
    <div className={`${className} w-full h-screen bg-black relative overflow-hidden`}>
      {activeEffect === "mesh" && (
        <MeshGradient
          className="w-full h-full absolute inset-0"
          colors={["#000000", "#1a1a1a", "#333333", "#ffffff"]}
          speed={speed}
        />
      )}

      {activeEffect === "dots" && (
        <div className="w-full h-full absolute inset-0 bg-black">
          <DotOrbit
            className="w-full h-full"
          />
        </div>
      )}

      {activeEffect === "combined" && (
        <>
          <MeshGradient
            className="w-full h-full absolute inset-0"
            colors={["#000000", "#1a1a1a", "#333333", "#ffffff"]}
            speed={speed * 0.5}
          />
          <div className="w-full h-full absolute inset-0 opacity-60">
            <DotOrbit
              className="w-full h-full"
            />
          </div>
        </>
      )}

      {/* Lighting overlay effects optimized for micro display */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/3 w-32 h-32 bg-gray-800/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: `${3 / speed}s` }}
        />
        <div
          className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-white/2 rounded-full blur-2xl animate-pulse"
          style={{ animationDuration: `${2 / speed}s`, animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 right-1/3 w-20 h-20 bg-gray-900/3 rounded-full blur-xl animate-pulse"
          style={{ animationDuration: `${4 / speed}s`, animationDelay: "0.5s" }}
        />
      </div>

      {/* Animated Welcome Text - Removed to prevent interference with device image */}

      {children}
    </div>
  );
}