// Función para validar todas las entradas
function validarEntradas() {
    let esValido = true; // Bandera para determinar si todas las entradas son válidas

    // Limpiar mensajes de error y clases de error anteriores
    const campos = [
        'var_dir_viento',
        'var_rumbo_lanzamiento',
        'var_inte_viento',
        'var_temp_oat',
        'var_press_barom',
        'var_elevacion',
        'var_peso_vacio',
        'var_durac_vuelo',
        'var_torreta',
        'var_rpms_anterior',
        'time1',
        'time2'
    ];

    campos.forEach(campo => {
        document.getElementById(`error-${campo}`).textContent = "";
        const elemento = document.getElementById(campo);
        elemento.classList.remove('input-error');
    });

    // Obtener valores de entrada
    const varDirViento = parseFloat(document.getElementById('var_dir_viento').value);
    const varRumboLanzamiento = parseFloat(document.getElementById('var_rumbo_lanzamiento').value);
    const varInteViento = parseFloat(document.getElementById('var_inte_viento').value);
    const varTempOAT = parseFloat(document.getElementById('var_temp_oat').value);
    const varPressBarom = parseFloat(document.getElementById('var_press_barom').value);
    const varElevacion = parseFloat(document.getElementById('var_elevacion').value);
    const varPesoVacio = parseFloat(document.getElementById('var_peso_vacio').value);
    const varDuracVuelo = parseFloat(document.getElementById('var_durac_vuelo').value);
    const varTorreta = document.getElementById('var_torreta').value;
    const varRpmsAnterior = parseFloat(document.getElementById('var_rpms_anterior').value);
    const time1 = document.getElementById('time1').value;
    const time2 = document.getElementById('time2').value;

    // Validaciones específicas para cada variable
    // Dirección del viento
    if (isNaN(varDirViento) || varDirViento < 0 || varDirViento > 360) {
        mostrarError('var_dir_viento', 'La dirección del viento debe estar entre 0 y 360 grados.');
        esValido = false;
    }

    // Rumbo de lanzamiento
    if (isNaN(varRumboLanzamiento) || varRumboLanzamiento < 0 || varRumboLanzamiento > 360) {
        mostrarError('var_rumbo_lanzamiento', 'El rumbo de lanzamiento debe estar entre 0 y 360 grados.');
        esValido = false;
    }

    // Intensidad del viento
    if (isNaN(varInteViento) || varInteViento < 0 || varInteViento > 100) {
        mostrarError('var_inte_viento', 'La intensidad del viento debe estar entre 0 y 100 kt.');
        esValido = false;
    }

    // Temperatura OAT
    if (isNaN(varTempOAT) || varTempOAT < -50 || varTempOAT > 50) {
        mostrarError('var_temp_oat', 'La temperatura OAT debe estar entre -50 y 50 °C.');
        esValido = false;
    }

    // Presión barométrica
    if (isNaN(varPressBarom) || varPressBarom < 28 || varPressBarom > 32) {
        mostrarError('var_press_barom', 'La presión barométrica debe estar entre 28 y 32 inHg.');
        esValido = false;
    }

    // Elevación
    if (isNaN(varElevacion) || varElevacion < 0 || varElevacion > 10000) {
        mostrarError('var_elevacion', 'La elevación debe estar entre 0 y 10,000 pies.');
        esValido = false;
    }

    // Peso vacío
    if (isNaN(varPesoVacio) || varPesoVacio <11 || varPesoVacio > 17) {
        mostrarError('var_peso_vacio', 'El peso vacío debe estar entre 11 y 17 kg.');
        esValido = false;
    }

    // Duración de vuelo
    if (isNaN(varDuracVuelo) || varDuracVuelo < 0 || varDuracVuelo > 24) {
        mostrarError( 'var_durac_vuelo', 'La duración del vuelo debe estar entre 0 y 24 horas.');
        esValido = false;
    }

    // Torreta articulada (no requiere validación adicional si es un select con opciones fijas)

    // RPMS del vuelo anterior
    if (isNaN(varRpmsAnterior) || varRpmsAnterior < 3000 || varRpmsAnterior > 8000) {
        mostrarError('var_rpms_anterior', 'Los RPMS deben estar entre 3000 y 8,000.');
        esValido = false;
    }

    // Validación de tiempos (si están presentes)
    const timeFormat = /^([01]\d|2[0-3]):([0-5]\d)$/;

    if (time1 !== "" && !timeFormat.test(time1)) {
        mostrarError('time1', 'El formato debe ser HH:MM.');
        esValido = false;
    }

    if (time2 !== "" && !timeFormat.test(time2)) {
        mostrarError('time2', 'El formato debe ser HH:MM.');
        esValido = false;
    }

    return esValido;
}

