import mongoose from "mongoose";
import LeadBoard from "./leadBordModel";

export default class LeadBoardUtils {
    public addLeadBoardData = async () => {
        let leadBoardEntries;
        const response = await fetch('https://dummyjson.com/users');
        const data = await response.json();
        const users = data.users.slice(0, 9);

        // Check if lead boards already exist
        const existingLeadBoards = await LeadBoard.find();

        if (existingLeadBoards.length === 0) {
            // Create lead board entries
            leadBoardEntries = users.map(user => ({
                userId: user.id.toString(),
                name: user.firstName + ' ' + user.lastName,
                email: user.email,
                points: 0,
                period: 'day',
                rank: user.id,
                createdOn: new Date(),
                modifiedOn: new Date()
            }));
            await LeadBoard.create(leadBoardEntries);
        } 
       
        return leadBoardEntries;
    }

    public getLeadBoardData = async (search: string, period: string) => {
        let leadBoardData;

        if (search && period) {
            leadBoardData = await LeadBoard.find({ userId: new RegExp(search, 'i'), period: period });
        } else if (search) {
            leadBoardData = await LeadBoard.find({ userId: new RegExp(search, 'i') });
        } else if (period) {
            leadBoardData = await LeadBoard.find({ period: period });
        } else {
            leadBoardData = await LeadBoard.find();
        }

        // Check if all points are 0
        const allPointsZero = leadBoardData.every(entry => entry.points === 0);

        if (allPointsZero) {
            leadBoardData.sort((a, b) => a.userId.localeCompare(b.userId));
        } else {
            leadBoardData.sort((a, b) => b.points - a.points || b.modifiedOn.getTime() - a.modifiedOn.getTime());
        }

        leadBoardData.forEach((entry, index) => {
            entry.rank = index + 1;
        });

        return leadBoardData;
    }

    public addLeadBoardActivity = async (userId: string, activity: string, period: string) => {
        const leadBoardData = await LeadBoard.findOneAndUpdate(
            { _id: new mongoose.Types.ObjectId(userId) },
            { 
                $inc: { points: 20 },
                $set: { modifiedOn: new Date(), period }
            },
            { new: true }
        );
    
        return leadBoardData;
    }
}

