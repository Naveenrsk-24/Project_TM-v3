import React from "react"
import { cn } from "../lib/utils"

export function Card({ children, className, ...props }) {
  return (
    <div
      className={cn(
        "bg-white rounded-lg shadow-sm border border-gray-200 p-6 transition-transform hover:-translate-y-1 hover:shadow-md",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardHeader({ children }) {
  return <div className="flex items-start gap-4">{children}</div>
}

export function CardTitle({ children }) {
  return <h3 className="text-gray-900 font-semibold text-base md:text-lg">{children}</h3>
}

export function CardDescription({ children }) {
  return <p className="text-gray-600 mt-1 text-sm md:text-base">{children}</p>
}
