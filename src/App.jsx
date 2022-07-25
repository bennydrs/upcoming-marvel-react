import Footer from "./containers/Footer"
import Header from "./components/Header"
import Content from "./containers/Content"
import { AnimateSharedLayout } from "framer-motion"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useEffect } from "react"
import ReactGA from "react-ga4"

ReactGA.initialize(import.meta.env.VITE_GA_MEASUREMENT_ID)

function App() {
  useEffect(() => {
    ReactGA.send("pageview")
  }, [])

  return (
    <div className="flex flex-col h-screen justify-between">
      <Header />
      <div className="container mb-auto md:px-2 mt-14">
        <AnimateSharedLayout type="crossfade">
          <BrowserRouter>
            <Routes>
              <Route path={"/"} element={<Content />}>
                <Route path={":id"} element={<Content />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </AnimateSharedLayout>
      </div>
      <Footer />
    </div>
  )
}

export default App
