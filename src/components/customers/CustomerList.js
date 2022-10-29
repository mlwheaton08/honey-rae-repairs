import { useEffect, useState } from "react"
import { Customer } from "./Customer"
import "./Customers.css"

export const CustomerList = () => {
    const [customers, setCustomers] = useState([])

    useEffect(
        () => {
            const fetchData = async () => {
                const response = await fetch(`http://localhost:8088/users?isStaff=false`)
                const customerArray = await response.json()
                setCustomers(customerArray)
              }
              fetchData()
        },
        []
    )

    return <article className="customers">
        {
            customers.map(customer => <Customer key={`customer--${customer.id}`}
                id={customer.id}
                fullName={customer.fullName}
                address={customer.address}
                phoneNumber={customer.phoneNumber} />)
        }
    </article>
}