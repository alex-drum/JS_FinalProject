const add = (cart, req) => {
    cart.contents.push(req.body);
    cart.amount += req.body.price;
    cart.countGoods += req.body.quantity;
    return { name: req.body.product_name, newCart: JSON.stringify(cart, null, 4) };
};

const change = (cart, req) => {
    const find = cart.contents.find(el => el.id_product == req.params.id);
    find.quantity += req.body.quantity;
    cart.countGoods += req.body.quantity;
        if(req.body.quantity === 1) {
            cart.amount += find.price;
        } else {
            cart.amount -= find.price;
        }

    return { name: req.body.product_name, newCart: JSON.stringify(cart, null, 4) };
};

/**
 * Добавили новый метод удаления
 * @param cart
 * @param req
 * @returns {{newCart: *, name: *}}
 */
const remove = (cart, req) => {
    console.log(req);
    const find = cart.contents.find(el => el.id_product === req.params.id);
    cart.contents.splice(cart.contents.indexOf(find), 1);
    // cart.amount -= find.price;             ЭТО РАБОТАЕТ
    // cart.countGoods -= 1 ;
    cart.amount -= find.price * find.quantity;               // ЭТО В РАЗРАБОТКЕ
    cart.countGoods -=  find.quantity;;
    return { name: req.body.product_name, newCart: JSON.stringify(cart, null, 4) };
};

module.exports = {
    add,
    change,
    remove,
};
