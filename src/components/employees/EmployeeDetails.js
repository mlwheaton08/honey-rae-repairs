import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export const EmployeeDetails = () => {
    const {employeeId} = useParams()
    const [employee, updateEmployee] = useState()

    useEffect(
        () => {
            const fetchData = async () => {
                const response = await fetch(`http://localhost:8088/employees?_expand=user&_embed=employeeTickets&userId=${employeeId}`)
                const singleEmployee = await response.json()
                updateEmployee(singleEmployee[0])
            }
            fetchData()
        },
        [employeeId]
    )

    return <section className="employee">
        <header className="employee_header">{employee?.user?.fullName}</header>
        <div>Email: {employee?.user?.email}</div>
        <div>Specialty: {employee?.specialty}</div>
        <div>Rate: ${employee?.rate}</div>
        <footer className="employee_header">Currently working on {employee?.employeeTickets?.length} tickets</footer>
    </section>
}