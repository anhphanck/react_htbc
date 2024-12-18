import { useState } from 'react';

const LienHe = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert('Cảm ơn bạn đã liên hệ!');
    setFormData({
      name: '',
      phone: '',
      email: '',
      message: ''
    });
  };

  return (
    <section className='mt-[4cm]'>
    <div className="contact-container">
      <div className="contact-info-1">
        <h2>THÔNG TIN LIÊN HỆ</h2>
        <p>Địa chỉ:  Số nhà 53, Ngõ 381, Thụy Phương,TP Hà Nội</p>
        <p>Điện thoại: 0123 456 789</p>
        <p>Email: tranvinh@gmail.com</p>
        <p>Website: www.tranvinhcam.com</p>
      </div>
    
      <form className="contact-form-1" onSubmit={handleSubmit}>
        <h2>LIÊN HỆ VỚI CHÚNG TÔI</h2>
        <input 
          type="text" 
          name="name" 
          placeholder="Họ tên" 
          value={formData.name} 
          onChange={handleChange} 
          required 
        />
        <input 
          type="text" 
          name="phone" 
          placeholder="Số điện thoại" 
          value={formData.phone} 
          onChange={handleChange} 
          required 
        />
        <input 
          type="email" 
          name="email" 
          placeholder="Email" 
          value={formData.email} 
          onChange={handleChange} 
          required 
        />
        <textarea 
          name="message" 
          placeholder="Nội dung liên hệ" 
          value={formData.message} 
          onChange={handleChange} 
          required 
        />
        <button type="submit">Gửi liên hệ</button>
      </form>
    </div>
    {/* map */}
    <div>
        BẢN ĐỒ ĐƯỜNG ĐI 
    </div>
    </section>
    
  );
};

export default LienHe;
