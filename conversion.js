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
