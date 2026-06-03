import { useState, useEffect } from "react"
import toast from "react-hot-toast"

export default function Generator() {
  const [password, setPassword] = useState("")
  const [length, setLength] = useState(10)
  const [history, setHistory] = useState([])

  const [options, setOptions] = useState({
    upper: true,
    lower: true,
    numbers: true,
    symbols: false,
  })

  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  const lower = "abcdefghijklmnopqrstuvwxyz"
  const numbers = "0123456789"
  const symbols = "!@#$%^&*()_+{}[]<>?/"

  const generatePassword = () => {
    let chars = ""

    if (options.upper) chars += upper
    if (options.lower) chars += lower
    if (options.numbers) chars += numbers
    if (options.symbols) chars += symbols

    if (!chars) {
      toast.error("Select at least one option!")
      return
    }

    let newPass = ""
    for (let i = 0; i < length; i++) {
      newPass += chars[Math.floor(Math.random() * chars.length)]
    }

    setPassword(newPass)

    const newHistory = [newPass, ...history].slice(0, 5)
    setHistory(newHistory)

    toast.success("Password Generated!")
  }

  const copyPassword = () => {
    navigator.clipboard.writeText(password)
    toast.success("Copied to clipboard!")
  }

  const getStrength = () => {
    let score = 0
    if (options.upper) score++
    if (options.lower) score++
    if (options.numbers) score++
    if (options.symbols) score++
    if (length >= 12) score++

    if (score <= 2) return "Weak 🔴"
    if (score === 3) return "Medium 🟡"
    return "Strong 🟢"
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white p-4">
      <div className="bg-gray-800 p-6 rounded-xl w-full max-w-md shadow-lg">

        <h1 className="text-2xl font-bold text-center mb-4">
          🔐 Password Generator
        </h1>

        {/* PASSWORD DISPLAY */}
        <div className="flex gap-2 mb-4">
          <input
            value={password}
            readOnly
            className="w-full p-2 rounded bg-gray-700"
          />
          <button
            onClick={copyPassword}
           className="bg-white/20 backdrop-blur-md border border-white/30 text-white px-4 py-2 rounded-lg hover:bg-white/30 transition"
          >
            
            Copy
          </button>
        </div>

        {/* LENGTH */}
        <div className="mb-3">
          <label>Length: {length}</label>
          <input
            type="range"
            min="4"
            max="20"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className="w-full"
          />
        </div>

        {/* OPTIONS */}
        <div className="space-y-2 mb-3">
          {Object.keys(options).map((key) => (
            <label key={key} className="block">
              <input
                type="checkbox"
                checked={options[key]}
                onChange={() =>
                  setOptions({ ...options, [key]: !options[key] })
                }
              />{" "}
              {key}
            </label>
          ))}
        </div>

        {/* STRENGTH */}
        <p className="mb-3">Strength: {getStrength()}</p>

        {/* BUTTON */}
        <button
          onClick={generatePassword}
          className="w-full bg-blue-500 p-2 rounded hover:bg-blue-600"
        >
          Generate Password
        </button>

        {/* HISTORY */}
        <div className="mt-4">
          <h2 className="font-bold">Recent Passwords</h2>
          <ul className="text-sm text-gray-300">
            {history.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
        </div>
      </div>
      
    </div>
  )
}