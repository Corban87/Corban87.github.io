function calcular() {
    // Obtener valores del formulario
    let var_dir_viento = parseFloat(document.getElementById('var_dir_viento').value);
    let var_rumbo_lanzamiento = parseFloat(document.getElementById('var_rumbo_lanzamiento').value);
    let var_inte_viento = parseFloat(document.getElementById('var_inte_viento').value);
    let var_temp_oat = parseFloat(document.getElementById('var_temp_oat').value);
    let var_punto_rocio = parseFloat(document.getElementById('var_punto_rocio').value);
    let var_press_barom = parseFloat(document.getElementById('var_press_barom').value);
    let var_elevacion = parseFloat(document.getElementById('var_elevacion').value);
    let var_peso_vacio = parseFloat(document.getElementById('var_peso_vacio').value);
    let var_durac_vuelo = parseFloat(document.getElementById('var_durac_vuelo').value);
    let torretaArticulada = document.getElementById('torretaArticulada').checked;
    let var_rpms_anterior = parseFloat(document.getElementById('var_rpms_anterior').value);

    // Cálculos de viento
    let dif_lanzam = Math.abs(var_dir_viento - var_rumbo_lanzamiento);
    let viento_cruzado_final = Math.abs(var_inte_viento * Math.sin(dif_lanzam * Math.PI / 180));
    let viento_frente_final = var_inte_viento * Math.cos(dif_lanzam * Math.PI / 180);

    // Cálculos de humedad
    let var_humedad = 100 * (Math.exp((17.625 * var_punto_rocio) / (243.04 + var_punto_rocio)) / Math.exp((17.625 * var_temp_oat) / (243.04 + var_temp_oat)));

    // Cálculos de presión
    let presion_nivel_mar = var_press_barom + (var_elevacion / 1000);
    let altitud_presion_final1 = var_elevacion + 1000 * (29.92 - var_press_barom);
    let temperatura_isa1 = 15 - (altitud_presion_final1 / 1000) * 3.6;
    let altitud_densidad_final1 = altitud_presion_final1 + ((var_temp_oat - temperatura_isa1) * 120);

    // Cálculos de combustible
    let combus_final = 0;
    if (torretaArticulada) {
        combus_final = (var_durac_vuelo * 0.33) + 1;
    } else {
        combus_final = (var_durac_vuelo * 0.33) + 2;
    }

    // Cálculos de peso
    let peso_total_final = var_peso_vacio + combus_final;
    let peso_max_final_GTOW = (19 - (altitud_densidad_final1 * 0.0005)) + ((var_rpms_anterior - 6000) * 0.005);

    // Cálculos de densidad del aire
    let densidad_aire = (var_press_barom * 33.863886666667 * 28.9644) / (1000 * 8.31432 * var_temp_oat);

    // Cálculo de la altitud densimétrica
    let altitud_densimetrica = (44.3308 - 42.2665 * Math.pow(densidad_aire, 0.234969)) * 1000;

    // Velocidad de lanzamiento
    const Cl = 0.577;
    const Sref = 0.746;
    let WindHead = viento_frente_final * 1.94384;
    let WindCross = viento_cruzado_final * 1.94384;
    let percWind;

    // Cálculo de porcentaje de viento
    if (viento_frente_final >= 0 && viento_frente_final < 10) {
        percWind = 0.6 * (viento_frente_final / 10);
    } else if (viento_frente_final >= 10) {
        percWind = 0.6;
    } else if (viento_frente_final < 0) {
        percWind = 1;
    }

    const AccountedWind_SI = -viento_frente_final * percWind;

    // Velocidad de aire
    const vel_TAS_aire = Math.sqrt((peso_total_final * 9.80665) / (0.5 * densidad_aire * Cl * Sref));

    // Velocidad de lanzamiento
    let vel_lanzamiento = vel_TAS_aire + AccountedWind_SI;

    // Calcular la Presión de lanzamiento
    let presion_launch_final = Math.round(0.00203 * peso_total_final * Math.pow(vel_lanzamiento, 2) + 0.01094 * peso_total_final * vel_lanzamiento + 0.0095 * peso_total_final + 0.00094 * Math.pow(vel_lanzamiento, 3));

    // Cálculos de rendimiento de motor
    let wot_final = 0;
    if (altitud_densidad_final1 >= 4000) {
        wot_final = 6650 - (15.625 * ((altitud_densidad_final1 - 4000) / 500));
    } else {
        wot_final = 6650;
    }

    // Cálculos de altitudes mínimas y seguras
    let min_altitude = var_elevacion + 400;
    let safe_altitude = var_elevacion + 1000;

    // Cálculos de techo máximo a no superar
    let techo_limite = (600 * peso_total_final) + 6600;

    // Velocidades
    let vel_max = 1.9438444924406 * Math.sqrt((2 * 9.81 * peso_total_final) / (1.225 * 0.646 * 0.20));
    let vel_safe = 1.9438444924406 * Math.sqrt((2 * 9.81 * peso_total_final) / (1.225 * 0.646 * 0.55));
    let vel_stall = 1.9438444924406 * Math.sqrt((2 * 9.81 * peso_total_final) / (1.225 * 0.646 * 0.68));

    // Mostrar resultados
    document.getElementById('viento_cruzado_final').textContent = viento_cruzado_final.toFixed(2);
    document.getElementById('viento_frente_final').textContent = viento_frente_final.toFixed(2);
    document.getElementById('var_humedad').textContent = var_humedad.toFixed(2);
    document.getElementById('altitud_presion_final1').textContent = altitud_presion_final1.toFixed(2);
    document.getElementById('altitud_densidad_final1').textContent = altitud_densidad_final1.toFixed(2);
    document.getElementById('combus_final').textContent = combus_final.toFixed(2);
    document.getElementById('peso_total_final').textContent = peso_total_final.toFixed(2);
    document.getElementById('peso_max_final_GTOW').textContent = peso_max_final_GTOW.toFixed(2);
    document.getElementById('wot_final').textContent = wot_final.toFixed(2);
    document.getElementById('presion_launch_final').textContent = presion_launch_final.toFixed(2);
    document.getElementById('min_altitude').textContent = min_altitude.toFixed(2);
    document.getElementById('safe_altitude').textContent = safe_altitude.toFixed(2);
    document.getElementById('techo_limite').textContent = techo_limite.toFixed(2);
    document.getElementById('vel_max').textContent = vel_max.toFixed(2);
    document.getElementById('vel_safe').textContent = vel_safe.toFixed(2);
    document.getElementById('vel_stall').textContent = vel_stall.toFixed(2);
}

function calcularHoras() {
    let hora_prendida = document.getElementById('hora_prendida').value;
    let hora_despegue = document.getElementById('hora_despegue').value;
    let hora_aterrizaje = document.getElementById('hora_aterrizaje').value;
    let hora_apagada = document.getElementById('hora_apagada').value;

    let duracion_total_vuelo = calcularDiferenciaHoras(hora_prendida, hora_apagada);
    let duracion_vuelo_aire = calcularDiferenciaHoras(hora_despegue, hora_aterrizaje);

    document.getElementById('duracion_total_vuelo').innerText = duracion_total_vuelo;
    document.getElementById('duracion_vuelo_aire').innerText = duracion_vuelo_aire;
}

function calcularDiferenciaHoras(horaInicio, horaFin) {
    let inicio = new Date(`1970-01-01T${horaInicio}:00`);
    let fin = new Date(`1970-01-01T${horaFin}:00`);
    let diferencia = new Date(fin - inicio);

    let horas = diferencia.getUTCHours();
    let minutos = diferencia.getUTCMinutes();

    return `${horas} horas y ${minutos} minutos`;
}