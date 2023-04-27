export interface BettingsInterface {
    id?: number;
    uid: string;
    usersId: number;
    status: boolean;
    bettingAmount: number;
    drainage: number;
    isDeleted: Boolean;
    createdAt: Date;
    updatedAt: Date;
}