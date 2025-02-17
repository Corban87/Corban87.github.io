/// Funciones de conversión
function feetToMeters(feet) {
    return feet * 0.3048;
}

function MetersToFeet(Meters) {
    return Meters * 3.28084;
}


function NauticalmilesToKilometers(Millas) {
    return Millas / 1.852;
}

function KilometersToNauticalmiles(kilometros) {
    return kilometros * 1.852;
}

function MilibToInch(Milibares) {
    return Milibares * 33.9;
}

function InchToMilib(InchMerc) {
    return 30 + (((InchMerc-1016)*3)/100);
}

function CentigratesToFarenheit(Centigrados) {
    return (Centigrados*(9/5))+20;
}

function farenheitToCentigrates(Farenheit) {
    return (Farenheit-32)*(5/9);
}

function mphToKph(mph) {
    return mph * 1.60934;
}

function poundsToKilograms(pounds) {
    return pounds * 0.453592;
}

function psiToPascals(psi) {
    return psi * 6894.76;
}

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

// Lógica del botón de conversión
document.getElementById('convertBtn2').addEventListener('click', () => {
    const value = parseFloat(document.getElementById('conversionInput').value);
    const conversionType = document.getElementById('conversionType').value;

    let result = "Inválido";
    if (!isNaN(value)) {
        switch (conversionType) {
            case 'feetToMeters':
                result = feetToMeters(value).toFixed(2) + " mt";
                break;
            case 'MetersToFeet':
                result = MetersToFeet(value).toFixed(2) + " ft";
                break;
            case 'NauticalmilesToKilometers':
                result = NauticalmilesToKilometers(value).toFixed(2) + " Km";
                break;
            case 'KilometersToNauticalmiles':
                result = KilometersToNauticalmiles(value).toFixed(2) + " NM";
                break;
            case 'MilibToInch':
                result = MilibToInch(value).toFixed(2) + " inHg";
                break;
            case 'InchToMilib':
                result = InchToMilib(value).toFixed(2) + " Mil";
                break;
            case 'CentigratesToFarenheit':
                result = CentigratesToFarenheit(value).toFixed(2) + "°F";
                break; 
            case 'farenheitToCentigrates':
                result = farenheitToCentigrates(value).toFixed(2) + "°C";
                break; 
            case 'mphToKph':
                result = mphToKph(value).toFixed(2) + " km/h";
                break;
            case 'poundsToKilograms':
                result = poundsToKilograms(value).toFixed(2) + " kg";
                break;
            case 'psiToPascals':
                result = psiToPascals(value).toFixed(2) + " Pa";
                break;
            default:
                result = "Conversión no válida";
        }
    }

    document.getElementById('conversionResult').textContent = result;
});

// Lógica del botón para calcular la diferencia de tiempos
document.getElementById('calculateTimeDiffBtn').addEventListener('click', () => {
    const time1 = document.getElementById('time1').value;
    const time2 = document.getElementById('time2').value;
    const time3 = document.getElementById('time3').value;
    const time4 = document.getElementById('time4').value;

    // Validar formato de entrada
    const timeFormat = /^([01]\d|2[0-3]):([0-5]\d)$/;
    if (!timeFormat.test(time1) || !timeFormat.test(time2) || !timeFormat.test(time3) || !timeFormat.test(time4)) {
        document.getElementById('timeDiffResult').textContent = "Por favor, ingrese tiempos válidos en formato HH:MM.";
        return;
    }

    // Calcular la diferencia
    const timeDiffAeronave = subtractTimes(time2, time1);
    const timeDiffTripul = subtractTimes(time4, time3);

    // Mostrar el resultado
    document.getElementById('timeDiffResultAeronave').textContent = `Aeronave: ${timeDiffAeronave}`;
    document.getElementById('timeDiffResultTripulacion').textContent = `Tripulación: ${timeDiffTripul}`;
});


//Logica de autenticación
document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        document.getElementById('loginMessage').textContent = 'Inicio de sesión exitoso';
      } else {
        document.getElementById('loginMessage').textContent = result.message;
      }
    } catch (error) {
      console.error('Error:', error);
      document.getElementById('loginMessage').textContent = 'Error al intentar iniciar sesión';
    }
  });
  
  
