Vue.component('cart', {
    data(){
      return {
          imgCart: '../img/products/',
          cartItems: [],
          showCart: false,
          countGoods: 0,
          amount: 0,
      }
    },
    methods: {
        addProduct(product){
            let find = this.cartItems.find(el => el.id_product === product.id_product);
            if(find){
                this.$parent.putJson(`/api/cart/${find.id_product}`, {quantity: 1});
                find.quantity++;
                this.countGoods++;
                this.amount += find.price;
            } else {
                let prod = Object.assign({quantity: 1}, product);
                this.$parent.postJson('/api/cart', prod)
                    .then(data => {
                        if (data.result === 1) {
                            this.cartItems.push(prod);
                        }
                    });
                this.countGoods++;
                this.amount += product.price;
            }
        },
        remove(item) {
            if (item.quantity > 1) {
                this.$parent.putJson(`/api/cart/${item.id_product}`, {quantity: -1})
                    .then(data => {
                        if (data.result === 1) {
                            item.quantity--;
                            this.countGoods--;
                            this.amount -= item.price;
                        }
                    });
            } else {
                this.$parent.deleteJson(`/api/cart/${item.id_product}`)
                    .then(data => {
                        if (data.result === 1) {
                            this.cartItems.splice(this.cartItems.indexOf(item), 1);
                        }
                    });
                this.countGoods--;
                this.amount -= item.price;
            }
        },
        removeItem(item) {
                this.$parent.deleteJson(`/api/cart/${item.id_product}`)
                    .then(data => {
                        if (data.result === 1) {
                            this.cartItems.splice(this.cartItems.indexOf(item), 1);
                        }
                    });
                this.countGoods -= item.quantity;
                this.amount -= item.price * item.quantity;

        },
    },
    mounted(){
        this.$parent.getJson('/api/cart')
            .then(data => {
                for(let el of data.contents){
                    this.cartItems.push(el);
                }
                this.countGoods = data.countGoods;
                this.amount = data.amount;
            });

    },
    template:
                `<div>     
                <button class="cart__link" @click="showCart = !showCart"><img class="header__cart" src="img/cart.svg" alt="cart">
                <div v-if="cartItems.length" class="cart__full">
                        <p>{{this.countGoods}}</p> 
                    </div>
                </button>
                    <div class="cart__drop" v-show="showCart">
                    <cart-item class="cart-item"
                          v-for="item of cartItems"
                       :key="item.id_product"
                       :cart-item="item"
                       :img="imgCart + item.img_src"
                          @remove="remove">
                     </cart-item>
                     <div v-if="!cartItems.length" class="cart__total">
                            <h2 style="text-align: center; width: 100%; text-transform: none;">Your cart is empty</h2></div>
                        <div v-else class="cart__total">
                            <h2>TOTAL</h2>
                            <h2>&#36{{this.amount}}</h2>
                        </div>
                        <a href="checkout.html"><button  v-if="cartItems.length" class="checkout-button">Checkout</button></a>

                       <a href="shopping-cart.html"><button v-if="cartItems.length" class="go-to-cart">Go to Cart</button></a>
                    </div>
                    </div>`
});

Vue.component('cart-item', {
    props: ['cartItem', 'img'],
    template:
                            `<div class="cart__item">
                            <div class="cart__item-photo"><img :src="img" :alt="cartItem.id_product"></div>
                            <div class="cart__item-description">
                                <h3>{{cartItem.product_name}}</h3>
                                <img src="../img/products/rating.png" alt="rating">
                                <p>{{cartItem.quantity}} X &#36{{cartItem.price}}</p>
                            </div>
                            <div class="cart__item-delete">
                                <button class="fa-times-circle__customized" @click="$emit('remove', cartItem)"><i class="fa fa-times-circle" aria-hidden="true"></i></button>
                            </div>
                        </div>`
});





