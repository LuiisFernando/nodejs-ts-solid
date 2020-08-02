import { User } from "../entities/User";

export interface IUsersReposiroty {
    findByEmail(email: string): Promise<User>;
    save(user: User): Promise<void>;
}