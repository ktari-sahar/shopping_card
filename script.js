const openShopping = document.querySelector(".shopping");
const closeShopping = document.querySelector(".closeShopping");
const list = document.querySelector(".list");
const listCard = document.querySelector(".listCard");
const total = document.querySelector(".total");
const body = document.querySelector("body");
const quantity = document.querySelector(".quantity");

openShopping.addEventListener("click", () =>{
    body.classList.add("active")
})
closeShopping.addEventListener("click", () =>{
    body.classList.remove("active")
})



let products = [
    {
        id:1,
        name:"product 1",
        images: "1.png",
        price: 2000
    },
    {
        id:2,
        name:"product 2",
        images: "2.png",
        price: 2500
    },
    {
        id:3,
        name:"product 3",
        images: "3.png",
        price: 2400
    },
    {
        id:4,
        name:"product 4",
        images: "4.png",
        price: 2900
    },
    {
        id:5,
        name:"product 5",
        images: "5.png",
        price: 2700
    },
    {
        id:6,
        name:"product 6",
        images: "6.png",
        price: 2800
    },
]

let listCards = [];

/* insertion du code html(creation une div et une clasee qui contient les image .nom.price des items ) 
dans js pour le dynamiquement*/
const initApp = () => {
    products.forEach((value, key) => {
        let newDiv = document.createElement("div");
        newDiv.classList.add("item");
        newDiv.innerHTML = `
            <img src="img/${value.images}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button onclick="addToCart(${key})">Add To Cart</button>
        `
        list.appendChild(newDiv);
    });
};
initApp()


const addToCart = (key) => {
    if(listCards[key] == null){
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1
    }
    reloadCard();
}

const reloadCard = () => {
    listCard.innerHTML = "";
    let totalPrice = 0; // Total price initialized
    let totalCount = 0; // Initialize total count for all items

    listCards.forEach((value, key) => {
        if (value != null) {
            let newDiv = document.createElement("li");
            let count = value.quantity; // Get the quantity for this specific item

            totalPrice += value.price * count; // Update total price based on quantity
            totalCount += count; // Update the total count of items
            
            newDiv.innerHTML = `
                <div><img src ="img/${value.images}"></div>
                <div class ="cardTitle">${value.name}</div>
                <div class = "cardPrice">${value.price.toLocaleString()}</div>
                <div>
                    <button style="background-color:#560bad"
                    class="cardButton" onclick ="changeQuantity(${key}, ${count - 1})">-</button>
                    <div class ="count">${count}</div>
                    <button style="background-color:#560bad"
                    class="cardButton" onclick ="changeQuantity(${key}, ${count + 1})">+</button>
                </div>
            `;
            listCard.appendChild(newDiv);
        }
    });

    total.innerHTML = totalPrice.toLocaleString(); // Update total price after loop
    quantity.innerHTML = totalCount; // Update total count after loop
}

const changeQuantity = (key, quantity) => {
    if (quantity == 0) {
        delete listCards[key]
    }
    else{
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price
    }

    reloadCard()
}

