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
