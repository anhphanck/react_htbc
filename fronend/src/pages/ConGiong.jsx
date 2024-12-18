// import Item from '../components/Item';
// import all_products from '../assets/all_products';

// const ConGiong = () => {
//   const productsgiong = all_products.filter(all_products => all_products.category === 'giong');

//   return (
//     <section>
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
//       {productsgiong.map(all_products => (
//         <Item
//           key={all_products.id}
//           id={all_products.id}
//           name={all_products.name}
//           image={all_products.image}
//           old_price={all_products.old_price}
//           new_price={all_products.new_price}
//         />
//       ))}
//     </div>
//     </section>
//   );
// };

// export default ConGiong;
import { useEffect, useState } from 'react';
import Item from '../components/Item';

const ConGiong = () => {
  const [productsGiong, setProductsGiong] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('http://localhost:4000/products?category=giong');
      const data = await response.json();
      setProductsGiong(data);
    };
    fetchProducts();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {productsGiong.map((product) => (
        <Item
          key={product.id}
          id={product.id}
          name={product.name}
          image={product.image}
          old_price={product.old_price}
          new_price={product.new_price}
        />
      ))}
    </div>
  );
};

export default ConGiong;
