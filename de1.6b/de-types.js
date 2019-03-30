/// 由de1.6b 拆分出来的独立文件
/// var 1.6b (2018-07-14)
/// 1 增加 Array.forEach
/// 2 增加 Array.remove
String.prototype.trim = function () {
    return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
}
String.prototype.format = function () {
    var formatMe = this.indexOf('{0}') >= 0;
    if (arguments.length > 0) {
        var format = formatMe ? this : arguments[0];
        for (var i = 0; i < arguments.length - (formatMe ? 0 : 1); i++) {
            format = format.replace(new RegExp("\\{" + i + "\\}", "g"), arguments[i + (formatMe ? 0 : 1)]);
        }
        return format;
    }
    return null;
}
Array.prototype.each = function (fn) {
    if (typeof (fn) == "function") {
        for (var i = 0; i < this.length; i++) {
            fn.call(this[i], i, this[i]);
        }
    }
}
Array.prototype.forEach = function (fn) {
    if (typeof (fn) == "function") {
        for (var i = 0; i < this.length; i++) {
            fn(this[i], i);
        }
    }
}
Array.prototype.exists = function (e) {
    for (var i = 0; i < this.length; i++) {
        if (e === this[i]) {
            return true;
        }
    }
    return false;
}
Array.prototype.indexOf = function (e) {
    for (var i = 0; i < this.length; i++) {
        if (e === this[i]) {
            return i;
        }
    }
    return -1;
}
Array.prototype.remove = function (i) {
    return this.splice(i, 1) | 1;
}
Date.prototype.toObject = function () {
    var me = this,
        month = "January February March April May June July August September October November December".split(' '),
        week = "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(' ');
    return {
        Y: me.getFullYear(),
        M: me.getMonth(),
        D: me.getDate(),
        W: me.getDay(),
        h: me.getHours(),
        m: me.getMinutes(),
        s: me.getSeconds(),
        f: me.getMilliseconds(),
        month: month[me.getMonth()],
        week: week[me.getDay()],
        value: me.valueOf()
    };
}
Date.prototype.toString = function (format) {
    var me = this,
        num2str = function (num, len) {
            var str = num.toString();
            while (str.length < len) {
                str = '0' + str;
            }
            return str;
        },
        d = me.toObject(),
        YYYY = num2str(d.Y, 4),
        MM = num2str(d.M + 1, 2),
        DD = num2str(d.D, 2),
        am = d.h < 12,
        hh = num2str(d.h, 2),
        mm = num2str(d.m, 2),
        ss = num2str(d.s, 2),
        fff = num2str(d.f, 3);
    var str = (typeof (format) === undefined || !format) ? "yyyy-MM-DD hh:mm:ss fff" : format;
    str = str.replace(/yyyy|YYYY/g, YYYY).replace(/yy|YY/g, YYYY.substr(2));
    str = str.replace(/month|MONTH|Month/g, d.month).replace(/(mon|MON|Mon)\b/g, d.month.substr(0, 3)).replace(/(mo|MO|Mo)\b/g, d.month.substr(0, 2));
    str = str.replace(/MM/g, MM).replace(/\bM\b/g, d.M + 1);
    str = str.replace(/week|WEEK|Week/g, d.week).replace(/(wee|WEE|Wee)\b/g, d.week.substr(0, 3)).replace(/\b(we|WE|We)\b/g, d.week.substr(0, 2)).replace(/\b(w|W)\b/g, d.W);
    str = str.replace(/dd|DD/g, DD).replace(/\b(D|d)\b/g, d.D);
    str = str.replace(/am|AM|pm|PM/g, am ? 'AM' : 'PM');
    str = str.replace(/hh|HH/g, /am|AM|pm|PM/.test(format) ? num2str((d.h >= 12 ? d.h - 12 : d.h), 2) : hh).replace(/\b(h|H)\b/g, /am|AM|pm|PM/.test(format) ? (d.h >= 12 ? d.h - 12 : d.h) : d.h);
    str = str.replace(/mm/g, mm).replace(/min|MIN|Min/g, mm).replace(/mi|MI|Mi/g, mm).replace(/\bm\b/g, d.m);
    str = str.replace(/ss|SS/g, ss).replace(/\b(s|S)\b/g, d.s);
    str = str.replace(/fff|FFF/g, fff).replace(/ff|FF/g, fff.substr(0, 2)).replace(/\b(f|F)\b/g, fff.substr(0, 1));
    return str;
}
Date.prototype.fromString = function (str, format) {
    var me = this,
        RegExpBuilder = {
            initial: function () {
                var _expr = {},
                    expr = {
                        YYYY: "[0-9]{4}",
                        YY: "[0-9]{2}",
                        month: "(?:January|February|March|April|May|June|July|August|September|October|November|December)",
                        mon: "\\b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\\b",
                        mo: "\\b(?:Ja|Fe|Ma|Ap|Ma|Ju|Ju|Au|Se|Oc|No|De)\\b",
                        MM: "(?:0[1-9]|1[0-2])",
                        M: "\\b(?:[1-9]|1[0-2])\\b",
                        week: "(?:Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)",
                        wee: "(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun)",
                        we: "(?:Mo|Tu|We|Th|Fr|Sa|Su)",
                        W: "\\b[0-6]\\b",
                        DD: "(?:[0-2][0-9]|3[0-1])",
                        D: "\\b(?:[1-9]|[1-2][0-9]|3[0-1])\\b",
                        AM: "(?:am|AM|pm|PM)",
                        hh: "[0-2][0-9]",
                        h: "\\b(?:[0-9]|1[0-9]|2[0-9])\\b",
                        mm: "[0-5][0-9]",
                        m: "\\b(?:[0-9]|[1-5][0-9])\\b",
                        ss: "[0-5][0-9]",
                        s: "\\b(?:[0-9]|[1-5][0-9])\\b",
                        fff: "[0-9]{3}",
                        ff: "[0-9]{2}",
                        f: "[0-9]"
                    };
                if (RegExpBuilder.expr === undefined) {
                    for (var name in expr) {
                        _expr[name] = expr[name];
                        _expr['$' + name] = '(' + expr[name] + ')';
                    }
                    RegExpBuilder.expr = _expr;
                }
                return true;
            },
            build: function (format, part) {
                var p = part !== undefined ? part.toLowerCase() : '',
                    expr = RegExpBuilder.initial() ? RegExpBuilder.expr : null,
                    s = format;
                s = p == 'y' ? s.replace(/yyyy|YYYY/g, expr.$YYYY).replace(/yy|YY/g, expr.$YY) : s.replace(/yyyy|YYYY/g, expr.YYYY).replace(/yy|YY/g, expr.YY);
                s = p == 'month' ? s.replace(/month|MONTH|Month/g, expr.$month).replace(/(mon|MON|Mon)\b/g, expr.$mon).replace(/(mo|MO|Mo)\b/g, expr.$mo) : s.replace(/month|MONTH|Month/g, expr.month).replace(/(mon|MON|Mon)\b/g, expr.mon).replace(/(mo|MO|Mo)\b/g, expr.mo);
                s = part == 'M' ? s.replace(/MM/g, expr.$MM).replace(/\bM\b/g, expr.$M) : s.replace(/MM/g, expr.MM).replace(/\bM\b/g, expr.M);
                s = s.replace(/week|WEEK|Week/g, expr.week).replace(/(wee|WEE|Wee)\b/g, expr.wee).replace(/\b(we|WE|We)\b/g, expr.we).replace(/\b(w|W)\b/g, expr.W);
                s = p == 'd' ? s.replace(/dd|DD/g, expr.$DD).replace(/\b(D|d)\b/g, expr.$D) : s.replace(/dd|DD/g, expr.DD).replace(/\b(D|d)\b/g, expr.D);
                s = p == 'am' ? s.replace(/am|AM|pm|PM/g, expr.$AM) : s.replace(/am|AM|pm|PM/g, expr.AM);
                s = p == 'h' ? s.replace(/hh|HH/g, expr.$hh).replace(/\b(h|H)\b/g, expr.$h) : s.replace(/hh|HH/g, expr.hh).replace(/\b(h|H)\b/g, expr.h);
                s = part == 'm' ? s.replace(/min|MIN|Min|mi|MI|Mi|mm/g, expr.$mm).replace(/\bm\b/g, expr.$m) : s.replace(/min|MIN|Min|mi|MI|Mi|mm/g, expr.mm).replace(/\bm\b/g, expr.m);
                s = p == 's' ? s.replace(/ss|SS/g, expr.$ss).replace(/\b(s|S)\b/g, expr.$s) : s.replace(/ss|SS/g, expr.ss).replace(/\b(s|S)\b/g, expr.s);
                s = p == 'f' ? s.replace(/fff|FFF/g, expr.$fff).replace(/ff|FF/g, expr.$ff).replace(/\b(f|F)\b/g, expr.$f) : s.replace(/fff|FFF/g, expr.fff).replace(/ff|FF/g, expr.$ff).replace(/\b(f|F)\b/g, expr.f);
                return new RegExp(s, "g");
            }
        },
        validator = {
            checkformat: function (format) {
                var pass = /yyyy|YYYY/.test(format) || /yy|YY/.test(format);
                pass = pass && (/month|MONTH|Month/.test(format) || /(mon|MON|Mon)\b/.test(format) || /(mo|MO|Mo)\b/.test(format) || /MM/.test(format) || /\bM\b/.test(format));
                return pass && (/dd|DD/.test(format) || /\b(D|d)\b/.test(format));
            },
            checkInput: function (str, format) {
                var reg = RegExpBuilder.build(format);
                return reg.test(str);
            }
        },
        reader = {
            readString: function (format, str, part) {
                var reg = RegExpBuilder.build(format, part),
                    matchs = reg.exec(str);
                return (!!matchs && !!RegExp.$1) ? RegExp.$1 : null;
            },
            readNumber: function (format, str, part) {
                var s = reader.readString(format, str, part);
                return s ? parseInt(s) : null;
            },
            readYear: function (format, str) {
                var y = reader.readNumber(format, str, 'y');
                return y && y <= 99 ? y + 2000 : y;
            },
            readMonth: function (format, str) {
                var m = reader.readNumber(format, str, 'M');
                if (!m) {
                    var month = reader.readString(format, str, 'month');
                    m = "January February March April May June July August September October November December".split(' ').indexOf(month);
                    m = m == -1 ? "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(' ').indexOf(month) : m;
                    m = m == -1 ? "Ja Fe Ma Ap Ma Ju Ju Au Se Oc No De".split(' ').indexOf(month) : m;
                    return m;
                } else {
                    return m - 1;
                }
            },
            readDay: function (format, str) {
                return reader.readNumber(format, str, 'd');
            },
            readHour: function (format, str) {
                var am = reader.readString(format, str, 'am'),
                    h = reader.readNumber(format, str, 'h');
                return (am === 'PM' && h && h < 12) ? h + 12 : h;
            },
            readMinute: function (format, str) {
                return reader.readNumber(format, str, 'm');
            },
            readSecond: function (format, str) {
                return reader.readNumber(format, str, 's');
            },
            readMillisecond: function (format, str) {
                return reader.readNumber(format, str, 'f');
            }
        };
    if (format === undefined) {
        var date = new Date(Date.parse(str));
        me.setTime(date.getTime());
        return date;
    } else if (typeof format == "string") {
        if (validator.checkformat(format) && validator.checkInput(str, format)) {
            var Y = reader.readYear(format, str),
                M = reader.readMonth(format, str),
                D = reader.readDay(format, str),
                h = reader.readHour(format, str),
                m = reader.readMinute(format, str),
                s = reader.readSecond(format, str),
                f = reader.readMillisecond(format, str);
            if (Y && (M === 0 || !!M) && D) {
                h = h ? h : 0;
                m = m ? m : 0;
                s = s ? s : 0;
                f = f ? f : 0;
                var date = new Date(Y, M, D, h, m, s, f);
                me.setTime(date.getTime());
                return date;
            }
        }
    };
    me.setTime(0);
    return NaN;
}
Date.prototype.add = function (part, n) {
    var me = this,
        newDate = function (p, n) {
            var d = me.toObject();
            switch (p.toLowerCase()) {
                case 'f':
                    return new Date(d.value + n);
                case 's':
                    return new Date(d.value + (1000 * n));
                case 'm':
                    return p == 'M' ? new Date(d.Y, d.M + n, d.D, d.h, d.m, d.s, d.f) : new Date(d.value + (60 * 1000 * n));
                case 'h':
                    return new Date(d.value + (60 * 60 * 1000 * n));
                case 'd':
                    return new Date(d.value + (24 * 60 * 60 * 1000 * n));
                case 'w':
                    return new Date(d.value + (7 * 24 * 60 * 60 * 1000 * n));
                case 'y':
                    return new Date(d.Y + n, d.M, d.D, d.h, d.m, d.s, d.f);
            }
            return null;
        };
    var p = typeof (part) == "string" ? part.charAt(0) : '',
        date = newDate(p, n);
    return date;
}
Date.prototype.diff = function (part, date) {
    var me = this,
        date = typeof date == 'string' ? (new Date()).fromString(date) : date,
        n = parseInt(date - me),
        p = typeof part == "string" ? part.charAt(0) : '';
    switch (p.toLowerCase()) {
        case 'f':
            return n;
        case 's':
            return parseInt(n / 1000);
        case 'm':
            return part == 'M' ? ((date.getFullYear() - me.getFullYear()) * 12 + date.getMonth() - me.getMonth()) : parseInt(n / 60000);
        case 'h':
            return parseInt(n / 3600000);
        case 'd':
            return parseInt(n / 86400000);
        case 'w':
            return parseInt(n / (86400000 * 7));
        case 'y':
            return date.getFullYear() - me.getFullYear();
    }
    return null;
}