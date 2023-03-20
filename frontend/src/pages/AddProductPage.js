import { useEffect, useState } from "react"
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import http from "../http";
import axios from "../../node_modules/axios/index";

export default function AddProductPage() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [images, setImages] = useState([]);
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);


  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true)

  async function getCategories() {
    setLoading(true)
    try {
      const { data } = await axios.get("https://chidestore-server.onrender.com/api/categories");
      setCategories(data);
      setLoading(false)
    } catch (error) {

    }
  }
  useEffect(() => {
    getCategories()
  }, [])

  async function handleCoverImageFileChange(e) {
    setUploading(true);
    const file = e.target.files[0];
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "chidespencils");
    data.append("cloud_name", "chidestech");
    try {
      const result = await axios.post("https://api.cloudinary.com/v1_1/chidestech/image/upload", data);
      console.log(result)
      setImage(result.data.secure_url);
      setUploading(false);
    } catch (error) {
      Swal.fire("Error", error.message, "error");
      setUploading(false);

    }
  }

  async function handleImagesFileChange(e) {
    setUploading(true);
    const file = e.target.files[0];
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "chidespencils");
    data.append("cloud_name", "chidestech");
    try {
      const result = await axios.post("https://api.cloudinary.com/v1_1/chidestech/image/upload", data);
      console.log(result)
      setImages([...images, result.data.secure_url]);
      setUploading(false);
    } catch (error) {
      Swal.fire("Error", error.message, "error");
      setUploading(false);

    }
  }

  



  async function submitHandler(e) {
    e.preventDefault();
    //Check for empty fields
    if (!title || !price || !image || !description) {
      setError("No field should be empty!!!");
      return;
    }
    //Send a post request to the server with the product information
    const { data } = await http.post("/products", { title, price, image, description, images });
    if (data.error) {
      setError(data.error);
      return
    }
    if (data.success) {
      Swal.fire("Saved", "Product Saved Successfully", "success");
      navigate("/admin-products");
    }
  }

  return <>
    <h1 className="text-center text-white m-5">Add Product</h1>
    <form onSubmit={submitHandler} action="" style={{ maxWidth: "750px", margin: "auto" }} className="form">
      {error && <div className="alert alert-danger p-2">{error}</div>}
      {uploading && <h3 className="text-white">uploading . . .</h3>}
      <h5 className="text-white">Select Cover Image</h5>
      <label className="form-control mb-3 py-3" htmlFor="imageFile">
           <input type="file" name="" id="imageFile" accept="image/*" onChange={handleCoverImageFileChange} />
        {image && <img src={image} alt="" style={{ width: "5rem", height: "5rem" }} />}
      </label>
      <input onChange={e => setTitle(e.target.value)} value={title} type="text" className="py-2 form-control mb-3" placeholder="Title" />
      <input onChange={e => setPrice(e.target.value)} value={price} type="number" className="py-2 form-control mb-3" placeholder="Price" />
      <select className="py-2 form-control mb-3" name="" id="">
        <option value="">Book</option>
      </select>
      <h5 className="text-white">Choose Other Images</h5>
      <label className="form-control mb-3 py-3" htmlFor="imageFile">
           <input type="file" name="" id="imageFile" accept="image/*" onChange={handleImagesFileChange} />
        {images && images.map(image => {
          return    <img src={image} alt="" style={{ width: "5rem", height: "5rem" }} />
        }) }
      </label>
      <input onChange={e => setDescription(e.target.value)} value={description} type="text" className="py-2 form-control mb-3" placeholder="Description" />
      <button disabled={uploading} className="btn btn-info w-100">Submit</button>
    </form>
  </>
}