import path from "./path";
import { MdOutlineDashboard } from "react-icons/md";
import { BsFillHouseGearFill } from "react-icons/bs";

export const navigation = [
    {
        id: 1,
        path: '/',
        text: 'HOME'
    },
    {
        id: 2,
        path: `/${path.ABOUT_US}`,
        text: 'ABOUT US'
    },
    {
        id: 3,
        path: `/${path.OUR_AGENTS}`,
        text: 'OUR AGENTS'
    },
    {
        id: 4,
        path: `/${path.PROPERTIES}`,
        text: 'PROPERTIES'
    },
    {
        id: 5,
        path: `/${path.SEARCH}`,
        text: 'SEARCH'
    },
]


export const adminSidebar = [
    {
        id: 1,
        path: `${path.ADMIN_LAYOUT}/${path.DASHBOARD}`,
        name: 'Dashboard',
        icon: <MdOutlineDashboard />,
        type: 'SINGLE'
    },
    {
        id: 2,
        name: 'Property Type',
        icon: <BsFillHouseGearFill />,
        type: 'PARENT',
        subs: [
            {
                id: 3,
                path: `${path.ADMIN_LAYOUT}/${path.CREATE_PROPERTY_TYPE}`,
                name: 'Create a new',
            },
            {
                id: 4,
                path: `${path.ADMIN_LAYOUT}/${path.MANAGE_PROPERTY_TYPE}`,
                name: 'Manage property type',
            }
        ]
    },
   
]

