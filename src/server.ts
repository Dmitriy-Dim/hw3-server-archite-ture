import {createServer} from "node:http";
import {PORT} from "./config/userServerConfig.ts";
import {userRouters} from "./routers/userRoutes.ts";
import {UserController} from "./controllers/UserControllers.ts";
import {myLogger} from "./utils/logger.ts";
import {UserServiceEmbeddedImpl} from "./service/UserServiceEmbeddedimpl.ts";

export const launchServer = () => {
    const userService = new UserServiceEmbeddedImpl();
    const userController: UserController = new UserController(userService);

    createServer(async (req, res) => {
        myLogger.log("We got the request!");
        await userRouters(req, res, userController);
    }).listen(PORT, () => {
        console.log(`UserServer runs at http://localhost:${PORT}`);
    })
}