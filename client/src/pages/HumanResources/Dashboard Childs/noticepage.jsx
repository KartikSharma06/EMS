import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Loading } from "../../../components/common/loading.jsx"
import { ListWrapper, HeadingBar, ListContainer } from "../../../components/common/Dashboard/ListDesigns"
import { CreateRecordDialog } from "../../../components/common/Dashboard/CreateRecordDialog"
import { HRNoticeThunks } from "../../../redux/Slices/HRDashboardPageSlices.js"

const formatDate = (date) => {
    if (!date) return "-"
    return new Date(date).toLocaleDateString()
}

export const HRNoticePage = () => {
    const dispatch = useDispatch()
    const NoticeState = useSelector((state) => state.HRNoticePageReducer)
    const HRState = useSelector((state) => state.HRReducer)
    const table_headings = ["Title", "Content", "Audience", "Target", "Created By", "Date", "Actions"]

    const noticeFields = [
        { name: "title", label: "Title", required: true },
        { name: "audience", label: "Audience", type: "select", required: true, options: ["Department-Specific", "Employee-Specific"] },
        { name: "content", label: "Content", type: "textarea", required: true },
        { name: "departmentID", label: "Department ID", required: false },
        { name: "employeeID", label: "Employee", required: false },
    ]

    useEffect(() => {
        dispatch(HRNoticeThunks.HRNoticeGet({ apiroute: "GETALL" }))
    }, [])

    useEffect(() => {
        if (NoticeState.fetchData) {
            dispatch(HRNoticeThunks.HRNoticeGet({ apiroute: "GETALL" }))
        }
    }, [NoticeState.fetchData])

    if (NoticeState.isLoading) {
        return <Loading />
    }

    const handleCreate = (payload) => {
        payload.HRID = HRState.data?.HRid
        dispatch(HRNoticeThunks.HRNoticeCreate({ apiroute: "CREATE", payload }))
    }

    const handleDelete = (noticeID) => {
        dispatch(HRNoticeThunks.HRNoticeDelete({ apiroute: "DELETE", id: noticeID }))
    }

    const notices = NoticeState.data ? [...(NoticeState.data.department_notices || []), ...(NoticeState.data.employee_notices || [])] : []

    return (
        <div className="notice-page-content w-full mx-auto my-10 flex flex-col gap-5 h-[94%]">
            <div className="notice-heading flex justify-between items-center md:pe-5">
                <h1 className="min-[250px]:text-xl md:text-4xl font-bold">Issue Notices</h1>
                <CreateRecordDialog
                    triggerLabel="Add Notice"
                    title="Create Notice"
                    fields={noticeFields}
                    onSubmit={handleCreate}
                    submitLabel="Create Notice"
                />
            </div>
            <div className="notice-data flex flex-col gap-4 md:pe-5 overflow-auto">
                <ListWrapper>
                    <HeadingBar table_layout={"grid-cols-7"} table_headings={table_headings} />
                </ListWrapper>
                <ListContainer>
                    {notices.length > 0 ? (
                        notices.map((item) => (
                            <div key={item._id} className="list-item-container grid min-[250px]:grid-cols-2 sm:grid-cols-7 py-1 gap-2 justify-center items-center border-b-2 border-blue-800">
                                <div className="heading-content font-bold min-[250px]:text-sm sm:text-xs lg:text-sm xl:text-lg p-2 rounded-lg text-start overflow-hidden text-ellipsis">
                                    {item.title}
                                </div>
                                <div className="heading-content font-bold min-[250px]:text-sm sm:text-xs xl:text-lg p-2 rounded-lg text-start min-[250px]:hidden sm:block overflow-hidden text-ellipsis">
                                    {item.content}
                                </div>
                                <div className="heading-content font-bold min-[250px]:text-sm sm:text-xs xl:text-lg p-2 rounded-lg text-center min-[250px]:hidden sm:block">
                                    {item.audience}
                                </div>
                                <div className="heading-content font-bold min-[250px]:text-sm sm:text-xs xl:text-lg p-2 rounded-lg text-center min-[250px]:hidden sm:block">
                                    {item.department ? item.department.name : item.employee ? `${item.employee.firstname} ${item.employee.lastname}` : "N/A"}
                                </div>
                                <div className="heading-content font-bold min-[250px]:text-sm sm:text-xs xl:text-lg p-2 rounded-lg text-center min-[250px]:hidden sm:block">
                                    {item.createdby ? `${item.createdby.firstname} ${item.createdby.lastname}` : "N/A"}
                                </div>
                                <div className="heading-content font-bold min-[250px]:text-sm sm:text-xs xl:text-lg p-2 rounded-lg text-center min-[250px]:hidden sm:block">
                                    {formatDate(item.createdAt)}
                                </div>
                                <div className="heading-content text-blue-800 font-bold min-[250px]:text-xs xl:text-lg p-2 rounded-lg text-center flex justify-center items-center">
                                    <button className="border-2 border-red-800 text-red-800 px-2 py-1 rounded-md hover:bg-red-800 hover:text-white" onClick={() => handleDelete(item._id)}>Delete</button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="p-4 text-center text-gray-500 font-bold">No notices found. Create one to get started.</div>
                    )}
                </ListContainer>
            </div>
        </div>
    )
}
