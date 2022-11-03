import { Outlet, Route, Routes } from "react-router-dom"
import { TicketList } from "../tickets/TicketList"
import { TicketForm } from "../tickets/TicketForm"
import { Profile } from "../profile/Profile"
import { TicketEdit } from "../tickets/TicketEdit"

export const CustomerViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>Honey Rae Repair Shop</h1>
                    <div>Your one-stop-shop to get all your electronics fixed</div>

                    <Outlet />
                </>
            }>

                <Route path="tickets" element={ <TicketList /> } />
                <Route path="ticket/create" element={ <TicketForm /> } />
                <Route path="tickets/:ticketId/edit" element={ <TicketEdit /> } />
                <Route path="profile" element={ <Profile /> } />
            </Route>
        </Routes>
    )
}