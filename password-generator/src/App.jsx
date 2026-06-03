import { useState, useEffect } from "react"
import toast from "react-hot-toast"
import Generator from "./pages/Generator"

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Password Generator</h1>
        <Generator />
      </div>
    </div>
  )
}