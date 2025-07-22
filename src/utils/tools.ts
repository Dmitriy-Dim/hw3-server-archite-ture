import {IncomingMessage} from "node:http";
import {PORT} from "../config/userServerConfig.ts";

export const sayHi = (name:string):void => {
    console.log(`Hello ${name}`)
}

export async function parseBody(req: IncomingMessage) {
    return new Promise((resolve, reject) => {
        let body = "";
        req.on('data', (chunk) => {
            body += chunk.toString();
        })
        req.on('end', () => {
            try {
                resolve(JSON.parse(body))
            } catch (e) {
                reject(new Error('Invalid json'))
            }
        })
    })
}

export function parseUrl(url: string, baseUrl: string = `http://localhost:${PORT}`) {
    return new URL(url, baseUrl);
}