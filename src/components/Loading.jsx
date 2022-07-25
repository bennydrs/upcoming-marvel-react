import React from "react"

const Loading = () => {
  return (
    <div className="flex justify-center items-center ml-2 mt-2">
      <div className="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </div>
  )
}

export default Loading
