import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/login", {
        username,
        password,
      });
  
      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        setError("");
        onLogin();
        navigate("/admin");
      }
    } catch (err) {
      console.error("Error details:", err); // Log lỗi chi tiết hơn
      if (err.response) {
        // Xem chi tiết phản hồi lỗi từ server
        console.error("Response error:", err.response);
        if (err.response.status === 401) {
          setError("Tên đăng nhập hoặc mật khẩu không đúng!");
        } else {
          setError("Có lỗi xảy ra. Vui lòng thử lại sau!");
        }
      } else {
        // Xử lý lỗi không có phản hồi từ server
        setError("Không thể kết nối đến server. Vui lòng thử lại sau!");
      }
    }
  };
  
  
  return (
    <div className="login-container flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="p-4 bg-white rounded shadow-md flex flex-col gap-4 w-1/3"
      >
        <h1 className="text-xl font-bold text-center">Đăng nhập</h1>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <input
          type="text"
          placeholder="Tên đăng nhập"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Đăng nhập
        </button>
      </form>
    </div>
  );
}
