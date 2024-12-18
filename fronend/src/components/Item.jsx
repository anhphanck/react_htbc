import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'

const Item = ({id, name, image, old_price, new_price}) => {
  return (
    <div className='rounded-xl overflow-hidden shadow-lg mt-[4cm]'>
        <div>
            <Link to={`product/${id}`} ></Link>
            <img src={image} alt='Ảnh sản phẩm' className='w-3/5 block object-cover mx-auto'/>
        </div>
        <div className='p-4 overflow-hidden text-center'>
            <h4 className='my-[6px] medium-16 line-clamp-2 text-gray-30'>{name}</h4>
            <div className='flex gap-5 justify-center'>
                <div className='bold-16'>{new_price} k</div>
                <div className='text-secondary bold-16 line-through '>{old_price} k</div>
            </div>
        </div>
    </div> 
  )
}
Item.propTypes = {
  id: PropTypes.number.isRequired,         
  name: PropTypes.string.isRequired,        
  image: PropTypes.string.isRequired,      
  old_price: PropTypes.string.isRequired,   
  new_price: PropTypes.string.isRequired,   
};
export default Item