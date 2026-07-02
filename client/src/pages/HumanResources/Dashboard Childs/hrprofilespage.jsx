import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Loading } from "../../../components/common/loading.jsx"
import { ListWrapper, HeadingBar, ListContainer } from "../../../components/common/Dashboard/ListDesigns"
import { HRProfilesThunks } from "../../../redux/Slices/HRDashboardPageSlices.js"

const formatDate = (date) => {
    if (!date) return "-"
    return new Date(date).toLocaleDateString()
}

export const HRProfilesPage = () => {
    const dispatch = useDispatch()
    const HRProfilesState = useSelector((state) => state.HRProfilesPageReducer)
    const HRState = useSelector((state) => state.HRReducer)
    const table_headings = ["Full Name", "Email", "Contact Number", "Role", "Department", "Last Login", "Actions"]

    useEffect(() => {
        dispatch(HRProfilesThunks.HRProfilesGet({ apiroute: "GETALL" }))
    }, [])

    useEffect(() => {
        if (HRProfilesState.fetchData) {
            dispatch(HRProfilesThunks.HRProfilesGet({ apiroute: "GETALL" }))
        }
    }, [HRProfilesState.fetchData])

    if (HRProfilesState.isLoading) {
        return <Loading />
    }

    const handleDelete = (HRID) => {
        dispatch(HRProfilesThunks.HRProfilesDelete({ apiroute: "DELETE", id: HRID }))
    }

    return (
        <div className="hr-profiles-page-content w-full mx-auto my-10 flex flex-col gap-5 h-[94%]">
            <div className="hr-profiles-heading flex justify-between items-center md:pe-5">
                <h1 className="min-[250px]:text-xl md:text-4xl font-bold">HR Profiles</h1>
            </div>
            <div className="hr-profiles-data flex flex-col gap-4 md:pe-5 overflow-auto">
                <ListWrapper>
                    <HeadingBar table_layout={"grid-cols-7"} table_headings={table_headings} />
                </ListWrapper>
                <ListContainer>
                    {HRProfilesState.data && HRProfilesState.data.length > 0 ? (
                        HRProfilesState.data.map((item) => (
                            <div key={item._id} className="list-item-container grid min-[250px]:grid-cols-2 sm:grid-cols-7 py-1 gap-2 justify-center items-center border-b-2 border-blue-800">
                                <div className="heading-content font-bold min-[250px]:text-sm sm:text-xs lg:text-sm xl:text-lg p-2 rounded-lg text-start overflow-hidden text-ellipsis">
                                    {`${item.firstname} ${item.lastname}`}
                                </div>
                                <div className="heading-content font-bold min-[250px]:text-sm sm:text-xs xl:text-lg p-2 rounded-lg text-start min-[250px]:hidden sm:block overflow-hidden text-ellipsis">
                                    {item.email}
                                </div>
                                <div className="heading-content font-bold min-[250px]:text-sm sm:text-xs xl:text-lg p-2 rounded-lg text-center min-[250px]:hidden sm:block">
                                    {item.contactnumber}
                                </div>
                                <div className="heading-content font-bold text-purple-700 min-[250px]:text-sm sm:text-xs xl:text-lg p-2 rounded-lg text-center min-[250px]:hidden sm:block">
                                    {item.role}
                                </div>
                                <div className="heading-content font-bold min-[250px]:text-sm sm:text-xs xl:text-lg p-2 rounded-lg text-center min-[250px]:hidden sm:block overflow-hidden text-ellipsis">
                                    {item.department ? item.department.name : "Not Specified"}
                                </div>
                                <div className="heading-content font-bold min-[250px]:text-sm sm:text-xs xl:text-lg p-2 rounded-lg text-center min-[250px]:hidden sm:block">
                                    {formatDate(item.lastlogin)}
                                </div>
                                <div className="heading-content text-blue-800 font-bold min-[250px]:text-xs xl:text-lg p-2 rounded-lg text-center flex justify-center items-center">
                                    {item._id === HRState.data?.HRid ? (
                                        <span className="text-gray-500 text-sm">Current User</span>
                                    ) : (
                                        <button className="border-2 border-red-800 text-red-800 px-2 py-1 rounded-md hover:bg-red-800 hover:text-white" onClick={() => handleDelete(item._id)}>Delete</button>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="p-4 text-center text-gray-500 font-bold">No HR profiles found.</div>
                    )}
                </ListContainer>
            </div>
        </div>
    )
}
