import axios from "axios"

const axiosAPI = axios.create({
  baseURL: "https://upcoming-marvel.herokuapp.com/api",
})

export default axiosAPI
