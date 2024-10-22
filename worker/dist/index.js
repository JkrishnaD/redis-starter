"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("redis");
const client = (0, redis_1.createClient)();
const worker = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield client.connect();
        console.log("worker connected to redis");
        while (1) {
            try {
                const submission = yield client.brPop("problems", 0);
                console.log(submission);
                yield new Promise(reslove => setTimeout(reslove, 1000));
            }
            catch (error) {
                console.error("Error processing submission:", error);
            }
        }
    }
    catch (error) {
        console.error("Error processing submission:", error);
    }
});
worker();
