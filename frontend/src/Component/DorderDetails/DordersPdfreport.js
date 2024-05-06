import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff', 
    paddingTop: 20, 
    paddingLeft: 20, 
    paddingRight: 20, 
    paddingBottom: 20, 
   

  },
  section: {
    marginBottom: 10,
  },
  header: {
    fontSize: 20,
    marginBottom: 10,
    borderBottom: '1 solid black',
  },
  order: {
    marginBottom: 10,
  },
  orderId: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  orderDetail: {
    fontSize: 12,
    paddingtop:20,
    marginLeft: 10,
  },
});

// Define PDF report component
const PDFReport = ({ orders }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.header}>Dine-In Orders Daily Report</Text>
      </View>
      {orders.map((order) => (
        <View key={order._id} style={styles.order}>
          <Text style={styles.orderId}>Order ID: {order._id}</Text>
          <View style={styles.orderDetail}>
            <Text>Restaurant Name: {order.resname}</Text>
            <Text>Table ID: {order.tableid}</Text>
            <Text>Food Item: {order.fooditem}</Text>
            <Text>Food Name: {order.name}</Text>
            <Text>Quantity: {order.quantity}</Text>
            <Text>Price (LKR): {order.price}</Text>
            <Text>Order State: {order.state}</Text>
            <Text>Order Date: {new Date(order.createdAt).toLocaleString()}</Text>
          </View>
        </View>
      ))}
    </Page>
  </Document>
);

export default PDFReport;
