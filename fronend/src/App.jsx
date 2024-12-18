import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Cam from "./pages/Cam"
import Giong from "./pages/ConGiong"
import LienHe from "./pages/LienHe"
export default function App() {
  return ( 
    <main>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/cam" element={<Cam />} />
        <Route path="/con giong" element={<Giong />} />
        <Route path="/lien he" element={<LienHe />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
    </main>
  )
}