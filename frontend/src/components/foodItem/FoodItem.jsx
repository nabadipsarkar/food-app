import './FoodItem.css'
import Rating from '@mui/material/Rating';
import { useContext} from 'react';
import { StoreContext } from '../../context/StoreContext';
export default function FoodItem({ id, name, price, description, image, rating }) {
    const{cartItem,addToCart, removeFromCart,url} = useContext(StoreContext);
    return (
        <div className='food-item'>
            <div className="food-item-img-contain">
                <img className='food-item-img' src={url+"/images/"+image} alt='' />
                <div className='hello'>
                    { !cartItem[id]?
                    <i onClick={()=>addToCart(id)} className="fa-solid fa-plus add-icon"></i>                                          
                    :
                    <div className='counter-icons'>
                        <i onClick={()=>removeFromCart(id)} className="fa-solid fa-minus minus"></i>
                        <p>{cartItem[id]}</p>
                        <i onClick={()=>addToCart(id)} className="fa-solid fa-plus plus"></i>
                    </div>                  
                }
                </div>
                
            </div>
            <div className="food-item-info">
                <div className="food-name-rating">
                    <p className='food-item-name'>{name}</p>
                    <p className="food-item-rating"><Rating name="read-only" value={rating} readOnly /></p>
                </div>
                <p className='food-item-des'>{description}</p>
                <p className='food-item-price'>${price}</p>
            </div>
        </div>
    )
}