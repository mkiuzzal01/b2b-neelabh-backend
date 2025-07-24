"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join((process.cwd(), '.env')) });
exports.default = {
    port: process.env.PORT,
    node_env: process.env.NODE_ENV,
    database_url: process.env.DATABASE_URL,
    default_password: process.env.DEFAULT_PASSWORD,
    bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
    access_token_secret: process.env.JWT_ACCESS_TOKEN,
    refresh_token_secret: process.env.REFRESH_TOKEN,
    jwt_access_token_expiration: process.env.JWT_ACCESS_EXPIRES_IN,
    jwt_refresh_token_expiration: process.env.JWT_REFRESH_EXPIRES_IN,
    super_admin_email: process.env.SUPER_ADMIN_EMAIL,
    super_admin_pass: process.env.SUPER_ADMIN_PASS,
    cloudinary_cloud_name: process.env.CLOUDINARY_NAME,
    cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
    cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
    cors_origins: process.env.CORS_ORIGINS,
};
