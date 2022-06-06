import { useQuery } from "react-query"
import axiosAPI from "../config/axiosAPI"

const getLinkDownload = async () => {
  try {
    const { data } = await axiosAPI.get("/linkdownload")
    return data
  } catch (error) {
    throw error
  }
}

const useLinkDownload = () => useQuery("linkDownload", getLinkDownload)

export default useLinkDownload
