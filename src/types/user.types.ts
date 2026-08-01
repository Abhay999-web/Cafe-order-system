export interface IUser{
    username: string,
    email: string,
    password: string,
    role: 'client' | 'admin'
}