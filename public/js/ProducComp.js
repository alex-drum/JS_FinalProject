Vue.component('products', {
    data(){
        return {
            productslist: [],
            filtered: [],
            imgCatalog: '../img/products/',
            show: false,
            cardContent: {},
        }
    },
    props: ['page', 'collection'],
    methods: {
        filter(userSearch){
            let regexp = new RegExp(userSearch, 'i');
            this.filtered = this.productslist.filter(el => regexp.test(el.product_name));
        },
        showFullCard(item) {
            this.show = !this.show;
            this.cardContent = item;
        },
    },
    mounted(){
        this.$root.getJson('/api/products')
            .then(data => {
                for(let el of data) {
                    // this.productslist.push(el);
                    if (this.page && this.page != 'catalogue') {
                        if (el.collect === this.page) {
                            this.productslist.push(el);
                            this.filtered.push(el);
                        }

                    } else {
                        this.filtered.push(el);
                        this.productslist.push(el);
                    }
                }
            });
    },
    template:
    `<section class="featured__items">
            <div class="container">
                <h3 class="featured__items__header">{{this.collection}}</h3>
                <p class="featured__items__description">Shop for items based on what we featured in this week</p>
                <fullcard 
                    v-if="show" 
                    @showFullCard="showFullCard" 
                    :product="cardContent" 
                    :img="imgCatalog + cardContent.img_src">
            </fullcard>
                <div class="container featured__items__goods-content">
                    <product 
                        v-for="item of filtered" 
                        :key="item.id_product" 
                        :img="imgCatalog + item.img_src" 
                        :product="item"
                        @showFullCard="showFullCard">
                    </product>     
                </div>
                <form class="description-buttom" action="button">
                    <button class="browse__all__product">Browse All Product </button>
                </form>
            </div>
        </section>`
});

Vue.component('product', {
    props: ['product', 'img'],
    data() {
      return {
          /**
           * Создали ссылку на API нашей корзины. Т.к. все компоненты у нас регистрируются в корневом экземпляре Vue,
           * то мы легко можем получить доступ к ним используя свойство $root.
           * $parent можно использовать для доступа к родительскому экземпляру из дочернего.
           *
           */
          cartAPI: this.$root.$refs.cart, // добираемся до компонента корзины, чтобы далее использовать метод добавления
      };
    },

    template:
    `<article class="featured__items__goods" @click="$emit('showFullCard', product)">
        <img class="featured__items__goods__img" :src="img" :alt="product.id_product">
        <button class="add__to__cart" @click="cartAPI.addProduct(product)" @click.prevent="$emit('showFullCard', product)"><img class="cart__img" src="img/cart.png" alt="cart">Add to cart</button> 
        <a class="goods-description" href="#">{{product.product_name}}</a>
        <h5 class="goods-price">&#36{{product.price}}</h5>
     </article>`
});

Vue.component('fullcard', {
    props: ['product', 'img'],
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
    methods: {


    },
    template:
        `
            <section class="container product__description__box">
                <div class="product__description__box__content" @click="$emit('showFullCard', product)">
                    <img class="featured__items__goods__img" :src="img" :alt="product.id_product">
                    <h4 class="product__description__box__content__group">{{product.collect}} collection</h4>
                    <h3 class="product__description__box__content__product__name">{{product.product_name}}</h3>
                    <p class="product__description__box__content__product__description">{{product.description}}</p>
                    <div class="product__description__box__content__product__features">
                        <h4 class="product__description__box__content__product__material">MATERIAL: <span style="color: #2f2f2f">{{product.material}}</span></h4>
                        <h4 class="product__description__box__content__product__designer">DESIGNER: <span style="color: #2f2f2f">{{product.designer}}</span></h4>
                    </div>
                    <h2 class="product__description__box__content__product__price">&#36{{product.price}}</h2>
                    
<!--                    <div class="selection__box">-->
<!--                        <div class="selection__box__item">-->
<!--                            <label for="select__color" class="selection__box__label">CHOOSE COLOR</label>-->
<!--                            <select name="color" id="select__color">-->
<!--                                <option value="red">red</option>-->
<!--                                <option value="green">green</option>-->
<!--                                <option value="yellow">yellow</option>-->
<!--                            </select>-->
<!--                        </div>-->
<!--                        <div class="selection__box__item">-->
<!--                            <label for="select__size" class="selection__box__label">CHOOSE SIZE</label>-->
<!--                            <select name="size" id="select__size">-->
<!--                                <option value="XXL">XXL</option>-->
<!--                                <option value="XL">XL</option>-->
<!--                                <option value="S">S</option>-->
<!--                            </select>-->
<!--                        </div>-->
<!--                        <div class="selection__box__item">-->
<!--                            <label for="select__quantity" class="selection__box__label">QUANTITY</label>-->
<!--                            <input type="number" id="select__quantity" placeholder="Input quantity">-->
<!--                        </div>-->
<!--                    </div>-->
                                    <div class="selection__button__box">
                        <button class="selection__button" @click="cartAPI.addProduct(product)">
                            <img class="selection__add__to__cart"  src="../img/products/add__to__cart.png" alt="add__to__cart">
                             Add to cart
                        </button>
                    </div>
                </div>
            </section>
    `
});

