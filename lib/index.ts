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
        if (!dayValue.isValid()) {
            throw new Error("og/time: new Time() error " + dayValue.toString())
        }
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
            .add(days, "day")
        return time
    }
    msTimestamp():number {
        return this._core.valueOf()
    }
    format(layout:string) :string {
        return this._core.format(layout)
    }
    clone():Time {
        const day = this._core.clone()
        return new Time(day)
    }
    utcOffset(offset:iUtcOffset):Time {
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
    ms() :number {
        return this._core.millisecond()
    }
    second():number {
        return this._core.second()
    }
    minute():number {
        return this._core.minute()
    }
    hour():number {
        return this._core.hour()
    }
    dayOfMonth():number {
        return this._core.date()
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
interface iUtcOffset {
    _minute:number
    don_not_write_the_interface_yourself_please_use_otime_function_UtcOffset: string
}
export function UtcOffset (hour:number) :iUtcOffset {
    return {
        _minute: hour*60,
        don_not_write_the_interface_yourself_please_use_otime_function_UtcOffset: "",
    }
}
function utcOffsetMinute(minute:number) :iUtcOffset {
    return {
        _minute: minute,
        don_not_write_the_interface_yourself_please_use_otime_function_UtcOffset: "",
    }
}
// 时区列表 https://zh.wikipedia.org/wiki/%E6%97%B6%E5%8C%BA%E5%88%97%E8%A1%A8
export function parseUTCOffset(data:iParseData, utcOffset: iUtcOffset) :Time {
    if (data.date == "") {
        throw new Error("@og/time parseChina(data) data.date can not be empty string")
    }
    const dayValue = dayjs(data.date + minteToUTCZone(utcOffset._minute), {
        format: data.layout+"ZZ",
        utc: true,
    })
    const time = new Time(dayValue)
    time.utcOffset(utcOffset)
    return time
}
// 时区列表 https://zh.wikipedia.org/wiki/%E6%97%B6%E5%8C%BA%E5%88%97%E8%A1%A8
export function parseUTC(data:iParseData, utcOffset:iUtcOffset): Time {
    return parseUTCOffset(data, utcOffset)
}
export function parseLocal(data:iParseData):Time {
    return parseUTC(data, localUtcOffset())
}
export function parseChina(data:iParseData): Time {
    return parseUTC(data, UtcOffset(8))
}
export function parseJapan(data:iParseData): Time {
    data = Object.assign({}, data)
    return parseUTC(data, UtcOffset(9))
}
export function parseMSTimestampUTC(msTimestamp:number, utcOffset:iUtcOffset) {
    return new Time(dayjs(msTimestamp)).utcOffset(utcOffset)
}
export function parseMSTimestampLocal(msTimestamp:number) {
    return parseMSTimestampUTC(msTimestamp, localUtcOffset())
}
export function parseMSTimestampChina(timestamp:number) {
    return parseMSTimestampUTC(timestamp, UtcOffset(8))
}
export function parseMSTimestampJapan(timestamp:number) {
    return parseMSTimestampUTC(timestamp, UtcOffset(9))
}
export function nowUTC(utcOffset:iUtcOffset) :Time {
    return new Time(dayjs()).utcOffset(utcOffset)
}
export function localUtcOffset() :iUtcOffset {
    return utcOffsetMinute(dayjs().utcOffset())
}
export function nowLocal() {
    return new Time(dayjs()).utcOffset(localUtcOffset())
}
export function nowChina() :Time {
    return nowUTC(UtcOffset(8))
}
export function nowJapan() :Time {
    return nowUTC(UtcOffset(9))
}
export const MillisecondLayout = "YYYY-MM-DD HH:mm:ss.SSS"
export const SecondLayout = "YYYY-MM-DD HH:mm:ss"
export const MinuteLayout = "YYYY-MM-DD HH:mm"
export const HourLayout = "YYYY-MM-DD HH"
export const DateLayout = "YYYY-MM-DD"
export const MonthLayout = "YYYY-MM"
export const YearLayout = "YYYY"
export const RFC3339Layout = "YYYY-MM-DDTHH:mm:ssZ"