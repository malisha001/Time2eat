import React from 'react';
import { useEffect} from 'react';
import classes from './dinein.module.css';
import { useDorderContext } from '../../hooks/useDorderContext';
import DIorderDetails from '../../component/DorderDetails/DorderDetails.js';
import OrderForm from '../../component/DineInForm/DineInForm';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import logo from '../../Assests/white.jpg';

const DineIn = () => {
  const {orders,dispatch}= useDorderContext()

    useEffect(() => {

         const fetchDineinOrders = async () => {
        
           const response = await fetch('/api/dineinorders');
           const json = await response.json();
          
          if(response.ok) {
            dispatch({type: 'SET_ORDERS' , payload: json})
           }
          }
       fetchDineinOrders()
    }, [dispatch])

    
     

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
  const reportTitle = 'Dine-In Orders Daily Report';
  const titleX = 70;
  
  doc.setFontSize(14);
  doc.text(reportTitle, titleX, 40); // Center the text horizontally


  const tableColumn = ["Order ID",  "Table ID", "Food Item", "Food Name", "Quantity", "Price (LKR)", "Order State", "Order Date"];
  const tableRows = [];
   
  orders.forEach((order) => {
    const rowData = [
      order._id,
      order.tableid,
      order.fooditem,
      order.name,
      order.quantity,
      order.price,
      order.state,
      new Date(order.createdAt).toLocaleString()
    ];
    tableRows.push(rowData);
  });

  doc.autoTable({
    head: [tableColumn],
    body: tableRows,
    startY: 50
  });

  doc.save("dine_in_orders_report.pdf");
};

    
    return (
     <div className={classes.topic}>
       <h2>Dine-In Orders</h2>
       
      <div className={classes.home}>
      <div className={classes.dinein} >
        <div className={classes.dorders}>
        {orders && orders.map((order) => (
            <DIorderDetails key={order._id} order={order} />
       ))}

      </div> 
      </div>
      
      


        <OrderForm />
        
        <button  onClick={generatePDFReport}>Generate PDF Report</button>
        
        </div>

        </div>
        
    )
}

export default DineIn;