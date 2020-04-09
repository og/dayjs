import dayjs from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat";
// @ts-ignore
const dayjsUTC = require('dayjs/plugin/utc')

dayjs.extend(customParseFormat)
dayjs.extend(dayjsUTC)

export const Millisecond = 1
export const Second = Millisecond * 1000
export const Minute = Second * 60
export const Hour = Minute * 60

class Time {
    _core: dayjs.Dayjs
    constructor(dayValue: dayjs.Dayjs) {
        this._core = dayValue
    }
    add(duration :number) :Time {
        let time = this.clone()
        time._core = time._core.add(duration, "millisecond")
        return time
    }
    addDate(years:number, months:number, days:number) :Time {
        const time = this.clone()
        time._core = time._core.add(years, "year")
            .add(months, "month")
            .add(days, "month")
        return time
    }
    format(layout:string) :string {
        return this._core.format(layout)
    }
    clone():Time {
        const day = this._core.clone()
        return new Time(day)
    }
    utcOffset(offset:utcOffset):Time {
        const time = this.clone()
        // @ts-ignore
        time._core = time._core.utcOffset(offset._minute)
        return time
    }
    toChina() :Time {
        return this.utcOffset(UtcOffset(8))
    }
    toJapan() :Time {
        return this.utcOffset(UtcOffset(9))
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
// please use otime.UtcOffset(hour) create utcOffset
interface utcOffset {
    _minute:number
    _note: string
}
export function UtcOffset (hour:number) :utcOffset {
    return {
        _minute: hour*60,
        _note: "",
    }
}
// 时区列表 https://zh.wikipedia.org/wiki/%E6%97%B6%E5%8C%BA%E5%88%97%E8%A1%A8
export function parseUTCOffset(data:iParseData, utcOffset: utcOffset) :Time {
    const time = new Time(dayjs())
    if (data.date == "") {
        throw new Error("@og/time parseChina(data) data.date can not be empty string")
    }
    time._core = dayjs(data.date + minteToUTCZone(utcOffset._minute), {
        format: data.layout+"ZZ",
        utc: true,
    })
    // @ts-ignore
    time._core = time._core.utcOffset(utcOffset._minute)
    return time
}
// 时区列表 https://zh.wikipedia.org/wiki/%E6%97%B6%E5%8C%BA%E5%88%97%E8%A1%A8
export function parseUTC(data:iParseData, offsetHour:number): Time {
    return parseUTCOffset(data, UtcOffset(offsetHour))
}
export function parseChina(data:iParseData): Time {
    return parseUTC(data, 8)
}
export function parseJapan(data:iParseData): Time {
    data = Object.assign({}, data)
    return parseUTC(data, 9)
}
export function nowUTC() :Time {
    return new Time(dayjs()).utcOffset(UtcOffset(0))
}
export function nowChina() :Time {
    return new Time(dayjs()).utcOffset(UtcOffset(8))
}
export function nowJapan() :Time {
    return new Time(dayjs()).utcOffset(UtcOffset(9))
}
export const MillisecondLayout = "YYYY-MM-DD HH:mm:ss.SSS"
export const SecondLayout = "YYYY-MM-DD HH:mm:ss"
export const MinuteLayout = "YYYY-MM-DD HH:mm"
export const HourLayout = "YYYY-MM-DD HH"
export const DayLayout = "YYYY-MM-DD"
export const MonthLayout = "YYYY-MM"
export const YearLayout = "YYYY"
export const RFC3339Layout = "YYYY-MM-DDTHH:mm:ssZ"