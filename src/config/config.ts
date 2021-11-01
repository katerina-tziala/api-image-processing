import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

export const CONFIG = {
    PORT: parseInt((process.env.PORT as unknown) as string, 10),
    MAX_IMAGE_DIMENSION: parseInt((process.env.MAX_IMAGE_DIMENSION as unknown) as string, 10),
    MIN_IMAGE_DIMENSION: parseInt((process.env.MIN_IMAGE_DIMENSION as unknown) as string, 10),
    SRC_IMAGES: path.normalize((process.env.SRC_IMAGES as unknown) as string),
    THUMB_IMAGES: path.normalize((process.env.THUMB_IMAGES as unknown) as string), 
    SERVER_LOGS: path.normalize((process.env.SERVER_LOGS as unknown) as string)
}