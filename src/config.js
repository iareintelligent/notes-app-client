export default {
    MAX_ATTACHMENT_SIZE: 5000000,
    s3: {
        REGION: "us-east-2",
        BUCKET: "notes-app-unique-name"
    },
    apiGateway: {
        REGION: "us-east-2",
        URL: "https://4tkhqg43ij.execute-api.us-east-2.amazonaws.com/prod"
    },
    cognito: {
        REGION: "us-east-2",
        USER_POOL_ID: "us-east-2_7hQ2Tb9rw",
        APP_CLIENT_ID: "4vkvits8eemiid7rh6td6vfb3c",
        IDENTITY_POOL_ID: "us-east-2:3488e0e3-fd8b-4165-8a55-58d9624ed133"
    }
};
