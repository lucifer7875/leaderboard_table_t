import { IsNotEmpty, IsOptional, MaxLength } from "class-validator";
import { Model } from "../../model";

export class CreateLeadBoardValidator extends Model {
    @IsNotEmpty()
    userId: string;

    @IsNotEmpty()
    @MaxLength(255)
    name: string;

    @IsNotEmpty()
    @MaxLength(255)
    email: string;

    @IsOptional()
    rank: number;

    @IsOptional()
    points: number;

    constructor(body: any) {
        super();
        const { userId, name, email, rank, points } = body;

        this.userId = userId;
        this.name = name;
        this.email = email;
        this.rank = rank;
        this.points = points;
    }
}

export class UpdateLeadBoardValidator extends Model {
    @IsNotEmpty()
    userId: string;

    @IsNotEmpty()
    @MaxLength(255)
    name: string;
    
    @IsOptional()
    email: string;

    @IsOptional()
    rank: number;

    @IsOptional()
    points: number;
    
    constructor(body: any) {
        super();
        const { userId, name, email, rank, points } = body;

        this.userId = userId;
        this.name = name;
        this.email = email;
        this.rank = rank;
        this.points = points;
    }
}


