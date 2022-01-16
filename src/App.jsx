import Footer from "./containers/Footer"
import Header from "./components/Header"
import Content from "./containers/Content"
import { useState } from "react"

function App() {
  const [search, setSearch] = useState("")

  return (
    <div className="flex flex-col h-screen justify-between">
      <Header search={search} setSearch={setSearch} />
      <div className="container mb-auto md:px-2">
        <Content search={search} />
      </div>
      <Footer />
    </div>
  )
}

export default App
