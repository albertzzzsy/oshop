import { ShoppingCart } from "./shoppint-cart";

export class Order {
  datePlaced: number;
  items!: any[];

  constructor(
    public userId: string,
    public shipping: any,
    public shoppingCart: ShoppingCart
  ) {
    this.datePlaced = new Date().getTime();

    this.items = shoppingCart.items.map(i => {
      return {
        products: {
          title: i.title,
          imageUrl: i.imageUrl, 
          price: i.price,
        },
        quantity: i.quantity,
        totalPrice: i.totalPrice,
      }
    })
    console.log(this.items)
  }
}