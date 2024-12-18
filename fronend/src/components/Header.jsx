import { Link } from "react-router-dom";
import logo from "../assets/logo.png"
import Navbar from "./Navbar";
const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full bg-white ring-1 ring-slate-900/5 z-10">
        <div className="px-4 flexBetween py-3 ">
            {/* logo */}
            <div>
                <Link><img src={logo} alt="" height={66} width={66} /></Link>
            </div>
            {/* {navbar} */}
            <Navbar />

        </div>
    </header>
  )
}

export default Header