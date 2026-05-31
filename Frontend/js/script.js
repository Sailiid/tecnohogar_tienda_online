// Capturar formulario
const formulario = document.getElementById("formulario");

if (formulario) {

    formulario.addEventListener("submit", function(event) {

        event.preventDefault();

        console.log("Evento submit ejecutado");

        const nombre = document.getElementById("nombre").value;
        const correo = document.getElementById("correo").value;
        const mensaje = document.getElementById("mensaje").value;
        const telefono = document.getElementById("telefono").value;

        console.log("Nombre:", nombre);
        console.log("Correo:", correo);
        console.log("Mensaje:", mensaje);
        console.log("Telefono:", telefono);
        const respuesta = document.getElementById("respuesta");

        // Validación
        if (nombre === "" || correo === "" || mensaje === "" || telefono === "") {
            respuesta.textContent = "Todos los campos son obligatorios.";
            return;
        }

        // ENVIAR AL BACKEND
        fetch("http://localhost:3000/guardar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nombre: nombre,
                correo: correo,
                mensaje: mensaje,
                telefono: telefono,  
            })
        })
        .then(res => res.text())
        .then(data => {
            console.log("Respuesta servidor:", data);
            respuesta.textContent = "Datos guardados en MySQL correctamente";
            formulario.reset();
        })
        .catch(error => {
            console.error("Error:", error);
            respuesta.textContent = "Error al guardar los datos";
        });

    });
}
const app = Vue.createApp({
  data() {
    return {
      productos: [],
      categorias: ["Teclados", "Computadores", "Mouse", "Cables", "Memorias SD"],
      categoriasSeleccionadas: [],
      textoBuscador: "",
      favoritos: []
    };
  },
  created() {
    fetch("http://localhost:3000/productos")
      .then(res => res.json())
      .then(data => this.productos = data);
  },
  computed: {
    productosFiltrados() {
      return this.productos.filter(p =>
        (this.categoriasSeleccionadas.length === 0 || this.categoriasSeleccionadas.includes(p.categoria)) &&
        p.title.toLowerCase().includes(this.textoBuscador.toLowerCase())
      );
    }
  },
  methods: {
    agregarFavorito(product) {
      if (!this.favoritos.includes(product)) this.favoritos.push(product);
    },
    quitarFavorito(product) {
      this.favoritos = this.favoritos.filter(f => f.id !== product.id); 
    }
  }
});
app.mount("#app");