import { NavLink } from "react-router-dom"
const Navbar = () => {
  return (
    <nav className="navbar-custom">
      <NavLink to={'/'} ><div className="flexCenter gap-x-1">Trang chủ</div></NavLink>
      <NavLink to={'/cam'} ><div className="flexCenter gap-x-1">Cám</div></NavLink>
      <NavLink to={'/con giong'} ><div className="flexCenter gap-x-1">Con giống</div></NavLink>
      <NavLink to={'/lien he'} ><div className="flexCenter gap-x-1">Liên hệ</div></NavLink>
    </nav>
  )
}

export default Navbar