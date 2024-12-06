/*document.getElementById('calculateBtn').addEventListener('click', () => {
    // Recibir valores de entrada
    const var_dir_viento = parseFloat(document.getElementById('var_dir_viento').value);
    const var_rumbo_lanzamiento = parseFloat(document.getElementById('var_rumbo_lanzamiento').value);
    const var_inte_viento = parseFloat(document.getElementById('var_inte_viento').value);
    const var_temp_oat = parseFloat(document.getElementById('var_temp_oat').value);
    const var_press_barom = parseFloat(document.getElementById('var_press_barom').value);
    const var_elevacion = parseFloat(document.getElementById('var_elevacion').value);
    const var_peso_vacio = parseFloat(document.getElementById('var_peso_vacio').value);
    const var_durac_vuelo = parseFloat(document.getElementById('var_durac_vuelo').value);
    const var_torreta = document.getElementById('var_torreta').value;
    const var_rpms_anterior = parseFloat(document.getElementById('var_rpms_anterior').value);

    // Realizar cálculos
    */
    /* 
    const dif_lanzam = Math.abs(var_dir_viento - var_rumbo_lanzamiento);
    const viento_cruzado_final = var_inte_viento * Math.sin(dif_lanzam);
    const viento_frente_final = var_inte_viento * Math.cos(dif_lanzam);
    const presion_nivel_mar = var_press_barom + (var_elevacion / 1000);
    const altitud_presion_final1 = var_elevacion + (29.92 - presion_nivel_mar) * 1000;
    const temperatura_isa1 = 15 - (altitud_presion_final1 / 1000) * 3.6;
    const altitud_densidad_final1 = altitud_presion_final1 + ((var_temp_oat - temperatura_isa1) * 120);
    const combus_final = (var_durac_vuelo * 0.33) + 2;
    const peso_total_final = var_peso_vacio + combus_final;
    const peso_max_final_GTOW = (19 - (altitud_densidad_final1 * 0.0005)) + (6000 * 0.005);
    const wot_final = 6650;
    const min_altitude = var_elevacion + 400;
    const safe_altitude = var_elevacion + 1000;
    const presion_launch_final = 0;
    const techo_limite = (600 * peso_total_final) + 6600;
    
    
    // Calculos de viento
    const dif_lanzam = Math.abs(var_dir_viento - var_rumbo_lanzamiento);
    const viento_cruzado_final = var_inte_viento * Math.sin(dif_lanzam);
    const viento_frente_final = var_inte_viento * Math.cos (dif_lanzam);

    // Calculos de presion
    const presion_nivel_mar = var_press_barom + (var_elevacion / 1000);

    const altitud_presion_final1 = var_elevacion + (29.92 - presion_nivel_mar) * 1000;
    const altitud_presion_final2 = var_elevacion + 1000 * (presion_nivel_mar);

    const temperatura_isa1 = 15 - (altitud_presion_final1 / 1000) * 3.6;
    const temperatura_isa2 = 15 - ( (2*var_elevacion) / 1000);

    const altitud_densidad_final1 = altitud_presion_final1 + ( (var_temp_oat-temperatura_isa1) * 120);

    // Calculos de combustible
    const combus_final = 0;
    if(var_torreta=='SI'){
        combus_final = (var_durac_vuelo * 0.33) + 1;
    }
    else if(var_torreta=='NO'){
        combus_final = (var_durac_vuelo * 0.33) + 2;
    }
    else
        combus_final = 'Ingrese SI/NO';

    // Calculos de peso
    const peso_total_final = var_peso_vacio + combus_final;
    const peso_max_final_GTOW = ( 19 - (altitud_densidad_final1*0.0005) )+ (6000 * 0.005);

    // Calculos de rendimiento de motor
    const wot_final = 0;
    if (altitud_densidad_final1 > 4000){
        wot_final = 6650 - (16.625 * ( (altitud_densidad_final1 - 4000) / 500 ));
    }
    else
        wot_final = 6650;

    // Calculos de min y safe
    const min_altitude = var_elevacion + 400;
    const safe_altitude = var_elevacion + 1000;

    // Calculos de presion de lanzamiento
    const presion_launch_final = 0;
    
    switch(peso_total_final){
        case 16:
            presion_launch_final === "(485-550) PSI";
            break;
        case 17:
            presion_launch_final === "(551-561) PSI";
            break;
        case 18:
            presion_launch_final === "(562-588) PSI";
            break;
        case 19:
            presion_launch_final === "(589-650) PSI";
            break;
        case 20:
            presion_launch_final === "(651-655) PSI";
            break;
        case 21:
            presion_launch_final === "(656-665) PSI";
            break;
        default:
            presion_launch_final === "Verifique el peso de despegue";
    }
    
    // Calculos de techo maximo a no superar
    const techo_limite = (600 * peso_total_final) + 6600;
    

    // Mostrar resultados
    document.getElementById('viento_cruzado_final').textContent = viento_cruzado_final.toFixed(2);
    document.getElementById('viento_frente_final').textContent = viento_frente_final.toFixed(2);
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
});
*/

