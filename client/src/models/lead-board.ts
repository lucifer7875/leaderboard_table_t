export interface LeadBoard {
    name: string;
    points: number;
    rank: number;
}

export interface LeadBoardResponse extends LeadBoard {
    _id: string;
}

export interface LeadBoardAddEditProps {
    readonly name: string;
    readonly handleClose: () => void;
}

export interface LeadBoardFormData {
    name: string;
    points: number;
    rank: number;
    id: string | null;
}
