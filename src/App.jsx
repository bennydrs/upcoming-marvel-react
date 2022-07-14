import Footer from "./containers/Footer"
import Header from "./components/Header"
import Content from "./containers/Content"
import { AnimateSharedLayout } from "framer-motion"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useEffect } from "react"
import ReactGA from "react-ga4"

ReactGA.initialize("G-Z8Y0BHHEV7")

function App() {
  useEffect(() => {
    ReactGA.send("pageview")
  }, [])

  return (
    <div className="flex flex-col h-screen justify-between">
      <AnimateSharedLayout type="crossfade">
        <Header />
        <div className="container mb-auto md:px-2 mt-14">
          <BrowserRouter>
            <Routes>
              <Route path={"/"} element={<Content />}>
                <Route path={"/:id"} element={<Content />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </div>
        <Footer />
      </AnimateSharedLayout>
    </div>
  )
}

export default App
