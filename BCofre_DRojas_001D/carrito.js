//uso del almacenamiento local
let cart = JSON.parse(localStorage.getItem('cart')) || [];

//función para mostrar productos en el carrito
function renderCart() {
    const cartList = document.getElementById('cart-list');
    const cartTotal = document.getElementById('cart-total');

    //limpiar tabla
    cartList.innerHTML = '';

    //variable para total del carrito
    let total = 0;

    //iteracion sobre la lista del carrito
    cart.forEach(item => {
        const listItem = document.createElement('li');//se enlistan
        listItem.textContent = `${item.name} - $${item.price}`;//mostrar nombre y precio
        const removeButton = document.createElement('button'); //botón para eliminar producto
        removeButton.textContent = 'Eliminar';
        removeButton.onclick = () => removeFromCart(item.id);//se añade el evento al botón elimianr para remover 
        listItem.appendChild(removeButton);//asignar boton eliminar a cada produco
        cartList.appendChild(listItem);//añadir nombre y precio del producto al carrito
        total += item.price;//suma de los precios de los productos
    });
        //total del carrito
        cartTotal.textContent = `Total: $${total}`;
}

//función agregar producto al carrito
function addToCart(product) {
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

//función eliminar producto del carrito
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

//eventos a los btn-primary "Agregar al Carrito"
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const card = button.closest('.david-custom-products');
        const product = {
        id: parseInt(card.dataset.id),
        name: card.dataset.name,
        price: parseInt(card.dataset.price)
        };
        addToCart(product);

    });
});

//actualizar carrito al cargar pagina
document.addEventListener('DOMContentLoaded', renderCart);