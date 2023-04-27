export interface BettingsInterface {
    id?: number;
    uid: string;
    usersId: number;
    status: boolean;
    bettingAmount: number;
    resultAmount: number;
    isDeleted: Boolean;
    createdAt: Date;
    updatedAt: Date;
}