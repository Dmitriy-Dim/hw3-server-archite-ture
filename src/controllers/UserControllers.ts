import {UserService} from "../service/UserService.ts";
import {parseBody, parseUrl} from "../utils/tools.ts";
import {User} from "../model/userTypes.ts";
import {IncomingMessage, ServerResponse} from "node:http";
import {myLogger} from "../utils/logger.ts";

export class UserController{
    constructor(private userService: UserService) { }

    async addUser(req:IncomingMessage, res:ServerResponse){
        const body = await parseBody(req) as User;
        const isSuccess = this.userService.addUser(body);

        if (isSuccess) {
            myLogger.save(`User with id ${body.id} was successfully added`);
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end('User was added');
            myLogger.log(`Response for add user with id ${body.id} was send`);
        } else {
            res.writeHead(409, {'Content-Type': 'text/html'});
            res.end('User already exists');
            myLogger.save(`User with id ${body.id} already exists`);
            myLogger.log(`User with id ${body.id} already exists`);
        }
    }

    async getAllUsers(req:IncomingMessage, res:ServerResponse){
        const users = this.userService.getAllUsers();
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(users));
        myLogger.log(`Response with all users was sent`);
    }

    async getUserById(req:IncomingMessage, res:ServerResponse){
        const parsedUrl = parseUrl(req.url!);
        const id = parsedUrl.searchParams.get('userId');

        if(!id){
            res.writeHead(409, {'Content-Type': 'text/html'});
            res.end('no id was received to find user');
            myLogger.log('Request without userId parameter');
        } else {
            const founded = this.userService.getUser(+id);
            if(founded !== null){
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.end(JSON.stringify(founded));
                myLogger.log(`User with id ${id} was found and sent`);
            } else {
                res.writeHead(404, {'Content-Type': 'text/html'});
                res.end('User not found');
                myLogger.log(`User with id ${id} not found`);
            }
        }
    }

    async removeUser(req:IncomingMessage, res:ServerResponse){
        const user = await parseBody(req) as User;
        const removedUser = this.userService.removeUser(user.id);

        if (removedUser) {
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(removedUser));
            myLogger.save(`User with id ${user.id} was deleted`);
            myLogger.log(`User with id ${user.id} was successfully removed`);
        } else {
            res.writeHead(404, {'Content-Type': 'text/html'});
            res.end('User not found');
            myLogger.log(`Attempt to remove non-existing user with id ${user.id}`);
        }
    }

    async updateUser(req:IncomingMessage, res:ServerResponse){
        const user = await parseBody(req) as User;
        const isSuccess = this.userService.updateUser(user);

        if (isSuccess) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(`User id:${user.id} was updated`);
            myLogger.save(`User with id ${user.id} was updated`);
            myLogger.log(`User with id ${user.id} was successfully updated`);
        } else {
            res.writeHead(404, {'Content-Type': 'text/html'});
            res.end('User not found');
            myLogger.log(`Attempt to update non-existing user with id ${user.id}`);
        }
    }

    async getLogs(req:IncomingMessage, res:ServerResponse){
        const allLogs = myLogger.getLogArray();
        res.writeHead(200, {'Content-Type':'application/json'});
        res.end(JSON.stringify(allLogs));
        myLogger.log('Logs were requested and sent');
    }
}