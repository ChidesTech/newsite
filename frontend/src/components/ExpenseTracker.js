export default function ExpenseTracker(){
    return <>
    <h1 className="text-center text-white mt-5">Expense Tracker</h1>
    <form action="" className="form w-75 mx-auto mt-5">
        <input type="text" className="form-control mb-3" placeholder="Enter Expense" />
        <input type="text" className="form-control mb-3" placeholder="Enter Amount" />
        <select className="form-control mb-3" name="" id="">
            <option value="">Income</option>
            <option value="">Expense</option>
        </select>
        <button className="btn-lg btn-danger w-100">Add Item</button>
    </form>

    <table className="table w-75 m-auto mt-5">
        <tr><th>Details</th> <th>Type</th> <th>Amount</th></tr>
        <tr><th>Car</th> <th>Expense</th> <th>$4000</th></tr>
        <tr><th>Salary</th> <th>Income</th> <th>$150000</th></tr>
        <tr><th>Laptop</th> <th>Expense</th> <th>$150000</th></tr>
        <tr><th>Sales</th> <th>Income</th> <th>$10000</th></tr>
        <tr><th>Laptop</th> <th>Expense</th> <th>$150000</th></tr>
        <tr><th>Sales</th> <th>Income</th> <th>$10000</th></tr>
        <tr><th>Laptop</th> <th>Expense</th> <th>$150000</th></tr>
        <tr><th>Sales</th> <th>Income</th> <th>$10000</th></tr>
        <tr><th>Laptop</th> <th>Expense</th> <th>$150000</th></tr>
        <tr><th>Sales</th> <th>Income</th> <th>$10000</th></tr>
    </table>
    </>
}