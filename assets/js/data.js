// Contenido del portfolio. Para sumar un trabajo: agregar el video en
// assets/video/<id>.mp4, el poster en assets/img/posters/<id>.webp
// y una entrada en WORKS. "format": "v" vertical, "h" horizontal, "wide" panorámico.

window.CATEGORIES = [
  { id: "moda", label: "Moda & accesorios" },
  { id: "food", label: "Alimentación & gastro" },
  { id: "motor", label: "Autos & motos" },
  { id: "deco", label: "Hogar & deco" },
  { id: "salud", label: "Salud & bienestar" },
  { id: "eventos", label: "Eventos & cultura" },
  { id: "servicios", label: "Espacios & servicios" },
];

window.WORKS = [
  { id: "dia-de-la-madre-en-siciliano", title: "Día de la Madre", client: "Siciliano Cueros", cat: "moda", format: "wide", tags: ["Campaña", "Carrusel animado"], featured: true },
  { id: "reel-urbano-hermanas", title: "Colección urbana", client: "Siciliano Cueros", cat: "moda", format: "v", tags: ["Producto", "Lifestyle"], featured: true },
  { id: "reel-esperando", title: "El cliente que dijo “ya vuelvo”", client: "Valinta Mercado Natural", cat: "food", format: "v", tags: ["Humor", "Trend"], featured: true },
  { id: "reel-miru-tips-2", title: "Tips de especias", client: "Valinta Mercado Natural", cat: "food", format: "v", tags: ["Educativo", "Tienda"] },
  { id: "reel-nutrisau", title: "Llegó Nutrisau", client: "Valinta Mercado Natural", cat: "food", format: "v", tags: ["Lanzamiento", "Producto"] },
  { id: "reel-ensaladas", title: "Ensaladas con proteína", client: "", cat: "food", format: "v", tags: ["Educativo", "Talking head"] },
  { id: "reel-comemos-naranja", title: "¿Comemos naranja?", client: "", cat: "food", format: "v", tags: ["Receta", "Talking head"], featured: true },
  { id: "reel-decisiones-dificiles", title: "Decisiones difíciles", client: "", cat: "food", format: "v", tags: ["Pastelería", "Trend"], featured: true },
  { id: "reel-prueba-lasana", title: "Prueba de lasaña", client: "", cat: "food", format: "v", tags: ["Gastronomía", "Detrás de escena"] },
  { id: "reel-palo-santo", title: "Vino Palo Santo", client: "", cat: "food", format: "v", tags: ["Producto", "Recomendación"] },
  { id: "reel-vermouth", title: "Vermouth para regalar", client: "", cat: "food", format: "v", tags: ["Producto", "Fechas especiales"] },
  { id: "reel-chevrolet-sonic", title: "Chevrolet Sonic", client: "", cat: "motor", format: "v", tags: ["Producto", "Venta"] },
  { id: "reel-ranger", title: "Ranger XLT", client: "", cat: "motor", format: "v", tags: ["Producto", "Venta"] },
  { id: "reel-moto-benelli", title: "POV: y la viste", client: "", cat: "motor", format: "v", tags: ["Trend", "Producto"], featured: true },
  { id: "reel-nuevo-camion", title: "Nuevo camión", client: "", cat: "motor", format: "v", tags: ["Institucional", "Novedad"] },
  { id: "reel-3-4-5", title: "La silla que estabas esperando", client: "", cat: "deco", format: "v", tags: ["Producto", "Detalle"] },
  { id: "sillas-base-h", title: "Sillas base H", client: "", cat: "deco", format: "h", tags: ["Producto", "Ambientación"] },
  { id: "exterior-formentera-v", title: "Línea Formentera exterior", client: "", cat: "deco", format: "v", tags: ["Promoción", "Showroom"] },
  { id: "reel-caja", title: "Contenedores de esterilización", client: "", cat: "salud", format: "v", tags: ["Producto", "B2B"] },
  { id: "reel-antes-despues", title: "Antes y después", client: "", cat: "salud", format: "v", tags: ["Producto", "B2B"] },
  { id: "reel-casco", title: "Casco quirúrgico ventilado", client: "", cat: "salud", format: "v", tags: ["Demo", "B2B"] },
  { id: "reel-edulcorante", title: "Hablemos de edulcorantes", client: "", cat: "salud", format: "v", tags: ["Podcast", "Educativo"] },
  { id: "reel-recomendaciones", title: "Recomendaciones", client: "", cat: "salud", format: "v", tags: ["Talking head", "Educativo"] },
  { id: "reel-ana", title: "Show en vivo", client: "", cat: "eventos", format: "v", tags: ["Cobertura", "Música"], featured: true },
  { id: "reel-pena-ana", title: "Peña del Día de los Trabajadores", client: "", cat: "eventos", format: "v", tags: ["Cobertura", "Música"] },
  { id: "reel-show-27-6", title: "Show 27/6", client: "", cat: "eventos", format: "v", tags: ["Cobertura", "Aftermovie"] },
  { id: "reel-entrevista-taller", title: "Taller: voces y experiencias", client: "", cat: "eventos", format: "v", tags: ["Cobertura", "Entrevistas"] },
  { id: "organico-charm-box-kitty", title: "Charm box Hello Kitty", client: "", cat: "moda", format: "v", tags: ["Orgánico", "Producto"], featured: true },
  { id: "reel-alhajero", title: "Alhajero: cargando…", client: "", cat: "moda", format: "v", tags: ["Producto", "Trend"] },
  { id: "reel-combinacion-1", title: "Combinaciones doradas", client: "", cat: "moda", format: "v", tags: ["Producto", "Styling"] },
  { id: "reel-pulsera-navidad", title: "Regalo de Navidad", client: "", cat: "moda", format: "v", tags: ["Fechas especiales", "Producto"] },
  { id: "mundial-canal-1", title: "Mundial: figuritas", client: "", cat: "servicios", format: "v", tags: ["Trend", "Retail"] },
  { id: "reel-feriado", title: "Finde largo: hacé tu reserva", client: "", cat: "servicios", format: "v", tags: ["Promoción", "Espacios"] },
  { id: "reel-hermanos", title: "Manos a la obra", client: "", cat: "servicios", format: "v", tags: ["Detrás de escena", "Espacios"] },
];

// Clientes actuales (cuenta de Instagram)
window.CLIENTS = [
  { name: "Siciliano Cueros", handle: "sicilianocueros" },
  { name: "Don Carlos Pastas", handle: "doncarlospastas" },
  { name: "Sanno", handle: "sanno._" },
];
