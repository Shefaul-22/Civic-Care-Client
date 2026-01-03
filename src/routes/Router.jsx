import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import HomePage from "../components/Home/HomePage";

export const router = createBrowserRouter([
    
    {
        path: "/",
        Component: RootLayout,
        children: [
            {
                index: true,
                Component: HomePage
            }
        ]
    }
])