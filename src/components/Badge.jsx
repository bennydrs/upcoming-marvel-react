import React from "react"

const Badge = ({ type, animated }) => {
  return (
    <span
      className={`px-1.5 pb-[1px] rounded-md text-white ${
        type === "Series"
          ? "bg-blue-500 border border-blue-600"
          : animated
          ? "bg-red-400 border border-red-500 px-1.5 pb-[1px] rounded-md text-white"
          : type === "Short"
          ? "bg-emerald-600 border border-emerald-700"
          : "bg-orange-400 border border-orange-500"
      }`}
    >
      {type}
    </span>
  )
}

export default Badge
