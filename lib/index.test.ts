import * as otime from "./index"
import dayjs from "dayjs"
import {nowLocal, parseChina, RFC3339Layout} from "./index";

test("parseTimestampUTC", function () {
    {
        const t = otime.parseMSTimestampUTC(1586504980258,otime.UtcOffset(0))
        expect(t.format(otime.SecondLayout+ " ZZ")).toBe("2020-04-10 07:49:40 +0000")
    }
    {
        const t = otime.parseMSTimestampUTC(1586504980258,otime.UtcOffset(8))
        expect(t.format(otime.SecondLayout+ " ZZ")).toBe("2020-04-10 15:49:40 +0800")
    }
})
test("parseChina", function () {
    {
        const t = otime.parseChina({
            layout: otime.DateLayout,
            date: "1992-12-19"
        })
        expect(t.format(otime.SecondLayout+ " ZZ")).toBe("1992-12-19 00:00:00 +0800")
        expect(t.format(otime.SecondLayout)).toBe("1992-12-19 00:00:00")
        expect(t.format(otime.RFC3339Layout)).toBe("1992-12-19T00:00:00+08:00")
    }
    {
        const t = otime.parseChina({
            layout: otime.SecondLayout,
            date: "1992-12-19 00:00:00"
        })
        expect(t.format(otime.SecondLayout+ " ZZ")).toBe("1992-12-19 00:00:00 +0800")
        expect(t.format(otime.SecondLayout)).toBe("1992-12-19 00:00:00")
        expect(t.format(otime.RFC3339Layout)).toBe("1992-12-19T00:00:00+08:00")
    }
    {
        const t = otime.parseChina({
            layout: otime.SecondLayout,
            date: "1992-12-19 11:22:33"
        })
        expect(t.format(otime.SecondLayout+ " ZZ")).toBe("1992-12-19 11:22:33 +0800")
        expect(t.format(otime.SecondLayout)).toBe("1992-12-19 11:22:33")
        expect(t.format(otime.RFC3339Layout)).toBe("1992-12-19T11:22:33+08:00")
    }
    {
        const t = otime.parseMSTimestampChina(1586504980258)
        expect(t.format(otime.SecondLayout+ " ZZ")).toBe("2020-04-10 15:49:40 +0800")
    }
})
test("parseJapan", function () {
    {
        const t = otime.parseJapan({
            layout: otime.SecondLayout,
            date: "1992-12-19 00:00:00"
        })
        expect(t.format(otime.SecondLayout+ " ZZ")).toBe("1992-12-19 00:00:00 +0900")
        expect(t.format(otime.SecondLayout)).toBe("1992-12-19 00:00:00")
        expect(t.format(otime.RFC3339Layout)).toBe("1992-12-19T00:00:00+09:00")
    }
    {
        const t = otime.parseJapan({
            layout: otime.SecondLayout,
            date: "1992-12-19 11:22:33"
        })
        expect(t.format(otime.SecondLayout+ " ZZ")).toBe("1992-12-19 11:22:33 +0900")
        expect(t.format(otime.SecondLayout)).toBe("1992-12-19 11:22:33")
        expect(t.format(otime.RFC3339Layout)).toBe("1992-12-19T11:22:33+09:00")
    }
    {
        const t = otime.parseMSTimestampJapan(1586504980258)
        expect(t.format(otime.SecondLayout+ " ZZ")).toBe("2020-04-10 16:49:40 +0900")
    }
})

test("toChina", function () {
    {
        const t = otime.parseJapan({
            layout: otime.SecondLayout,
            date: "1992-12-19 00:00:00"
        })
        expect(t.format(otime.SecondLayout+ " ZZ")).toBe("1992-12-19 00:00:00 +0900")
        expect(t.format(otime.SecondLayout)).toBe("1992-12-19 00:00:00")
        expect(t.format(otime.RFC3339Layout)).toBe("1992-12-19T00:00:00+09:00")
        const chinaTime = t.toChina()
        expect(chinaTime.format(otime.SecondLayout+ " ZZ")).toBe("1992-12-18 23:00:00 +0800")
        expect(chinaTime.format(otime.SecondLayout)).toBe("1992-12-18 23:00:00")
        expect(chinaTime.format(otime.RFC3339Layout)).toBe("1992-12-18T23:00:00+08:00")
    }
})
test("toJapan", function () {
    {
        const t = otime.parseChina({
            layout: otime.SecondLayout,
            date: "1992-12-19 00:00:00"
        })
        expect(t.format(otime.SecondLayout+ " ZZ")).toBe("1992-12-19 00:00:00 +0800")
        expect(t.format(otime.SecondLayout)).toBe("1992-12-19 00:00:00")
        expect(t.format(otime.RFC3339Layout)).toBe("1992-12-19T00:00:00+08:00")
        const japanTime = t.toJapan()
        expect(japanTime.format(otime.SecondLayout+ " ZZ")).toBe("1992-12-19 01:00:00 +0900")
        expect(japanTime.format(otime.SecondLayout)).toBe("1992-12-19 01:00:00")
        expect(japanTime.format(otime.RFC3339Layout)).toBe("1992-12-19T01:00:00+09:00")
    }
})


