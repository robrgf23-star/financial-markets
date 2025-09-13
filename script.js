// Importa las librerías necesarias para el renderizado de fórmulas LaTeX
// Se carga desde una CDN para este ejemplo
const script = document.createElement('script');
script.src = 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.7/MathJax.js?config=TeX-MML-AM_CHTML';
script.async = true;
document.head.appendChild(script);

document.addEventListener('DOMContentLoaded', () => {
    const empresasContainer = document.getElementById('empresas-container');
    const calculatorsContainer = document.getElementById('calculators-container');
    
    // Botones de la calculadora
    const btnMontoSimple = document.getElementById('btn-monto-simple');
    const btnTasa = document.getElementById('btn-tasa');
    const btnTiempo = document.getElementById('btn-tiempo');
    const btnMontoCompuesto = document.getElementById('btn-monto-compuesto');
    
    // --- FUNCIÓN PARA GESTIONAR LAS VISTAS DE LAS CALCULADORAS ---
    function showCalculator(calcId) {
        const allCalcs = calculatorsContainer.children;
        for (const calc of allCalcs) {
            calc.classList.add('hidden');
        }
        const targetCalc = document.getElementById(calcId);
        if (targetCalc) {
            targetCalc.classList.remove('hidden');
        }
    }

    function setActiveButton(activeBtnId) {
        const allBtns = [btnMontoSimple, btnTasa, btnTiempo, btnMontoCompuesto];
        allBtns.forEach(btn => {
            btn.classList.remove('active', 'bg-blue-600', 'text-white');
            btn.classList.add('bg-gray-200', 'text-gray-700');
        });
        const activeBtn = document.getElementById(activeBtnId);
        activeBtn.classList.add('active', 'bg-blue-600', 'text-white');
    }

    // --- LÓGICA DE CÁLCULO DE INTERÉS ---

    function calcularMontoSimple() {
        const capital = parseFloat(document.getElementById('capital-simple').value);
        const tasa = parseFloat(document.getElementById('tasa-simple').value) / 100;
        const tiempo = parseFloat(document.getElementById('tiempo-simple').value);
        const resultadoDiv = document.getElementById('resultado-simple');

        if (isNaN(capital) || isNaN(tasa) || isNaN(tiempo)) {
            resultadoDiv.innerHTML = '<span class="text-red-500">Por favor, introduce valores válidos.</span>';
            return;
        }
        const montoFinal = capital * (1 + (tasa * tiempo));
        resultadoDiv.innerHTML = `<span>Monto Final: $${montoFinal.toFixed(2)}</span>`;
    }

    function calcularTasa() {
        const capital = parseFloat(document.getElementById('capital-r').value);
        const monto = parseFloat(document.getElementById('monto-r').value);
        const tiempo = parseFloat(document.getElementById('tiempo-r').value);
        const resultadoDiv = document.getElementById('resultado-tasa');

        if (isNaN(capital) || isNaN(monto) || isNaN(tiempo) || capital <= 0 || tiempo <= 0) {
            resultadoDiv.innerHTML = '<span class="text-red-500">Por favor, introduce valores válidos.</span>';
            return;
        }
        const tasa = ((monto / capital) - 1) / tiempo;
        resultadoDiv.innerHTML = `<span>Tasa Anual: ${(tasa * 100).toFixed(2)}%</span>`;
    }

    function calcularTiempo() {
        const capital = parseFloat(document.getElementById('capital-t').value);
        const monto = parseFloat(document.getElementById('monto-t').value);
        const tasa = parseFloat(document.getElementById('tasa-t').value) / 100;
        const resultadoDiv = document.getElementById('resultado-tiempo');

        if (isNaN(capital) || isNaN(monto) || isNaN(tasa) || capital <= 0 || tasa <= 0) {
            resultadoDiv.innerHTML = '<span class="text-red-500">Por favor, introduce valores válidos.</span>';
            return;
        }
        const tiempo = ((monto / capital) - 1) / tasa;
        resultadoDiv.innerHTML = `<span>Tiempo: ${tiempo.toFixed(2)} años</span>`;
    }

    function calcularMontoCompuesto() {
        const capital = parseFloat(document.getElementById('capital-compuesto').value);
        const tasa = parseFloat(document.getElementById('tasa-compuesto').value) / 100;
        const tiempo = parseFloat(document.getElementById('tiempo-compuesto').value);
        const resultadoDiv = document.getElementById('resultado-compuesto');

        if (isNaN(capital) || isNaN(tasa) || isNaN(tiempo)) {
            resultadoDiv.innerHTML = '<span class="text-red-500">Por favor, introduce valores válidos.</span>';
            return;
        }
        const montoFinal = capital * Math.pow((1 + tasa), tiempo);
        resultadoDiv.innerHTML = `<span>Monto Final: $${montoFinal.toFixed(2)}</span>`;
    }
    
    // --- EVENT LISTENERS PARA LOS BOTONES DE NAVEGACIÓN ---
    btnMontoSimple.addEventListener('click', () => {
        showCalculator('monto-simple-calc');
        setActiveButton('btn-monto-simple');
    });
    btnTasa.addEventListener('click', () => {
        showCalculator('tasa-calc');
        setActiveButton('btn-tasa');
    });
    btnTiempo.addEventListener('click', () => {
        showCalculator('tiempo-calc');
        setActiveButton('btn-tiempo');
    });
    btnMontoCompuesto.addEventListener('click', () => {
        showCalculator('monto-compuesto-calc');
        setActiveButton('btn-monto-compuesto');
    });

    // --- EVENT LISTENERS PARA LOS BOTONES DE CÁLCULO ---
    document.getElementById('calcular-simple').addEventListener('click', calcularMontoSimple);
    document.getElementById('calcular-tasa').addEventListener('click', calcularTasa);
    document.getElementById('calcular-tiempo').addEventListener('click', calcularTiempo);
    document.getElementById('calcular-compuesto').addEventListener('click', calcularMontoCompuesto);


    // --- FUNCIÓN PARA OBTENER Y MOSTRAR DATOS DE EMPRESAS ---

    async function obtenerEmpresas() {
        // En un proyecto real, aquí harías una solicitud a una API de datos financieros.
        // Por ejemplo: await fetch('https://api.ejemplo.com/datos-bursatiles')...
        // Como las APIs gratuitas pueden cambiar o requerir claves, usaremos datos de ejemplo para mantener la funcionalidad.

        const datosDeEjemplo = [
            { "symbol": "AAPL", "name": "Apple Inc.", "price": 175.05, "marketCap": "2.8T", "change": "+1.25%", "sector": "Tecnología" },
            { "symbol": "MSFT", "name": "Microsoft Corp.", "price": 420.10, "marketCap": "3.1T", "change": "+0.80%", "sector": "Tecnología" },
            { "symbol": "GOOGL", "name": "Alphabet Inc.", "price": 150.30, "marketCap": "1.9T", "change": "-0.50%", "sector": "Comunicaciones" },
            { "symbol": "AMZN", "name": "Amazon.com, Inc.", "price": 182.50, "marketCap": "1.8T", "change": "+2.10%", "sector": "Consumo Discrecional" },
            { "symbol": "NVDA", "name": "NVIDIA Corp.", "price": 900.25, "marketCap": "2.2T", "change": "+3.50%", "sector": "Tecnología" },
            { "symbol": "TSLA", "name": "Tesla, Inc.", "price": 185.70, "marketCap": "590B", "change": "-1.50%", "sector": "Consumo Discrecional" },
            { "symbol": "META", "name": "Meta Platforms, Inc.", "price": 480.90, "marketCap": "1.2T", "change": "+0.95%", "sector": "Comunicaciones" },
            { "symbol": "BRK.B", "name": "Berkshire Hathaway", "price": 415.65, "marketCap": "900B", "change": "+0.70%", "sector": "Finanzas" },
            { "symbol": "LLY", "name": "Eli Lilly and Co.", "price": 780.40, "marketCap": "740B", "change": "+1.80%", "sector": "Salud" },
            { "symbol": "JPM", "name": "JPMorgan Chase & Co.", "price": 200.80, "marketCap": "580B", "change": "+0.45%", "sector": "Finanzas" },
            { "symbol": "V", "name": "Visa Inc.", "price": 275.45, "marketCap": "570B", "change": "-0.20%", "sector": "Tecnología Financiera" },
            { "symbol": "UNH", "name": "UnitedHealth Group", "price": 505.70, "marketCap": "470B", "change": "+1.15%", "sector": "Salud" },
            { "symbol": "MA", "name": "Mastercard Inc.", "price": 450.15, "marketCap": "440B", "change": "+0.60%", "sector": "Tecnología Financiera" },
            { "symbol": "XOM", "name": "Exxon Mobil Corp.", "price": 120.90, "marketCap": "450B", "change": "-0.90%", "sector": "Energía" },
            { "symbol": "JNJ", "name": "Johnson & Johnson", "price": 155.85, "marketCap": "380B", "change": "+0.55%", "sector": "Salud" },
            { "symbol": "PG", "name": "Procter & Gamble Co.", "price": 165.30, "marketCap": "390B", "change": "+0.30%", "sector": "Consumo Básico" },
            { "symbol": "HD", "name": "The Home Depot", "price": 350.20, "marketCap": "360B", "change": "+1.30%", "sector": "Consumo Discrecional" },
            { "symbol": "AVGO", "name": "Broadcom Inc.", "price": 1350.60, "marketCap": "640B", "change": "+2.50%", "sector": "Tecnología" },
            { "symbol": "CVX", "name": "Chevron Corp.", "price": 160.75, "marketCap": "300B", "change": "-0.75%", "sector": "Energía" },
            { "symbol": "KO", "name": "The Coca-Cola Company", "price": 65.40, "marketCap": "280B", "change": "+0.25%", "sector": "Consumo Básico" },
            { "symbol": "MCD", "name": "McDonald's Corp.", "price": 270.10, "marketCap": "250B", "change": "+0.80%", "sector": "Consumo Discrecional" },
            { "symbol": "BAC", "name": "Bank of America", "price": 40.85, "marketCap": "320B", "change": "-0.10%", "sector": "Finanzas" },
            { "symbol": "PFE", "name": "Pfizer Inc.", "price": 28.30, "marketCap": "150B", "change": "-0.40%", "sector": "Salud" },
            { "symbol": "DIS", "name": "The Walt Disney Company", "price": 110.60, "marketCap": "200B", "change": "+1.50%", "sector": "Comunicaciones" },
            { "symbol": "INTC", "name": "Intel Corp.", "price": 35.75, "marketCap": "155B", "change": "+0.70%", "sector": "Tecnología" },
            { "symbol": "NFLX", "name": "Netflix, Inc.", "price": 620.40, "marketCap": "280B", "change": "+1.90%", "sector": "Comunicaciones" },
            { "symbol": "VZ", "name": "Verizon Communications", "price": 40.50, "marketCap": "170B", "change": "-0.30%", "sector": "Comunicaciones" },
            { "symbol": "ADBE", "name": "Adobe Inc.", "price": 500.80, "marketCap": "230B", "change": "+1.05%", "sector": "Tecnología" },
            { "symbol": "CRM", "name": "Salesforce, Inc.", "price": 300.95, "marketCap": "285B", "change": "+0.65%", "sector": "Tecnología" },
            { "symbol": "WMT", "name": "Walmart Inc.", "price": 60.15, "marketCap": "480B", "change": "-0.25%", "sector": "Consumo Básico" }
        ];
        
        const htmlEmpresas = datosDeEjemplo.map(empresa => `
            <tr class="bg-white border-b hover:bg-gray-50">
                <th scope="row" class="px-3 py-2 font-medium text-gray-900 whitespace-nowrap">${empresa.name} <span class="text-xs text-gray-500">(${empresa.symbol})</span></th>
                <td class="px-3 py-2">$${empresa.price.toFixed(2)}</td>
                <td class="px-3 py-2">${empresa.marketCap}</td>
                <td class="px-3 py-2 ${empresa.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}">${empresa.change}</td>
                <td class="px-3 py-2">${empresa.sector}</td>
            </tr>
        `).join('');

        empresasContainer.innerHTML = htmlEmpresas;
    }

    obtenerEmpresas();
});
