//Formas de acceder a los Elementos//
// const carrito = document.querySelector("#carrito");//Con querySelector puedes acceder a clases y Ids
// console.log(carrito);

// const carrito = document.getElementById("carrito");

// const carrito = document.getElementsByTagName('span')
// console.log(carrito);

//Eventos de javascript
//Eventos del mouse
//Listeners: Es poner algo 
//Evento click
document.addEventListener('DOMContentLoaded', ()=>{
  const lista_carrito = document.getElementById('lista-carrito');
  console.log(lista_carrito);
  let totalCarrito = [];
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach( (button)=>{
    button.addEventListener('click', (e)=>{      
      e.preventDefault();
      //Esto se llama el traversing deldom
      const data = e.target.closest('.Producto')//el closest busca la clase mas cercana      
      leerDatos(data)
    //  cargarProductos(data)  
    })

   function leerDatos(producto){

    const infoProducto = {
      imagen : producto.querySelector('img').src,
      titulo : producto.querySelector('h5').textContent, //es el contenido del texto
      precio : parseInt(producto.querySelector('.precio').textContent),//parseint es para convertir texto a numero
      id : producto.querySelector('a').getAttribute('data-id')
    }

    console.log(infoProducto);
<<<<<<< HEAD
=======


    
>>>>>>> fixed
    
    

   }

  
  })
  
<<<<<<< HEAD
=======
  
>>>>>>> fixed


  

})   









