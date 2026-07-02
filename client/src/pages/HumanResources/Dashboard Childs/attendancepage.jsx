import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Loading } from "../../../components/common/loading.jsx"
import { ListWrapper, HeadingBar, ListContainer } from "../../../components/common/Dashboard/ListDesigns"
import { HRAttendanceThunks } from "../../../redux/Slices/HRDashboardPageSlices.js"

const formatDate = (date) => {
    if (!date) return "-"
    return new Date(date).toLocaleDateString()
}

export const HRAttendancePage = () => {
    const dispatch = useDispatch()
    const AttendanceState = useSelector((state) => state.HRAttendancePageReducer)
    const table_headings = ["Employee", "Current Status", "Last Log Date", "Last Log Status", "Total Logs", "Actions"]

    useEffect(() => {
        dispatch(HRAttendanceThunks.HRAttendanceGet({ apiroute: "GETALL" }))
    }, [])

    useEffect(() => {
        if (AttendanceState.fetchData) {
            dispatch(HRAttendanceThunks.HRAttendanceGet({ apiroute: "GETALL" }))
        }
    }, [AttendanceState.fetchData])

    if (AttendanceState.isLoading) {
        return <Loading />
    }

    const handleDelete = (attendanceID) => {
        dispatch(HRAttendanceThunks.HRAttendanceDelete({ apiroute: "DELETE", id: attendanceID }))
    }

    return (
        <div className="attendance-page-content w-full mx-auto my-10 flex flex-col gap-5 h-[94%]">
            <div className="attendance-heading flex justify-between items-center md:pe-5">
                <h1 className="min-[250px]:text-xl md:text-4xl font-bold">Attendances</h1>
            </div>
            <div className="attendance-data flex flex-col gap-4 md:pe-5 overflow-auto">
                <ListWrapper>
                    <HeadingBar table_layout={"grid-cols-6"} table_headings={table_headings} />
                </ListWrapper>
                <ListContainer>
                    {AttendanceState.data && AttendanceState.data.length > 0 ? (
                        AttendanceState.data.map((item) => (
                            <div key={item._id} className="list-item-container grid min-[250px]:grid-cols-2 sm:grid-cols-6 py-1 gap-2 justify-center items-center border-b-2 border-blue-800">
                                <div className="heading-content font-bold min-[250px]:text-sm sm:text-xs lg:text-sm xl:text-lg p-2 rounded-lg text-start overflow-hidden text-ellipsis">
                                    {item.employee ? `${item.employee.firstname} ${item.employee.lastname}` : "N/A"}
                                </div>
                                <div className={`heading-content font-bold min-[250px]:text-sm sm:text-xs xl:text-lg p-2 rounded-lg text-center min-[250px]:hidden sm:block ${item.status === "Present" ? "text-green-700" : item.status === "Absent" ? "text-red-700" : "text-gray-500"}`}>
                                    {item.status}
                                </div>
                                <div className="heading-content font-bold min-[250px]:text-sm sm:text-xs xl:text-lg p-2 rounded-lg text-center min-[250px]:hidden sm:block">
                                    {item.attendancelog && item.attendancelog.length > 0 ? formatDate(item.attendancelog[item.attendancelog.length - 1].logdate) : "-"}
                                </div>
                                <div className="heading-content font-bold min-[250px]:text-sm sm:text-xs xl:text-lg p-2 rounded-lg text-center min-[250px]:hidden sm:block">
                                    {item.attendancelog && item.attendancelog.length > 0 ? item.attendancelog[item.attendancelog.length - 1].logstatus : "-"}
                                </div>
                                <div className="heading-content font-bold min-[250px]:text-sm sm:text-xs xl:text-lg p-2 rounded-lg text-center min-[250px]:hidden sm:block">
                                    {item.attendancelog ? item.attendancelog.length : 0}
                                </div>
                                <div className="heading-content text-blue-800 font-bold min-[250px]:text-xs xl:text-lg p-2 rounded-lg text-center flex justify-center items-center">
                                    <button className="border-2 border-red-800 text-red-800 px-2 py-1 rounded-md hover:bg-red-800 hover:text-white" onClick={() => handleDelete(item._id)}>Delete</button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="p-4 text-center text-gray-500 font-bold">No attendance records found.</div>
                    )}
                </ListContainer>
            </div>
        </div>
    )
}
