export interface IOrder {

    user?: string, //user id
    guestName?: string,
    tableNumber: number,
    items: {
        food: string, //food id
        quantity: number,
        priceAtOrder: number,

    }[],
    totalAmount: number,
    status: "pending" |
    "accepted" |
    "preparing" |
    "ready" |
    "completed" |
    "cancelled",


}