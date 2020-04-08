import * as otime from "./index"

test("parseChina", function () {
    {
        const t = otime.parseChina({
            layout: otime.second,
            date: "1992-12-19 00:00:00"
        })
        expect(t.format(otime.second+ " ZZ")).toBe("1992-12-19 00:00:00 +0800")
        expect(t.format(otime.second)).toBe("1992-12-19 00:00:00")
        expect(t.format(otime.RFC3339)).toBe("1992-12-19T00:00:00+08:00")
    }
    {
        const t = otime.parseChina({
            layout: otime.second,
            date: "1992-12-19 11:22:33"
        })
        expect(t.format(otime.second+ " ZZ")).toBe("1992-12-19 11:22:33 +0800")
        expect(t.format(otime.second)).toBe("1992-12-19 11:22:33")
        expect(t.format(otime.RFC3339)).toBe("1992-12-19T11:22:33+08:00")
    }

})