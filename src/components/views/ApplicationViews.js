import { CustomerViews } from "./CustomerViews"
import { EmployeeViews } from "./EmployeeViews"

export const ApplicationViews = () => {

    const localHoneryUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneryUser)

    if (honeyUserObject.staff) {
        return <EmployeeViews />
    } else {
        return <CustomerViews />
    }
}