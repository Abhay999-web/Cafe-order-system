declare global{

    namespace Express{
        interface Request{
            user: {
                id: string,
                username: string,
                guestId: string,
                role: 'client'| 'admin' | 'guest'
            }
        }
    }
}

export{};

