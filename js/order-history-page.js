window.onload = () => {
    getHistory();
}

async function getHistory(){
    try{
        // const response = await axios.get(`${BASE_URL}/orders`, config)
        // console.log(response)
        const response = [
            {
                "userId": 2,
                "productId": 8,
                "quantity": 2,
                "orderDate": "2024-06-02"
            },
            {
                "userId": 2,
                "productId": 17,
                "quantity": 1,
                "orderDate": "2024-06-02"
            },
            {
                "userId": 2,
                "productId": 8,
                "quantity": 2,
                "orderDate": "2024-06-03"
            },
            {
                "userId": 2,
                "productId": 17,
                "quantity": 1,
                "orderDate": "2024-06-03"
            }
        ]

        let orderHistory = {};
        response.forEach(history => {
            if(orderHistory[history.orderDate]) {
                orderHistory[history.orderDate].push(history);
            }else{
                orderHistory[history.orderDate] = [history];
            }
        })
        showProducts(orderHistory)
    }catch(error){
        console.error(error);
    }
}

function showProducts(orderHistory){
    const keys = Object.keys(orderHistory);
    const myOrderHistory = document.getElementsByClassName('my-order-history')[0];

    keys.forEach(key => {
        let value = orderHistory[key];

        let myOrderContainer = document.createElement('div');
        myOrderContainer.className = 'my-order-container';

        let orderDate = document.createElement('div');
        orderDate.className = 'order-date';
        orderDate.innerText = key.replaceAll('-', '.');

        let myOrderList = document.createElement('div');
        myOrderList.className = 'my-order-list'

        myOrderContainer.appendChild(orderDate)
        myOrderContainer.appendChild(myOrderList)
        
        myOrderHistory.appendChild(myOrderContainer)

        value.forEach(product => {
            let myOrder = document.createElement('div');
            myOrder.classList.add('my-order');
            myOrder.classList.add('my-order-shipped');

            let myOrderProduct = document.createElement('div');
            myOrderProduct.className = 'my-order-product';

            let productImg = document.createElement('img');
            productImg.className = 'product-img';
            productImg.src = '/images/product-img.png';

            let productInfo = document.createElement('div');
            productInfo.className = 'product-info';

            let deliveryStatus = document.createElement('div');
            deliveryStatus.className = 'delivery-status';
            deliveryStatus.innerText = 'Shipped';

            let productName = document.createElement('div');
            productName.className = 'product-name';
            productName.innerText = 'Ugly carrots'

            let farmName = document.createElement('div');
            farmName.className = 'farm-name';
            farmName.innerText = 'owen\'s Farm'

            let productPriceDiv = document.createElement('div');
            productPriceDiv.className = 'product-price-div';

            let productPrice = document.createElement('div');
            productPrice.className = 'product-price';
            productPrice.innerText = '$ 15';

            let productUnit = document.createElement('div');
            productUnit.className = 'product-unit';
            productUnit.innerText = '/ kg';

            productPriceDiv.appendChild(productPrice);
            productPriceDiv.appendChild(productUnit);

            productInfo.appendChild(deliveryStatus);
            productInfo.appendChild(productName);
            productInfo.appendChild(farmName);
            productInfo.appendChild(productPriceDiv);

            let productDetailDiv = document.createElement('iconify-icon');
            productDetailDiv.className = 'product-detail-btn';
            productDetailDiv.icon = 'iconamoon:arrow-up-2-thin';

            myOrderProduct.appendChild(productImg)
            myOrderProduct.appendChild(productInfo)
            myOrderProduct.appendChild(productDetailDiv)

            let shippedBtn = document.createElement('div');
            shippedBtn.classList.add('shipped-btn');
            shippedBtn.classList.add('basic-btn');

            let reviewBtn = document.createElement('iconify-icon');
            reviewBtn.className = 'review-btn';
            reviewBtn.icon = 'ep:edit-pen';

            let div = document.createElement('div');
            div.innerText = 'Write a Review';

            shippedBtn.appendChild(reviewBtn)
            shippedBtn.appendChild(div)

            myOrder.appendChild(myOrderProduct)
            myOrder.appendChild(shippedBtn)

            myOrderList.appendChild(myOrder)

            shippedBtn.onclick = () => {
                moveReviewPage(product.productId);
            }
        })
    })
}

function moveReviewPage(productId){
    console.log(productId);
    window.location.href = `./write-review-page.html?product_id=${productId}`
}