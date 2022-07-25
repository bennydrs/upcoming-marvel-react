import { convertToDateFormat } from "../utils"

const ReleaseAt = ({ release_at, year_at }) => {
  return (
    <span className="text-gray-600">
      {release_at ? convertToDateFormat(release_at) : year_at ? year_at : "TBA"}
    </span>
  )
}

export default ReleaseAt
