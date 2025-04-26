import { Router } from "express";
import authRoute from "../modules/auth/authRoutes";
import leadBoardRoute from "../modules/leadBord/leadBordRoutes";

export default class Routes {
  private router: Router;
  constructor() {
    this.router = Router();
  }
  public path() {
    this.router.use("/auth", authRoute);
    this.router.use("/lead-board", leadBoardRoute);



    return this.router;
  }
}
