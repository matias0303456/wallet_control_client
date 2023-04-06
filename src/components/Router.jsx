import { Route, Routes } from "react-router-dom";

import { Home } from './Home'
import { Error } from "./Error";

export function Router() {
    return (
        <Routes>
            <Route path="/wallet_control_client/" element={<Home />} />
            <Route path="*" element={<Error />} />
        </Routes>
    )
}