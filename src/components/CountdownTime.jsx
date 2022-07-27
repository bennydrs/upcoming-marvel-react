const Completionist = ({ type }) => (
  <p className="text-gray-600 leading-6 md:text-center mt-3">
    Watch {type === "Series" ? "on Disney+" : "in Cinemas"}
  </p>
)

const ElementTime = ({ time, labelTime }) => (
  <div className="flex flex-col items-center">
    <p className="text-lg md:text-xl">{time}</p>
    <span className="font-light text-xs md:text-sm">{labelTime}</span>
  </div>
)

const CountdownTime = ({ data, type }) => {
  const { days, hours, minutes, seconds, completed } = data

  if (completed) {
    return <Completionist type={type} />
  }

  return (
    <div className="flex justify-between items-center mt-4">
      <ElementTime time={days} labelTime={"days"} />
      <ElementTime time={hours} labelTime={"hours"} />
      <ElementTime time={minutes} labelTime={"minutes"} />
      <ElementTime time={seconds} labelTime={"seconds"} />
    </div>
  )
}

export default CountdownTime
