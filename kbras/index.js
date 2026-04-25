 document.addEventListener("DOMContentLoaded", () => {
    // Elementos del DOM
    const carritoCount = document.getElementById('carrito-count');
    const tablaCarrito = document.querySelector('#lista_carrito tbody');
    const totalSpan = document.getElementById('total-carrito');
    const dropdownCarrito = document.getElementById('tabla_carrito');
    const carritoIcono = document.querySelector('.contenedor_carrito');

    let carrito = [];
    let totalItems = 0;

    // Mostrar/ocultar dropdown
    carritoIcono.addEventListener('click', (e) => {
        e.preventDefault();
        dropdownCarrito.classList.toggle('show');
    });

    // Renderizar tabla del carrito
    function renderizarCarrito() {
        tablaCarrito.innerHTML = '';
        let total = 0;

        carrito.forEach((item, index) => {
            const subtotal = item.precio * item.cantidad;
            total += subtotal;

            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td><img src="${item.img}" width="50" height="50" style="object-fit: cover;"></td>
                <td>${item.titulo}</td>
                <td>$${item.precio.toLocaleString()}</td>
                <td>${item.cantidad}</td>
                <td>$${subtotal.toLocaleString()}</td>
                <td>
                    <button class="btn-eliminar" data-index="${index}" title="Eliminar producto">🗑️</button>
                </td>
            `;
            tablaCarrito.appendChild(fila);
        });

        totalSpan.textContent = total.toLocaleString();

        // Asignar eventos a los botones de eliminar recién creados
        document.querySelectorAll('.btn-eliminar').forEach(boton => {
            boton.addEventListener('click', (e) => {
                const index = e.target.getAttribute('data-index');
                eliminarDelCarrito(index);
            });
        });
    }

    // Eliminar producto del carrito
    function eliminarDelCarrito(index) {
        // Restar del contador total de items
        totalItems -= carrito[index].cantidad;
        if (totalItems < 0) totalItems = 0;

        // Eliminar el producto del array
        carrito.splice(index, 1);

        // Actualizar contador visual y tabla
        carritoCount.textContent = totalItems;
        renderizarCarrito();
    }

    // Agregar producto al carrito
    function agregarAlCarrito(producto) {
        const productoExistente = carrito.find(item => item.id === producto.id);

        if (productoExistente) {
            productoExistente.cantidad += 1;
        } else {
            carrito.push({ ...producto, cantidad: 1 });
        }

        totalItems++;
        carritoCount.textContent = totalItems;
        renderizarCarrito();
    }

    // Evento para botones "Compra"
    const botonesCompra = document.querySelectorAll('.btn-comprar');
    botonesCompra.forEach(boton => {
        boton.addEventListener('click', (e) => {
            e.preventDefault();

            const tarjeta = e.target.closest('.producto');
            if (!tarjeta) return;

            const id = tarjeta.getAttribute('data-id');
            const img = tarjeta.querySelector('img').src;
            const titulo = tarjeta.querySelector('.card-title').textContent;
            const precioTexto = tarjeta.querySelector('.card-price').textContent;
            const precio = parseFloat(precioTexto.replace(/[^0-9]/g, ''));

            const producto = { id, img, titulo, precio };

            // Feedback visual
            boton.textContent = "¡Agregado!";
            setTimeout(() => {
                boton.textContent = "Compra";
            }, 1000);

            agregarAlCarrito(producto);
        });
    });

    // Cerrar dropdown al hacer clic fuera
    document.addEventListener('click', (e) => {
        if (!dropdownCarrito.contains(e.target) && !carritoIcono.contains(e.target)) {
            dropdownCarrito.classList.remove('show');
        }
    });
});