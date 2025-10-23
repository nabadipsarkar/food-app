import React, { useState } from 'react'
import "./Add.css"
import { assets } from '../../assets/assets'
import axios from 'axios';
import { toast } from 'react-toastify';

const Add = ({url}) => {

  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad",
    rating: ""
  });
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }));
  }
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("price", Number(data.price));
    formData.append("rating", Number(data.rating));
    formData.append("image", image);
    const response = await axios.post(`${url}/api/food/add`, formData);
    if (response.data.success) {
      setData({
        name: "",
        description: "",
        price: "",
        category: "Salad",
        rating: ""
      })
      setImage(false);
      console.log(response.data);
      toast.success(response.data.message);
    } else {
      toast.error("Some Error")
    }
  }

  return (
    <div className='add'>
      <form className='flex-col' onSubmit={onSubmitHandler}>
        <div className="add-img flex-col">
          <p>Upload Image</p>
          <label htmlFor='image'><img src={image ? URL.createObjectURL(image) : assets.upload_area} /></label>
          <input onChange={(e) => setImage(e.target.files[0])} id='image' type='file' hidden required />
        </div>
        <div className="add-name flex-col">
          <p>Product Name</p>
          <input onChange={onChangeHandler} value={data.name} name='name' type='text' placeholder='type here' />
        </div>
        <div className="add-description flex-col">
          <p>Product Description</p>
          <textarea onChange={onChangeHandler} value={data.description} name='description' rows={5} placeholder='Write something about product..' />
        </div>
        <div className="add-category-price ">
          <div className="add-category flex-col">
            <p>Product Category</p>
            <select onChange={onChangeHandler} name='category'>
              <option value="Salad">Salad</option>
              <option value="Cake">Cake</option>
              <option value="Deserts">Deserts</option>
              <option value="Rolls">Rolls</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
              <option value="Pure Veg">Pure Veg</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product Price</p>
            <input onChange={onChangeHandler} value={data.price} type='Number' name='price' placeholder='$' />
          </div>

        </div>
        <div className="add-rating flex-col">
          <p>Product Rating</p>
          <input onChange={onChangeHandler} value={data.rating} type='Number' name='rating' />
        </div>
        <button className='add-button' type='submit'>Add</button>
      </form>
    </div>
  )
}

export default Add
