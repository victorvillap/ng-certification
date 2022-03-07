export interface ZipcodeWeatherForecast {
    name: string,
    forecast: DailyForecast[]
}

export interface DailyForecast {
    date: Date
    condition: string,
    maxTemperature: number,
    minTemperature: number
}
