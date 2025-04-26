import { Route, Routes } from "react-router";
import LeadBoardPage from "./index";

function LeadBoardRoutes() {
  return (
    <Routes>
      <Route path="/list" element={<LeadBoardPage />} />
    </Routes>
  );
}

export default LeadBoardRoutes;
