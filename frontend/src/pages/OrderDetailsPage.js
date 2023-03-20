import { useParams } from "react-router-dom"
import Swal from "sweetalert2";
import http from "../http"

export default function OrderDetailsPage() {
    const {id} = useParams();
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    async function updateStatus(status){
        const {data} = await http.put(`/orders/${id}`, {status});
        if(data.error){
            Swal.fire("Error", data.error, "error");
            return;
        }
        if(data.success){
            Swal.fire("Done", "Order Updated Successfully", "success");
            // getOrder();
        }
    }
    return <div className="order-details">
        <div className="order-details-info">
            <div className="order-details-items">
                <h2>Order Items</h2>
                <table className="table w-100">
                    <tr>
                        <td><img style={{ height: "5rem", width: "5rem" }} src="/chidestech.jpg" alt="" /></td>
                        <td>Product 1</td>
                        <td>3 X 60000 = 18000000</td>
                    </tr>
                    <tr>
                        <td><img style={{ height: "5rem", width: "5rem" }} src="/chidestech.jpg" alt="" /></td>
                        <td>Product 1</td>
                        <td>3 X 60000 = 18000000</td>
                    </tr>
                    <tr>
                        <td><img style={{ height: "5rem", width: "5rem" }} src="/chidestech.jpg" alt="" /></td>
                        <td>Product 1</td>
                        <td>3 X 60000 = 18000000</td>
                    </tr>
                    <tr><td></td> <td></td>  <td>Total = 60000000</td></tr>
                </table>
            </div>
            <div className="order-details-delivery-info">
                <h2>Delivery Information</h2>
                <table className="table w-100">
                    <tr> <td>Full Name : Desmond Nwosu</td> </tr>
                    <tr> <td>Email : des@gmail.com</td></tr>
                    <tr><td>Username : chidestech</td> </tr>
                    <tr><td>Address : Aroma</td></tr>
                    <tr><td>City : Awka</td></tr>
                    <tr><td>Phone Number : 0814168054</td></tr>
                </table>
            </div>
        </div>
        <div className="order-details-actions">
            <form action="" className="form">
                <h4>Total Price : 6,000,000</h4>
                <h4>Status : Pending</h4>
               {userInfo.isAdmin &&  <>
                <label htmlFor="">Change Status</label>
                <select name="" onChange={e => updateStatus(e.target.value)} className="form-control" id="">
                    <option value="Pending">Pending</option>
                    <option value="Processed">Processed</option>
                    <option value="Enroute">Enroute</option>
                    <option value="Delivered">Delivered</option>
                </select>
                </>
            }  

            </form>
        </div>
    </div>
}