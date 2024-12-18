import Sidebar from '../components/Sidebar';
import { Routes, Route, useNavigate } from "react-router-dom";
import AddProduct from '../components/AddProduct';
import ListProduct from '../components/ListProduct';
import { useEffect } from "react";

const Admin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      // Nếu không có token, chuyển hướng đến trang đăng nhập
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="flex">
      <Sidebar />
      <Routes>
        <Route path='/addproduct' element={<AddProduct />} />
        <Route path='/listproduct' element={<ListProduct />} />
      </Routes>
    </div>
  );
};

export default Admin;