test("nowChina", function () {
    let now = dayjs()
    // @ts-ignore
    now = now.utcOffset(8*60)
    const dateString = [now.format("YYYY-MM-DDTHH:mm:ss"),'+08:00'].join("")
    expect(otime.nowChina().format(otime.RFC3339Layout)).toBe(dateString)
})
test("nowJapan", function () {
    let now = dayjs()
    // @ts-ignore
    now = now.utcOffset(9*60)
    const dateString = [now.format("YYYY-MM-DDTHH:mm:ss"),'+09:00'].join("")
    expect(otime.nowJapan().format(otime.RFC3339Layout)).toBe(dateString)
})

test("RFC3339", function () {
    const t = otime.parseChina({
        layout: otime.SecondLayout,
        date: "1992-12-19 00:00:00"
    })
    expect(t.format(otime.RFC3339Layout)).toBe("1992-12-19T00:00:00+08:00")
    expect(t.toJapan().format(otime.RFC3339Layout)).toBe("1992-12-19T01:00:00+09:00")
})

test("add", function () {
    const t = otime.parseChina({
        layout: otime.SecondLayout,
        date: "1992-12-19 00:00:00"
    })
    expect(t.format(otime.RFC3339Layout)).toBe("1992-12-19T00:00:00+08:00")

    expect(t.add(otime.Second).format(otime.RFC3339Layout)).toBe("1992-12-19T00:00:01+08:00")
})
test("addDate", function () {
    const t = otime.parseChina({
        layout: otime.SecondLayout,
        date: "1992-12-19 00:00:00"
    })
    const nextDay = t.addDate(0,0,1)
    expect(nextDay.format(otime.RFC3339Layout)).toBe("1992-12-20T00:00:00+08:00")
    const nextMonth2Day = t.addDate(0,1,2)
    expect(nextMonth2Day.format(otime.RFC3339Layout)).toBe("1993-01-21T00:00:00+08:00")
    const nextYear2Month3Day = t.addDate(1,2,3)
    expect(nextYear2Month3Day.format(otime.RFC3339Layout)).toBe("1994-02-22T00:00:00+08:00")
})
test("msTimestamp", function () {
    const t = otime.parseMSTimestampChina(1586504980258)
    expect(t.format(otime.RFC3339Layout)).toBe("2020-04-10T15:49:40+08:00")
    expect(t.msTimestamp()).toBe(1586504980258)
    expect(t.add(otime.Second).msTimestamp()).toBe(1586504981258)
})


test("nowLocal", function () {
    // 当前时区需要是中国时区
    let now = dayjs()
    expect(nowLocal().format(otime.RFC3339Layout)).toBe(now.format("YYYY-MM-DDTHH:mm:ss") + "+08:00")
})
test("parseMSTimestampLocal", function () {
    const t = otime.parseMSTimestampLocal(1586504980258)
    // 当前时区需要是中国时区
    expect(t.format(otime.RFC3339Layout)).toBe("2020-04-10T15:49:40+08:00")
})
test("parseLocal", function () {
    // 当前时区需要是中国时区
    const t = otime.parseLocal({
        layout: otime.DateLayout,
        date: "1992-12-19"
    })
    expect(t.format(otime.SecondLayout+ " ZZ")).toBe("1992-12-18 16:00:00 +0000")
    expect(t.format(otime.SecondLayout)).toBe("1992-12-19 00:00:00")
    expect(t.format(otime.RFC3339Layout)).toBe("1992-12-19T00:00:00+08:00")
})
test("valid", function () {
    let error:Error = new Error()
    try {
        parseChina({
            layout: otime.RFC3339Layout,
            date: "error date",
        })
    } catch(err) {
        error = err
    }
    expect(error.message).toBe("og/time: new Time() error Invalid Date")
})