import { Navigate, Route, Routes } from "react-router";
import LeadBoardRoutes from "./modules/lead-board/routes";
import AdminLayout from "./layouts/admin-panel";
import { getToken } from "./lib/utils";
import HomePage from "./modules/home";
function PrivateRoutes() {
    return (
        <>
            <AuthenticatedTemplate>
                <Routes>
                    <Route element={<AdminLayout />}>
                        <Route index element={<HomePage />} />
                        <Route path="/lead-board/*" element={<LeadBoardRoutes />} />
                    </Route>
                </Routes>
            </AuthenticatedTemplate>
        </>
    );
}

export default PrivateRoutes;

export const AuthenticatedTemplate = ({ children }: { children: React.ReactNode }) => {
    const Authenticated = getToken() !== null;
    return Authenticated ? children : <Navigate to="/auth/sign-in" replace />;
}
