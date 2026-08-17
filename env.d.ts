 declare global {
    namespace NodeJS {
        interface ProcessEnv {

            MONGO_URI: string;
            JWT_SECRET: string;
            IMAGEKIT_PRIVATE_KEY: string;




        }
    }
}

export {}
