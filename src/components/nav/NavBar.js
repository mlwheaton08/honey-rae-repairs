import { CustomerNav } from "./CustomerNav"
import { EmployeeNav } from "./EmployeeNav"
import "./NavBar.css"

export const NavBar = () => {

    const localHoneryUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneryUser)

    if (honeyUserObject.staff) {
        return <EmployeeNav />
    } else {
        return <CustomerNav />
    }
}