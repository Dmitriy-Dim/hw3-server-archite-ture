import {UserService} from "./UserService.ts";
import {User} from "../model/userTypes.ts";

export class UserServiceEmbeddedImpl implements UserService{
    private users: User[] = [{id: 1, userName: "Bond"}];

    addUser(user: User): boolean {
        if(this.users.findIndex((u:User) => u.id === user.id) === -1)
        {
            this.users.push(user);
            return true;
        }
        return false;
    }

    getAllUsers(): User[] {
        return [...this.users];
    }

    private getUserIndex(userId: number): number {
        return this.users.findIndex(elem => elem.id === userId);
    }

    getUser(userId: number): User | null {
        const index = this.getUserIndex(userId);
        return index === -1 ? null : this.users[index];
    }

    removeUser(userId: number): User | null {
        const index = this.getUserIndex(userId);
        if(index === -1)
            return null;
        const removedUser = this.users.splice(index, 1);
        return removedUser[0];
    }

    updateUser(user: User): boolean {
        const index = this.getUserIndex(user.id);
        if(index === -1)
            return false;
        this.users[index] = user;
        return true;
    }
}