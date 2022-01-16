import { useQuery } from "react-query"
import axiosAPI from "../config/axiosAPI"

const getContents = async (filter) => {
  try {
    const { data } = await axiosAPI.get(
      `/content-filter?${filter !== "All" ? "category=" + filter : ""}`
    )
    return data
  } catch (error) {
    throw error
  }
}

const useContent = (filter) =>
  useQuery(["contents", filter], () => getContents(filter), {
    useErrorBoundary: (error) => error.response?.status >= 500,
  })

export default useContent
