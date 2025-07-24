"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const route_1 = __importDefault(require("./app/route"));
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
const NotFound_1 = __importDefault(require("./app/utils/NotFound"));
const config_1 = __importDefault(require("./app/config"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({ origin: config_1.default.cors_origins, credentials: true }));
app.use(express_1.default.text());
app.use((0, cookie_parser_1.default)());
// All application routes:
app.use('/api/v1/', route_1.default);
// Home route:
app.get('/', (req, res) => {
    res.send({ success: true, message: 'Welcome to neelabh b2b!' });
});
// Test route:
app.get('/test', (req, res) => {
    Promise.reject();
    res.send(req);
});
//global error handler:
app.use(globalErrorHandler_1.default);
//not found error handler:
app.use(NotFound_1.default);
exports.default = app;
