// Inicialización del carrito desde el almacenamiento local
let cart = JSON.parse(localStorage.getItem('cart')) || [];
console.log("Contenido del carrito al cargar:", cart);

// Función para actualizar el contador del carrito en el ícono del header
function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        const cartCount = cart.length;
        cartCountElement.textContent = cartCount;
        cartCountElement.style.display = cartCount > 0 ? 'block' : 'none';
    }
}

// Función para mostrar productos en el carrito en el offcanvas
function renderCart() {
    const cartList = document.getElementById('cart-list');
    const cartTotalElements = document.querySelectorAll('.cart-total');

    if (cartList) {
        console.log("Renderizando carrito en offcanvas");
        renderCartItems(cartList);
        updateCartTotal(cartTotalElements);
    }
    updateCartCount();
}

// Función para mostrar productos en la página del carrito de compras
function renderCartPage() {
    const cartItemsContainer = document.getElementById('cart-items-container');
    const cartDetailsList = document.getElementById('cart-details-list');
    const cartTotalElements = document.querySelectorAll('.cart-total');

    if (cartItemsContainer && cartDetailsList) {
        console.log("Renderizando página del carrito");
        renderCartPageItems(cartItemsContainer, cartDetailsList);
        updateCartTotal(cartTotalElements);
    }
    updateCartCount();
}

// Función para renderizar los productos en el carrito
function renderCartItems(container) {
    container.innerHTML = '';
    cart.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.name} - $${formatPrice(item.price)}`;
        const removeButton = createRemoveButton(item.id);
        listItem.appendChild(removeButton);
        container.appendChild(listItem);
    });
}

// Función para renderizar los productos en la página del carrito
function renderCartPageItems(cartItemsContainer, cartDetailsList) {
    cartItemsContainer.innerHTML = '';
    cartDetailsList.innerHTML = '';
    cart.forEach(item => {
        console.log("Renderizando producto en página del carrito:", item);
        const card = createProductCard(item);
        cartItemsContainer.appendChild(card);
        const detailItem = document.createElement('li');
        detailItem.textContent = `${item.name} - $${formatPrice(item.price)}`;
        cartDetailsList.appendChild(detailItem);
    });
}

// Función para crear un botón de eliminar
function createRemoveButton(productId) {
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Eliminar';
    removeButton.onclick = () => {
        removeFromCart(productId);
        renderCart();
        renderCartPage();
    };
    return removeButton;
}

// Función para crear la tarjeta del producto
function createProductCard(item) {
    const col = document.createElement('div');
    col.className = 'col-md-6 mb-4';
    const card = document.createElement('div');
    card.className = 'card mb-3 benja-custom-carrito';
    const cardHeader = document.createElement('div');
    cardHeader.className = 'card-header';
    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';
    const cardFooter = document.createElement('div');
    cardFooter.className = 'card-footer';

    const title = document.createElement('h4');
    title.textContent = item.name;
    cardHeader.appendChild(title);

    const img = document.createElement('img');
    img.src = item.image || '{% static "productos/img/default-product.jpg" %}';
    img.alt = `Imagen de ${item.name}`;
    img.className = 'img-fluid rounded-start';
    cardBody.appendChild(img);

    const price = document.createElement('h5');
    price.className = 'card-title';
    price.textContent = `$${formatPrice(item.price)}`;
    cardFooter.appendChild(price);

    const removeButton = createRemoveButton(item.id);
    removeButton.className = 'btn btn-danger';
    cardFooter.appendChild(removeButton);

    card.appendChild(cardHeader);
    card.appendChild(cardBody);
    card.appendChild(cardFooter);

    col.appendChild(card);
    return col;
}

// Función para actualizar el total del carrito
function updateCartTotal(cartTotalElements) {
    let total = cart.reduce((sum, item) => sum + item.price, 0);
    console.log("Actualizando total del carrito:", total); // Verificación adicional
    cartTotalElements.forEach(element => {
        element.textContent = `Total: $${formatPrice(total)}`;
    });
}

// Función agregar producto al carrito
function addToCart(product) {
    console.log("Añadiendo producto al carrito:", product);
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
    renderCartPage();
}

// Función eliminar producto del carrito
function removeFromCart(productId) {
    console.log("Eliminando producto del carrito:", productId);
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
    renderCartPage();
}

// Función para formatear los precios con puntos como separadores de miles
function formatPrice(price) {
    return price.toLocaleString('es-ES', { minimumFractionDigits: 0 });
}

// Función para formatear todos los precios en la página
function formatAllPrices() {
    document.querySelectorAll('.price').forEach(priceElement => {
        const priceValue = parseFloat(priceElement.textContent.replace(/[^0-9.-]+/g, ""));
        priceElement.textContent = formatPrice(priceValue);
    });
}

// Eventos a los btn-primary "Agregar al Carrito"
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const card = button.closest('.david-custom-products');
            const product = {
                id: parseInt(card.dataset.id),
                name: card.dataset.name,
                price: parseInt(card.dataset.price),
                image: card.querySelector('img').src
            };
            addToCart(product);
        });
    });

    // Actualizar carrito al cargar página
    renderCart();

    // Si estamos en la página del carrito, renderizar el carrito dinámico
    if (document.getElementById('cart-items-container')) {
        renderCartPage();
    }

    // Formatear todos los precios al cargar la página
    formatAllPrices();
});