document.getElementById('calculateBtn').addEventListener('click', () => {
    // Recibir valores de entrada
    let var_dir_viento = parseFloat(document.getElementById('var_dir_viento').value);
    let var_rumbo_lanzamiento = parseFloat(document.getElementById('var_rumbo_lanzamiento').value);
    let var_inte_viento = parseFloat(document.getElementById('var_inte_viento').value);
    let var_temp_oat = parseFloat(document.getElementById('var_temp_oat').value);
    let var_press_barom = parseFloat(document.getElementById('var_press_barom').value);
    let var_elevacion = parseFloat(document.getElementById('var_elevacion').value);
    let var_peso_vacio = parseFloat(document.getElementById('var_peso_vacio').value);
    let var_durac_vuelo = parseFloat(document.getElementById('var_durac_vuelo').value);
    //let var_torreta = document.getElementById('var_torreta').value.toUpperCase(); // Convertir a mayúsculas
    //let var_torreta = document.getElementById('var_torreta').checked;
    let torretaArticulada = $("#var_torreta").val() === "true";


    // Calculos de viento
    let dif_lanzam = Math.abs(var_dir_viento - var_rumbo_lanzamiento);
    let viento_cruzado_final = Math.abs (var_inte_viento * Math.sin(dif_lanzam));
    let viento_frente_final = var_inte_viento * Math.cos(dif_lanzam);

    /*if(viento_cruzado_final<0){
        viento_cruzado_final = Math.abs(viento_cruzado_final) + 'izquierda';
    }
    else if (viento_cruzado_final>0){
        viento_cruzado_final = viento_cruzado_final + 'derecha';
    }*/

    // Calculos de presion
    let presion_nivel_mar = var_press_barom + (var_elevacion / 1000);
    
    let altitud_presion_final1 = var_elevacion + 1000 * (29.92 - var_press_barom);

    let altitud_presion_final2 = + var_elevacion + 1000 * (29.92 - presion_nivel_mar);
    //altitud_presion_final1 = altitud_presion_final1 ;
    

    let temperatura_isa1 = 15 - (altitud_presion_final1 / 1000) * 3.6;
    //const temperatura_isa2 = 15 - ((2 * var_elevacion) / 1000);

    let altitud_densidad_final1 = altitud_presion_final1 + ((var_temp_oat - temperatura_isa1) * 120);

    // Calculos de combustibles
    let combus_final = 0;
    if (torretaArticulada) {
        combus_final = (var_durac_vuelo * 0.33) + 1;
    } else {
        combus_final = (var_durac_vuelo * 0.33) + 2;
    } 

    // Calculos de peso
    let peso_total_final = var_peso_vacio + (typeof combus_final === 'number' ? combus_final : 0);
    let peso_max_final_GTOW = (19 - (altitud_densidad_final1 * 0.0005)) + (6000 * 0.005);

    // Calculos de rendimiento de motor
    let wot_final = 0;
    if (altitud_densidad_final1 >= 4000) {
        wot_final = 6650 - (16.625 * ((altitud_densidad_final1 - 4000) / 500));
    } else {
        wot_final = 6650;
    }

    // Calculos de min y safe
    let min_altitude = var_elevacion + 400;
    let safe_altitude = var_elevacion + 1000;

    // Calculos de presion de lanzamiento
    let presion_launch_final = "";
    if (peso_total_final<=17){
        presion_launch_final = "(485-550) PSI";
    }else if(peso_total_final>17 && peso_total_final<=18){
        presion_launch_final = "(551-561) PSI";
    }else if(peso_total_final>18 && peso_total_final<=19){
        presion_launch_final = "(562-588) PSI";
    }else if(peso_total_final>19 && peso_total_final<=20){
        presion_launch_final = "(589-650) PSI";
    }else if(peso_total_final>20 && peso_total_final<=21){
        presion_launch_final = "(651-655) PSI";
    }else if(peso_total_final>21){
        presion_launch_final = "(656-665) PSI";
    }else
        presion_launch_final = "Verifique el peso de despegue";

    // Calculos de techo maximo a no superar
    let techo_limite = (600 * peso_total_final) + 6600;

    //Velocidad de perdida
    let vel_max = 1.9438444924406 * Math.sqrt ( (2 * 9.81 * peso_total_final) / (1.225 * 0.646 * 0.20) );
    let vel_safe = 1.9438444924406 * Math.sqrt ( (2 * 9.81 * peso_total_final) / (1.225 * 0.646 * 0.55) );
    let vel_stall = 1.9438444924406 * Math.sqrt ( (2 * 9.81 * peso_total_final) / (1.225 * 0.646 * 0.68) );

    // Mostrar resultados
    document.getElementById('viento_cruzado_final').textContent = viento_cruzado_final.toFixed(2);
    document.getElementById('viento_frente_final').textContent = viento_frente_final.toFixed(2);
    document.getElementById('altitud_presion_final1').textContent = altitud_presion_final1.toFixed(2); // Actualizado
    document.getElementById('altitud_densidad_final1').textContent = altitud_densidad_final1.toFixed(2);
    //document.getElementById('combus_final').textContent = typeof combus_final === 'number' ? combus_final.toFixed(2) : combus_final;
    document.getElementById('combus_final').textContent = combus_final.toFixed(2);
    document.getElementById('peso_total_final').textContent = peso_total_final.toFixed(2);
    document.getElementById('peso_max_final_GTOW').textContent = peso_max_final_GTOW.toFixed(2);
    document.getElementById('wot_final').textContent = wot_final.toFixed(2);
    document.getElementById('presion_launch_final').textContent = presion_launch_final;
    document.getElementById('min_altitude').textContent = min_altitude.toFixed(2);
    document.getElementById('safe_altitude').textContent = safe_altitude.toFixed(2);
    document.getElementById('techo_limite').textContent = techo_limite.toFixed(2);
    document.getElementById('vel_max').textContent = vel_max.toFixed(2);
    document.getElementById('vel_safe').textContent = vel_safe.toFixed(2);
    document.getElementById('vel_stall').textContent = vel_stall.toFixed(2);

    
});
