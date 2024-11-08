import React from "react"
import { useState } from "react"
import Navbar from "./components/Navbar"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Footer from "./components/Footer"
import Encadreurs from "./pages/Encadreurs"
import Blog from "./pages/Blog"
import Profile from "./pages/Profile"
import Login from "./pages/Login"
import Inscription from "./pages/Inscription"
import Blog1 from "./pages/Blog1"
import Blog2 from "./pages/Blog2"
import Blog3 from "./pages/Blog3"





function App() {

  const [user, setUser] = useState(null); // Stocke les informations de l'utilisateur


  return (
    <div className="">
      <Router>
        <Navbar user={user} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Encadreurs" element={<Encadreurs />} />
          <Route path="/Blog" element={<Blog />} />
          <Route path="/Profile/:id" element={<Profile />} />
          <Route path="Inscription" element={<Inscription />} />
          <Route path="Login" element={<Login setUser={setUser} />} />
          <Route path="Blog1" element ={<Blog1 />} />
          <Route path="Blog2" element ={<Blog2 />} />
          <Route path="Blog3" element ={<Blog3 />} />

        </Routes>
        <Footer />
      </Router>
    </div>
  )
}

export default App
