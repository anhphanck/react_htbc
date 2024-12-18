import home from "../assets/home.webp"
const Home = () => {
  return (
    <section className="home">
      <div className="text-content">
        <h2>Về chúng tôi</h2>
        <p>
          Trần Vinh là đại lý cung cấp thức ăn chăn nuôi gia súc, gia cầm và con giống chất lượng cao, 
          đáp ứng nhu cầu chăn nuôi của bà con khắp các tỉnh thành.
        </p>
      </div>
      <img src={home} alt="Farm" className="background-image" />
    </section>
  )
}

export default Home