import dayjs from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat";
// @ts-ignore
const dayjsUTC = require('dayjs/plugin/utc')

dayjs.extend(customParseFormat)
dayjs.extend(dayjsUTC)
class Time {
    _core: dayjs.Dayjs
    constructor() {
        this._core = dayjs()
    }
    format(layout:string) :string {
        return this._core.format(layout)
    }
}
interface iParseData {
    layout:string
    date:string
}
function minteToUTCZone(minute:number) :string {
    let hourValue = Math.floor(minute/60)
    // @ts-ignore
    hourValue = hourValue.toString().padStart(2, "0")
    let minuteValue = minute - (hourValue * 60)
    if (minuteValue < 0) {
        minuteValue = 0
    }
    // @ts-ignore
    minuteValue = minuteValue.toString().padStart(2, "0")
    let symbol = ""
    if (minute < 0) {
        symbol = "-"
    } else {
        symbol = "+"
    }
    return symbol + hourValue + minuteValue
}
// 时区列表 https://zh.wikipedia.org/wiki/%E6%97%B6%E5%8C%BA%E5%88%97%E8%A1%A8
export function parseUTCOffsetMinute(data:iParseData, minute:number) :Time {
    const time = new Time()
    if (data.date == "") {
        throw new Error("@og/time parseChina(data) data.date can not be empty string")
    }

    time._core = dayjs(data.date + minteToUTCZone(minute), {
        format: data.layout+"ZZ",
        utc: true,
    })
    // @ts-ignore
    time._core = time._core.utcOffset(minute)
    return time
}
// 时区列表 https://zh.wikipedia.org/wiki/%E6%97%B6%E5%8C%BA%E5%88%97%E8%A1%A8
export function parseUTCOffsetHour(data:iParseData, hour:number): Time {
    return parseUTCOffsetMinute(data, hour*60)
}
export function parseChina(data:iParseData): Time {
    data = Object.assign({}, data)
    return parseUTCOffsetHour(data, 8)
}
export function parseJapan(data:iParseData): Time {
    data = Object.assign({}, data)
    return parseUTCOffsetHour(data, 9)
}
export const second = "YYYY-MM-DD HH:mm:ss"
export const Minute = "YYYY-MM-DD HH:mm"
export const hour = "YYYY-MM-DD HH"
export const day = "YYYY-MM-DD"
export const month = "YYYY-MM"
export const year = "YYYY"
export const RFC3339 = "YYYY-MM-DDTHH:mm:ssZ"