// ===============================
// MAPA DE DETALLES POR CRÉDITO
// ===============================
const detallesCreditos = {
  "C-001": "https://docs.google.com/spreadsheets/d/e/2PACX-1vRUP8NXUQ6ybdvdLXFQDEvzDwNZ13fOQu3k_gaVilaA98jX5hAKXTsgjpZci15L40gVWWKUdI3rfIzU/pub?gid=0&single=true&output=csv",
  "C-002": "https://docs.google.com/spreadsheets/d/e/2PACX-1vTPqHc_-dtYWDYnx2A6RUhuy8PesqVdP0HghsbWNtW1A7ahorb306Dr52VDSElU4LtsGdDl48eJaIPA/pub?gid=0&single=true&output=csv",
  "C-003": "https://docs.google.com/spreadsheets/d/e/2PACX-1vTl4lIXYBv7ivRSCwi-TRuHu5yDjk4G2rQbgXcVijc_bNj4GTPEiTXZPxY6kpQFCXdfSGbtqGAmt5rU/pub?gid=0&single=true&output=csv"
};

// ===============================
// CONFIG ALERTAS
// ===============================
const diasAntesAlerta = 10; // 🔴 Pruebas, luego vuelve a 3

// ===============================
// VARIABLES PDF
// ===============================
let datosPDF = {};
let cuotasPDF = [];

// ===============================
// VERIFICAR ALERTA POR CRÉDITO
// ===============================
async function creditoTieneAlerta(numCredito) {
  const url = detallesCreditos[numCredito];
  if (!url) return false;

  const res = await fetch(url + "&ts=" + Date.now());
  const text = await res.text();
  const filas = Papa.parse(text).data;

  const inicio = filas.findIndex(f => f[0] === "Num Cuota");
  if (inicio === -1) return false;

  const hoy = new Date();

  for (let i = inicio + 1; i < filas.length; i++) {
    const f = filas[i];
    if (!f[1] || f[6] !== "Pendiente") continue;

    const fecha = new Date(f[1].split("/").reverse().join("-"));
    const diff = Math.ceil((fecha - hoy) / (1000 * 60 * 60 * 24));

    if (diff <= diasAntesAlerta && diff >= 0) return true;
  }
  return false;
}

// ===============================
// CSV LISTADO PRINCIPAL
// ===============================
const csvListado = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTpu_9c9fZqHswzB37oEUUoFDVNQiykgy-Z-6ZQhAN0VfRhQdbuXSflvhhmh7VLHxA0dnWZ6u62epnX/pub?gid=830648104&single=true&output=csv";

Papa.parse(csvListado + "&ts=" + Date.now(), {
  download: true,
  header: true,
  skipEmptyLines: true,
  complete: async function (results) {
    const tbody = document.querySelector("#tabla-creditos tbody");
    tbody.innerHTML = "";

    for (const row of results.data) {
      if (!row["Num de Credito"]) continue;

      const tr = document.createElement("tr");
      const claseEstado = row["Estado"] === "Activo" ? "estado-activo" : "estado-cancelado";
      const tieneAlertaIcono = await creditoTieneAlerta(row["Num de Credito"]);

      tr.innerHTML = `
        <td>${row["Num de Credito"]}</td>
        <td>${row["Marca temporal"]}</td>
        <td>${row["Fecha de Credito "]}</td>
        <td>${row["Nombre del Cliente"]}</td>
        <td>$${row["Monto prestado"]}</td>
        <td>${row["Modalidad de Pago "]}</td>
        <td class="${claseEstado}">${row["Estado"]}</td>
        <td style="font-size:20px">${tieneAlertaIcono ? "⚠️" : ""}</td>
      `;

      tr.ondblclick = () => abrirDetalle(row["Num de Credito"]);
      tbody.appendChild(tr);
    }
  }
});

