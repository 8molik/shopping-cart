function Cart(oldCart) {
    this.items = oldCart.items || {};
    this.totalQuantity = oldCart.totalQuantity || 0;
    this.totalPrice = oldCart.totalPrice || 0;

    this.add = (item, id) => {
        let storedItem = this.items[id];
        if (!storedItem) {
            storedItem = this.items[id] = {
                item: item,
                quantity: 0,
                price: 0,
            };
        }
        storedItem.quantity += 1;
        storedItem.price = storedItem.item.price * storedItem.quantity;

        this.totalQuantity += 1;
        this.totalPrice += storedItem.item.price;
    };

    this.reduceByOne = (id) => {
        this.items[id].quantity -= 1;
        this.items[id].price -= this.items[id].item.price;
        this.totalQuantity -= 1;
        this.totalPrice -= this.items[id].item.price;

        if (this.items[id].quantity <= 0) {
            delete this.items[id];
        }
    }

    this.removeItem = (id) => {
        this.totalQuantity -= this.items[id].quantity;
        this.totalPrice -= this.items[id].price;
        delete this.items[id];
    }

    this.generateArray = () => {
        let arr = [];
        for (const id in this.items) {
            arr.push(this.items[id]);
        }
        return arr;
    };
}

module.exports = Cart;
