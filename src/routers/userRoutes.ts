import {IncomingMessage, ServerResponse} from "node:http";
import {UserController} from "../controllers/UserControllers.ts";
import {parseUrl} from "../utils/tools.ts";

export const userRouters =
    async (req:IncomingMessage, res:ServerResponse, controller:UserController) => {
        const {url, method} = req;
        const parsedUrl = parseUrl(url!);

        switch (parsedUrl.pathname + method) {
            case "/api/users" + "POST": {
                await controller.addUser(req, res);
                break;
            }

            case "/api/users" + "GET": {
                await controller.getAllUsers(req, res);
                break;
            }

            case "/api/user" + "GET": {
                await controller.getUserById(req, res);
                break;
            }

            case "/api/users" + "DELETE": {
                await controller.removeUser(req, res);
                break;
            }

            case "/api/users" + "PUT": {
                await controller.updateUser(req, res);
                break;
            }

            case '/api/logger' + 'GET': {
                await controller.getLogs(req, res);
                break;
            }

            default: {
                res.writeHead(404, {"Content-Type":"text/plain"});
                res.end("Page not found");
            }
        }
    }