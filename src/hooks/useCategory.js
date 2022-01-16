import { useQuery } from "react-query"
import axiosAPI from "../config/axiosAPI"

const getCategories = async () => {
  let categories = [{ id: 0, name: "All" }]
  const { data } = await axiosAPI.get("/category-filter")

  const newCategories = [...categories, ...data]

  return newCategories
}

const useCategory = () => useQuery("categories", getCategories)

export default useCategory
