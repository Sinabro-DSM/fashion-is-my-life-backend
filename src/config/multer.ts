import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import * as multerS3 from 'multer-s3';
import * as AWS from 'aws-sdk';
import { v4 } from 'uuid';

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

export const s3 = new AWS.S3();

export const PostMulterOptions: MulterOptions = {
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_S3_BUCKET_NAME,
    acl: 'public-read',
    key: (req, file: Express.Multer.File, cb) => {
      cb(null, `post/${v4()} ${file.originalname}`);
    },
  }),
  limits: { fieldSize: 50 * 1024 * 1024 },
};

export const ProfileMulterOptions: MulterOptions = {
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_S3_BUCKET_NAME,
    acl: 'public-read',
    key: (req, file: Express.Multer.File, cb) => {
      cb(null, `profile/${v4()} ${file.originalname}`);
    },
  }),
  limits: { fieldSize: 50 * 1024 * 1024 },
};
