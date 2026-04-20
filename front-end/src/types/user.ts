export interface UserType {
    user_id: string;
    username: string;
    email: string;
    password: string;
    role: 'ADMIN' | 'MANAGER' | 'STOCKER' | 'EMPLOYEE';
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date | null;
}