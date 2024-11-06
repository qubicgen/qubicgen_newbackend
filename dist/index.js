"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const careerRouter_1 = __importDefault(require("./routes/careerRouter"));
const getInTouchRouter_1 = __importDefault(require("./routes/getInTouchRouter"));
const projectRouter_1 = __importDefault(require("./routes/projectRouter"));
const studentRouter_1 = __importDefault(require("./routes/studentRouter"));
const queryRouter_1 = __importDefault(require("./routes/queryRouter"));
const authRouter_1 = __importDefault(require("./routes/authRouter"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = __importDefault(require("./config/swagger"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const port = 9098;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    exposedHeaders: ['Access-Control-Allow-Origin']
}));
app.use('/qubicgen', careerRouter_1.default);
app.use('/qubicgen', getInTouchRouter_1.default);
app.use('/qubicgen', projectRouter_1.default);
app.use('/qubicgen', studentRouter_1.default);
app.use('/qubicgen', queryRouter_1.default);
app.use('/qubicgen', authRouter_1.default);
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.default));
app.use('/uploads', express_1.default.static('uploads'));
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}, api documentation available at http://localhost:${port}/api-docs`);
});
