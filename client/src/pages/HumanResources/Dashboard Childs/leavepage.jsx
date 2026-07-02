import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Loading } from "../../../components/common/loading.jsx"
import { ListWrapper, HeadingBar, ListContainer } from "../../../components/common/Dashboard/ListDesigns"
import { HRLeaveThunks } from "../../../redux/Slices/HRDashboardPageSlices.js"

const formatDate = (date) => {
    if (!date) return "-"
    return new Date(date).toLocaleDateString()
}

export const HRLeavePage = () => {
    const dispatch = useDispatch()
    const LeaveState = useSelector((state) => state.HRLeavePageReducer)
    const HRState = useSelector((state) => state.HRReducer)
    const table_headings = ["Employee", "Title", "Start Date", "End Date", "Reason", "Status", "Actions"]

    useEffect(() => {
        dispatch(HRLeaveThunks.HRLeaveGet({ apiroute: "GETALL" }))
    }, [])

    useEffect(() => {
        if (LeaveState.fetchData) {
            dispatch(HRLeaveThunks.HRLeaveGet({ apiroute: "GETALL" }))
        }
    }, [LeaveState.fetchData])

    if (LeaveState.isLoading) {
        return <Loading />
    }

    const handleUpdateStatus = (leaveID, status) => {
        dispatch(HRLeaveThunks.HRLeaveUpdate({
            apiroute: "UPDATE",
            payload: {
                leaveID,
                status,
                HRID: HRState.data?.HRid,
            },
        }))
    }

    return (
        <div className="leave-page-content w-full mx-auto my-10 flex flex-col gap-5 h-[94%]">
            <div className="leave-heading flex justify-between items-center md:pe-5">
                <h1 className="min-[250px]:text-xl md:text-4xl font-bold">Leaves</h1>
            </div>
            <div className="leave-data flex flex-col gap-4 md:pe-5 overflow-auto">
                <ListWrapper>
                    <HeadingBar table_layout={"grid-cols-7"} table_headings={table_headings} />
                </ListWrapper>
                <ListContainer>
                    {LeaveState.data && LeaveState.data.length > 0 ? (
                        LeaveState.data.map((item) => (
                            <div key={item._id} className="list-item-container grid min-[250px]:grid-cols-2 sm:grid-cols-7 py-1 gap-2 justify-center items-center border-b-2 border-blue-800">
                                <div className="heading-content font-bold min-[250px]:text-sm sm:text-xs lg:text-sm xl:text-lg p-2 rounded-lg text-start overflow-hidden text-ellipsis">
                                    {item.employee ? `${item.employee.firstname} ${item.employee.lastname}` : "N/A"}
                                </div>
                                <div className="heading-content font-bold min-[250px]:text-sm sm:text-xs xl:text-lg p-2 rounded-lg text-center min-[250px]:hidden sm:block">
                                    {item.title}
                                </div>
                                <div className="heading-content font-bold min-[250px]:text-sm sm:text-xs xl:text-lg p-2 rounded-lg text-center min-[250px]:hidden sm:block">
                                    {formatDate(item.startdate)}
                                </div>
                                <div className="heading-content font-bold min-[250px]:text-sm sm:text-xs xl:text-lg p-2 rounded-lg text-center min-[250px]:hidden sm:block">
                                    {formatDate(item.enddate)}
                                </div>
                                <div className="heading-content font-bold min-[250px]:text-sm sm:text-xs xl:text-lg p-2 rounded-lg text-center min-[250px]:hidden sm:block overflow-hidden text-ellipsis">
                                    {item.reason}
                                </div>
                                <div className={`heading-content font-bold min-[250px]:text-sm sm:text-xs xl:text-lg p-2 rounded-lg text-center min-[250px]:hidden sm:block ${item.status === "Approved" ? "text-green-700" : item.status === "Rejected" ? "text-red-700" : "text-yellow-700"}`}>
                                    {item.status}
                                </div>
                                <div className="heading-content text-blue-800 font-bold min-[250px]:text-xs xl:text-lg p-2 rounded-lg text-center flex justify-center gap-1">
                                    {item.status === "Pending" ? (
                                        <>
                                            <button className="border-2 border-green-800 text-green-800 px-2 py-1 rounded-md hover:bg-green-800 hover:text-white" onClick={() => handleUpdateStatus(item._id, "Approved")}>Approve</button>
                                            <button className="border-2 border-red-800 text-red-800 px-2 py-1 rounded-md hover:bg-red-800 hover:text-white" onClick={() => handleUpdateStatus(item._id, "Rejected")}>Reject</button>
                                        </>
                                    ) : (
                                        <span className="text-gray-500 text-sm">Reviewed</span>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="p-4 text-center text-gray-500 font-bold">No leave requests found.</div>
                    )}
                </ListContainer>
            </div>
        </div>
    )
}
