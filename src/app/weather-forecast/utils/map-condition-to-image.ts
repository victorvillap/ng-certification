export function mapConditionToImageName(conditionName: string): string {
    switch (conditionName.toLowerCase()) {
        case 'clear':
            return 'sun';
        case 'clouds':
            return 'clouds';
        case 'snow':
            return 'snow';
        case 'rain':
            return 'rain';
        default:
            return 'sun';
    }
}