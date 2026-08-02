declare global{

    namespace Express{
        interface Request{
            user: {
                id: string,
                username: string,
                role: 'client'| 'admin'
            }
        }
    }
}

export{};

