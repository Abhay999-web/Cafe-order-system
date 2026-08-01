 declare global {
    namespace NodeJS {
        interface ProcessEnv {

            MONGO_URI: string;
            JWT_SECRET: string;
           




        }
    }
}

export {}
