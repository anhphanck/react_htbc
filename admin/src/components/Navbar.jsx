import logo from "../assets/logo.png"
import profile from "../assets/profile.png"
const Navbar = () => {
  return ( 
    <nav className='flex justify-between items-center bg-white py-2 ring-1 ring-slate-900/5 relative px-4'>
        <div className="flex-1"><img src={logo} alt="Ảnh logo" /></div>
        <div className='flex-1 text-center uppercase font-bold text-white bg-secondary px-3 py-2 rounded-md
        tracking-widest line-clamp-1 max-sx:text-lg'>Admin Panel</div>
        <div className="flex-1 flex justify-end"><img src={profile} alt="" className='h-12 w-12 rounded-full'/></div>
    </nav>
  )
}

export default Navbar