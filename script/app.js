let menu = {
    crazy: {
        name: 'Crazy',
        price: 31000,
        amount: 0,
        img: 'images/products/burger-1.png',
        get totalSum() {
            return this.price * this.amount
        }
    },
    light: {
        name: 'Light',
        price: 26000,
        amount: 0,
        img: 'images/products/burger-2.png',
        get totalSum() {
            return this.price * this.amount
        }
    },
    cheeseburger: {
        name: 'CheeseBurger',
        price: 29000,
        amount: 0,
        img: 'images/products/burger-3.png',
        get totalSum() {
            return this.price * this.amount
        }
    },
    dburger: {
        name: 'dBurger',
        price: 24000,
        amount: 0,
        img: 'images/products/burger-4.png',
        get totalSum() {
            return this.price * this.amount
        }
    },
}


let burgerBtns = document.querySelectorAll('.wrapper__list-btn'),
    cartBtn = document.querySelector('.wrapper__navbar-btn'),
    cartAmount = document.querySelector('.warapper__navbar-count'),
    cartList = document.querySelector('.wrapper__navbar-basket'),
    cartClose = document.querySelector('.wrapper__navbar-close'),
    cartCheckList = document.querySelector('.wrapper__navbar-checklist'),
    cartTotalPrice = document.querySelector('.wrapper__navbar-totalprice');
    
burgerBtns.forEach((burger) => {
    burger.addEventListener('click', function () {
        addAmount(this)
    })
})

function addAmount (btn) {
    // closest() - метод который  позволяет подключится к указаному ближайшему родителю
    // getAttribute() - метод который позволяет получать данные любого указаного атрибута
    let parent = btn.closest('.wrapper__list-card')
    let id = parent.getAttribute('id')
    console.log(id);
    menu[id].amount++
    cart()
}

cartBtn.addEventListener('click', () => cartList.classList.add('active'))
cartClose.addEventListener('click', () => cartList.classList.remove('active'))


function cart() {
    let korzinka = []
    for(let key in menu) {
       let burger = menu[key]
       let burgerItem = document.querySelector(`#${key}`)
       let burgerAmount = burgerItem.querySelector('.wrapper__list-count')
       if(burger.amount > 0) {
            korzinka.push(burger)
            burgerAmount.classList.add('active')
            burgerAmount.innerHTML = burger.amount
       }else {
            burgerAmount.classList.remove('active')
            burgerAmount.innerHTML = ''
       }
       
       
       
       
    }
    let allAmount = totalAmountBurgers()
    if(allAmount > 0) {
        cartAmount.classList.add('active')
        cartAmount.innerHTML = allAmount
    }else {
        cartAmount.classList.remove('active')
    }
       
    cartTotalPrice.innerHTML = totalSumBurgers()

    cartCheckList.innerHTML = ''
    korzinka.forEach((burger) => cartCheckList.innerHTML += createBurger(burger))
}

function totalSumBurgers() {
    let sum = 0;
    for(let key in  menu) {
        sum += menu[key].totalSum
    }
    return sum + 'сумм'
}

function totalAmountBurgers() {
    let amount = 0;
    for(let key in  menu) {
        amount += menu[key].amount
    }
    return amount
}


function createBurger(burger) {
    return `<div class="burger__item" id="${burger.name.toLowerCase()}-item">
    <div class="burger__item-left">
        <img src="${burger.img}" alt="">
        <div class="burger__item-left-info">
            <h2>${burger.name}</h2>
            <p>${burger.price} сум</p>
        </div>
    </div>
    <div class="burger__item-right">
        <button data-symbol="-" class="btn burger__btn-minus">-</button>
        <output class="burger__btn-output">${burger.amount}</output>
        <button data-symbol="+" class="btn burger__btn-plus">+</button>
    </div>
    </div>`
}


window.addEventListener('click', (event) => {
    if(event.target.classList.contains('btn')) {
        let dataValue = event.target.getAttribute('data-symbol')
        let parentBurger = event.target.closest('.burger__item')
        let id = parentBurger.getAttribute('id').split('-')[0]
        if(dataValue == '-') {
            menu[id].amount--
        }else if(dataValue == '+') {
            menu[id].amount++
        }
        cart()
    }
}) 