// Función para mostrar mensajes de error
function mostrarError(campoId, mensaje) {
    const errorElement = document.getElementById(`error-${campoId}`);
    errorElement.textContent = mensaje;
    const inputElement = document.getElementById(campoId);
    inputElement.classList.add('input-error');
}

// Función para limpiar mensajes de error y clases de error
function limpiarErrores() {
    const errorSpans = document.querySelectorAll('.error-message');
    errorSpans.forEach(span => {
        span.textContent = "";
    });

    const inputElements = document.querySelectorAll('.input-error');
    inputElements.forEach(input => {
        input.classList.remove('input-error');
    });
}

// Función para realizar los cálculos
function realizarCalculos() {
    // Recibir valores de entrada
    let var_dir_viento = parseFloat(document.getElementById('var_dir_viento').value);
    let var_rumbo_lanzamiento = parseFloat(document.getElementById('var_rumbo_lanzamiento').value);
    let var_inte_viento = parseFloat(document.getElementById('var_inte_viento').value);
    let var_temp_oat = parseFloat(document.getElementById('var_temp_oat').value);
    let var_press_barom = parseFloat(document.getElementById('var_press_barom').value);
    let var_elevacion = parseFloat(document.getElementById('var_elevacion').value);
    let var_peso_vacio = parseFloat(document.getElementById('var_peso_vacio').value);
    let var_durac_vuelo = parseFloat(document.getElementById('var_durac_vuelo').value);
    let torretaArticulada = $("#var_torreta").val() === "true";
    let var_rpms_anterior = parseFloat(document.getElementById('var_rpms_anterior').value);

    // Cálculos de viento
    let dif_lanzam = Math.abs(var_dir_viento - var_rumbo_lanzamiento);
    let viento_cruzado_final = Math.abs(var_inte_viento * Math.sin(dif_lanzam * Math.PI / 180));
    let viento_frente_final = var_inte_viento * Math.cos(dif_lanzam * Math.PI / 180);

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
    let peso_max_final_GTOW = (19 - (altitud_densidad_final1 * 0.0005)) + ((var_rpms_anterior-6000) * 0.005);
    //let peso_max_final_GTOW = (19 - ( (altitud_densidad_final1/500) * 0.25)) + ( ((var_rpms_anterior-6000)/50) * 0.005);


     //-------------------CALCULO PRESION LANZAMIENTO
    // 1. Cálculos de densidad del aire Kg/m^3
    //1 Hectopascales (hPa) = 0.0295 Pulgadas de mercurio (inHg)   y 1 inHg = 33.863886666667 hPa
    let densidad_aire =  (var_press_barom*33.863886666667*28.9644) / (1000*8.31432*var_temp_oat);

    // 2. Cálculo de la altitud densimetrica
    let altitud_densimetrica = (44.3308 - 42.2665 * Math.pow(densidad_aire,0.234969))*1000;

        // 3. Velocidad de lanzamiento
    const Cl = 0.577;
    const Sref = 0.746;

    // theta    es equivalente a     dif_lanzam;
    // Headwind_SI     es equivalente a     viento_frente_final
    // Crosswind_SI     es equivalente a     viento_cruzado_final
    
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
    const vel_TAS_aire = Math.sqrt ( (peso_total_final * 9.80665) / (0.5 * densidad_aire * Cl * Sref));

    // Velocidad de lanzamiento
    let vel_lanzamiento = vel_TAS_aire + AccountedWind_SI;

    // 4. Calcular la Presion de lanzamiento  
    let presion_launch_final = "";
    presion_launch_final = Math.round(0.00203 * peso_total_final * Math.pow(vel_lanzamiento,2) + 0.01094 * peso_total_final * vel_lanzamiento + 0.0095 * peso_total_final + 0.00094 * Math.pow(vel_lanzamiento,3));
    //presion_launch_final = presion_launch_final * 6894.76;

    // 5. Calcular la aceleración de lanzamiento
/*
    function computeLaunchAccel(M_kg, P_psi) {
        const coeffs = lSelections.Config.includes("Standard") || lSelections.Config.includes("Compact")
            ? [-0.000070203542, 0.000001547947, 0.009938365766, -0.0003174701, -0.48770710003, 0.031088763761, 7.888898244506]
            : [-0.000069238, 0.000001528, 0.009799177, -0.000311184, -0.48291127, 0.030751515, 7.919335145];

        return coeffs.reduce((acc, coeff, index) => acc + coeff * Math.pow(M_kg, index) * Math.pow(P_psi, 3 - index), 0);
    }
    
    function computeLaunchAccel(M_kg, P_psi) {
        // Definición de los coeficientes para el cálculo.
        // Si la configuración seleccionada incluye "Standard" o "Compact",
        // se utilizan los primeros coeficientes; de lo contrario, se usan los segundos.
        const coeffs = lSelections.Config.includes("Standard") || lSelections.Config.includes("Compact")
            ? [
                -0.000070203542, // Coeficiente para el término de M_kg^0 y P_psi^3
                0.000001547947,  // Coeficiente para el término de M_kg^1 y P_psi^2
                0.009938365766,  // Coeficiente para el término de M_kg^2 y P_psi^1
                -0.0003174701,   // Coeficiente para el término de M_kg^3 y P_psi^0
                -0.48770710003,  // Coeficiente para el término de M_kg^4
                0.031088763761,  // Coeficiente para el término de M_kg^5
                7.888898244506   // Coeficiente constante
            ]
            : [
                -0.000069238,    // Coeficiente para el término de M_kg^0 y P_psi^3
                0.000001528,     // Coeficiente para el término de M_kg^1 y P_psi^2
                0.009799177,     // Coeficiente para el término de M_kg^2 y P_psi^1
                -0.000311184,    // Coeficiente para el término de M_kg^3 y P_psi^0
                -0.48291127,     // Coeficiente para el término de M_kg^4
                0.030751515,     // Coeficiente para el término de M_kg^5
                7.919335145      // Coeficiente constante
            ];
    
        // Usar reduce para calcular la aceleración de lanzamiento acumulando cada término
        // de la forma coeff * (M_kg^index) * (P_psi^(3 - index)).
        return coeffs.reduce(
            (acc, coeff, index) =>
                acc + coeff * Math.pow(M_kg, index) * Math.pow(P_psi, 3 - index),
            0 // Inicialización de la acumulación en 0
        );
    }
*/



    // Cálculos de rendimiento de motor
    let wot_final = 0;
    if (altitud_densidad_final1 >= 4000) {
        //wot_final = 6650 - (16.625 * ((altitud_densidad_final1 - 4000) / 500));
        wot_final = 6650 - (15.625 * ((altitud_densidad_final1 - 4000) / 500));
    } else {
        wot_final = 6650;
    }

    // Cálculos de altitudes mínimas y seguras
    let min_altitude = var_elevacion + 400;
    let safe_altitude = var_elevacion + 1000;

    /*
    // Cálculos de presión de lanzamiento
    let presion_launch_final = "";
    if (peso_total_final <= 17) {
        presion_launch_final = "(485-550) PSI";
    } else if (peso_total_final > 17 && peso_total_final <= 18) {
        presion_launch_final = "(551-561) PSI";
    } else if (peso_total_final > 18 && peso_total_final <= 19) {
        presion_launch_final = "(562-588) PSI";
    } else if (peso_total_final > 19 && peso_total_final <= 20) {
        presion_launch_final = "(589-650) PSI";
    } else if (peso_total_final > 20 && peso_total_final <= 21) {
        presion_launch_final = "(651-655) PSI";
    } else if (peso_total_final > 21) {
        presion_launch_final = "(656-665) PSI";
    } else {
        presion_launch_final = "Verifique el peso de despegue";
    }*/

    // Cálculos de techo máximo a no superar
    let techo_limite = (600 * peso_total_final) + 6600;

    // Velocidades
    let vel_max = 1.9438444924406 * Math.sqrt((2 * 9.81 * peso_total_final) / (1.225 * 0.646 * 0.20));
    let vel_safe = 1.9438444924406 * Math.sqrt((2 * 9.81 * peso_total_final) / (1.225 * 0.646 * 0.55));
    let vel_stall = 1.9438444924406 * Math.sqrt((2 * 9.81 * peso_total_final) / (1.225 * 0.646 * 0.68));

    // Mostrar resultados
    document.getElementById('viento_cruzado_final').textContent = viento_cruzado_final.toFixed(2);
    document.getElementById('viento_frente_final').textContent = viento_frente_final.toFixed(2);
    document.getElementById('altitud_presion_final1').textContent = altitud_presion_final1.toFixed(2);
    document.getElementById('altitud_densidad_final1').textContent = altitud_densidad_final1.toFixed(2);
    document.getElementById('combus_final').textContent = combus_final.toFixed(2);
    document.getElementById('peso_total_final').textContent = peso_total_final.toFixed(2);
    document.getElementById('peso_max_final_GTOW').textContent = peso_max_final_GTOW.toFixed(2);
    document.getElementById('wot_final').textContent = wot_final.toFixed(2);
    document.getElementById('presion_launch_final').textContent = presion_launch_final;
    document.getElementById('vel_lanzamiento').textContent = vel_lanzamiento.toFixed(2);
    document.getElementById('min_altitude').textContent = min_altitude.toFixed(2);
    document.getElementById('safe_altitude').textContent = safe_altitude.toFixed(2);
    document.getElementById('techo_limite').textContent = techo_limite.toFixed(2);
    document.getElementById('vel_max').textContent = vel_max.toFixed(2);
    document.getElementById('vel_safe').textContent = vel_safe.toFixed(2);
    document.getElementById('vel_stall').textContent = vel_stall.toFixed(2);
}

