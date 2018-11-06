export default {
    MAX_ATTACHMENT_SIZE: 5000000,
    s3: {
        REGION: "us-east-1",
        BUCKET: "scratchnotes-bucket"
    },
    apiGateway: {
        REGION: "us-east-1",
        URL: "https://3wxy34jore.execute-api.us-east-1.amazonaws.com/prod"
    },
    cognito: {
        REGION: "us-east-1",
        USER_POOL_ID: "us-east-1_qjGVAlzW9",
        APP_CLIENT_ID: "4on1v2qtgmsj8dndd0kg9bmu09",
        IDENTITY_POOL_ID: "us-east-1:f9f54787-8af4-4d01-afda-fd68d5d723a9"
    }
};
