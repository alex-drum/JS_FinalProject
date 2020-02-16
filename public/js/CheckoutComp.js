Vue.component('checkout', {
    data(){
        return {
            cartAPI: this.$root.$refs.cart,
            email: '',
            address: '',
        }
    },
    methods: {
        sendForm(){
            if(!this.email && !this.address) {
                alert('Please fill in the necessary field!');
            } else if(this.cartAPI.countGoods === 0 || this.cartAPI.amount === 0) {
                alert('Your cart is empty! Please proceed to catalogue and put something to cart.')
            } else {
                alert(`CONGRATULATIONS!!! \n Your have just placed the order: Total quantity: ${this.cartAPI.countGoods}, Total amount: ${this.cartAPI.amount}$.\n
Your order is sent successfully! Confirmation letter will be delivered to you E-mail soon: ${this.email}`);
            }
        },
    },

    template:
        `
    <div>
        <h2 class="checkout-droplist">Shipping Adress</h2>
        <div class="container checkout-droplist__content">
            <div class="checkout-droplist__content__sub">
                <h4>Already registered?</h4>
                <p>Please fill in the form below and press "Send" button to complete the order</p>
                <h4 class="required">EMAIL ADDRESS</h4>
                <form>
                    <input type="email" placeholder="example@gmail.com" v-model="email" >
                     <h4 class="required">SHIPPING ADDRESS</h4>
                    <input type="text" placeholder="China, Beijing, Dongzhimen St, 4" v-model="address">
                    <p style="color: #ff0d0d; font-size: 13px; font-weight: 400; margin-top: 22px;">* Required Fields</p>
                    <button class="button__right" @click="sendForm">SEND</button>
                </form>
            </div>
        </div>
    </div>
`
});




