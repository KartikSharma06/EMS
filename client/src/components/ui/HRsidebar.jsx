import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"

import { NavLink, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { HandlePostHumanResources } from "../../redux/Thunks/HRThunk.js"

export function HRdashboardSidebar() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLogout = () => {
        document.cookie = "HRtoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
        dispatch(HandlePostHumanResources({ apiroute: "LOGOUT" }))
        navigate("/")
    }

    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    {/* <SidebarGroupLabel>HR-Dashboard EMS</SidebarGroupLabel> */}
                    <SidebarGroupContent>

                        <SidebarMenu className="gap-3 p-2">

                            <NavLink to={"/HR/dashboard/dashboard-data"} className={({ isActive }) => { return isActive ? "bg-blue-200 rounded-lg" : "" }}>

                                <SidebarMenuItem className="flex gap-4 hover:bg-blue-200 rounded-lg">
                                    <img src="/../../src/assets/HR-Dashboard/dashboard.png" alt="" className="w-7 ms-2 my-1" />
                                    <button className="text-[16px]">Dashboard</button>
                                </SidebarMenuItem>

                            </NavLink>

                            <NavLink to={"/HR/dashboard/employees"} className={({ isActive }) => { return isActive ? "bg-blue-200 rounded-lg" : "" }}>

                                <SidebarMenuItem className="flex gap-4 hover:bg-blue-200 rounded-lg">
                                    <img src="/../../src/assets/HR-Dashboard/employee-2.png" alt="" className="w-7 ms-2 my-1" />
                                    <button className="text-[16px]">Employees</button>
                                </SidebarMenuItem>

                            </NavLink>

                            <NavLink to={"/HR/dashboard/departments"} className={({ isActive }) => { return isActive ? "bg-blue-200 rounded-lg" : "" }}>

                                <SidebarMenuItem className="flex gap-4 hover:bg-blue-200 rounded-lg">
                                    <img src="/../../src/assets/HR-Dashboard/department.png" alt="" className="w-7 ms-2 my-1" />
                                    <button className="text-[16px]">Departments</button>
                                </SidebarMenuItem>

                            </NavLink>

                            <NavLink to={"/HR/dashboard/salaries"} className={({ isActive }) => { return isActive ? "bg-blue-200 rounded-lg" : "" }}>

                                <SidebarMenuItem className="flex gap-4 hover:bg-blue-200 rounded-lg">
                                    <img src="/../../src/assets/HR-Dashboard/salary.png" alt="" className="w-7 ms-2 my-1" />
                                    <button className="text-[16px]">Salaries</button>
                                </SidebarMenuItem>

                            </NavLink>

                            <NavLink to={"/HR/dashboard/notices"} className={({ isActive }) => { return isActive ? "bg-blue-200 rounded-lg" : "" }}>

                                <SidebarMenuItem className="flex gap-4 hover:bg-blue-200 rounded-lg">
                                    <img src="/../../src/assets/HR-Dashboard/notice.png" alt="" className="w-7 ms-2 my-1" />
                                    <button className="text-[16px]">Issue Notices</button>
                                </SidebarMenuItem>

                            </NavLink>

                            <NavLink to={"/HR/dashboard/leaves"} className={({ isActive }) => { return isActive ? "bg-blue-200 rounded-lg" : "" }}>

                                <SidebarMenuItem className="flex gap-4 hover:bg-blue-200 rounded-lg">
                                    <img src="/../../src/assets/HR-Dashboard/leave.png" alt="" className="w-7 ms-2 my-1" />
                                    <button className="text-[16px]">Leaves</button>
                                </SidebarMenuItem>

                            </NavLink>

                            <NavLink to={"/HR/dashboard/attendance"} className={({ isActive }) => { return isActive ? "bg-blue-200 rounded-lg" : "" }}>

                                <SidebarMenuItem className="flex gap-4 hover:bg-blue-200 rounded-lg">
                                    <img src="/../../src/assets/HR-Dashboard/attendance.png" alt="" className="w-7 ms-2 my-1" />
                                    <button className="text-[16px]">Attendances</button>
                                </SidebarMenuItem>

                            </NavLink>

                            <NavLink to={"/HR/dashboard/recruitment"} className={({ isActive }) => { return isActive ? "bg-blue-200 rounded-lg" : "" }}>

                                <SidebarMenuItem className="flex gap-4 hover:bg-blue-200 rounded-lg">
                                    <img src="/../../src/assets/HR-Dashboard/recruitment.png" alt="" className="w-7 ms-2 my-1" />
                                    <button className="text-[16px]">Recruitment</button>
                                </SidebarMenuItem>

                            </NavLink>

                            <SidebarMenuItem className="my-1">
                                <SidebarMenuButton className="gap-4">
                                    <img src="/../../src/assets/HR-Dashboard/interview-insights.png" alt="" className="w-7" />
                                    <button className="text-[16px]">Interview Insights</button>
                                </SidebarMenuButton>
                            </SidebarMenuItem>

                            <SidebarMenuItem className="my-1">
                                <SidebarMenuButton className="gap-4">
                                    <img src="/../../src/assets/HR-Dashboard/request.png" alt="" className="w-7" />
                                    <button className="text-[16px]">Requests</button>
                                </SidebarMenuButton>
                            </SidebarMenuItem>

                            <NavLink to={"/HR/dashboard/hr-profiles"} className={({ isActive }) => { return isActive ? "bg-blue-200 rounded-lg" : "" }}>

                                <SidebarMenuItem className="flex gap-4 hover:bg-blue-200 rounded-lg">
                                    <img src="/../../src/assets/HR-Dashboard/HR-profiles.png" alt="" className="w-7 ms-2 my-1" />
                                    <button className="text-[16px]">HR Profiles</button>
                                </SidebarMenuItem>

                            </NavLink>

                        </SidebarMenu>

                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton className="gap-4" onClick={handleLogout}>
                            <img src="/../../src/assets/HR-Dashboard/request.png" alt="" className="w-7" />
                            <button className="text-[16px] text-red-700 font-bold">Logout</button>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )

}
