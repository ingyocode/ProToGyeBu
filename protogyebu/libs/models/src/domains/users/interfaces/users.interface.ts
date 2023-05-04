export interface UsersInterface {
    id?: number;
    uid: string;
    email: string;
    password: string;
    encKey?: string;
    name: string;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}