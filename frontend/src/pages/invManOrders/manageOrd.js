import './manOrd.css'
import { Link } from 'react-router-dom'
import Navbar from '../../component/inventoryNavbar/invNavBar'
import { useEffect, useState } from 'react'
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import logo from '../../Assests/white.jpg';



const ManageOrder = () => {


    const [orders, setOrders] = useState(null);



    useEffect(() => {
        const fetchOnlineOrders = async () => {
            try {
                const response = await fetch('/api/onlineOrders/rider');
                if (!response.ok) {
                    throw new Error('Failed to fetch online orders');
                }
                const json = await response.json();
                console.log("onlineorders", json);
                setOrders(json);
            } catch (error) {
                console.error('Error fetching online orders:', error);
            }
        };
        fetchOnlineOrders();
    }, []);

    const handleDelete = async (orderId) => {
        const response = await fetch('/api/onlineOrders/' + orderId, {
            method: 'DELETE'
        });
        if (response.ok) {
            // Remove the deleted item from the items state
            setOrders(orders.filter(order => order._id !== orderId));
            // Update total category count after deletion
           /*updateTotalCategoryCount(items.filter(item => item._id !== itemId));*/
        }
    };
    
    const generatePDFReport = () => {
        if (!orders) return; // No data to generate report
        const doc = new jsPDF();
      
        
        const logoWidth = 30;
        const logoHeight = 30;
        const businessNameX = 10 + logoWidth + 10;
        
      
        // Add logo to the PDF document
        doc.addImage(logo, 'jpg', 10, 5,logoWidth,logoHeight);
        doc.setFontSize(16);
        doc.text("Restaurant Reservation and Food Ordering System", businessNameX , 20);
      
        // Add horizontal line
        doc.setLineWidth(0.5);
        doc.line(10, 30, doc.internal.pageSize.getWidth() - 10, 30);
      
        // Add "Dine-In Orders Daily Report" text
        const reportTitle = 'Online Orders Daily Report';
        const titleX = 70;
        
        doc.setFontSize(14);
        doc.text(reportTitle, titleX, 40); // Center the text horizontally
      
      
        const tableColumn = ["Order ID", "Customer Name", "Item Name",  "Quantity", "Price (LKR)","Order Date"];
        const tableRows = [];
         
        orders.forEach((order) => {
          const rowData = [
            order._id,
            order.cusName,
            order.fooditem,
            order.quantity,
            order.price,
            new Date(order.createdAt).toLocaleString()
          ];
          tableRows.push(rowData);
        });
      
        doc.autoTable({
          head: [tableColumn],
          body: tableRows,
          startY: 50
        });
      
        doc.save("Online_orders.pdf");
      };
      
      

    return(
        <div>
            <Navbar/>
                <div className="inv-manageOrder">
                    <h1>Welcome to restaurant’s online order management</h1>
                    <hr />
                    <div className='button-inv-flx'>
                    <h2>Orders</h2>
                    <button className='inv-generate-button' onClick={generatePDFReport}>Generate PDF Report</button>
                    </div>
                    <h4>Given below are the online orders,</h4>
                    
                    
                    <div className="OnlineOrder-Items">
                    
                        <table>
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Customer Name</th>
                                    <th>Item Name</th>
                                    <th>Quantity</th>
                                    <th>Price (Rs.)</th>
                                    <th>Action</th> 
                                </tr>
                            </thead>
                            <tbody>
                                {orders && orders.map((order) => (
                                <tr key={order._id}>
                                    <td>{order.orderid}</td>
                                    <td>{order.cusName}</td>
                                    <td>{order.fooditem}</td>
                                    <td>{order.quantity}</td>
                                    <td>{order.price}</td>
                                    <td>
                                            <button onClick={() => handleDelete(order._id)} className="OnlineOrder-DeleteButton">Delete</button>
                                            <Link to={`/inventory/onlineOrd/update/${order._id}`} ><button className="OnlineOrder-UpdateButton">Update</button></Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <br /><br /><br />
                    
         
                </div>
        </div>
    )
}

export default ManageOrder;