Vue.component('search', {
    data(){
        return {
            userSearch: "",
        }
    },
    template:
    `                
                <form action="#" class="header__form" @submit.prevent="$root.$refs.products.filter(userSearch)">
                    <button class="browse">Browse
                        <div class="browse__drop">
                            <h3>Women</h3>
                            <ul>
                                <li ><a href="#" class="browse__link">Jackets/Coats</a></li>
                                <li ><a href="#" class="browse__link">Blazers</a></li>
                                <li ><a href="#" class="browse__link">Denim</a></li>
                                <li ><a href="#" class="browse__link">Leggings/Pants</a></li>
                                <li ><a href="#" class="browse__link">Skirts/Shorts</a></li>
                                <li ><a href="#" class="browse__link">Accessories</a></li>
                                <li ><a href="#" class="browse__link">Bags/Purses</a></li>
                                <li ><a href="#" class="browse__link">Swimwear/Underwear</a></li>
                                <li ><a href="#" class="browse__link">Nightwear</a></li>
                                <li ><a href="#" class="browse__link">Shoes</a></li>
                                <li ><a href="#" class="browse__link">Beauty</a></li>
                            </ul>
                            <h3>Men</h3>
                            <ul>
                                <li ><a href="#" class="browse__link">Tees/Tank tops</a></li>
                                <li ><a href="#" class="browse__link">Shirts/Polos</a></li>
                                <li ><a href="#" class="browse__link">Sweaters</a></li>
                                <li ><a href="#" class="browse__link">Sweatshirts/Hoodies</a></li>
                                <li ><a href="#" class="browse__link">Blazers</a></li>
                                <li ><a href="#" class="browse__link">Jackets/vests</a></li>
                            </ul>
                        </div>
                    </button>
                    <div class="search-field">
                        <input type="text" class="search-input" placeholder="Search for Item..." v-model="userSearch">
                        <button type="submit" class="search-button"><i class="fa fa-search"></i></button>
                    </div>
                </form>`
});
