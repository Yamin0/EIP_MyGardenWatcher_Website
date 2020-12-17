export default interface SensorData {
    temperature: number,
    humidity: number,
    luminosity: number,
    co2: number,
    groundHumidity: number
}

export const sensorDataInit: SensorData = {
    temperature: 0,
    humidity: 0,
    luminosity: 0,
    co2: 0,
    groundHumidity: 0
};