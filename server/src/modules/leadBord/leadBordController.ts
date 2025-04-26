import CONSTANTS from "../../helpers/constants";
import { ResponseBuilder } from "../../helpers/responseBuilder";
import LeadBoardUtils from "./leadBordUtils";
import { Request, Response } from "express";
const {
    MESSAGES: {
        INTERNAL_SERVER,
        OK,
        INTERNAL_SERVER_ERROR_CODE,
        LEAD_BOARD_FETCHED_SUCCESSFULLY,
        LEAD_BOARD_NOT_FOUND,
        NAME_REQUIRED,
        ADD_ACTIVITY_SUCCESS,
        ADD_ACTIVITY_FAILED,
    }
} = CONSTANTS;

export default class LeadBoardController {
    private leadBoardService: LeadBoardUtils;
    private responseBuilder: ResponseBuilder;

    constructor() {
        this.leadBoardService = new LeadBoardUtils();
        this.responseBuilder = new ResponseBuilder();
    }
    /**
         * Create user in lead board
         * @param req 
         * @param res
         * @returns
         * @description Create user in lead board
         */
    public addLeadBoardData = async (req: Request, res: Response) => {
        try {
            const { name } = req.body

            if (!name) return this.responseBuilder.responseContent(res, OK, false, NAME_REQUIRED)

            const leadBoardData = await this.leadBoardService.addLeadBoardData();

            if (leadBoardData.length > 0) {
                return this.responseBuilder.responseContent(res, OK, true, LEAD_BOARD_FETCHED_SUCCESSFULLY, leadBoardData);
            } else {
                return this.responseBuilder.responseContent(res, OK, false, LEAD_BOARD_NOT_FOUND);
            }
        } catch ({ error }) {
            return this.responseBuilder.responseContent(res, INTERNAL_SERVER_ERROR_CODE, false, INTERNAL_SERVER);
        }
    }
    /**
         * Get all lead boards
         * @param req 
         * @param res
         * @returns
         * @description Get all lead boards list
         */
    public getLeadBoardData = async (req: Request, res: Response) => {
        try {
            
            const { search, period } = req.query;
            const leadBoardData = await this.leadBoardService.getLeadBoardData(search as string, period as string);
            if (leadBoardData.length > 0) {
                return this.responseBuilder.responseContent(res, OK, true, LEAD_BOARD_FETCHED_SUCCESSFULLY, leadBoardData,);
            } else {
                return this.responseBuilder.responseContent(res, OK, false, LEAD_BOARD_NOT_FOUND);
            }
        } catch ({ error }) {
            return this.responseBuilder.responseContent(res, INTERNAL_SERVER_ERROR_CODE, false, INTERNAL_SERVER);
        }
    }
    /**
         * Add lead board activity
         * @param req 
         * @param res
         * @returns
         * @description Add lead board activity
         */
    public addLeadBoardActivity = async (req: Request, res: Response) => {
        try {
            const { userId, activity, period } = req.body;

            if (!userId || !activity || !period) {
                return this.responseBuilder.responseContent(res, OK, false, ADD_ACTIVITY_FAILED);
            }
            
            const leadBoardData = await this.leadBoardService.addLeadBoardActivity(userId, activity, period);

            if (!leadBoardData) {
                return this.responseBuilder.responseContent(res, OK, false, ADD_ACTIVITY_FAILED);
            } else {
                return this.responseBuilder.responseContent(res, OK, true, ADD_ACTIVITY_SUCCESS, leadBoardData);
            }
            
        } catch ( error ) {
            return this.responseBuilder.responseContent(res, INTERNAL_SERVER_ERROR_CODE, false, INTERNAL_SERVER);
        }
    }
}
