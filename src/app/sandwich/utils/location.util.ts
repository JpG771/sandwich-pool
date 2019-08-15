export function calculateDistance(latitude1: number, longitude1: number, latitude2: number, longitude2: number) {
  const calculatedPi = 0.017453292519943295; // Math.PI / 180
  const cosinus = Math.cos;
  const calculatedValue =
    0.5 -
    cosinus((latitude2 - latitude1) * calculatedPi) / 2 +
    (cosinus(latitude1 * calculatedPi) * cosinus(latitude2 * calculatedPi) * (1 - cosinus((longitude2 - longitude1) * calculatedPi))) / 2;

  return 12742 * Math.asin(Math.sqrt(calculatedValue)); // 2 * R; R = 6371 km
}
