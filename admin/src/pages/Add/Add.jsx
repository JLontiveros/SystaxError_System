import React, { useState } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios from "axios"
import { toast } from 'react-toastify'

const Add = ({url}) => {

    

    const [image,setImage] =useState(false);
    const [data,setData] = useState({
        name:"",
        description:"",
        old_price:"",
        new_price:"",
        category:"Cat"
    })

    const onChangeHandler = (event) =>{
        const name = event.target.name;
        const value = event.target.value;
        setData(data=>({...data,[name]:value}))
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("old_price", Number(data.old_price));
        formData.append("new_price", Number(data.new_price));
        formData.append("category", data.category);
        formData.append("image", image);
        
            const response = await axios.post(`${url}/api/product/add`, formData);
            if (response.data.success) {
                setData({
                    name: "",
                    description: "",
                    old_price: "",
                    new_price: "",
                    category: "Cat",
                });
                setImage(false)
                toast.success(response.data.message)
            } 
            else {
               toast.error(response.data.message)
            }
        
    }
    
    
  return (
    <div className='add'>
        <form className='flex-col' onSubmit={onSubmitHandler}>
        <div className="add-image-upload flex-col">
            <p>Upload Image</p>
            <label htmlFor="image">
                <img src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
            </label>
            <input onChange={(e)=>setImage(e.target.files[0])} type="file" id="image" hidden required />
            </div>
            <div className="add-product-name flex col">
                <p>Product name</p>
                <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Type here'/>
            </div>
            <div className="add-product-description flex-col">
                <p>Product Description</p>
                <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder='Write content of the product' required></textarea>
            </div>
            <div className="add-category-price">
                <div className="add-category flex col">
                    <p>Product Category</p>
                    <select onChange={onChangeHandler} value={data.category} name="category" >
                        <option value="Cat">Cat</option>
                        <option value="Dog">Dog</option>
                        <option value="Accessories">Accessories</option>
                    </select>
                </div>
                <div className="old_price flex-col">
                    <p>Old Price</p>
                    <input onChange={onChangeHandler} value={data.old_price} type="Number" name='old_price' placeholder='IN PHP' />
                </div>
                <div className="new_price flex-col">
                    <p>New Market Price</p>
                    <input onChange={onChangeHandler} value={data.new_price} type="Number" name='new_price' placeholder='IN PHP' />
                </div>
            </div>
            <button type='submit' className='add-btn'>ADD</button>
         </form>
    </div>
  )
}

export default Add
