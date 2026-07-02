import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Loading } from "../../../components/common/loading.jsx"
import { ListWrapper, HeadingBar, ListContainer } from "../../../components/common/Dashboard/ListDesigns"
import { CreateRecordDialog } from "../../../components/common/Dashboard/CreateRecordDialog"
import { HRSalaryThunks } from "../../../redux/Slices/HRDashboardPageSlices.js"

const salaryFields = [
    { name: "employeeID", label: "Employee", required: true },
    { name: "basicpay", label: "Basic Pay", type: "number", required: true },
    { name: "bonusePT", label: "Bonus %", type: "number", required: true },
    { name: "deductionPT", label: "Deduction %", type: "number", required: true },
    { name: "currency", label: "Currency", required: true },
    { name: "duedate", label: "Due Date", type: "date", required: true },
]

export const HRSalaryPage = () => {
    const dispatch = useDispatch()
    const SalaryState = useSelector((state) => state.HRSalaryPageReducer)
    const table_headings = ["Employee", "Basic Pay", "Bonus", "Deduction", "Net Pay", "Status", "Due Date", "Actions"]

    useEffect(() => {
        dispatch(HRSalaryThunks.HRSalaryGet({ apiroute: "GETALL" }))
    }, [])

    useEffect(() => {
        if (SalaryState.fetchData) {
            dispatch(HRSalaryThunks.HRSalaryGet({ apiroute: "GETALL" }))
        }
    }, [SalaryState.fetchData])

    if (SalaryState.isLoading) {
        return <Loading />
    }

    const handleCreate = (payload) => {
        dispatch(HRSalaryThunks.HRSalaryCreate({ apiroute: "CREATE", payload }))
    }

    const handleDelete = (salaryID) => {
        dispatch(HRSalaryThunks.HRSalaryDelete({ apiroute: "DELETE", id: salaryID }))
    }

    const formatDate = (date) => {
        if (!date) return "-"
        return new Date(date).toLocaleDateString()
    }

    return (
        <div className="salary-page-content w-full mx-auto my-10 flex flex-col gap-5 h-[94%]">
            <div className="salary-heading flex justify-between items-center md:pe-5">
                <h1 className="min-[250px]:text-xl md:text-4xl font-bold">Salaries</h1>
                <CreateRecordDialog
                    triggerLabel="Add Salary"
                    title="Create Salary Record"
                    fields={salaryFields}
                    onSubmit={handleCreate}
                    submitLabel="Create Salary"
                />
            </div>
            <div className="salary-data flex flex-col gap-4 md:pe-5 overflow-auto">
                <ListWrapper>
                    <HeadingBar table_layout={"grid-cols-8"} table_headings={table_headings} />
                </ListWrapper>
                <ListContainer>
                    {SalaryState.data && SalaryState.data.length > 0 ? (
                        SalaryState.data.map((item) => (
                            <div key={item._id} className="list-item-container grid min-[250px]:grid-cols-2 sm:grid-cols-8 py-1 gap-2 justify-center items-center border-b-2 border-blue-800">
                                <div className="heading-content font-bold min-[250px]:text-sm sm:text-xs lg:text-sm xl:text-lg p-2 rounded-lg text-start overflow-hidden text-ellipsis">
                                    {item.employee ? `${item.employee.firstname} ${item.employee.lastname}` : "N/A"}
                                </div>
                                <div className="heading-content font-bold min-[250px]:text-sm sm:text-xs xl:text-lg p-2 rounded-lg text-center min-[250px]:hidden sm:block">
                                    {item.basicpay}
                                </div>
                                <div className="heading-content font-bold min-[250px]:text-sm sm:text-xs xl:text-lg p-2 rounded-lg text-center min-[250px]:hidden sm:block">
                                    {item.bonuses}
                                </div>
                                <div className="heading-content font-bold min-[250px]:text-sm sm:text-xs xl:text-lg p-2 rounded-lg text-center min-[250px]:hidden sm:block">
                                    {item.deductions}
                                </div>
                                <div className="heading-content font-bold text-green-700 min-[250px]:text-sm sm:text-xs xl:text-lg p-2 rounded-lg text-center min-[250px]:hidden sm:block">
                                    {item.netpay}
                                </div>
                                <div className={`heading-content font-bold min-[250px]:text-sm sm:text-xs xl:text-lg p-2 rounded-lg text-center min-[250px]:hidden sm:block ${item.status === "Paid" ? "text-green-700" : item.status === "Delayed" ? "text-red-700" : "text-yellow-700"}`}>
                                    {item.status}
                                </div>
                                <div className="heading-content font-bold min-[250px]:text-sm sm:text-xs xl:text-lg p-2 rounded-lg text-center min-[250px]:hidden sm:block">
                                    {formatDate(item.duedate)}
                                </div>
                                <div className="heading-content text-blue-800 font-bold min-[250px]:text-xs xl:text-lg p-2 rounded-lg text-center flex justify-center items-center">
                                    <button className="border-2 border-red-800 text-red-800 px-2 py-1 rounded-md hover:bg-red-800 hover:text-white" onClick={() => handleDelete(item._id)}>Delete</button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="p-4 text-center text-gray-500 font-bold">No salary records found. Create one to get started.</div>
                    )}
                </ListContainer>
            </div>
        </div>
    )
}
