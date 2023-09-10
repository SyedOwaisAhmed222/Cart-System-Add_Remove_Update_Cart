const { totalmem } = require("os");

const Products = [
  {
    p_id: 1,
    p_price: 22.2,
    p_name: "Iphone",
  },
  {
    p_id: 2,
    p_price: 20,
    p_name: "Samsung",
  },
  {
    p_id: 3,
    p_price: 40,
    p_name: "Oppo",
  },
  {
    p_id: 4,
    p_price: 50,
    p_name: "Vivo",
  },
  {
    p_id: 5,
    p_price: 10,
    p_name: "Realme",
  },
];

const alreadyExist = (id) => {
  let found = Cart.find((element) => element.p_id == id);
  if (found) {
    return found;
  }
  return null;
};

const Cart = [];
let C_id_acc = 0;

function addToCart(id) {
  let item = Products.find((element) => {
    return element.p_id == id;
  });
  if (!item) {
    return null;
  }
  let cartItem = alreadyExist(id);
  if (cartItem) {
    cartItem.qty += 1;
    cartItem.subTotal += item.p_price;
  } else {
    C_id_acc = C_id_acc + 1;

    Cart.push({
      C_id: C_id_acc,
      p_id: item.p_id,
      p_name: item.p_name,
      qty: 1,
      p_price: item.p_price,
      subTotal: item.p_price,
    });
  }
}

function removeFromCart(id, quantity) {
  let rem_pos = -1;
  let rem_item = Cart.find((item, index) => {
    if (item.p_id == id) {
      rem_pos = index;
      return item;
    }
  });

  try {
    if (!rem_item) throw "item not in cart";
    return null;
  } catch (err) {
    console.log(err);
  } finally {
    if (quantity === undefined || quantity == 0) {
      Cart.splice(rem_pos, 1);
      return;
    }

    rem_item.qty = quantity;
    rem_item.subTotal = quantity * rem_item.p_price;
    return;
  }
}



addToCart(1);
addToCart(1);
addToCart(2);
addToCart(2);
addToCart(3);
addToCart(3);
addToCart(4);
addToCart(4);
addToCart(5);
addToCart(5);
addToCart(5);

removeFromCart(4, 1);
removeFromCart(1, 7);
removeFromCart(2, 1);
removeFromCart(5);



console.log(Cart);

const TotalPrice = ()=>{
  let total=0;
  Cart.forEach(element => {
    total+=element.subTotal;
    
  });
  return total;
}

const CartTotal = TotalPrice()
console.log(CartTotal);
