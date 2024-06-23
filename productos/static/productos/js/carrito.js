// Uso del almacenamiento local
let cart = JSON.parse(localStorage.getItem('cart')) || [];
console.log("Contenido del carrito al cargar:", cart);

// Función para mostrar productos en el carrito en el offcanvas
function renderCart() {
    const cartList = document.getElementById('cart-list');
    const cartTotal = document.getElementById('cart-total');

    if (cartList) {
        console.log("Renderizando carrito en offcanvas");
        // Limpiar tabla
        cartList.innerHTML = '';

        // Variable para total del carrito
        let total = 0;

        // Iteración sobre la lista del carrito
        cart.forEach(item => {
            const listItem = document.createElement('li'); // Se enlistan
            listItem.textContent = `${item.name} - $${item.price}`; // Mostrar nombre y precio
            const removeButton = document.createElement('button'); // Botón para eliminar producto
            removeButton.textContent = 'Eliminar';
            removeButton.onclick = () => {
                removeFromCart(item.id);
                renderCart();
                renderCartPage(); // Asegurarse de actualizar la página del carrito si es necesario
            }; // Añadir el evento al botón eliminar para remover 
            listItem.appendChild(removeButton); // Asignar botón eliminar a cada producto
            cartList.appendChild(listItem); // Añadir nombre y precio del producto al carrito
            total += item.price; // Suma de los precios de los productos
        });

        // Total del carrito
        cartTotal.textContent = `Total: $${total}`;
    }
}

// Función para mostrar productos en la página del carrito de compras
function renderCartPage() {
    const cartItemsContainer = document.getElementById('cart-items-container');
    const cartDetailsList = document.getElementById('cart-details-list');
    const cartTotal = document.getElementById('cart-total');

    console.log("Renderizando página del carrito");

    if (cartItemsContainer && cartDetailsList && cartTotal) {
        // Limpiar contenedores
        cartItemsContainer.innerHTML = '';
        cartDetailsList.innerHTML = '';

        // Variable para total del carrito
        let total = 0;

        // Iteración sobre la lista del carrito
        cart.forEach(item => {
            console.log("Renderizando producto en página del carrito:", item);

            // Crear tarjeta de producto
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
            
            // Título del producto
            const title = document.createElement('h4');
            title.textContent = item.name;
            cardHeader.appendChild(title);

            // Imagen del producto
            const img = document.createElement('img');
            img.src = item.image || '{% static "productos/img/default-product.jpg" %}'; // Cambiar esto según sea necesario
            img.alt = `Imagen de ${item.name}`;
            img.className = 'img-fluid rounded-start';
            cardBody.appendChild(img);

            // Precio del producto
            const price = document.createElement('h5');
            price.className = 'card-title';
            price.textContent = `$${item.price}`;
            cardFooter.appendChild(price);

            // Botón para eliminar producto
            const removeButton = document.createElement('button');
            removeButton.className = 'btn btn-danger';
            removeButton.textContent = 'Eliminar';
            removeButton.onclick = () => {
                removeFromCart(item.id);
                renderCartPage(); // Actualizar la página del carrito
            };
            cardFooter.appendChild(removeButton);

            // Agregar secciones a la tarjeta
            card.appendChild(cardHeader);
            card.appendChild(cardBody);
            card.appendChild(cardFooter);

            // Agregar tarjeta a la columna y luego a la fila
            col.appendChild(card);
            cartItemsContainer.appendChild(col);

            // Agregar producto a los detalles del carrito
            const detailItem = document.createElement('li');
            detailItem.textContent = `${item.name} - $${item.price}`;
            cartDetailsList.appendChild(detailItem);

            // Suma de los precios de los productos
            total += item.price;
        });

        // Total del carrito
        cartTotal.textContent = `Total: $${total}`;
    }
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
});
