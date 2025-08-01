import * as dotenv from "dotenv";
dotenv.config()
import { v2 } from 'cloudinary';

export const CloudinaryProvider = {
  provide: 'CLOUDINARY',
  useFactory: () => {
    return v2.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_KEY,
      api_secret: process.env.CLOUDINARY_SECRET,
    });
  },
};