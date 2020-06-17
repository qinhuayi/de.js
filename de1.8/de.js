/// de.js ver1.8 (2020-05-30 ~)
///   1. Upgrade to es6;
/// author: hoy qin; email: qinhuayi@qq.com, qinhuayi@kezhida.com.cn
const _url2JSON = (url) => {
    const data = {
        url: url,
        params: {},
        hasParam: (name) => data.params[name] !== undefined
    };
    const getOneKey = (expr) => {
        let index = expr.indexOf('='),
            name = index >= 0 ? expr.substr(0, index) : expr,
            value = index >= 0 ? expr.substr(index + 1) : null;
        return { name, value };
    };
    if (typeof (url) === 'string' && url) {
        let n = url.indexOf('?');
        data.filePath = n > 0 ? url.substring(0, n) : url;
        data.query = n > 0 ? url.substr(n + 1) : '';
        let m = Math.max(data.filePath.lastIndexOf('/'), data.filePath.lastIndexOf('\\'));
        data.fileDir = m > 0 ? data.filePath.substr(0, m) : '';
        data.fileName = m > 0 ? data.filePath.substr(m + 1) : data.filePath;
        n = data.fileName.lastIndexOf('.');
        data.fileShortName = n > 0 ? data.fileName.substr(0, n) : data.fileName;
        data.fileExt = n > 0 ? data.fileName.substring(n) : '';
        for (let expr of data.query.split('&')) {
            let key = getOneKey(expr);
            data.params[key.name] = key.value;
        }
    };
    return data;
};

const _merge = (target, ...objs) => {
    for (let obj of objs) Object.defineProperties(target, Object.getOwnPropertyDescriptors(obj));
    return target;
};

const _htmlEncode = (str, mode) => {
    if (typeof str !== "string" || str == '') {
        return '';
    } else if (typeof mode === 'undefined' || mode === 0) {
        return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&apos;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    } else if (mode === 1) {
        return str.replace(/&/g, '&#38;').replace(/"/g, '&#34;').replace(/'/g, '&#39;').replace(/</g, '&#60;').replace(/>/g, '&#62;');
    }
};

const _htmlDecode = (str, mode) => {
    if (typeof str !== "string" || str == '') {
        return '';
    } else if (typeof mode === 'undefined' || mode === 0) {
        return str.replace(/&gt;/g, '>').replace(/&lt;/g, '<').replace(/&apos;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, '&');
    } else if (mode === 1) {
        return str.replace(/&#38;/g, '&').replace(/&#34;/g, '"').replace(/&#39;/g, "'").replace(/&#60;/g, '<').replace(/&#62;/g, '>');
    }
};

const _ajax = (conf) => {
    const noop = () => { },
        default_configure = {
            url: '#',
            method: 'GET',
            data: '',
            async: true,
            timeout: 15000,
            ontimeout: noop,
            headers: [{
                name: 'Content-Type',
                value: 'application/x-www-form-urlencoded'
            }],
            onsuccess: noop,
            onerror: noop
        },
        fillConfigure = (conf, default_configure) => {
            conf = _merge(default_configure, conf);
            for (let header of conf.headers) {
                if (header.name.toLowerCase() == 'content-type') {
                    return conf;
                }
            }
            conf.headers.push(default_configure.headers[0]);
            return conf;
        },
        getXHR = () => {
            const newActiveX = () => {
                const arr = ['Msxml3.XMLHTTP', 'Msxml2.XMLHTTP', 'Microsoft.XMLHTTP'];
                for (let el of arr) {
                    try {
                        return new window.ActiveXObject(el);
                    } catch (err) {
                        continue;
                    }
                }
                return null;
            };
            return window.XMLHttpRequest && (window.location.protocol !== 'file:' || !window.ActiveXObject) ? new window.XMLHttpRequest() : newActiveX();
        },
        xhr = getXHR();
    conf = fillConfigure(conf, default_configure);
    xhr.open(conf.method, conf.url, conf.async);
    for (let header of conf.headers) {
        xhr.setRequestHeader(header.name, header.value);
    }
    try {
        xhr.timeout = conf.timeout;
        xhr.ontimeout = conf.ontimeout;
        xhr.onerror = conf.onerror;
    } catch (ex) {
        // IE6 will raise an exception here.
        console.log(ex.message)
    }
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            conf.onsuccess({
                status: xhr.status,
                response: xhr.response,
                type: xhr.responseType,
                xml: xhr.responseXML,
                text: xhr.responseText,
                body: xhr.responseBody
            });
        }
    }
    xhr.send(conf.data);
};

