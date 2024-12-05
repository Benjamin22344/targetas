document.addEventListener("DOMContentLoaded", () => {
  // Seleccionar la tarjeta de forma segura
  const tarjeta = document.getElementById("tarjeta") as HTMLElement | null;
  if (!tarjeta) {
    console.error("No se encontró el elemento con ID 'tarjeta'.");
    return;
  }

  // Seleccionar todos los contenedores de forma segura
  const contenedores = document.querySelectorAll<HTMLElement>(".col-span-1");
  if (contenedores.length === 0) {
    console.error("No se encontraron elementos con la clase 'col-span-1'.");
    return;
  }

  // Añadir eventos para arrastrar la tarjeta
  tarjeta.addEventListener("dragstart", (event: DragEvent) => {
    if (event.dataTransfer) {
      event.dataTransfer.setData("text/plain", tarjeta.id);
    }
  });

  // Hacer que los contenedores permitan soltar elementos
  contenedores.forEach((contenedor) => {
    contenedor.addEventListener("dragover", (event: DragEvent) => {
      event.preventDefault(); // Permite el "drop"
    });

    contenedor.addEventListener("drop", (event: DragEvent) => {
      event.preventDefault();

      if (event.dataTransfer) {
        const tarjetaId = event.dataTransfer.getData("text/plain");
        const tarjeta = document.getElementById(tarjetaId);

        if (tarjeta && contenedor) {
          contenedor.appendChild(tarjeta); // Mover la tarjeta al nuevo contenedor
        }
      }
    });
  });
});
