/// Funciones de conversión
function feetToMeters(feet) {
    return feet * 0.3048;
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
                result = feetToMeters(value).toFixed(2) + " metros";
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
