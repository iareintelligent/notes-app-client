export default {
    s3: {
        REGION: "us-east-2",
        BUCKET: "notes-app-unique-name"
    },
    apiGateway: {
        REGION: "us-east-2",
        URL: "https://bzrud6q78d.execute-api.us-east-2.amazonaws.com/prod"
    },
    cognito: {
        REGION: "us-east-2",
        USER_POOL_ID: "us-east-2_2mMR3XhDc",
        APP_CLIENT_ID: "4b1jc58mbj9tcs2kl2s0hgbu3g",
        IDENTITY_POOL_ID: "us-east-2:797c0064-2130-4c6b-9430-88fa6b4cd87e"
    }
};
