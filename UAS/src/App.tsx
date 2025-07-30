import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./components/Layout"
import Dashboard from "./pages/dashboard"
function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route element={<Layout/>}>
        <Route path="/" element={<Dashboard/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App