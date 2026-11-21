const SUPABASE_URL = "https://mufahvnetgdtvauhjlte.supabase.co";
const SUPABASE_KEY = "sb_publishable_585RuwJWWxjoTi2S6zmTzA_G1BYm4fd";
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

async function cargarProductos() {
    const { data, error } = await supabaseClient.from("productos").select("*");
    if (error) {
        console.error("Error:", error);
        return;
    }

    console.log(data);

        data.forEach(function (producto) {
        const parrafo = document.querySelector(`.product-stock[data-id="${producto.id}"]`);

        if (!parrafo) return;

        const tarjeta = parrafo.closest(".product-card");
        const boton = tarjeta.querySelector(".btn-buy");
        const precio = tarjeta.querySelector(".product-price");

        precio.textContent = "$" + Number(producto.precio).toLocaleString("es-CO") + " COP";

        if (producto.stock === 0) {
            parrafo.textContent = "Agotado";
            parrafo.classList.add("agotado");
            boton.classList.add("disabled");
        } else if (producto.stock <= 5) {
            parrafo.textContent = "¡Quedan " + producto.stock + "!";
            parrafo.classList.add("stock-bajo");
        } else {
            parrafo.textContent = "Stock: " + producto.stock;
        }
    });
    
}

function usarPlaceholder(img) {
    if (img.dataset.placeholder) return; // evita bucle si el placeholder también fallara
    img.dataset.placeholder = "true";
    img.src = "assets/img/placeholder.svg";
}

document.querySelectorAll(".product-card img").forEach(function (img) {
    img.addEventListener("error", function () {
        usarPlaceholder(img);
    }, { once: true });

    // Cubre las imágenes que ya habían fallado antes de registrar el listener
    if (img.complete && img.naturalWidth === 0) {
        usarPlaceholder(img);
    }
});

    cargarProductos();
