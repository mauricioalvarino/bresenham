function plot(x, y) {
    // Función para dibujar un punto en el canvas
    const canvas = document.getElementById('canvas');   
    const ctx = canvas.getContext('2d');
    ctx.fillRect(x, y, 1, 1);
}


function bresenham(x0, y0, x1, y1, plot) {
    // Cálculo de diferenciales y dirección del paso
    let dx = Math.abs(x1 - x0);
    let dy = Math.abs(y1 - y0);
    let sx = (x0 < x1) ? 1 : -1;
    let sy = (y0 < y1) ? 1 : -1;
    let err = dx - dy;

    while (true) {
        // Dibujar el punto actual
        plot(x0, y0);

        // Condición de finalización
        if (x0 === x1 && y0 === y1) break;

        let e2 = 2 * err;

        // Ajuste en el eje X
        if (e2 > -dy) {
            err -= dy;
            x0 += sx;
        }

        // Ajuste en el eje Y
        if (e2 < dx) {
            err += dx;
            y0 += sy;
        }
    }
}

function dibujar() {
    const x0 = parseInt(document.getElementById('x0').value);
    const y0 = parseInt(document.getElementById('y0').value);
    const x1 = parseInt(document.getElementById('x1').value);
    const y1 = parseInt(document.getElementById('y1').value);

    // Validar que todos los campos tengan valores numéricos
    if (isNaN(x0) || isNaN(y0) || isNaN(x1) || isNaN(y1)) {
        alert('Por favor ingresa valores numéricos en todos los campos.');
        return;
    }

    bresenham(x0, y0, x1, y1, plot);
}

function limpiar() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
