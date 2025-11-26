/**
 * Function to get wind speed insight based on the Beaufort scale.
 */
export function getWindSpeedInsight(windSpeed: number): string {
  switch (true) {
    default:
      return 'Vento calmo';
    case windSpeed > 2:
      return 'Brisa leve';
    case windSpeed > 5:
      return 'Brisa leve';
    case windSpeed > 11:
      return 'Brisa fraca';
    case windSpeed > 19:
      return 'Brisa moderada';
    case windSpeed > 28:
      return 'Brisa forte';
    case windSpeed > 38:
      return 'Vento fresco';
    case windSpeed > 49:
      return 'Vento forte';
    case windSpeed > 61:
      return 'Ventania';
    case windSpeed > 74:
      return 'Ventania forte';
    case windSpeed > 88:
      return 'Tempestade';
    case windSpeed > 102:
      return 'Tempestade violenta';
    case windSpeed > 117:
      return 'Furacão';
  }
}
