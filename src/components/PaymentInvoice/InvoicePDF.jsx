import React from "react";
import { Document, Page, Text, View, StyleSheet, Image, Font } from "@react-pdf/renderer";

// ডিজাইন স্টাইলস
const styles = StyleSheet.create({
    page: {
        padding: 50,
        fontSize: 10,
        fontFamily: 'Helvetica',
        color: '#2d3436',
        backgroundColor: '#ffffff',
    },
    // --- Top Header ---
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 40,
        borderBottom: '2pt solid #fa0bd2',
        paddingBottom: 20,
    },
    logo: {
        width: 60,
        height: 60,
    },
    companyDetails: {
        textAlign: 'right',
    },
    brandName: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fa0bd2',
        letterSpacing: 1,
    },
    // --- Invoice Meta ---
    metaSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30,
        backgroundColor: '#fcfcfc',
        padding: 15,
        borderRadius: 5,
        border: '0.5pt solid #eee',
    },
    metaBlock: {
        flexDirection: 'column',
    },
    label: {
        fontSize: 8,
        color: '#95a5a6',
        textTransform: 'uppercase',
        marginBottom: 3,
        fontWeight: 'bold',
    },
    value: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#2d3436',
    },
    // --- Table Layout ---
    table: {
        marginTop: 20,
    },
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: '#2d3436',
        borderRadius: 3,
        color: '#fff',
        padding: 8,
        fontWeight: 'bold',
    },
    tableRow: {
        flexDirection: 'row',
        borderBottom: '0.5pt solid #eee',
        padding: 10,
        alignItems: 'center',
    },
    col1: { width: '50%' },
    col2: { width: '25%', textAlign: 'center' },
    col3: { width: '25%', textAlign: 'right' },
    // --- Calculation Section ---
    calculationSection: {
        marginTop: 30,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    totalContainer: {
        width: 180,
        borderTop: '1pt solid #fa0bd2',
        paddingTop: 10,
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    grandTotal: {
        marginTop: 10,
        padding: 8,
        backgroundColor: '#fa0bd2',
        color: '#fff',
        borderRadius: 3,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    // --- Footer ---
    footer: {
        position: 'absolute',
        bottom: 30,
        left: 50,
        right: 50,
        textAlign: 'center',
        color: '#bdc3c7',
        fontSize: 8,
        borderTop: '0.5pt solid #eee',
        paddingTop: 10,
    },
    stamp: {
        position: 'absolute',
        top: '45%',
        left: '30%',
        fontSize: 60,
        color: '#27ae60',
        opacity: 0.1,
        transform: 'rotate(-30deg)',
        fontWeight: 'bold',
        textTransform: 'uppercase',
    }
});

const InvoicePDF = ({ payment }) => {
    if (!payment) return null;

    // আপনার লোগোর URL এখানে দিন (Base64 বা Hosted Link)
    const logoUrl = "https://i.ibb.co/F4p6XvD/logo-placeholder.png";

    return (
        <Document title={`Invoice-${payment._id}`}>
            <Page size="A4" style={styles.page}>
                {/* Background Watermark */}
                <Text style={styles.stamp}>PAID</Text>

                {/* Header Section */}
                <View style={styles.headerContainer}>
                    <Image style={styles.logo} src={logoUrl} />
                    <View style={styles.companyDetails}>
                        <Text style={styles.brandName}>NEXUS PAY</Text>
                        <Text style={{ fontSize: 9, color: '#636e72' }}>DHAKA, BANGLADESH</Text>
                        <Text style={{ fontSize: 9, color: '#636e72' }}>support@nexuspay.com</Text>
                    </View>
                </View>

                {/* Meta Information */}
                <View style={styles.metaSection}>
                    <View style={styles.metaBlock}>
                        <Text style={styles.label}>Billed To</Text>
                        <Text style={styles.value}>{payment.boostedBy || payment.email}</Text>
                        <Text style={{ fontSize: 8, color: '#636e72', marginTop: 2 }}>Customer ID: {payment?.userId || 'N/A'}</Text>
                    </View>
                    <View style={[styles.metaBlock, { textAlign: 'center' }]}>
                        <Text style={styles.label}>Date</Text>
                        <Text style={styles.value}>{new Date(payment.paidAt).toLocaleDateString('en-GB')}</Text>
                    </View>
                    <View style={[styles.metaBlock, { textAlign: 'right' }]}>
                        <Text style={styles.label}>Invoice No</Text>
                        <Text style={styles.value}>#INV-{payment._id.slice(-6).toUpperCase()}</Text>
                    </View>
                </View>

                {/* Table Header */}
                <View style={styles.table}>
                    <View style={styles.tableHeader}>
                        <Text style={styles.col1}>DESCRIPTION</Text>
                        <Text style={styles.col2}>STATUS</Text>
                        <Text style={styles.col3}>AMOUNT</Text>
                    </View>

                    {/* Table Body */}
                    <View style={styles.tableRow}>
                        <View style={styles.col1}>
                            <Text style={{ fontWeight: 'bold' }}>{payment.title || payment.type || 'Digital Service'}</Text>
                            <Text style={{ fontSize: 8, color: '#636e72', marginTop: 2 }}>Transaction ID: {payment.transactionId || payment._id}</Text>
                        </View>
                        <View style={styles.col2}>
                            <Text style={{ color: '#27ae60', fontSize: 9 }}>Confirmed</Text>
                        </View>
                        <View style={styles.col3}>
                            <Text>{payment.amount?.toLocaleString()} {payment.currency || 'BDT'}</Text>
                        </View>
                    </View>
                </View>

                {/* Calculation Section */}
                <View style={styles.calculationSection}>
                    <View style={styles.totalContainer}>
                        <View style={styles.totalRow}>
                            <Text style={styles.label}>Subtotal</Text>
                            <Text style={styles.value}>{payment.amount} {payment.currency}</Text>
                        </View>
                        <View style={styles.totalRow}>
                            <Text style={styles.label}>VAT (0%)</Text>
                            <Text style={styles.value}>0.00</Text>
                        </View>
                        <View style={styles.grandTotal}>
                            <Text style={{ fontSize: 10, fontWeight: 'bold' }}>GRAND TOTAL</Text>
                            <Text style={{ fontSize: 12, fontWeight: 'bold' }}>
                                {payment.amount?.toLocaleString()} {payment.currency}
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Footer */}
                <View style={styles.footer}>
                    <Text>This is a digitally generated invoice, no physical signature required.</Text>
                    <Text style={{ marginTop: 2 }}>&copy; 2026 NEXUS PAY. All Rights Reserved.</Text>
                </View>
            </Page>
        </Document>
    );
};

export default InvoicePDF;