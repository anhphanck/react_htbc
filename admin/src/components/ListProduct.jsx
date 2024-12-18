import { useEffect, useState } from "react";
import { TbTrash, TbEdit } from "react-icons/tb"; 
import upload_area from '../assets/upload_area.svg'; 

const ListProduct = () => {
  const [allproducts, setAllproducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null); 
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); 
  const [image, setImage] = useState(null); 

  const fetchInfo = async () => {
    await fetch("http://localhost:4000/allproducts", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setAllproducts(data);
      });
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const remove_product = async (id) => {
    await fetch("http://localhost:4000/removeproduct", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });
    await fetchInfo();
  };

  const edit_product = (product) => {
    setSelectedProduct(product);
    setImage(null); 
    setIsEditModalOpen(true);
  };

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const changeHandler = (e) => {
    setSelectedProduct({ ...selectedProduct, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    let product = selectedProduct;
    let formData = new FormData();
    if (image) {
      formData.append("product", image);
    }

    let responseData;
    if (image) {
      await fetch("http://localhost:4000/upload", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      })
        .then((resp) => resp.json())
        .then((data) => {
          responseData = data;
        });
      if (responseData.success) {
        product.image = responseData.image_url;
      } else {
        alert("Tải lên không thành công");
        return;
      }
    }

    await fetch("http://localhost:4000/updateproduct", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    })
      .then((resp) => resp.json())
      .then((data) => {
        data.success ? alert("Đã cập nhật sản phẩm") : alert("Cập nhật không thành công");
      });

    setIsEditModalOpen(false);
    fetchInfo(); 
  };

  return (
    <div className="p-2 box-border bg-white mb-0 rounded-sm w-full mt-4 sm:p-4 sm:m-7">
      <h4 className="bold-22 p-5 uppercase">Danh Sách Sản Phẩm</h4>
      <div className="max-h-[77vh] overflow-auto px-4 text-center">
        <table className="w-full mx-auto">
          <thead>
            <tr className="bg-primary bold-14 sm:regular-22 text-start py-12">
              <th className="p-2">Ảnh sản phẩm</th>
              <th className="p-2">Tên sản phẩm</th>
              <th className="p-2">Giá cũ</th>
              <th className="p-2">Giá mới</th>
              <th className="p-2">Loại sản phẩm</th>
              <th className="p-2">Xóa</th>
              <th className="p-2">Sửa</th> {/* Thêm cột sửa */}
            </tr>
          </thead>
          <tbody>
            {allproducts.map((product, i) => (
              <tr key={i} className="border-b border-slate-900/20 text-gray-20 p-6 medium-14">
                <td className="flexStart sm:flexCenter">
                  <img
                    src={product.image}
                    alt=""
                    height={43}
                    width={43}
                    className="rounded-lg ring-1 ring-slate-900/5 my-1"
                  />
                </td>
                <td>
                  <div className="line-clamp-3">{product.name}</div>
                </td>
                <td>{product.old_price}.000 đồng</td>
                <td>{product.new_price}.000 đồng</td>
                <td>{product.category}</td>
                <td>
                  <div className="bold-22 pl-6 sm:pl-14">
                    <TbTrash onClick={() => remove_product(product.id)} className="cursor-pointer" />
                  </div>
                </td>
                <td>
                  <div className="bold-22 pl-6 sm:pl-14">
                    <TbEdit onClick={() => edit_product(product)} className="cursor-pointer" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal sửa sản phẩm */}
      {isEditModalOpen && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h3 className="text-xl mb-4">Sửa Sản Phẩm</h3>
            <form onSubmit={handleEditSubmit}>
              <div className="mb-4">
                <label className="block mb-2">Tên sản phẩm</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={selectedProduct.name}
                  onChange={changeHandler}
                  name="name"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Giá cũ</label>
                <input
                  type="number"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={selectedProduct.old_price}
                  onChange={changeHandler}
                  name="old_price"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Giá mới</label>
                <input
                  type="number"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={selectedProduct.new_price}
                  onChange={changeHandler}
                  name="new_price"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Loại sản phẩm</label>
                <select
                  value={selectedProduct.category}
                  onChange={changeHandler}
                  name="category"
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="cam">Cám</option>
                  <option value="giong">Con Giống</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="file-input" className="block mb-2">Ảnh sản phẩm</label>
                <div>
                  <label htmlFor="file-input">
                    <img
                      src={image ? URL.createObjectURL(image) : selectedProduct.image || upload_area}
                      alt=""
                      className="w-20 rounded-sm inline-block"
                    />
                  </label>
                  <input
                    onChange={imageHandler}
                    type="file"
                    name="image"
                    id="file-input"
                    hidden
                  />
                </div>
              </div>
              <button type="submit" className="bg-blue-500 text-white p-2 rounded">Cập nhật</button>
            </form>
            <button
              onClick={() => setIsEditModalOpen(false)}
              className="bg-red-500 text-white p-2 rounded mt-4 ml-2"
            >
              Hủy
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListProduct;
