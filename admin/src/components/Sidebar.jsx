import {Link} from "react-router-dom"
import addProduct from "../assets/addproduct.png"
import listProduct from "../assets/productlist.png"
const Sidebar = () => {
  return (
    <div className='py-7 flex overflow-auto justify-center gap-x-2 gap-y-5 w-full bg-white sm:gap-x-4
     lg:flex-col lg:pt-20 lg:max-w-60 lg:h-screen lg:justify-start lg:pl-6'>
        <Link to={"/addproduct"}>
          <button className="flex items-center gap-2 rounded-md bg-primary h-14 w-full md:w-48 medium-16 justify-center md:justify-start">
            <img src={addProduct} alt="Thêm sản phẩm" height={55} width={55} />
            <span>Thêm sản phẩm</span>
          </button>
        </Link>
        <Link to={"/listproduct"}>
          <button className="flex items-center gap-2 rounded-md bg-primary h-14 w-full md:w-48 medium-16 justify-center md:justify-start">
            <img src={listProduct} alt="Danh sách sản phẩm" className="h-10 w-10" />
            <span>Danh sách sản phẩm</span>
          </button>
        </Link>

    </div>
  )
}

export default Sidebar


