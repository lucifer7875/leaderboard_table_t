import mongoose, { Schema, Document } from "mongoose";

interface ILeadBoard extends Document {
    userId: string;
    name: string;
    email: string;
    rank: number;
    points: number;
    period: string;
    isActive: boolean;
    isDeleted: boolean;
    createdOn: Date;
    modifiedOn: Date;
}

const LeadBoardSchema = new Schema<ILeadBoard>({
    userId:{
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
        maxlength: 100
    },
    email: {
        type: String,
        required: true,
        maxlength: 100,
        unique: true
    },
    rank: {
        type: Number,
        required: false,
    },
    points: {
        type: Number,
        required: false,
    },
    period: {
        type: String,
        required: false,
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true
    },
    isDeleted: {
        type: Boolean,
        required: true,
        default: false
    },
    createdOn: {
        type: Date,
        required: true,
        default: Date.now
    },
    modifiedOn: {
        type: Date,
        required: true,
        default: Date.now
    },
});

const LeadBoard = mongoose.model<ILeadBoard>('LeadBoard', LeadBoardSchema);

export default LeadBoard;
