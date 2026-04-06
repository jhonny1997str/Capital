// ===============================
// LOGIN
// ===============================
const USER = "capital";          // Usuario
const PASS = "6103";     // Contraseña

const loginContainer = document.getElementById("login-container");
const appContainer = document.getElementById("app-container");
const btnLogin = document.getElementById("btnLogin");
const loginError = document.getElementById("login-error");

btnLogin.onclick = () => {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if(username === USER && password === PASS) {
    loginContainer.style.display = "none";
    appContainer.style.display = "block";
    cargarTabla(); // ⚡ Carga la tabla después de loguearse
  } else {
    loginError.style.display = "block";
  }
};

// ===============================
// MAPA DE DETALLES POR CRÉDITO
// ===============================
const detallesCreditos = {
  "C-001": "https://docs.google.com/spreadsheets/d/e/2PACX-1vRUP8NXUQ6ybdvdLXFQDEvzDwNZ13fOQu3k_gaVilaA98jX5hAKXTsgjpZci15L40gVWWKUdI3rfIzU/pub?gid=0&single=true&output=csv",
  "C-002": "https://docs.google.com/spreadsheets/d/e/2PACX-1vTPqHc_-dtYWDYnx2A6RUhuy8PesqVdP0HghsbWNtW1A7ahorb306Dr52VDSElU4LtsGdDl48eJaIPA/pub?gid=0&single=true&output=csv",
  "C-003": "https://docs.google.com/spreadsheets/d/e/2PACX-1vTl4lIXYBv7ivRSCwi-TRuHu5yDjk4G2rQbgXcVijc_bNj4GTPEiTXZPxY6kpQFCXdfSGbtqGAmt5rU/pub?gid=0&single=true&output=csv",
  "C-004": "https://docs.google.com/spreadsheets/d/e/2PACX-1vTaB5vES-3u5Zizdl1JovcH9wMUGcd9hunADx2GFK3iogBapIjFaXg7CZhBoFohqx28_xDih2Esntud/pub?gid=0&single=true&output=csv",
  "C-005": "https://docs.google.com/spreadsheets/d/e/2PACX-1vTCFB7k_NsO6s77IBZmOkjJoA67I1MgYbiHPw_IEgnTri8Y6mBJScsE5TUgNoGDo4u-QtVEH3Mr3kop/pub?gid=0&single=true&output=csv",
  "C-006": "https://docs.google.com/spreadsheets/d/e/2PACX-1vRTUrvX2PomZtV11T9fpGtgTZWQo98454gsmZSFyGiJSVtTpivEsgul-t6IIN3UXPyJZaNa-o8R1W7X/pub?gid=0&single=true&output=csv",
  "C-007": "https://docs.google.com/spreadsheets/d/e/2PACX-1vTFMr44XLnjEzgR2pQZ5ImvgiFF7NDQ3-RT57NBBHPN2OTPzDcEF8o64k72eMOcjBzDB-oNvGAkzAKu/pub?gid=0&single=true&output=csv",
  "C-008": "https://docs.google.com/spreadsheets/d/e/2PACX-1vQcf7AM4XqQ6BqGSBelGEmzF1hnS11ov-_xNqDsjcXQIZEGt8zIqH7A9MmeCDe53GDRsNiurk-uyXYa/pub?gid=0&single=true&output=csv",
  "C-009": "https://docs.google.com/spreadsheets/d/e/2PACX-1vTBzbZi_ikQotLpajVKTW6wQHY-zEyc180uq_16PpShz-4xYAiKhmrPN6MEzVMANtag4b9EvopzqaL6/pub?gid=0&single=true&output=csv",
  "C-010": "https://docs.google.com/spreadsheets/d/e/2PACX-1vQA0xOICfUWBhTsvles52zznt5-dBu_VVJ_Fs1CriV6qEsK4Mt87EddNJSzvUo5hVjyQa4bzxN6nIIx/pub?gid=0&single=true&output=csv",
  "C-011": "https://docs.google.com/spreadsheets/d/e/2PACX-1vQU58MJpyiudnMZfXB1bdpxjUdsNnIVh-1KeY5crD63JZxeOCtO9dHYQpRjKo7O1s6g8ULMuclPSFdn/pub?gid=0&single=true&output=csv",
  "C-012": "https://docs.google.com/spreadsheets/d/e/2PACX-1vSJBrk4eDD6yC4YU8FyenPKByJnLK_KTVLhYc_CJMCZA12lwk-_49QSnkm14Y8t8Ib1uK4ZyljM1Nqp/pub?gid=0&single=true&output=csv",
  "C-013": "https://docs.google.com/spreadsheets/d/e/2PACX-1vRihvfAM2Xxk9k8iSKpnGfywM05sMfGPYbpDezZDSJoYJfQqmb-uG6V2U1iMii9NW85uW7JFFsk_ypA/pub?gid=0&single=true&output=csv",
  "C-014": "https://docs.google.com/spreadsheets/d/e/2PACX-1vTa0wno8sS9JKluKQylNhyybQRjL_b66cO7jjfzLgkz1dHpOVelSfDb5AUys2Mqm8bTrx8fzTm9WtdU/pub?gid=0&single=true&output=csv",
  "C-015": "https://docs.google.com/spreadsheets/d/e/2PACX-1vRvPkGU0uqH21gk6xwdvgS1nef-cabXSn9mMU2SbxVZ5GQz7iT6kxelaujKgdyJij_hhBlEL5F7Xbpt/pub?gid=0&single=true&output=csv",
  "C-016": "https://docs.google.com/spreadsheets/d/e/2PACX-1vQlxG45Z8Y6LZqXkdbxX2L3y2OpDv5sVHcKlCmQQhm4kFL48JLYUTmOuRN1DaSnyWSWn_MGhuLsNSUp/pub?gid=0&single=true&output=csv",
  "C-017": "https://docs.google.com/spreadsheets/d/e/2PACX-1vTHcsk94l3D0VTnDzoS8XbGAJy_K1SUN8peOYV4tBeENN4Smc8Wf1Tbh37xyc6b955yNCSYisDTCNbz/pub?gid=0&single=true&output=csv",
  "C-018": "https://docs.google.com/spreadsheets/d/e/2PACX-1vRU0iIJS4JCV9qgp1rH_s8Bk_AO6tdRUnEWu_WujgYqU5T1EHpU11xROzcLucg91OfSN-wN9wMsRT3l/pub?gid=0&single=true&output=csv",
  "C-019": "https://docs.google.com/spreadsheets/d/e/2PACX-1vRLmYhQuttH_Sv7ZvKJJ-iYH3C0UBe91PkofGOo5iUXvawklXUnTNqEE8Sq-UO5zXphXE6zNhbhNmqp/pub?gid=0&single=true&output=csv",
  "C-020": "https://docs.google.com/spreadsheets/d/e/2PACX-1vRSKduHyAxfSNrJufJPxVk0YiVe6j1RTjVIQZ7aFX1lg9XNsxg4IWg2f-C_OX5VZTt9GyzdfEXL8ZNv/pub?gid=0&single=true&output=csv",
  "C-021": "https://docs.google.com/spreadsheets/d/e/2PACX-1vRRcooCSTStZ6tlisyddohSELyhtz3o3bM8WstH9OHHmPDTXVZUeKDTtAIyf0RT7tkgP7ZCBM7sLbmO/pub?gid=0&single=true&output=csv",
  "C-022": "https://docs.google.com/spreadsheets/d/e/2PACX-1vRvhCYzm_zLxFKh9ByF4xPE0CngGWVEAIXjGnPGJzZsJH2pU076QrlCMM7nMWGW30FT5Xdhf4IkXoAK/pub?gid=0&single=true&output=csv",
  "C-023": "https://docs.google.com/spreadsheets/d/e/2PACX-1vTpcbWeYcBADYfVHKAtz9MZrJxgDTIlmBIRTK85bLUg2hmN48iuyxm5IFNCibLwySpVjeyRXXheMiua/pub?gid=0&single=true&output=csv",
  "C-024": "https://docs.google.com/spreadsheets/d/e/2PACX-1vS-8v2vqLbzHnG52YxobScispc8PEveZRNZitPIU-WKoc8WLHG5jONDa9xbZNfHrtjiwwn-C490yQeK/pub?gid=0&single=true&output=csv",
  "C-025": "https://docs.google.com/spreadsheets/d/e/2PACX-1vSf96zYeovfpkWvvFlJq5HmSmK8jOKD_mRk1O1OzH55JYPWvxhA_8A059juUMTTugsBm__Neax2y1Fn/pub?gid=0&single=true&output=csv",
  "C-026": "https://docs.google.com/spreadsheets/d/e/2PACX-1vSbNleP9kcxYIpPh_kWOtwers9hvhe41K6oLWTcMlPq7CPRUCtrmi7uCsLc-RoGV5NHbneKBXTeXZzX/pub?gid=0&single=true&output=csv"
};

