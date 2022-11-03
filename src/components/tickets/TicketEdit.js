import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const TicketEdit = () => {

    const navigate = useNavigate()
    const {ticketId} = useParams()

    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)

    const [ticket, update] = useState({
        description: "",
        emergency: false
    })

    useEffect(
        () => {
            const fetchData = async () => {
                const response = await fetch(`http://localhost:8088/serviceTickets/${ticketId}`)
                const responseJSON = await response.json()
                update(responseJSON)
            }
            fetchData()
        },
        []
    )

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        const ticketToSendToAPI = {
            userId: honeyUserObject.id,
            description: ticket.description,
            emergency: ticket.emergency,
            dateCompleted: ""
        }

        const sendData = async () => {
            const options = {
              method: "PUT",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(ticketToSendToAPI)
            }
            const response = await fetch (`http://localhost:8088/serviceTickets/${ticket.id}`, options)
            await response.json()
            navigate("/tickets")
          }
          sendData()
    }

    return (
        <form className="ticketForm">
            <h2 className="ticketForm__title">New Service Ticket</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Brief description of problem"
                        value={ticket?.description}
                        onChange={
                            (evt) => {
                                const copy = {...ticket}
                                copy.description = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Emergency:</label>
                    <input type="checkbox"
                        value={ticket?.emergency}
                        onChange={
                            (evt) => {
                                const copy = {...ticket}
                                copy.emergency = evt.target.checked
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Save Ticket
            </button>
        </form>
    )
}