// Evento del botón de cálculo
document.getElementById('calculateBtn').addEventListener('click', () => {
    if (validarEntradas()) {
        realizarCalculos();
    }
});

// Función para restar tiempos en formato HH:MM
function subtractTimes(time1, time2) {
    // Convertir las horas y minutos a minutos totales
    const [hours1, minutes1] = time1.split(':').map(Number);
    const [hours2, minutes2] = time2.split(':').map(Number);

    const totalMinutes1 = hours1 * 60 + minutes1;
    const totalMinutes2 = hours2 * 60 + minutes2;

    // Calcular la diferencia en minutos
    let diffMinutes = totalMinutes1 - totalMinutes2;

    // Manejar si la diferencia es negativa (se asume que el primer tiempo es mayor)
    if (diffMinutes < 0) {
        diffMinutes += 24 * 60; // Ajustar para diferencia de un día
    }

    // Convertir de nuevo a formato HH:MM
    const diffHours = Math.floor(diffMinutes / 60);
    const diffMinutesRemainder = diffMinutes % 60;

    return `${diffHours.toString().padStart(2, '0')}:${diffMinutesRemainder.toString().padStart(2, '0')}`;
}

// Evento del botón para calcular la diferencia de tiempos
document.getElementById('calculateTimeDiffBtn').addEventListener('click', () => {
    const time1 = document.getElementById('time1').value;
    const time2 = document.getElementById('time2').value;

    // Validar formato de entrada
    const timeFormat = /^([01]\d|2[0-3]):([0-5]\d)$/;
    let valid = true;

    // Limpiar mensajes de error anteriores
    document.getElementById('error-time1').textContent = "";
    document.getElementById('error-time2').textContent = "";
    document.getElementById('time1').classList.remove('input-error');
    document.getElementById('time2').classList.remove('input-error');

    if (time1 !== "" && !timeFormat.test(time1)) {
        mostrarError('time1', 'El formato debe ser HH:MM.');
        valid = false;
    }

    if (time2 !== "" && !timeFormat.test(time2)) {
        mostrarError('time2', 'El formato debe ser HH:MM.');
        valid = false;
    }

    if (valid) {
        // Calcular la diferencia
        const timeDiff = subtractTimes(time1, time2);
        // Mostrar el resultado
        document.getElementById('timeDiffResult').textContent = `Diferencia: ${timeDiff}`;
    }
});

