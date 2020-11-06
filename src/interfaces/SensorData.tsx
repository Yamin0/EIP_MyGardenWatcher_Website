export default interface SensorData {
    temperature: number,
    humidity: number,
    luminosity: number,
}

export const sensorDataInit: SensorData = {
    temperature: 0,
    humidity: 0,
    luminosity: 0
};