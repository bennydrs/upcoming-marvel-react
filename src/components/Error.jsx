import React from "react"
import ErrorImg from "../img/error.png"

const Error = ({ onClick }) => {
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <img src={ErrorImg} alt="" className="h-1/2" />
      <h2 className="text-center text-lg">Something went wrong!</h2>
      <button onClick={onClick} className="bg-primary px-5 py-2 text-white rounded-md mt-4">
        Try Again
      </button>
    </div>
  )
}

export default Error
