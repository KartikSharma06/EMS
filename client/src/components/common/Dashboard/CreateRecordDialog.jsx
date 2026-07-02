import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ErrorPopup } from "../error-popup.jsx"
import { CommonStateHandler } from "../../../utils/commonhandler.js"
import { fetchEmployeesIDs } from "../../../redux/Thunks/EmployeesIDsThunk.js"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"

export const CreateRecordDialog = ({ triggerLabel, title, fields, onSubmit, submitLabel }) => {
    const dispatch = useDispatch()
    const EmployeesIDState = useSelector((state) => state.EMployeesIDReducer)
    const [formdata, setformdata] = useState({})
    const [open, setopen] = useState(false)
    const [errorpopup, seterrorpopup] = useState(null)

    useEffect(() => {
        const hasEmployeeField = fields.some((f) => f.name === "employeeID")
        if (hasEmployeeField) {
            dispatch(fetchEmployeesIDs({ apiroute: "GETALL" }))
        }
    }, [])

    const handleformchange = (event) => {
        CommonStateHandler(formdata, setformdata, event)
    }

    const handlesubmit = () => {
        for (const field of fields) {
            if (field.required && !formdata[field.name]) {
                seterrorpopup(`Please fill in ${field.label}`)
                setTimeout(() => seterrorpopup(null), 3000)
                return
            }
        }
        const payload = { ...formdata }
        if (payload.employeeID) {
            payload.employeeID = payload.employeeID
        }
        for (const field of fields) {
            if (field.type === "number") {
                payload[field.name] = Number(payload[field.name])
            }
        }
        onSubmit(payload)
        setformdata({})
        setopen(false)
    }

    return (
        <Dialog open={open} onOpenChange={setopen}>
            <DialogTrigger className="bg-blue-800 border-2 border-blue-800 md:px-4 md:py-2 md:text-lg min-[250px]:px-2 min-[250px]:py-1 min-[250px]:text-sm text-white font-bold rounded-lg hover:bg-white hover:text-blue-800">
                {triggerLabel}
            </DialogTrigger>
            <DialogContent className="max-w-[315px] sm:max-w-[50vw] 2xl:max-w-[45vw]">
                {errorpopup ? <ErrorPopup error={errorpopup} /> : null}
                <DialogHeader>
                    <DialogTitle className="font-bold text-2xl">{title}</DialogTitle>
                </DialogHeader>
                <div className="form-container grid md:grid-cols-2 min-[250px]:grid-cols-1 gap-4">
                    {fields.map((field) => {
                        if (field.name === "employeeID") {
                            return (
                                <div key={field.name} className="label-input-field flex flex-col gap-1">
                                    <label className="md:text-md lg:text-lg font-bold">{field.label}</label>
                                    <select
                                        name="employeeID"
                                        className="border-2 border-gray-700 rounded px-2 py-1"
                                        value={formdata.employeeID || ""}
                                        onChange={handleformchange}
                                    >
                                        <option value="">Select Employee</option>
                                        {EmployeesIDState.data ? EmployeesIDState.data.map((emp) => (
                                            <option key={emp._id} value={emp._id}>
                                                {emp.firstname} {emp.lastname}
                                            </option>
                                        )) : null}
                                    </select>
                                </div>
                            )
                        }
                        if (field.type === "select") {
                            return (
                                <div key={field.name} className="label-input-field flex flex-col gap-1">
                                    <label className="md:text-md lg:text-lg font-bold">{field.label}</label>
                                    <select
                                        name={field.name}
                                        className="border-2 border-gray-700 rounded px-2 py-1"
                                        value={formdata[field.name] || ""}
                                        onChange={handleformchange}
                                    >
                                        <option value="">Select {field.label}</option>
                                        {field.options.map((opt) => (
                                            <option key={opt} value={opt}>{opt}</option>
                                        ))}
                                    </select>
                                </div>
                            )
                        }
                        if (field.type === "textarea") {
                            return (
                                <div key={field.name} className="label-input-field flex flex-col gap-1 md:col-span-2">
                                    <label className="md:text-md lg:text-lg font-bold">{field.label}</label>
                                    <textarea
                                        name={field.name}
                                        rows={3}
                                        className="border-2 border-gray-700 rounded px-2 py-1"
                                        value={formdata[field.name] || ""}
                                        onChange={handleformchange}
                                    />
                                </div>
                            )
                        }
                        return (
                            <div key={field.name} className="label-input-field flex flex-col gap-1">
                                <label className="md:text-md lg:text-lg font-bold">{field.label}</label>
                                <input
                                    type={field.type || "text"}
                                    name={field.name}
                                    className="border-2 border-gray-700 rounded px-2 py-1"
                                    value={formdata[field.name] || ""}
                                    onChange={handleformchange}
                                />
                            </div>
                        )
                    })}
                </div>
                <div className="flex justify-end gap-2 mt-4">
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button className="bg-blue-800 text-white font-bold hover:bg-blue-900" onClick={handlesubmit}>
                        {submitLabel || "Create"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
