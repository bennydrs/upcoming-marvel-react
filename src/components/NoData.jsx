import React from "react"
import NoDataImg from "../img/no-data.png"

const NoData = () => {
  return (
    <div className="flex flex-col justify-center items-center h-80">
      <img src={NoDataImg} alt="" className="w-48" />
      <h2 className="text-center font-medium">No Data!</h2>
    </div>
  )
}

export default NoData