Date.prototype.toJSON = function () {
    const month = 'January February March April May June July August September October November December'.split(' '),
        week = 'Sunday Monday Tuesday Wednesday Thursday Friday Saturday'.split(' ');
    return {
        Y: this.getFullYear(),
        M: this.getMonth(),
        D: this.getDate(),
        W: this.getDay(),
        h: this.getHours(),
        m: this.getMinutes(),
        s: this.getSeconds(),
        f: this.getMilliseconds(),
        month: month[this.getMonth()],
        week: week[this.getDay()],
        value: this.valueOf()
    };
};
Date.prototype.toString = function (format) {
    const d = this.toJSON(),
        YYYY = d.Y.toString().padStart(4, '0'),
        MM = (d.M + 1).toString().padStart(2, '0'), 
        DD = d.D.toString().padStart(2, '0'),
        am = d.h < 12,
        hh = d.h.toString().padStart(2, '0'),
        mm = d.m.toString().padStart(2, '0'),
        ss = d.s.toString().padStart(2, '0'),
        fff = d.f.toString().padStart(3, '0');
    let str = (typeof (format) === 'undefined' || !format) ? 'yyyy-MM-DD hh:mm:ss fff' : format;
    str = str.replace(/yyyy|YYYY/g, YYYY).replace(/yy|YY/g, YYYY.substr(2));
    str = str.replace(/month|MONTH|Month/g, d.month).replace(/(mon|MON|Mon)\b/g, d.month.substr(0, 3)).replace(/(mo|MO|Mo)\b/g, d.month.substr(0, 2));
    str = str.replace(/MM/g, MM).replace(/\bM\b/g, d.M + 1);
    str = str.replace(/week|WEEK|Week/g, d.week).replace(/(wee|WEE|Wee)\b/g, d.week.substr(0, 3)).replace(/\b(we|WE|We)\b/g, d.week.substr(0, 2)).replace(/\b(w|W)\b/g, d.W);
    str = str.replace(/dd|DD/g, DD).replace(/\b(D|d)\b/g, d.D);
    str = str.replace(/am|AM|pm|PM/g, am ? 'AM' : 'PM');
    str = str.replace(/hh|HH/g, /am|AM|pm|PM/.test(format) ? (d.h >= 12 ? d.h - 12 : d.h).toString().padStart(2, '0') : hh).replace(/\b(h|H)\b/g, /am|AM|pm|PM/.test(format) ? (d.h >= 12 ? d.h - 12 : d.h) : d.h);
    str = str.replace(/mm/g, mm).replace(/min|MIN|Min/g, mm).replace(/mi|MI|Mi/g, mm).replace(/\bm\b/g, d.m);
    str = str.replace(/ss|SS/g, ss).replace(/\b(s|S)\b/g, d.s);
    str = str.replace(/fff|FFF/g, fff).replace(/ff|FF/g, fff.substr(0, 2)).replace(/\b(f|F)\b/g, fff.substr(0, 1));
    return str;
};
Date.prototype.fromString = function (str, format) {
    const RegExpBuilder = {
        initial: () => {
            const _expr = {},
                expr = {
                    YYYY: '[0-9]{4}',
                    YY: '[0-9]{2}',
                    month: '(?:January|February|March|April|May|June|July|August|September|October|November|December)',
                    mon: '\\b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\\b',
                    mo: '\\b(?:Ja|Fe|Ma|Ap|Ma|Ju|Ju|Au|Se|Oc|No|De)\\b',
                    MM: '(?:0[1-9]|1[0-2])',
                    M: '\\b(?:[1-9]|1[0-2])\\b',
                    week: '(?:Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)',
                    wee: '(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun)',
                    we: '(?:Mo|Tu|We|Th|Fr|Sa|Su)',
                    W: '\\b[0-6]\\b',
                    DD: '(?:[0-2][0-9]|3[0-1])',
                    D: '\\b(?:[1-9]|[1-2][0-9]|3[0-1])\\b',
                    AM: '(?:am|AM|pm|PM)',
                    hh: '(?:[0-1][0-9]|2[0-3])',
                    h: '\\b(?:[0-9]|1[0-9]|2[0-3])\\b',
                    mm: '[0-5][0-9]',
                    m: '\\b(?:[0-9]|[1-5][0-9])\\b',
                    ss: '[0-5][0-9]',
                    s: '\\b(?:[0-9]|[1-5][0-9])\\b',
                    fff: '[0-9]{3}',
                    ff: '[0-9]{2}',
                    f: '[0-9]'
                };
            if (RegExpBuilder.expr === undefined) {
                for (let name in expr) {
                    _expr[name] = expr[name];
                    _expr['$' + name] = '(' + expr[name] + ')';
                }
                RegExpBuilder.expr = _expr;
            }
            return true;
        },
        build: (format, part) => {
            const p = part !== undefined ? part.toLowerCase() : '',
                expr = RegExpBuilder.initial() ? RegExpBuilder.expr : null;
            let s = format;
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
            return new RegExp(s, 'g');
        }
    },
        validator = {
            checkformat: format => {
                let pass = /yyyy|YYYY/.test(format) || /yy|YY/.test(format);
                pass = pass && (/month|MONTH|Month/.test(format) || /(mon|MON|Mon)\b/.test(format) || /(mo|MO|Mo)\b/.test(format) || /MM/.test(format) || /\bM\b/.test(format));
                return pass && (/dd|DD/.test(format) || /\b(D|d)\b/.test(format));
            },
            checkInput: (str, format) => RegExpBuilder.build(format).test(str)
        },
        reader = {
            readString: function (format, str, part) {
                const reg = RegExpBuilder.build(format, part),
                    matchs = reg.exec(str);
                return (!!matchs && !!RegExp.$1) ? RegExp.$1 : null;
            },
            readNumber: function (format, str, part) {
                const s = reader.readString(format, str, part);
                return s ? parseInt(s, 10) : null;
            },
            readYear: (format, str) => {
                const y = reader.readNumber(format, str, 'y');
                return y && y <= 99 ? y + 2000 : y;
            },
            readMonth: (format, str) => {
                let m = reader.readNumber(format, str, 'M');
                if (!m) {
                    let month = reader.readString(format, str, 'month');
                    m = 'January February March April May June July August September October November December'.split(' ').indexOf(month);
                    m = m == -1 ? 'Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec'.split(' ').indexOf(month) : m;
                    m = m == -1 ? 'Ja Fe Ma Ap Ma Ju Ju Au Se Oc No De'.split(' ').indexOf(month) : m;
                    return m;
                } else {
                    return m - 1;
                }
            },
            readDay: (format, str) => reader.readNumber(format, str, 'd'),
            readHour: (format, str) => {
                const am = reader.readString(format, str, 'am'),
                    h = reader.readNumber(format, str, 'h');
                return (am === 'PM' && h && h < 12) ? h + 12 : h;
            },
            readMinute: (format, str) => reader.readNumber(format, str, 'm'),
            readSecond: (format, str) => reader.readNumber(format, str, 's'),
            readMillisecond: (format, str) => reader.readNumber(format, str, 'f')
        };
    if (format === undefined) {
        const date = new Date(Date.parse(str));
        this.setTime(date.getTime());
        return date;
    } else if (typeof format == 'string') {
        if (validator.checkformat(format) && validator.checkInput(str, format)) {
            let Y = reader.readYear(format, str),
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
                const date = new Date(Y, M, D, h, m, s, f);
                this.setTime(date.getTime());
                return date;
            }
        }
    };
    this.setTime(0);
    return NaN;
};
Date.prototype.add = function (part, n) {
    const newDate = (p, n) => {
        const d = this.toJSON();
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
    let p = typeof (part) == 'string' ? part.charAt(0) : '',
        date = newDate(p, n);
    return date;
};
Date.prototype.diff = function(part, date) {
    date = typeof date == 'string' ? (new Date()).fromString(date) : date;
    const n = parseInt(date - this),
        p = typeof part == 'string' ? part.charAt(0) : '';
    switch (p.toLowerCase()) {
        case 'f':
            return n;
        case 's':
            return parseInt(n / 1000);
        case 'm':
            return part == 'M' ? ((date.getFullYear() - this.getFullYear()) * 12 + date.getMonth() - this.getMonth()) : parseInt(n / 60000);
        case 'h':
            return parseInt(n / 3600000);
        case 'd':
            return parseInt(n / 86400000);
        case 'w':
            return parseInt(n / (86400000 * 7));
        case 'y':
            return date.getFullYear() - this.getFullYear();
    }
    return null;
};

(function (win, document, undef) {
    'use strict'
    const readyList = [],
        attr = (e, name, value) => {
            if (typeof (name) == 'string') {
                if (value !== undef) {
                    e.setAttribute(name, value);
                } else {
                    let val = e.getAttribute(name);
                    return val || (e[name] === undef ? val : e[name]);
                }
            }
            return e;
        },
        _examor = class {
            constructor(specifies) {
                const createReplacement = () => {
                    const randomChars = prefix => prefix + Math.floor(Math.random() * 100000);
                    return {
                        insideComma: randomChars('@insideComma'),
                        outsideComma: randomChars('@outsideComma'),
                        slash: randomChars('@slash'),
                        backSlash: randomChars('@backSlash'),
                        leftSquareBracket: randomChars('@leftSquareBracket'),
                        rightSquareBracket: randomChars('@rightSquareBracket'),
                        singleQuotes: randomChars('@singleQuotes'),
                        doubleQuotes: randomChars('@doubleQuotes')
                    }
                },
                    rep = createReplacement(),
                    replaceSafeExpression = expr => {
                        let matchs = expr.match(/('[^']+')|("[^"]+")/g);
                        if (matchs) {
                            for (let m of matchs) {
                                let str = m.substr(1, m.length - 2).replace(/\,/g, rep.insideComma).replace(/\\/g, rep.slash).replace(/\//g, rep.backSlash).replace(/\[/g, rep.leftSquareBracket).replace(/\]/g, rep.rightSquareBracket).replace(/'/g, rep.singleQuotes).replace(/"/g, rep.doubleQuotes);
                                expr = expr.replace(m, str);
                            }
                        }
                        matchs = expr.match(/\[([^\]]+)\]/g);
                        if (matchs) {
                            for (let m of matchs) {
                                let str = m.replace(/\,/g, rep.outsideComma);
                                expr = expr.replace(m, str);
                            }
                        }
                        return expr;
                    },
                    restore = saveExpr => {
                        const reg = str => new RegExp(str, 'g');
                        return saveExpr.replace(reg(rep.insideComma), ',').replace(reg(rep.outsideComma), ',').replace(reg(rep.slash), '\\').replace(reg(rep.backSlash), '/').replace(reg(rep.leftSquareBracket), '[').replace(reg(rep.rightSquareBracket), ']').replace(reg(rep.singleQuotes), "'").replace(reg(rep.doubleQuotes), '"');
                    },
                    safeSpecifies = replaceSafeExpression(specifies).split(','),
                    examClass = (e, name) => (' ' + e.className + ' ').indexOf(' ' + name + ' ') >= 0,
                    examAttr = (e, expr) => {
                        let vexpr = '',
                            val = null;
                        const extract = symb => {
                            let index = expr.indexOf(symb);
                            if (index > 0) {
                                val = attr(e, expr.substr(0, index));
                                vexpr = restore(expr.substr(index + symb.length));
                                return true;
                            }
                            return false;
                        };
                        if (extract('*=')) {
                            return val && val.indexOf(vexpr) >= 0;
                        } else if (extract('~=')) {
                            return !val || val.indexOf(vexpr) < 0;
                        } else if (extract('$=')) {
                            return val && val.lastIndexOf(vexpr) == (val.length - vexpr.length);
                        } else if (extract('^=')) {
                            return val && val.indexOf(vexpr) == 0;
                        } else if (extract('!=')) {
                            return val != vexpr;
                        } else if (extract('==')) {
                            return val && val == vexpr;
                        } else if (extract('=')) {
                            return val && val == vexpr;
                        } else if (expr != '') {
                            return !!attr(e, expr);
                        }
                        return false;
                    },
                    examAttrs = (e, exprss) => {
                        exprss = exprss.substr(1, exprss.length - 2);
                        let pass = true,
                            exprs = exprss.indexOf(rep.outsideComma) >= 0 ? exprss.split(rep.outsideComma) : exprss.split(',');
                        for (let expr of exprs) {
                            pass = pass && examAttr(e, expr.trim());
                        }
                        return pass;
                    };
                for (let i = 0; i < safeSpecifies.length; i++) {
                    safeSpecifies[i] = safeSpecifies[i].trim();
                }
                this.examClass = examClass;
                this.examAttrs = examAttrs;
                this.safeSpecifies = safeSpecifies; 
            }
        },
        showHide = (e, show) => {
            const blocks = 'ARTICLE ASIDE BODY CANVAS CENTER DIALOG DIR DIV FIELDSET FOOTER FORM HEADER H1 H2 H3 H4 H5 H6 HR IFRAME LEGEND MARQUEE MENU NAV OBJECT OL OPTGROUP OPTION OUTPUT P PRE SECTION TABLE UL'.split(' '),
                inline = 'A ABBR ADDRESS B BDO BIG BLOCKQUOTE BR BUTTON CITE CODE COMMAND DEL DETAIL DFN EM FIGURE FONT I IMG INPUT INS KBD LABEL M METER PLAINTEXT PROGRESS Q QUOTE S SAMP SELECT SMALL SPAN STRIKE STRONG SUB SUP TEXTAREA TT U VAR'.split(' '),
                inline_block = [],
                nones = 'AREA AUDIO DATAGRID DATALIST DATATEMPLATE EMBED EVENT-SOURCE FRAME FRAMESET HEAD HTML LISTING MAP META NEST NOFRAMES NOSCRIPT PARAM RULE SCRIPT SOURCE STYLE nextID'.split(' '),
                list_items = ['DD', 'DT', 'LI'],
                table = ['TABLE'],
                inline_table = [],
                table_caption = ['CAPTION'],
                table_cell = ['TD', 'TH'],
                table_row = ['TR'],
                table_row_group = ['TBODY'],
                table_column = ['COL'],
                table_column_group = ['COLGROUP'],
                table_header_group = ['THEAD'],
                table_footer_group = ['TFOOT'];
            if (blocks.includes(e.tagName)) {
                return e.css('display', show ? 'block' : 'none');
            } else if (inline.includes(e.tagName)) {
                return e.css('display', show ? 'inline' : 'none');
            } else if (list_items.includes(e.tagName)) {
                return e.css('display', show ? 'list-item' : 'none');
            } else if (table.includes(e.tagName)) {
                return e.css('display', show ? 'table' : 'none');
            } else if (table_caption.includes(e.tagName)) {
                return e.css('display', show ? 'table-caption' : 'none');
            } else if (table_cell.includes(e.tagName)) {
                return e.css('display', show ? 'table-cell' : 'none');
            } else if (table_row.includes(e.tagName)) {
                return e.css('display', show ? 'table-row' : 'none');
            } else if (table_row_group.includes(e.tagName)) {
                return e.css('display', show ? 'table-row-group' : 'none');
            } else if (table_column.includes(e.tagName)) {
                return e.css('display', show ? 'table-column' : 'none');
            } else if (table_column_group.includes(e.tagName)) {
                return e.css('display', show ? 'table-column-group' : 'none');
            } else if (table_header_group.includes(e.tagName)) {
                return e.css('display', show ? 'table-header-group' : 'none');
            } else if (table_footer_group.includes(e.tagName)) {
                return e.css('display', show ? 'table-footer-group' : 'none');
            } else if (nones.includes(e.tagName)) {
                return e;
            };
            return e;
        },
        _deArray = arr => {
            const each = function (arr, name, arg0, arg1) {
                for (let el of arr) {
                    el[name](arg0, arg1);
                }
                return arr;
            };
            let elements = (arr === undef || !arr) ? [] : arr;
                elements.bind = (name, method) => each(elements, 'bind', name, method);
                elements.unbind = (name, method) => each(elements, 'unbind', name, method);
                elements.attr = (name, value) => each(elements, 'attr', name, value);
                elements.removeAttr = name => each(elements, 'removeAttr', name);
                elements.val = value => value === undef ? getValue(elements) : each(elements, 'val', value);
                elements.html = html => each(elements, 'html', html);
                elements.text = str => each(elements, 'text', str);
                elements.css = (name, value) => each(elements, 'css', name, value);
                let throwNotSupport = () => { throw { message: 'Not support!' }; };
                elements.pos = throwNotSupport;
                elements.show = () => each(elements, 'show');
                elements.hide = () => each(elements, 'hide');
                elements.removeClass = name => each(elements, 'removeClass', name);
                elements.addClass = name => each(elements, 'addClass', name);
                elements.append = node => each(elements, 'append', node);
                elements.insert = (node, n) => each(elements, 'insert', node, n);
                elements.parent = throwNotSupport;
                elements.tags = throwNotSupport;
            const getValue = arr => {
                let values = '';
                for (let el of arr) {
                    let checked = attr(el, 'checked');
                    if (el.value !== undef && ((el.checked !== undef && el.checked) || checked == 'true')) {
                        values += (values == '' ? '' : ',') + el.value;
                    }
                }
                return values;
            };
            elements.value = getValue(arr);
            elements.each = fn => {
                for (let el of elements) {
                    typeof fn === 'function' && fn(i, el);
                }
            };
            return elements;
        },        
        _tags = (e, specifies) => {
            const elements = [],
                examor = new _examor(specifies),
                safeSpecifies = examor.safeSpecifies,
                getChildElements = (e, tagName) => {
                    let arr = [];
                    for (let node of e.childNodes) {
                        !!node.tagName && node.tagName.toUpperCase() == tagName.toUpperCase() && arr.push(node);
                    }
                    return arr;
                },
                getLevelElements = (e, lspec) => {
                    let results = [];
                    if (/^(\\?\w+)(\.\w+)?(\[[^\]]+\])?$/ig.test(lspec.trim())) {
                        let deep = RegExp.$1.charAt(0) == '\\',
                            tagName = deep ? RegExp.$1.substring(1) : RegExp.$1,
                            className = !!RegExp.$2 ? RegExp.$2.replace('.', '') : '',
                            express = RegExp.$3,
                            arr = deep ? e.getElementsByTagName(tagName.toUpperCase()) : getChildElements(e, tagName);
                        for (let el of arr) {
                            if ((!className || examor.examClass(el, className)) && (!express || examor.examAttrs(el, express))) {
                                results.push(_de(el, document));
                            }
                        }
                    }
                    return results;
                };
            for (let spec of safeSpecifies) {
                const lspecs = spec.replace(/\\/g, '/').replace(/\/\//g, '/\\').split(/\//g);
                let parentNodes = [e],
                    nodes = [];
                for (let level = 0; level < lspecs.length; level++) {
                    for (let node of parentNodes) {
                        nodes = nodes.concat(getLevelElements(node, (level == 0 ? '\\' : '') + lspecs[level]));
                    }
                    if (level < lspecs.length - 1) {
                        (parentNodes = nodes) && (nodes = []);
                    }
                }
                for (let node of nodes) {
                    !elements.includes(node) && elements.push(node);
                }
            }
            return _deArray(elements);
        },
        _de = (e, doc) => {
            e.bind = (name, method) => {
                if (e.attachEvent) {
                    e.attachEvent('on' + name, method);
                } else if (e.addEventListener) {
                    e.addEventListener(name, method, false);
                } else if (e && e !== undef) {
                    e[name] = method;
                }
                return e;
            };
            e.unbind = (name, method) => {
                if (e.detachEvent) {
                    e.detachEvent('on' + name, method);
                } else if (e.addEventListener) {
                    e.removeEventListener(name, method, false);
                } else {
                    e[name] = null;
                }
                return e;
            };
            e.attr = (name, value) => attr(e, name, value);
            e.removeAttr = name => e.removeAttribute(name) || e;
            e.val = value => value === undef ? e.value : (e.value = value) & 0 || e;
            typeof e.html === 'undefined' && (e.html = html => (html === undef ? e.innerHTML : (e.innerHTML = html) & 0 || e));
            let nodeText = typeof e.getAttribute === 'function' ? e.getAttribute('text') : null;
            !nodeText && nodeText !== '' && typeof e.text === 'undefined' && (e.text = str => {
                if (typeof e.innerText === 'string') {
                    return str === undef ? e.innerText : (e.innerText = str) & 0 || e;
                } else if (typeof e.textContent === 'string') {
                    return str === undef ? e.textContent : (e.textContent = str) & 0 || e;
                }
                return e;
            });
            e.css = (name, value) => {
                if (typeof (name) == 'string' && value !== undef) {
                    e.style[name] = value;
                } else if (typeof (name) == 'string') {
                    return e.style[name];
                }
                return e;
            };
            e.pos = () => {
                let x = 0,
                    y = 0,
                    node = e;
                if (node && typeof node.getBoundingClientRect === 'function') {
                    let rect = node.getBoundingClientRect(),
                        doc = node.ownerDocument,
                        body = doc.body,
                        docElement = doc.documentElement,
                        clientTop = docElement.clientTop || body.clientTop || 0,
                        clientLeft = docElement.clientLeft || body.clientLeft || 0;
                    x = rect.left + (self.pageXOffset || (node && node.scrollLeft) || body.scrollLeft);
                    y = rect.top + (self.pageYOffset || (node && node.scrollTop) || body.scrollTop);
                } else {
                    while (node && (!node.tagName || node.tagName.toUpperCase() !== 'BODY')) {
                        x += node.offsetLeft === undef ? 0 : parseInt(node.offsetLeft, 10);
                        y += node.offsetTop === undef ? 0 : parseInt(node.offsetTop, 10);
                        node = node.offsetParent;
                    }
                }
                return {
                    x: x,
                    y: y
                };
            };
            e.show = () => showHide(e, true);
            e.hide = () => showHide(e, false);
            e.removeClass = name => {
                if (typeof (name) == 'string') {
                    e.className = (' ' + e.className + ' ').replace(' ' + name.trim() + ' ', ' ').trim();
                }
                return e;
            };
            e.addClass = name => {
                if (typeof (name) == 'string') {
                    e.removeClass(e, name);
                    e.className = e.className + ' ' + name.trim();
                }
                return e;
            };
            e.append = a => {
                if (a !== undef && a) {
                    a = typeof a === 'string' ? doc.createTextNode(a) : a;
                    if (a.nodeType == 1 || a.nodeType == 3) {
                        e.appendChild(a);
                    }
                }
                return e;
            };
            e.insert = (a, n) => {
                if (a !== undef && a) {
                    a = typeof a === 'string' ? doc.createTextNode(a) : a;
                    if (a.nodeType == 1 || a.nodeType == 3) {
                        if (n === undef) {
                            e.childNodes && e.childNodes.length > 0 ? e.insertBefore(a, e.childNodes[0]) : e.appendChild(a);
                        } else if (typeof n === 'number') {
                            e.childNodes && e.childNodes.length > 0 ? e.insertBefore(a, e.childNodes[n]) : e.appendChild(a);
                        } else if (typeof n === 'object' && n.nodeType !== undef) {
                            e.insertBefore(a, n);
                        }
                    }
                }
                return e;
            };
            e.parent = specifies => {
                const examor = new _examor(specifies),
                    examOne = (e, spec) => {
                        if (/^(\\?\w+)(\.\w+)?(\[[^\]]+\])?$/ig.test(spec.trim())) {
                            let deep = RegExp.$1.charAt(0) == '\\',
                                tagName = deep ? RegExp.$1.substring(1) : RegExp.$1,
                                className = !!RegExp.$2 ? RegExp.$2.replace('.', '') : '',
                                express = RegExp.$3;
                            if ((!tagName || e.tagName === tagName.toUpperCase()) && (!className || examor.examClass(e, className)) && (!express || examor.examAttrs(e, express))) {
                                return true;
                            }
                        }
                        return null;
                    },
                    exam = (e, specs) => {
                        for (let spec of specs) {
                            if (examOne(e, spec)) {
                                return true;
                            }
                        }
                        return false;
                    };
                let node = e;
                while (!!node && !!node.tagName && !exam(node, examor.safeSpecifies)) {
                    node = node.tagName === 'HTML' ? null : (node.parentNode || node.parentElement);
                }
                return !!node ? _de(node, e.ownerDocument) : null;
            };
            e.tags = specifies => _tags(e, specifies);
            //extentions since 1.6b
            //if (typeof $$.extentions === 'object' && typeof $$.extentions[e.tagName] === 'function') {
            //    $$.extentions[e.tagName](e);
            //}
            e._de = true;
            return e;
        },
        _new = (tag, ...args) => {
            const doc = args[0] === undef ? document : (typeof args[0] === 'object' && args[0].nodeName == '#document' ? args[0] : null);
            const replacor = {
                createReplacement: () => {
                    const randomChars = prefix => prefix + Math.floor(Math.random() * 100000);
                    return {
                        blank: randomChars('_blank'),
                        singleQuotes: randomChars('_singleQuotes'),
                        doubleQuotes: randomChars('_doubleQuotes')
                    }
                },
                replace: (tag, rep) => {
                    const matchs = tag.match(/('[^']+')|("[^"]+")/g);
                    if (matchs) {
                        for (let m of matchs) {
                            let str = m.substr(1, m.length - 2).replace(/ /g, rep.blank).replace(/'/g, rep.singleQuotes).replace(/"/g, rep.doubleQuotes);
                            tag = tag.replace(m, str);
                        }
                    }
                    return tag.replace(/[ ]+/g, ' ');
                },
                restore: (str, rep) => {
                    const reg = str => new RegExp(str, 'g');
                    return str.replace(reg(rep.blank), ' ').replace(reg(rep.singleQuotes), "'").replace(reg(rep.doubleQuotes), '"');
                }
            },
                replacement = replacor.createReplacement();
            if (typeof tag === 'string' && /^<\w+[ ]?.*>$/.test(tag)) {
                const tag0 = tag.substring(1, tag.length - 1),
                    tag1 = replacor.replace(tag0, replacement),
                    attrs = tag1.split(' '),
                    element = doc.createElement(attrs[0]);
                for (let i = 1; i < attrs.length; i++) {
                    const e = attrs[i],
                        index = e.indexOf('='),
                        name = index > 0 ? e.substr(0, index) : e;
                    let value = index > 0 ? e.substr(index + 1) : '';
                    value = index > 0 ? (value != '' ? replacor.restore(value, replacement) : value) : true;
                    /^[a-zA-Z_-]+$/i.test(name) && attr(element, name, value);
                }
                return _de(element, doc);
            }
        };
    document.ready = fn => {
        if (typeof (fn) == 'function') {
            readyList.push(fn);
        }
    };
    document.path = _url2JSON(document.location.href);
    win.onload = () => {
        for (let fn of readyList) {
            fn.call(document);
        }
    };
    win.$e = (eid, ...args) => {
        const doc = args[0] === undef ? document : (typeof args[0] === 'object' && args[0].nodeName == '#document' ? args[0] : null);
        if ('object' == typeof (eid) && eid) {
            return eid.nodeType == 1 || eid.nodeType == 3 || (eid.nodeName == doc.nodeName) ? _de(eid, doc) : null;
        } else if ('string' == typeof (eid)) {
            if (eid.charAt(0) == '*') {
                const arr = doc.getElementsByName(eid.substr(1));
                for (let el of arr) {
                    attr(el, '_de') === true || _de(el, doc);
                };
                return _deArray(arr);
            } else if (/^<\w+.*>$/.test(eid)) {
                return _new(eid, doc);
            } else {
                const e = doc.getElementById(eid);
                return e && e.nodeType == 1 ? (attr(e, '_de') === true ? e : _de(e, doc)) : null;
            }
        }
    };
    win.$tags = (specifies, doc) => typeof doc === 'undefined' || !doc ? $e(document.documentElement).tags(specifies) : $e(doc.documentElement).tags(specifies);
    win.$t = win.$tags;
    win.$$ = {
        //format: String.format,
        htmlEncode: _htmlEncode,
        htmlDecode: _htmlDecode,
        url2Object: _url2JSON,
        ajax: _ajax
    };
})(window, document);