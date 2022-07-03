export interface Weather {
    clouds: Cloud
    temperature: number
    wind: Wind
}

interface Cloud {
    main: string
    description: string
}
interface Wind {
    speed: number
}