// ===============================
// NUEVO: LÓGICA DEL RESUMEN FINANCIERO
// ===============================
const btnVerResumen = document.getElementById("btnVerResumen");
const resumenContainer = document.getElementById("resumen-container");

btnVerResumen.onclick = () => {
    if (resumenContainer.style.display === "none") {
        resumenContainer.style.display = "block";
        btnVerResumen.innerText = "✖️ Cerrar Resumen";
        cargarDatosResumen();
    } else {
        resumenContainer.style.display = "none";
        btnVerResumen.innerText = "📈 Ver Resumen Financiero";
    }
};

async function cargarDatosResumen() {
    const googleUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRka8Av_1DtWDLQmSNVfDKr9-ztFeGg4uM3cqLmLfVFjA4FtmZW2Fz7zlmG-kIdngTum3rRGhMdaKh5/pub?gid=0&single=true&output=csv';
    const proxyUrl = 'https://api.allorigins.win/raw?url=' + encodeURIComponent(googleUrl);

    try {
        const response = await fetch(proxyUrl + "&ts=" + Date.now());
        const csvText = await response.text();
        const rows = csvText.replace(/\r/g, '').split('\n').map(row => {
            const result = [];
            let current = '', inQuotes = false;
            for (let i = 0; i < row.length; i++) {
                if (row[i] === '"') inQuotes = !inQuotes;
                else if (row[i] === ',' && !inQuotes) { result.push(current.trim()); current = ''; }
                else current += row[i];
            }
            result.push(current.trim());
            return result;
        });

        // ==========================================
        // RENDER TABLA (Filas 0 a la 12 para incluir marzo)
        // ==========================================
        let htmlTable = '';
        // Cambié el límite a 13 para que lea las nuevas filas de Marzo
        for(let i = 0; i < 13; i++) { 
            if(rows[i] && rows[i][0]) {
                // Si la fila es un título de mes o sección, le damos un estilo diferente
                const esTituloMes = rows[i][0].includes("Mes Actual");
                const claseFila = esTituloMes ? "fila-especial" : "";
                
                htmlTable += `<tr class="${claseFila}"><td class="label-resumen">${rows[i][0]}</td><td class="value-resumen">${rows[i][1]}</td></tr>`;
            }
        }
        document.getElementById('resumen-table-body').innerHTML = htmlTable;

        // ==========================================
        // RENDER INDICADORES (Lo que ya tenías)
        // ==========================================
        const indicators = [
            { label: rows[1][3], val: rows[1][4], icon: '📈' },
            { label: rows[2][3], val: rows[2][4], icon: '⚠️' },
            { label: rows[3][3], val: rows[3][4], icon: '⚡' }
        ];
        document.getElementById('indicators-col-main').innerHTML = indicators.map(ind => `
            <div class="indicator-box">
                <span class="ind-label">${ind.icon} ${ind.label || ''}</span>
                <span class="ind-value">${ind.val || '0'}</span>
            </div>
        `).join('');
    } catch (e) { console.error("Error cargando resumen:", e); }
}