// ===============================
// DETALLE DEL CRÉDITO
// ===============================
function abrirDetalle(numCredito) {
  const csvDetalle = detallesCreditos[numCredito];
  if (!csvDetalle) return alert("No hay detalle");

  Papa.parse(csvDetalle + "&ts=" + Date.now(), {
    download: true,
    skipEmptyLines: true,
    complete: function (results) {
      const filas = results.data;
      const encabezados = filas[0];
      const datos = filas[1];

      const get = n => {
        const i = encabezados.indexOf(n);
        return i !== -1 ? datos[i] : "";
      };

      datosPDF = {
        credito: numCredito,
        cliente: get("Nombre Apellido"),
        estado: get("Estado"),
        forma: get("Forma de Pago"),
        interes: get("Interes %"),
        capital: get("Capital Prestado"),
        total: get("Total a Pagar")
      };

      cuotasPDF = [];
      let html = `
        <h2>Crédito ${numCredito}</h2>
        <p><strong>Cliente:</strong> ${datosPDF.cliente}</p>
        <p><strong>Estado:</strong> ${datosPDF.estado}</p>
        <p><strong>Forma de pago:</strong> ${datosPDF.forma}</p>
        <p><strong>Interés:</strong> ${datosPDF.interes} %</p>
        <p><strong>Capital:</strong> $${datosPDF.capital}</p>
        <p><strong>Total:</strong> $${datosPDF.total}</p>

        <button id="btnPDF">Descargar Estado de Cuenta</button>
      `;

      if (datosPDF.estado === "Cancelado") {
        html += `<button id="btnPazYSalvo" style="margin-left:10px;">Generar Paz y Salvo</button>`;
      }

      html += `<hr>
        <table border="1" width="100%">
          <tr>
            <th>#</th><th>Fecha</th><th>Valor</th>
            <th>Capital</th><th>Interés</th><th>Estado</th>
          </tr>
      `;

      const inicio = filas.findIndex(f => f[0] === "Num Cuota");
      for (let i = inicio + 1; i < filas.length; i++) {
        const f = filas[i];
        if (!f[0]) continue;

        cuotasPDF.push([f[0], f[1], f[2], f[3], f[4], f[6]]);
        html += `
          <tr>
            <td>${f[0]}</td>
            <td>${f[1]}</td>
            <td>${f[2]}</td>
            <td>${f[3]}</td>
            <td>${f[4]}</td>
            <td>${f[6]}</td>
          </tr>
        `;
      }

      html += `</table>`;
      const detalle = document.getElementById("detalle");
      detalle.innerHTML = html;
      document.getElementById("modal").style.display = "flex";

      // Botones
      document.getElementById("btnPDF").onclick = generarPDF;
      const btnPaz = document.getElementById("btnPazYSalvo");
      if (btnPaz) btnPaz.onclick = generarPazYSalvoPDF;
    }
  });
}

// ===============================
// PDF ESTADO DE CUENTA
// ===============================
function generarPDF() {
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF();

  let y = 15;
  pdf.setFontSize(14);
  pdf.text("ESTADO DE CUENTA", 14, y);
  y += 10;

  pdf.setFontSize(11);
  pdf.text(`Crédito: ${datosPDF.credito}`, 14, y); y += 7;
  pdf.text(`Cliente: ${datosPDF.cliente}`, 14, y); y += 7;
  pdf.text(`Estado: ${datosPDF.estado}`, 14, y); y += 7;
  pdf.text(`Forma de pago: ${datosPDF.forma}`, 14, y); y += 7;
  pdf.text(`Interés: ${datosPDF.interes} %`, 14, y); y += 7;
  pdf.text(`Capital prestado: $${datosPDF.capital}`, 14, y); y += 7;
  pdf.text(`Total a pagar: $${datosPDF.total}`, 14, y); y += 10;

  pdf.autoTable({
    startY: y,
    head: [["#", "Fecha", "Valor", "Capital", "Interés", "Estado"]],
    body: cuotasPDF,
    styles: { fontSize: 9 }
  });

  pdf.save(`estado_cuenta_${datosPDF.credito}.pdf`);
}

// ===============================
// PDF PAZ Y SALVO
// ===============================
function generarPazYSalvoPDF() {
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF();

  pdf.setFontSize(16);
  pdf.text("PAZ Y SALVO", 14, 20);

  pdf.setFontSize(12);
  pdf.text(`Crédito: ${datosPDF.credito}`, 14, 35);
  pdf.text(`Cliente: ${datosPDF.cliente}`, 14, 42);
  pdf.text(`Estado: ${datosPDF.estado}`, 14, 49);
  pdf.text(`Total pagado: $${datosPDF.total}`, 14, 56);

  pdf.autoTable({
    startY: 65,
    head: [["#", "Fecha", "Valor", "Capital", "Interés", "Estado"]],
    body: cuotasPDF,
    styles: { fontSize: 10 }
  });

  pdf.save(`paz_y_salvo_${datosPDF.credito}.pdf`);
}

// ===============================
// CERRAR MODAL
// ===============================
document.getElementById("cerrar").onclick = () =>
  (document.getElementById("modal").style.display = "none");
