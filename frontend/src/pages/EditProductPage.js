import { useEffect } from "react";
import { useState } from "react"
import Swal from "sweetalert2";
import { useNavigate, useParams } from "../../node_modules/react-router-dom/dist/index";
import http from "../http";

export default function EditProductPage(){
    const [title , setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const {id} = useParams();

 
async function getProduct(){
    const {data} = await http.get(`/products/${id}`);
    setTitle(data.title);
    setPrice(data.price);
    setImage(data.image);
    setDescription(data.description);
}

async function submitHandler(e){
   e.preventDefault();
   const {data} = await http.put(`/products/${id}`, {title, price, image, description});
   if(data.error){
    setError(data.error)
    return;
   }


   if(data.success){
    Swal.fire("Done", "Product Updated Successfulyy", "success");
    getProduct();
   }
}


useEffect(() =>{
    getProduct();

},[])
    return <>
    <h1 className="text-center text-white m-5">Edit Product</h1>
    <form onSubmit={submitHandler} action="" style={{maxWidth : "750px", margin : "auto"}} className="form">
      {error &&  <div className="alert alert-danger p-2">{error}</div>}
      <label htmlFor="" className="text-white mb-1">TITLE</label>
      <input onChange={e => setTitle(e.target.value)} value={title} type="text" className="py-2 form-control mb-3" placeholder="Title"/>
      <label htmlFor="" className="text-white mb-1">PRICE</label> 
      <input onChange={e => setPrice(e.target.value)} value={price} type="number" className="py-2 form-control mb-3" placeholder="Price"/>
      <label htmlFor="" className="text-white mb-1">IMAGE</label>      
      <input  onChange={e => setImage(e.target.value)} value={image}type="text" className="py-2 form-control mb-3" placeholder="Image URL"/>
      <label htmlFor="" className="text-white mb-1">DESCRIPTION</label>     
      <input  onChange={e => setDescription(e.target.value)} value={description}type="text" className="py-2 form-control mb-3" placeholder="Description"/>
      <button className="btn btn-info w-100">Update</button>
    </form>
    </>
}