Vue.component('cart-page', {
    data() {
        return {
            /**
             * Создали ссылку на API нашей корзины. Т.к. все компоненты у нас регистрируются в корневом экземпляре Vue,
             * то мы легко можем получить доступ к ним используя свойство $root.
             * $parent можно использовать для доступа к родительскому экземпляру из дочернего.
             */
            cartAPI: this.$root.$refs.cart, // добираемся до компонента корзины, чтобы далее использовать метод добавления
            cartItems: this.$root.$refs.cart.cartItems,
            imgCart: this.$root.$refs.cart.imgCart,
        };
    },
    template:
        `
<section class="cart__box container">
    <table class="cart__box__table">
        <tr class="cart__box__tableraw cart__box__tableraw__header">
            <td class="cart__box__tabledata cart__box__tabledata__1">
                Product Details
            </td>
            <td class="cart__box__tabledata cart__box__tabledata__2 ">

            </td>
            <td class="cart__box__tabledata cart__box__tabledata__3">
               unite Price
            </td>
            <td class="cart__box__tabledata cart__box__tabledata__4">
               Quantity
            </td>
            <td class="cart__box__tabledata cart__box__tabledata__5">
               Shipping
            </td>
            <td class="cart__box__tabledata cart__box__tabledata__6">
               Subtotal
            </td>
            <td class="cart__box__tabledata cart__box__tabledata__7">
                ACTION
            </td>
        </tr>
       
        <cart-page-item class="cart__box__tableraw"
            v-for="item of cartItems"
            :key="item.id_product"
            :cart-item="item"
            :img="imgCart + item.img_src"
            @remove="cartAPI.remove">
        </cart-page-item>
        
    </table>
    <div class="container">
        <div class="cart__box__procedure">
<!--           <button class="cart__box__procedure__button" @click="cartAPI.clearCart">CLEAR SHOPPING CART</button>-->
            <a href="index.html"><button class="cart__box__procedure__button">CONTINUE SHOPPING</button></a>
        </div>
        <div class=" container place__order">
            <div class="place__order__groups">
                <h3 class="place__order__groups__h3">Shipping Adress</h3>
                <select name="country" id="select__country" class="place__order__groups__select">
                    <option value="Bangladesh">Bangladesh</option>
                    <option value="China">China</option>
                    <option value="Russia">Russia</option>
                </select>
                <input type="text" placeholder="State" class="place__order__groups__select" style="width: 88.5%;">
                <input type="number" placeholder="Postcode / Zip" class="place__order__groups__select" style="width: 88.5%;">
                <button class="place__order__groups__button">get a quote</button>
            </div>
            <div class="place__order__groups">
                <h3 class="place__order__groups__h3">coupon  discount</h3>
                <h5 class="place__order__groups__h5">Enter your coupon code if you have one</h5>
                <input type="text" placeholder="State" class="place__order__groups__select" style="width: 88.5%;">
                <button class="place__order__groups__button">Apply coupon</button>
            </div>
            <div class="place__order__groups place__order__groups__last">
                <h4 class="place__order__groups__h4">Sub total &#36{{cartAPI.amount}}</h4>
                <h3 class="place__order__groups__h3" style="border-bottom: 1px solid #e2e2e2">GRAND TOTAL <span>&#36{{cartAPI.amount}}</span></h3>
                <a href="checkout.html"><button class="place__order__groups__checkout__button">proceed to checkout</button></a>
                
            </div>
        </div>
    </div>

</section>
        `
});

Vue.component('cart-page-item', {
    data() {
        return {
            /**
             * Создали ссылку на API нашей корзины. Т.к. все компоненты у нас регистрируются в корневом экземпляре Vue,
             * то мы легко можем получить доступ к ним используя свойство $root.
             * $parent можно использовать для доступа к родительскому экземпляру из дочернего.
             */
            cartAPI: this.$root.$refs.cart, // добираемся до компонента корзины, чтобы далее использовать метод добавления
        };
    },
    props: ['cartItem', 'img'],
    template:
        `
        <tr class="cart__box__tableraw">
            <td class="cart__box__tabledata cart__box__tabledata__1 tr-2__td-1">
                <img :src="img" :alt="cartItem.id_product" style="height: 150px;">
            </td>
            <td class="cart__box__tabledata cart__box__tabledata__2">
                <h3 class="tr-2__td-2__h3"><a href="#">{{cartItem.product_name}}</a></h3>
                <h5 class="tr-2__td-2__h5">Brand: <span>{{cartItem.brand}}</span></h5>
                <h5 class="tr-2__td-2__h5">Designer: <span>{{cartItem.designer}}</span>\t</h5>
            </td>
            <td class="cart__box__tabledata cart__box__tabledata__3">
                <h4 class="tabledata_maintext">&#36{{cartItem.price}}</h4>
            </td>
            <td class="cart__box__tabledata cart__box__tabledata__4">
            <button @click="cartAPI.remove(cartItem)" class="fa-times-circle__customized"><i class="fa fa-minus" aria-hidden="true"></i></button>
                <input type="number" min="1" class="cart-quantity-input" @changed="console.log($event);" v-model="cartItem.quantity">
            <button @click="cartAPI.addProduct(cartItem)" class="fa-times-circle__customized"><i class="fa fa-plus" aria-hidden="true"></i></button>
            </td>
            <td class="cart__box__tabledata cart__box__tabledata__5">
                <h4 class="tabledata_maintext">FREE</h4>
            </td>
            <td class="cart__box__tabledata cart__box__tabledata__6">
                <h4 class="tabledata_maintext">&#36{{cartItem.quantity * cartItem.price}}</h4>
            </td>
            <td class="cart__box__tabledata cart__box__tabledata__7">
                <button class="fa-times-circle__customized" @click="cartAPI.removeItem(cartItem)"><i class="fa fa-times-circle" aria-hidden="true"></i></button>
            </td>
        </tr>


`
});