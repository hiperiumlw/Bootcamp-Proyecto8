// module.exports = function Cart(cart){
//     // constructor()
//     this.items = cart.items || [];
//     this.quantity = cart.quantity || 0;
//     this.totalPrice = cart.totalPrice || 0;
//
//     this.add = function (destination) {
//         this.items.push(destination);
//         this.quantity++;
//         this.totalPrice += destination.precio;
//     }
//     this.remove = function (id) {
//         let item = this.items.find((destination)=> destination.id == id);
//         this.items = this.items.filter((destination)=> destination.id != id);
//         this.quantity--;
//         this.totalPrice-=item.precio;
//     }
// }

class Cart{
    constructor(cart){
        this.items = cart.items ||[];
        this.totalQuantity = cart.totalQuantity || 0 ;
        this.totalPrice = cart.totalPrice || 0;
    }
    add(destination){
        let boolean = false;
        this.items.forEach((destino)=>{
            if (destino.id == destination.id){
                 destino.quantity++;
                 destino.totalPrice*=2;
                boolean = true;
            }
        });
        this.totalQuantity++;
        this.totalPrice += destination.precio;
        if (boolean) return;
        this.items.push(destination);
        console.log(this.items);
    }
    remove(id){
        let item = this.items.find((destination)=> destination.id == id);
        this.items = this.items.filter((destination)=> destination.id != item.id);
        this.totalQuantity-=item.quantity;
        this.totalPrice-=item.totalPrice;
    }
    removeAll(){
        this.items = [];
        this.totalQuantity = 0;
        this.totalPrice = 0;
    }

    removeQuantity(id){
        this.items.forEach((destination)=>{
            if(destination.id == id){
                if (destination.quantity<=0) return;
                destination.quantity--;
                destination.totalPrice-=destination.precio;
                this.totalPrice-=destination.precio;
                this.totalQuantity--;
            }
        });
    }

    addQuantity(id){
        this.items.forEach((destination)=>{
            if(destination.id == id){
                destination.quantity++;
                destination.totalPrice+=destination.precio;
                this.totalPrice+=destination.precio;
            }
        });
        this.totalQuantity++;
    }
}

module.exports = Cart;