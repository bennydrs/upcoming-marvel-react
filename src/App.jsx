import Footer from "./containers/Footer"
import Header from "./components/Header"
import Content from "./containers/Content"
import { useState } from "react"
import { AnimateSharedLayout } from "framer-motion"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useEffect } from "react"
import ReactGA from "react-ga"

ReactGA.initialize("G-5GJ8QF8ESG")

function App() {
  const [search, setSearch] = useState("")

  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search)
  })

  return (
    <div className="flex flex-col h-screen justify-between">
      <AnimateSharedLayout type="crossfade">
        <Header search={search} setSearch={setSearch} />
        <div className="container mb-auto md:px-2">
          <BrowserRouter>
            <Routes>
              <Route path={"/"} element={<Content search={search} />}>
                <Route path={"/:id"} element={<Content search={search} />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </div>
        <Footer />
      </AnimateSharedLayout>
      {/* <Header search={search} setSearch={setSearch} />
      <div className="container mb-auto md:px-2">
        <Content search={search} />
      </div>
      <Footer /> */}
    </div>
  )
}

export default App
