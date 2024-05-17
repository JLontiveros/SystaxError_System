import React, { useState } from 'react';
import './AddProduct.css';
import upload_area from '../../assets/upload_area.svg';

const AddProduct = () => {

    const [image, setImage] = useState(null);
    const [productDetails, setProductDetails] = useState({
        name: "",
        image: "",
        category: "cat",
        new_price: "",
        old_price: ""
    });

    const imageHandler = (e) => {
        setImage(e.target.files[0]);
    };

    const changeHandler = (e) => {
        setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
    };

    const Add_Product = async () => {
        console.log(productDetails);
        let responseData;
        let product = { ...productDetails };

        let formData = new FormData();
        formData.append('product', image);

        try {
            const uploadResponse = await fetch('http://localhost:4000/upload', {
                method: 'POST',
                body: formData,
            });

            if (!uploadResponse.ok) {
                throw new Error(`Upload failed with status: ${uploadResponse.status}`);
            }

            const uploadResult = await uploadResponse.json();

            if (uploadResult && uploadResult.success) {
                product.image = uploadResult.image_url;

                const addProductResponse = await fetch('http://localhost:4000/addproduct', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(product),
                });

                if (!addProductResponse.ok) {
                    throw new Error(`Add product failed with status: ${addProductResponse.status}`);
                }

                const addProductData = await addProductResponse.json();

                if (addProductData.success) {
                    alert("Product Added");
                } else {
                    alert("Failed to add product");
                }
            } else {
                console.error('Upload failed:', uploadResult);
            }
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };

    return (
        <div className='add-product'>
            <div className="addproduct-itemfield">
                <p>Product Title</p>
                <input value={productDetails.name} onChange={changeHandler} type="text" name='name' placeholder='Type here' />
            </div>
            <div className="addproduct-price">
                <div className="addproduct-itemfield">
                    <p>Current Price in PHP</p>
                    <input value={productDetails.old_price} onChange={changeHandler} type="text" name="old_price" placeholder="Type here" />
                </div>
                <div className="addproduct-itemfield">
                    <p>Discounted Price in PHP</p>
                    <input value={productDetails.new_price} onChange={changeHandler} type="text" name="new_price" placeholder="Type here" />
                </div>
            </div>
            <div className="addproduct-itemfield">
                <p>Product Category</p>
                <select value={productDetails.category} onChange={changeHandler} name="category" className='add-product-selector'>
                    <option value="cat">Cat</option>
                    <option value="dog">Dog</option>
                    <option value="accessories">Supplies</option>
                </select>
            </div>
            <div className="addproduct-itemfield">
                <label htmlFor="file-input">
                    <img src={image ? URL.createObjectURL(image) : upload_area} className='addproduct-thumbnail-img' alt="" />
                </label>
                <input onChange={imageHandler} type="file" name='image' id='file-input' hidden />
            </div>
            <button onClick={Add_Product} className='addproduct-btn'>ADD</button>
        </div>
    );
};

export default AddProduct;
