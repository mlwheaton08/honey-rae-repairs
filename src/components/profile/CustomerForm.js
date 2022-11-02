import { click } from "@testing-library/user-event/dist/click"
import { useEffect, useState } from "react"

export const CustomerForm = () => {
    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)

    const [profile, updateProfile] = useState({
        address: "",
        phoneNumber: "",
        userId: 0
    })

    const [feedback, setFeedback] = useState("")

    useEffect(
        () => {
            const fetchData = async () => {
                const response = await fetch(`http://localhost:8088/customers?_userId=${honeyUserObject.id}`)
                const responseJSON = await response.json()
                const customerObject = await responseJSON[0]
                updateProfile(customerObject)
            }
            fetchData()
        },
        []
        )

    useEffect(() => {
        if (feedback !== "") {
            setTimeout(() => setFeedback(""), 3000);
        }
    },
    [feedback]
    )
        
    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        const sendData = async () => {
            const options = {
                method: "PUT",
                headers: {
                "Content-Type": "application/json"
                },
                body: JSON.stringify(profile)
            }
            const response = await fetch (`http://localhost:8088/customers/${profile.id}`, options)
            await response.json()
        }

        const sendDataAndDisplayMessage = async () => {
            await sendData()
            setFeedback("Customer profile successfully saved")
        }
        sendDataAndDisplayMessage()
}

    return (
        <>
            <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
                {feedback}
            </div>

            <form className="profile">
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="address">Address:</label>
                        <input
                            required autoFocus
                            type="text"
                            className="form-control"
                            value={profile.address}
                            onChange={
                                (evt) => {
                                    const copy = {...profile}
                                    copy.address = evt.target.value
                                    updateProfile(copy)
                                }
                            } />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="phoneNumber">Phone Number:</label>
                        <input
                            required autoFocus
                            type="text"
                            className="form-control"
                            value={profile.phoneNumber}
                            onChange={
                                (evt) => {
                                    const copy = {...profile}
                                    copy.phoneNumber = evt.target.value
                                    updateProfile(copy)
                                }
                            } />
                    </div>
                </fieldset>
                <button
                    onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                    className="btn btn-primary">
                    Save Profile
                </button>
            </form>
        </>
    )
}