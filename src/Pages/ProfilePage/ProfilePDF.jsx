import React from "react";
import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";

const styles = StyleSheet.create({
    page: {
        padding: 50,
        fontSize: 10,
        fontFamily: 'Helvetica',
        color: '#2d3436',
        backgroundColor: '#ffffff',
    },
    // --- Top Accent Bar ---
    topBar: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 10,
        backgroundColor: '#fa0bd2',
    },
    // --- Header Section ---
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 30,
        marginTop: 10,
    },
    title: {
        fontSize: 22,
        fontWeight: 'extrabold',
        color: '#1a1a1a',
        textTransform: 'uppercase',
    },
    statusBadge: {
        padding: '4 12',
        borderRadius: 15,
        fontSize: 8,
        backgroundColor: '#e3fcef',
        color: '#006644',
        fontWeight: 'bold',
    },
    // --- Profile Identity Section ---
    identitySection: {
        flexDirection: 'row',
        backgroundColor: '#f9fafb',
        padding: 20,
        borderRadius: 10,
        border: '1pt solid #f1f2f6',
        marginBottom: 30,
    },
    avatarPlaceholder: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#fa0bd2',
        marginRight: 20,
    },
    userMainInfo: {
        justifyContent: 'center',
    },
    userName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1a1a1a',
    },
    userRole: {
        fontSize: 9,
        color: '#fa0bd2',
        marginTop: 2,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    // --- Info Grid ---
    infoGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 20,
    },
    infoItem: {
        width: '45%',
        marginBottom: 15,
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
        color: '#2d3436',
        fontWeight: 'medium',
    },
    // --- Timeline Section ---
    timeline: {
        marginTop: 20,
        borderTop: '1pt solid #eee',
        paddingTop: 20,
    },
    footer: {
        position: 'absolute',
        bottom: 30,
        left: 50,
        right: 50,
        textAlign: 'center',
        borderTop: '0.5pt solid #eee',
        paddingTop: 10,
        color: '#bdc3c7',
        fontSize: 8,
    }
});

const ProfilePDF = ({ user, userData }) => {
    if (!user || !userData) return null;

    return (
        <Document title={`Profile-${user.displayName || 'User'}`}>
            <Page size="A4" style={styles.page}>
                <View style={styles.topBar} />

                {/* Header */}
                <View style={styles.header}>
                    <View>
                        <Text style={styles.title}>User <Text style={{ color: '#fa0bd2' }}>Profile</Text></Text>
                        <Text style={{ fontSize: 8, color: '#95a5a6', marginTop: 4 }}>Identity Verification Document</Text>
                    </View>
                    <Text style={styles.statusBadge}>{userData.userStatus?.toUpperCase() || "ACTIVE"}</Text>
                </View>

                {/* Identity Card Style */}
                <View style={styles.identitySection}>
                    {/* যদি ইউজারের ইমেজ থাকে তবে Image ব্যবহার করবেন */}
                    {user.photoURL ? (
                        <Image src={user.photoURL} style={styles.avatarPlaceholder} />
                    ) : (
                        <View style={styles.avatarPlaceholder} />
                    )}
                    <View style={styles.userMainInfo}>
                        <Text style={styles.userName}>{user.displayName || "Anonymous User"}</Text>
                        <Text style={styles.userRole}>{userData.role || "Standard Member"}</Text>
                        <Text style={[styles.lightText, { fontSize: 8, marginTop: 4 }]}>{user.email}</Text>
                    </View>
                </View>

                {/* Detailed Information Grid */}
                <View style={styles.infoGrid}>
                    <View style={styles.infoItem}>
                        <Text style={styles.label}>Phone Number</Text>
                        <Text style={styles.value}>{userData.phone || "Not Provided"}</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.label}>Account Status</Text>
                        <Text style={styles.value}>{userData.userStatus || "Verified"}</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.label}>Access Level</Text>
                        <Text style={styles.value}>{userData.role === 'admin' ? 'Full System Access' : 'Standard User Access'}</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.label}>Location</Text>
                        <Text style={styles.value}>{userData.location || "Bangladesh"}</Text>
                    </View>
                </View>

                {/* Account Activity Timeline */}
                <View style={styles.timeline}>
                    <Text style={[styles.label, { marginBottom: 10, color: '#1a1a1a' }]}>Account Activity Timeline</Text>

                    <View style={{ marginBottom: 10 }}>
                        <Text style={styles.label}>Member Since</Text>
                        <Text style={styles.value}>{new Date(user.metadata?.creationTime).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</Text>
                    </View>

                    <View>
                        <Text style={styles.label}>Most Recent Login</Text>
                        <Text style={styles.value}>{new Date(user.metadata?.lastSignInTime).toLocaleString()}</Text>
                    </View>
                </View>

                {/* Footer */}
                <View style={styles.footer}>
                    <Text>NexusPay Digital Identity Management &bull; 2026</Text>
                    <Text style={{ marginTop: 2 }}>This is an auto-generated profile summary for official use only.</Text>
                </View>
            </Page>
        </Document>
    );
};

export default ProfilePDF;