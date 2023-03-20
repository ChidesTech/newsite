import { useEffect } from "react";
import { useState } from "react"
import axios from "../../node_modules/axios/index";

export default function Sidebar({ close }) {
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
    return <div className="sidebar">
        <span onClick={close} >X</span>
        {loading ? <div ><a className="sidebar-item" href="">Loading Categories ...</a></div> : categories.length === 0 ?
            <div ><a className="sidebar-item" href="">No Category Added</a></div> : categories.map(category => {
                return <div ><a className="sidebar-item" href="">{category.name}</a></div>

            })}


    </div>
}