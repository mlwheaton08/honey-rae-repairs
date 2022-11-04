import { Link } from "react-router-dom"

export const Ticket = ({ ticketObject, currentUser, employees, fetchTickets }) => {

    // find the assigned employee for the current ticket
    let assignedEmployee = null
    if (ticketObject.employeeTickets.length > 0) {
        const ticketEmployeeRelationship = ticketObject.employeeTickets[0]
        assignedEmployee = employees.find(employee => employee.id === ticketEmployeeRelationship.employeeId)
    }

    // find the employee profile object for the current user
    const userEmployee = employees.find(employee => employee.userId === currentUser.id)

    const buttonOrNoButton = () => {
        if (currentUser.staff) {
            return <button
                onClick={() => {
                    const postData = async () => {
                        const options = {
                            method: "POST",
                            headers: {
                                "Content-type": "application/json"
                            },
                            body: JSON.stringify({
                                employeeId: userEmployee.id,
                                serviceTicketId: ticketObject.id
                            })
                        }
                        await fetch('http://localhost:8088/employeeTickets', options)
                        fetchTickets()
                    }
                    postData()
                }}
            >Claim</button>
        } else {
            return ""
        }
    }

    return <section className="ticket" key={`ticket--${ticketObject.id}`}>
        <header>
            {
                currentUser.staff
                    ? `Ticket ${ticketObject.id}`
                    : <Link to={`/tickets/${ticketObject.id}/edit`}>Ticket {ticketObject.id}</Link>
            }
        </header>
        <section>{ticketObject.description}</section>
        <section>Emergency: {ticketObject.emergency ? "❗" : "No" }</section>
        <footer>
            {
                ticketObject.employeeTickets.length
                    ? `Currently being worked on by ${assignedEmployee !== null ? assignedEmployee?.user?.fullName : ""}`
                    : buttonOrNoButton()
            }
        </footer>
    </section>
}