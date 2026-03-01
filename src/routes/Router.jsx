import React, { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Loading from "../components/Loading/Loading"; // 

// --- Lazy Loading Components ---

// Public Pages
const HomePage = lazy(() => import("../Pages/Home/HomePage"));
const AllIssues = lazy(() => import("../Pages/AllIssues/AllIssues"));
const Services = lazy(() => import("../Pages/Services/Services"));
const AboutUs = lazy(() => import("../Pages/AboutUs/AboutUs"));
const ServiceCenters = lazy(() => import("../Pages/ServiceCenters/ServiceCenters"));
const IssueDetails = lazy(() => import("../Pages/IssueDetails/IssueDetails"));

// Auth Pages
const AuthLayout = lazy(() => import("../layouts/AuthLayout"));
const Login = lazy(() => import("../Pages/AuthPages/Login"));
const Register = lazy(() => import("../Pages/AuthPages/Register"));

// Private/Protected Pages
const ReportIssue = lazy(() => import("../Pages/ReportIssue/ReportIssue"));
const DashboardLayout = lazy(() => import("../layouts/DashboardLayout"));
const DashboardHome = lazy(() => import("../Pages/DashboardRelated/DashboardHome/DashboardHome"));
const ProfilePage = lazy(() => import("../Pages/ProfilePage/ProfilePage"));
const MyIssues = lazy(() => import("../Pages/DashboardRelated/CitizenDashboard/MyIssues/MyIssues"));
const Settings = lazy(() => import("../Pages/DashboardRelated/Settings/Settings"));

// Admin/Staff Pages
const AddStaff = lazy(() => import("../Pages/DashboardRelated/AdminDashboard/AddStaff"));
const AdminAllIssues = lazy(() => import("../Pages/DashboardRelated/AdminDashboard/AdminAllIssues/AdminAllIssues"));
const ManageUsers = lazy(() => import("../Pages/DashboardRelated/AdminDashboard/ManageUsers"));
const AllPaymentsHistory = lazy(() => import("../Pages/DashboardRelated/AdminDashboard/AllPaymentsHistory"));
const AssignedIssues = lazy(() => import("../Pages/DashboardRelated/StaffDashboard/AssignedIssues/AssignedIssues"));

// Error & Routes
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import StaffRoute from "./StaffRoute";
const ErrorPage = lazy(() => import("../Pages/ErrorPage/ErrorPage"));

// Suspense Wrapper Function
const withSuspense = (Component) => (
    <Suspense fallback={<Loading />}>
        <Component />
    </Suspense>
);

export const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        children: [
            { index: true, element: withSuspense(HomePage), handle: { title: "Home" } },
            { path: "allIssues", element: withSuspense(AllIssues), handle: { title: "All Issues" } },
            { path: "services", element: withSuspense(Services), handle: { title: "Services" } },
            { path: "aboutUs", element: withSuspense(AboutUs), handle: { title: "About Us" } },
            {
                path: "service-centers",
                element: withSuspense(ServiceCenters),
                handle: { title: "Service Centers" },
                loader: () => fetch('/serviceCenter.json').then(res => res.json())
            },
            {
                path: "post-issue",
                element: <PrivateRoute>{withSuspense(ReportIssue)}</PrivateRoute>,
                handle: { title: "Report an Issue" },
                loader: () => fetch('/serviceCenter.json').then(res => res.json())
            },
            {
                path: "issues/:id",
                element: withSuspense(IssueDetails),
                handle: { title: "Issue Details" }
            }
        ]
    },
    {
        path: "/",
        element: withSuspense(AuthLayout),
        children: [
            { path: "register", element: withSuspense(Register), handle: { title: "Register" } },
            { path: "login", element: withSuspense(Login), handle: { title: "Login" } }
        ]
    },
    {
        path: "dashboard",
        element: <PrivateRoute>{withSuspense(DashboardLayout)}</PrivateRoute>,
        children: [
            { index: true, element: withSuspense(DashboardHome), handle: { title: "Dashboard Home" } },
            { path: "my-issues", element: <PrivateRoute>{withSuspense(MyIssues)}</PrivateRoute>, handle: { title: "My Issues" } },
            { path: "profile", element: <PrivateRoute>{withSuspense(ProfilePage)}</PrivateRoute>, handle: { title: "Your Profile" } },
            { path: "addStaff", element: <PrivateRoute><AdminRoute>{withSuspense(AddStaff)}</AdminRoute></PrivateRoute>, handle: { title: "Add a Staff" } },
            { path: "admin-all-issues", element: <PrivateRoute><AdminRoute>{withSuspense(AdminAllIssues)}</AdminRoute></PrivateRoute>, handle: { title: "Admin all Issues" } },
            { path: "manage-users", element: <PrivateRoute><AdminRoute>{withSuspense(ManageUsers)}</AdminRoute></PrivateRoute>, handle: { title: "Manage Users" } },
            { path: "allPayments-history", element: <PrivateRoute>{withSuspense(AllPaymentsHistory)}</PrivateRoute>, handle: { title: "Payment History" } },
            { path: "settings", element: <PrivateRoute>{withSuspense(Settings)}</PrivateRoute>, handle: { title: "Settings" } },
            { path: "staff-assigned-issues", element: <PrivateRoute><StaffRoute>{withSuspense(AssignedIssues)}</StaffRoute></PrivateRoute>, handle: { title: "Assigned Issues" } }
        ]
    },
    {
        path: "*",
        element: withSuspense(ErrorPage),
        handle: { title: "Error Page" }
    }
]);