export interface ZipCodeForecastResponse {
    city: City;
    message: number;
    cnt: number;
    list: Forecast[];
}

export interface City {
    id: number;
    name: string;
}

export interface Forecast {
    dt: number;
    temp: Temp;
    weather: Weather[];
}

export interface Temp {
    day: number;
    min: number;
    max: number;
    night: number;
    eve: number;
    morn: number;
}

export interface Weather {
    id: number;
    main: string;
    description: string;
    icon: string;
}