// ===============================
// CONFIG ALERTASS
// ===============================
const diasAntesAlerta = 3; 

// ===============================
// VARIABLES PDF
// ===============================
let datosPDF = {};
let cuotasPDF = [];

// ===============================
// FUNCIONES (TAL CUAL ORIGINALES)
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
  hoy.setHours(0,0,0,0); 

  for (let i = inicio + 1; i < filas.length; i++) {
    const f = filas[i];
    const estado = f[6]; 
    const fechaStr = f[1]; 

    if (!estado || estado !== "Pendiente") continue;
    if (!fechaStr) return false; 

    const partes = fechaStr.split("/");
    const fecha = new Date(partes[2], partes[1]-1, partes[0]);
    fecha.setHours(0,0,0,0);

    const diff = Math.round((fecha - hoy) / (1000 * 60 * 60 * 24));
    if (diff <= diasAntesAlerta && diff >= 0) return true;

    return false; 
  }
  return false; 
}

function cargarTabla() {
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
}

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

      document.getElementById("btnPDF").onclick = generarPDF;
      const btnPaz = document.getElementById("btnPazYSalvo");
      if (btnPaz) btnPaz.onclick = generarPazYSalvoPDF;
    }
  });
}

function generarPDF() {
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF();

  const margenX = 20; 
  let y = 20;         

  pdf.setFontSize(16);
  pdf.text("ESTADO DE CUENTA", margenX, y); y += 15;

  pdf.setFontSize(12);
  pdf.text(`Crédito: ${datosPDF.credito}`, margenX, y); y += 10;
  pdf.text(`Cliente: ${datosPDF.cliente}`, margenX, y); y += 10;
  pdf.text(`Estado: ${datosPDF.estado}`, margenX, y); y += 10;
  pdf.text(`Forma de pago: ${datosPDF.forma}`, margenX, y); y += 10;
  pdf.text(`Interés: ${datosPDF.interes} %`, margenX, y); y += 10;
  pdf.text(`Capital prestado: $${datosPDF.capital}`, margenX, y); y += 10;
  pdf.text(`Total a pagar: $${datosPDF.total}`, margenX, y); y += 15; 

  pdf.autoTable({
    startY: y,
    head: [["#", "Fecha", "Valor", "Capital", "Interés", "Estado"]],
    body: cuotasPDF,
    styles: { fontSize: 10 },
    margin: { left: margenX }
  });

  pdf.save(`estado_cuenta_${datosPDF.credito}.pdf`);
}

function generarPazYSalvoPDF() {
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF();

  const margenX = 20;
  let y = 20;

  pdf.setFontSize(16);
  pdf.text("PAZ Y SALVO", margenX, y); y += 15;

  pdf.setFontSize(12);
  pdf.text(`Crédito: ${datosPDF.credito}`, margenX, y); y += 7;
  pdf.text(`Cliente: ${datosPDF.cliente}`, margenX, y); y += 7;
  pdf.text(`Estado: ${datosPDF.estado}`, margenX, y); y += 7;
  pdf.text(`Total pagado: $${datosPDF.total}`, margenX, y); y += 15;

  pdf.autoTable({
    startY: y,
    head: [["#", "Fecha", "Valor", "Capital", "Interés", "Estado"]],
    body: cuotasPDF,
    styles: { fontSize: 10 },
    margin: { left: margenX }
  });

  pdf.save(`paz_y_salvo_${datosPDF.credito}.pdf`);
}

document.getElementById("cerrar").onclick = () =>
  (document.getElementById("modal").style.display = "none");