import { click } from "@testing-library/user-event/dist/click"
import { useEffect, useState } from "react"

export const EmployeeForm = () => {
    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)

    // TODO: Provide initial state for profile
    const [profile, updateProfile] = useState({
        specialty: "",
        rate: 0,
        userId: 0
    })

    const [feedback, setFeedback] = useState("")
    
    // TODO: Get employee profile info from API and update state
    useEffect(
        () => {
            const fetchData = async () => {
                const response = await fetch(`http://localhost:8088/employees?_userId=${honeyUserObject.id}`)
                const responseJSON = await response.json()
                const employeeObject = await responseJSON[0]
                updateProfile(employeeObject)
            }
            fetchData()
        },
        []
        )

    useEffect(() => {
        if (feedback !== "") {
            // Clear feedback to make entire element disappear after 3 seconds
            setTimeout(() => setFeedback(""), 3000);
        }
    },
    [feedback]
    )
        
    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        /*
            TODO: Perform the PUT fetch() call here to update the profile.
            Navigate user to home page when done.
        */
        const sendData = async () => {
            const options = {
                method: "PUT",
                headers: {
                "Content-Type": "application/json"
                },
                body: JSON.stringify(profile)
            }
            const response = await fetch (`http://localhost:8088/employees/${profile.id}`, options)
            await response.json()
        }

        const sendDataAndDisplayMessage = async () => {
            await sendData()
            setFeedback("Employee profile successfully saved")
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
                        <label htmlFor="specialty">Specialty:</label>
                        <input
                            required autoFocus
                            type="text"
                            className="form-control"
                            value={profile.specialty}
                            onChange={
                                (evt) => {
                                    // TODO: Update specialty property
                                    const copy = {...profile}
                                    copy.specialty = evt.target.value
                                    updateProfile(copy)
                                }
                            } />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="name">Hourly rate:</label>
                        <input type="number"
                            className="form-control"
                            value={profile.rate}
                            onChange={
                                (evt) => {
                                    // TODO: Update rate property
                                    const copy = {...profile}
                                    copy.rate = parseFloat(evt.target.value, 2)
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