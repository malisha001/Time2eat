import React from 'react';
import ReactDOM from 'react-dom';
import  PDFReport  from '../../component/DorderDetails/DordersPdfreport.js';
import { PDFViewer, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { useEffect} from 'react';
import classes from './dinein.module.css';
import { useDorderContext } from '../../hooks/useDorderContext';
import DIorderDetails from '../../component/DorderDetails/DorderDetails.js';
import OrderForm from '../../component/DineInForm/DineInForm';

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

    
      const generatePDF = () => {
        const MyDocument = () => (
          <Document>
            <Page>
              <PDFReport orders={orders} />
            </Page>
          </Document>
        );
         // Open the PDF in a new tab using PDFViewer
  const App = () => (
    <PDFViewer width="100%" height="100%">
      <MyDocument />
    </PDFViewer>
  );
  ReactDOM.render(<App />, document.getElementById('root'));
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
        <button onClick={generatePDF}>Generate PDF Report</button>

        </div>

        </div>
        
    )
}

export default DineIn;