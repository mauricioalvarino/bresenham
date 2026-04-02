const MARGIN_LEFT = 20;
const MARGIN_BOTTOM = 20;

function dibujarEjes() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    const w = canvas.width;
    const h = canvas.height;

    // Área útil de dibujo 
    const areaW = w - MARGIN_LEFT;
    const areaH = h - MARGIN_BOTTOM;

    ctx.clearRect(0, 0, w, h);

    ctx.strokeStyle = '#000';
    ctx.fillStyle = '#000';
    ctx.font = '10px Arial';
    ctx.lineWidth = 1;

    // Eje Y 
    ctx.beginPath();
    ctx.moveTo(MARGIN_LEFT, 0);
    ctx.lineTo(MARGIN_LEFT, areaH);
    ctx.stroke();

    // Marcas cada 20px en el eje Y
    const stepY = 20;
    for (let y = 0; y <= areaH; y += stepY) {
        const canvasY = y;
        // Valor numérico: 0 abajo, crece hacia arriba
        const valor = Math.round((areaH - y) * (areaH / areaH));
        ctx.beginPath();
        ctx.moveTo(MARGIN_LEFT - 4, canvasY);
        ctx.lineTo(MARGIN_LEFT, canvasY);
        ctx.stroke();
        ctx.fillText(valor, 0, canvasY + 4);
    }

    // Eje X 
    ctx.beginPath();
    ctx.moveTo(MARGIN_LEFT, areaH);
    ctx.lineTo(w, areaH);
    ctx.stroke();

    // Marcas cada 20px en el eje X
    const stepX = 20;
    for (let x = 0; x <= areaW; x += stepX) {
        const canvasX = MARGIN_LEFT + x;
        ctx.beginPath();
        ctx.moveTo(canvasX, areaH);
        ctx.lineTo(canvasX, areaH + 4);
        ctx.stroke();
        ctx.fillText(x, canvasX - 6, h - 2);
    }
}

function plot(x, y) {
    // Función para dibujar un punto en el canvas
    const canvas = document.getElementById('canvas');   
    const ctx = canvas.getContext('2d');
    const areaH = canvas.height - MARGIN_BOTTOM;

    // Traducir coordenadas lógicas a píxeles del canvas
    const px = MARGIN_LEFT + x;
    const py = areaH - y;

    ctx.fillStyle = '#e00';
    ctx.fillRect(px, py, 2, 2);
}


function bresenham(x0, y0, x1, y1, plot) {
    // Cálculo de diferenciales y dirección del paso
    let dx = Math.abs(x1 - x0);
    let dy = Math.abs(y1 - y0);
    let sx = (x0 < x1) ? 1 : -1;
    let sy = (y0 < y1) ? 1 : -1;
    let err = dx - dy;

     // Limpiar tabla antes de empezar
    const tbody = document.getElementById('tablaBody');
    tbody.innerHTML = '';
    let paso = 0;

    while (true) {
        // Dibujar el punto actual
        plot(x0, y0);

        // Condición de finalización
        if (x0 === x1 && y0 === y1) break;

        let e2 = 2 * err;

         // Registrar todos los valores de este paso en la tabla
        agregarFilaTabla(paso, x0, y0, dx, dy, sx, sy, err, e2);
        paso++
        
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

/**
 * Agrega una fila a la tabla HTML con los valores
 * de cada variable en el paso actual del algoritmo.
 * Cada fila representa una iteración del while en Bresenham.
 * @param {number} paso - Número de iteración actual.
 * @param {number} x0 - Coordenada X en este paso.
 * @param {number} y0 - Coordenada Y en este paso.
 * @param {number} dx - Diferencial en X (constante).
 * @param {number} dy - Diferencial en Y (constante).
 * @param {number} sx - Dirección del paso en X (constante).
 * @param {number} sy - Dirección del paso en Y (constante).
 * @param {number} err - Error acumulado antes del ajuste.
 * @param {number} e2 - Doble del error (2 * err).
 */

function agregarFilaTabla(paso, x0, y0, dx, dy, sx, sy, err, e2) {
    const tbody = document.getElementById('tablaBody');
    const fila = document.createElement('tr');
    fila.innerHTML = `
        <td>${paso}</td>
        <td>${x0}</td>
        <td>${y0}</td>
        <td>${dx}</td>
        <td>${dy}</td>
        <td>${sx}</td>
        <td>${sy}</td>
        <td>${err}</td>
        <td>${e2}</td>
    `;
    tbody.appendChild(fila);
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
    dibujarEjes();
}

window.onload = function() {
    dibujarEjes();
};
