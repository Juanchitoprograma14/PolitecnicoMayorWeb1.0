document.addEventListener("DOMContentLoaded",(e)=>{
  const contenedor_carrito = document.getElementById('contenedor-carrito');
  const carrito_count = document.getElementsByClassName('carrito-count')[0];
  let count = 0;
  const carrito = document.querySelector('.carrito');
  let Totalcarrito = [];
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(button=>{
    button.addEventListener('click',(e)=>{
      count++
      carrito_count.textContent = count
      button.textContent = "Producto agregado";
      button.classList.remove('btn-primary')
      button.classList.add('btn-success');
      e.preventDefault();
      const data = e.target.closest('.Producto')
      leerDatos(data);
      setTimeout(()=>{
        button.textContent = "Agregar al carrito";
        button.classList.remove('btn-success');
        button.classList.add('btn-primary');  
      },1000)
    })

    function leerDatos(producto){
      const infoProducto = {
        id : producto.querySelector('a').getAttribute('data-id'),
        img : producto.querySelector('img').src,
        titulo: producto.querySelector('h5').textContent,
        precio: parseInt(producto.querySelector('p').textContent),
        cantidad : 1
      }

      const existe = Totalcarrito.some(producto=>{
        return producto.id === infoProducto.id
      });

      if (existe) {
        Totalcarrito = Totalcarrito.map(producto=>{
          if (producto.id == infoProducto.id) {
            producto.cantidad++
          }
          return producto; 
        })
      } else {
        Totalcarrito.push(infoProducto);
      }

      MostarCarrito(Totalcarrito); 
    }

    function MostarCarrito(Totalcarrito){
      const tbody = document.querySelector('#lista-carrito tbody');
      const nombre = "Alfonso"
      console.log(`Este es mi nombre ${nombre}`);
      const total_productos = document.querySelector('#total-carrito');
      let sumatotal = 0
      tbody.innerHTML = "";
      Totalcarrito.forEach(producto=>{
        const row = document.createElement('tr');
        let total = producto.precio * producto.cantidad
        row.innerHTML = `
          <td><img src="${producto.img}" width="50"></td>
          <td>${producto.titulo}</td>
          <td>$${total}</td>
          <td>${producto.cantidad}</td>
          <td><a href="#" class="eliminar" data-id="${producto.id}">X</a></td>
        `;

        console.log(sumatotal);
        sumatotal += total;
        total_productos.textContent = `Total: $${sumatotal}`;

         
        tbody.appendChild(row);//Agregar un hijo
      });
    }

  })
})