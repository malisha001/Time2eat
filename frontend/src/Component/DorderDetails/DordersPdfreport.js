import React from 'react';
import { Page, View, Document, StyleSheet, Text } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 20,
  },
  header: {
    fontSize: 20,
    marginBottom: 10,
    borderBottom: '1 solid black',
  },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: { margin: 'auto', flexDirection: 'row' },
  tableColHeader: { width: '20%', borderStyle: 'solid', borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0 },
  tableCol: { width: '20%', borderStyle: 'solid', borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0 },
});

// Define PDF report component
const PDFReport = ({ orders }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.header}>Dine-In Orders Daily Report</Text>
      <View style={styles.table}>
        {/* Table Header */}
        <View style={styles.tableRow}>
          <Text style={styles.tableColHeader}>Order ID</Text>
          <Text style={styles.tableColHeader}>Restaurant Name</Text>
          <Text style={styles.tableColHeader}>Table ID</Text>
          <Text style={styles.tableColHeader}>Food Item</Text>
          <Text style={styles.tableColHeader}>Food Name</Text>
          <Text style={styles.tableColHeader}>Quantity</Text>
          <Text style={styles.tableColHeader}>Price (LKR)</Text>
          <Text style={styles.tableColHeader}>Order State</Text>
          <Text style={styles.tableColHeader}>Order Date</Text>
        </View>
        {/* Table Rows */}
        {orders.map((order) => (
          <View key={order._id} style={styles.tableRow}>
            <Text style={styles.tableCol}>{order._id}</Text>
            <Text style={styles.tableCol}>{order.resname}</Text>
            <Text style={styles.tableCol}>{order.tableid}</Text>
            <Text style={styles.tableCol}>{order.fooditem}</Text>
            <Text style={styles.tableCol}>{order.name}</Text>
            <Text style={styles.tableCol}>{order.quantity}</Text>
            <Text style={styles.tableCol}>{order.price}</Text>
            <Text style={styles.tableCol}>{order.state}</Text>
            <Text style={styles.tableCol}>{new Date(order.createdAt).toLocaleString()}</Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export default PDFReport;
