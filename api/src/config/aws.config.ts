import { registerAs } from '@nestjs/config';

export default registerAs('aws', () => ({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    useLocal: process.env.AWS_USE_LOCAL === 'true' ? true : false,
    s3: {
        publicBucketName: process.env.AWS_S3_PUBLIC_BUCKET_NAME,
        endpoint: process.env.AWS_USE_LOCAL === 'true' ? process.env.AWS_S3_ENDPOINT : undefined
    }
}));
