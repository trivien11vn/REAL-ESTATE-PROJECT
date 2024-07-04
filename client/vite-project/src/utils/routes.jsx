import App from "src/App"
import path from "./path"
import { AboutUs, Home, OurAgents, Properties, PublicLayout, Search } from "src/pages/public"
import { AdminLayout, CreatePropertyType, DashBoard, ManagePropertyType } from "src/pages/admin"
import { Personal, UserLayout } from "src/pages/user"

const routes = [
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: path.PUBLIC_LAYOUT,
                element: <PublicLayout />,
                children: [
                    {
                        path: path.HOME,
                        element: <Home />,
                    },
                    {
                        path: path.ABOUT_US,
                        element: <AboutUs />,
                    },
                    {
                        path: path.PROPERTIES,
                        element: <Properties />,
                    },
                    {
                        path: path.OUR_AGENTS,
                        element: <OurAgents />,
                    },
                ]
            },
            {
                path: path.ADMIN_LAYOUT,
                element: <AdminLayout />,
                children: [
                    {
                        path: path.DASHBOARD,
                        element: <DashBoard />,
                    },
                    {
                        path: path.MANAGE_PROPERTY_TYPE,
                        element: <ManagePropertyType />,
                    },
                    {
                        path: path.CREATE_PROPERTY_TYPE,
                        element: <CreatePropertyType />,
                    },
                ]
            },
            {
                path: path.USER_LAYOUT,
                element: <UserLayout />,
                children: [
                    {
                        path: path.PERSONAL,
                        element: <Personal />,
                    },
                ]
            },
        ]
    }
]

export default routes