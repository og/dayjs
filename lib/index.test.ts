import * as otime from "./index"
import dayjs from "dayjs"

test("parseChina", function () {
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