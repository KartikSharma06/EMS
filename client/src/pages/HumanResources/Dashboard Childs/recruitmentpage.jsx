import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Loading } from "../../../components/common/loading.jsx"
import { ListWrapper, HeadingBar, ListContainer } from "../../../components/common/Dashboard/ListDesigns"
import { CreateRecordDialog } from "../../../components/common/Dashboard/CreateRecordDialog"
import { HRRecruitmentThunks } from "../../../redux/Slices/HRDashboardPageSlices.js"

const formatDate = (date) => {
    if (!date) return "-"
    return new Date(date).toLocaleDateString()
}

const recruitmentFields = [
    { name: "jobtitle", label: "Job Title", required: true },
    { name: "description", label: "Description", type: "textarea", required: true },
]

export const HRRecruitmentPage = () => {
    const dispatch = useDispatch()
    const RecruitmentState = useSelector((state) => state.HRRecruitmentPageReducer)
    const table_headings = ["Job Title", "Description", "Applications", "Created Date", "Actions"]

    useEffect(() => {
        dispatch(HRRecruitmentThunks.HRRecruitmentGet({ apiroute: "GETALL" }))
    }, [])

    useEffect(() => {
        if (RecruitmentState.fetchData) {
            dispatch(HRRecruitmentThunks.HRRecruitmentGet({ apiroute: "GETALL" }))
        }
    }, [RecruitmentState.fetchData])

    if (RecruitmentState.isLoading) {
        return <Loading />
    }

    const handleCreate = (payload) => {
        dispatch(HRRecruitmentThunks.HRRecruitmentCreate({ apiroute: "CREATE", payload }))
    }

    const handleDelete = (recruitmentID) => {
        dispatch(HRRecruitmentThunks.HRRecruitmentDelete({ apiroute: "DELETE", id: recruitmentID }))
    }

    return (
        <div className="recruitment-page-content w-full mx-auto my-10 flex flex-col gap-5 h-[94%]">
            <div className="recruitment-heading flex justify-between items-center md:pe-5">
                <h1 className="min-[250px]:text-xl md:text-4xl font-bold">Recruitment</h1>
                <CreateRecordDialog
                    triggerLabel="Add Recruitment"
                    title="Create Job Posting"
                    fields={recruitmentFields}
                    onSubmit={handleCreate}
                    submitLabel="Create Posting"
                />
            </div>
            <div className="recruitment-data flex flex-col gap-4 md:pe-5 overflow-auto">
                <ListWrapper>
                    <HeadingBar table_layout={"grid-cols-5"} table_headings={table_headings} />
                </ListWrapper>
                <ListContainer>
                    {RecruitmentState.data && RecruitmentState.data.length > 0 ? (
                        RecruitmentState.data.map((item) => (
                            <div key={item._id} className="list-item-container grid min-[250px]:grid-cols-2 sm:grid-cols-5 py-1 gap-2 justify-center items-center border-b-2 border-blue-800">
                                <div className="heading-content font-bold min-[250px]:text-sm sm:text-xs lg:text-sm xl:text-lg p-2 rounded-lg text-start overflow-hidden text-ellipsis">
                                    {item.jobtitle}
                                </div>
                                <div className="heading-content font-bold min-[250px]:text-sm sm:text-xs xl:text-lg p-2 rounded-lg text-start min-[250px]:hidden sm:block overflow-hidden text-ellipsis">
                                    {item.description}
                                </div>
                                <div className="heading-content font-bold min-[250px]:text-sm sm:text-xs xl:text-lg p-2 rounded-lg text-center min-[250px]:hidden sm:block">
                                    {item.application ? item.application.length : 0}
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
                        <div className="p-4 text-center text-gray-500 font-bold">No recruitment postings found. Create one to get started.</div>
                    )}
                </ListContainer>
            </div>
        </div>
    )
}
