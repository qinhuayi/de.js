/// de.js(es5) ver 1.9.2
/// Author: Qin Huayi; Email: qinhuayi@qq.com; Website: http://www.de-js.net; Source: https://github.com/qinhuayi/de.js
String.prototype.trim = function () {
    return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
};
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
};
String.prototype.includes = function (str) {
    return this.indexOf(str) >= 0;
};
Array.prototype.each = function (fn) {
    if (typeof (fn) == "function") {
        for (var i = 0; i < this.length; i++) {
            fn.call(this[i], i, this[i]);
        }
    }
};
//Array.prototype.forEach = function (fn) {
//    if (typeof (fn) == "function") {
//        for (var i = 0; i < this.length; i++) {
//            fn(this[i], i);
//        }
//    }
//};
Array.prototype.includes = function (e) {
    for (var i = 0; i < this.length; i++) {
        if (e === this[i]) {
            return true;
        }
    }
    return false;
};
Array.prototype.indexOf = function (e) {
    for (var i = 0; i < this.length; i++) {
        if (e === this[i]) {
            return i;
        }
    }
    return -1;
};
Array.prototype.remove = function (i) {
    return this.splice(i, 1) | 1;
};
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
};
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
};
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
                        hh: "(?:[0-1][0-9]|2[0-3])",
                        h: "\\b(?:[0-9]|1[0-9]|2[0-3])\\b",
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
                return s ? parseInt(s, 10) : null;
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
};
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
};
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
};

(function (win, document, undefined) {
    "use strict"
    var readyList = [],
        trim = function (str) {
            return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
        },
        attr = function (e, name, value) {
            if (typeof (name) == "string") {
                if (value !== undefined) {
                    e.setAttribute(name, value);
                } else {
                    var val = e.getAttribute(name);
                    return val || (e[name] === undefined ? val : e[name]);
                }
            }
            return e;
        },
        showHide = function (e, show) {
            var blocks = "ARTICLE ASIDE BODY CANVAS CENTER DIALOG DIR DIV FIELDSET FOOTER FORM HEADER H1 H2 H3 H4 H5 H6 HR IFRAME LEGEND MARQUEE MENU NAV OBJECT OL OPTGROUP OPTION OUTPUT P PRE SECTION TABLE UL".split(' '),
                inline = "A ABBR ADDRESS B BDO BIG BLOCKQUOTE BR BUTTON CITE CODE COMMAND DEL DETAIL DFN EM FIGURE FONT I IMG INPUT INS KBD LABEL M METER PLAINTEXT PROGRESS Q QUOTE S SAMP SELECT SMALL SPAN STRIKE STRONG SUB SUP TEXTAREA TT U VAR".split(' '),
                inline_block = [],
                nones = "AREA AUDIO DATAGRID DATALIST DATATEMPLATE EMBED EVENT-SOURCE FRAME FRAMESET HEAD HTML LISTING MAP META NEST NOFRAMES NOSCRIPT PARAM RULE SCRIPT SOURCE STYLE nextID".split(' '),
                list_items = ["DD", "DT", "LI"],
                table = ["TABLE"],
                inline_table = [],
                table_caption = ['CAPTION'],
                table_cell = ['TD', 'TH'],
                table_row = ['TR'],
                table_row_group = ['TBODY'],
                table_column = ["COL"],
                table_column_group = ["COLGROUP"],
                table_header_group = ['THEAD'],
                table_footer_group = ['TFOOT'];
            if (blocks.includes(e.tagName)) {
                return e.css('display', show ? "block" : "none");
            } else if (inline.includes(e.tagName)) {
                return e.css('display', show ? "inline" : "none");
            } else if (list_items.includes(e.tagName)) {
                return e.css('display', show ? "list-item" : "none");
            } else if (table.includes(e.tagName)) {
                return e.css('display', show ? "table" : "none");
            } else if (table_caption.includes(e.tagName)) {
                return e.css('display', show ? "table-caption" : "none");
            } else if (table_cell.includes(e.tagName)) {
                return e.css('display', show ? "table-cell" : "none");
            } else if (table_row.includes(e.tagName)) {
                return e.css('display', show ? "table-row" : "none");
            } else if (table_row_group.includes(e.tagName)) {
                return e.css('display', show ? "table-row-group" : "none");
            } else if (table_column.includes(e.tagName)) {
                return e.css('display', show ? "table-column" : "none");
            } else if (table_column_group.includes(e.tagName)) {
                return e.css('display', show ? "table-column-group" : "none");
            } else if (table_header_group.includes(e.tagName)) {
                return e.css('display', show ? "table-header-group" : "none");
            } else if (table_footer_group.includes(e.tagName)) {
                return e.css('display', show ? "table-footer-group" : "none");
            } else if (nones.includes(e.tagName)) {
                return e;
            };
            return e;
        },
        _deArray = function (arr) {
            var each = function (arr, name, arg0, arg1) {
                for (var i = 0; i < arr.length; i++) {
                    arr[i][name](arg0, arg1);
                }
                return arr;
            },
                elements = (arr === undefined || !arr) ? [] : arr;
            elements.bind = function (name, method) {
                return each(elements, 'bind', name, method);
            };
            elements.unbind = function (name, method) {
                return each(elements, 'unbind', name, method);
            };
            elements.attr = function (name, value) {
                return each(elements, 'attr', name, value);
            };
            elements.removeAttr = function (name) {
                return each(elements, 'removeAttr', name);
            };
            elements.val = function (value) {
                //return each(elements, 'val', value);
                return value === undefined ? getValue(elements) : each(elements, 'val', value);
            };
            elements.html = function (html) {
                return each(elements, 'html', html);
            };
            elements.text = function (str) {
                return each(elements, 'text', str);
            };
            elements.css = function (name, value) {
                return each(elements, 'css', name, value);
            };
            elements.pos = function () {
                throw { message: 'Not support!' };
            };
            elements.show = function () {
                return each(elements, 'show');
            };
            elements.hide = function () {
                return each(elements, 'hide');
            };
            elements.removeClass = function (name) {
                return each(elements, 'removeClass', name);
            };
            elements.addClass = function (name) {
                return each(elements, 'addClass', name);
            };
            elements.append = function (node) {
                return each(elements, 'append', node);
            };
            elements.insert = function (node, n) {
                return each(elements, 'insert', node, n);
            };
            elements.parent = function (specifies) {
                throw { message: 'Not support!' };
            };
            elements.tags = function (specifies) {
                throw { message: 'Not support!' };
            };
            var getValue = function (arr) {
                var values = '';
                for (var i = 0; i < arr.length; i++) {
                    var checked = attr(arr[i], 'checked');
                    if (arr[i].value !== undefined && ((arr[i].checked !== undefined && arr[i].checked) || checked == 'true')) {
                        values += (values == '' ? '' : ',') + arr[i].value;
                    }
                }
                return values;
            };
            elements.value = getValue(arr);
            elements.each = function (fn) {
                for (var i = 0; i < elements.length; i++) {
                    typeof fn === 'function' && fn(i, elements[i]);
                }
            };
            return elements;
        },
        _examor = function (specifies) {
            var createReplacement = function () {
                var randomChars = function (prefix) {
                    return prefix + Math.floor(Math.random() * 100000);
                };
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
                replaceSafeExpression = function (expr) {
                    var matchs = expr.match(/('[^']+')|("[^"]+")/g);
                    if (matchs) {
                        for (var i = 0; i < matchs.length; i++) {
                            var m = matchs[i],
                                str = m.substr(1, m.length - 2).replace(/\,/g, rep.insideComma).replace(/\\/g, rep.slash).replace(/\//g, rep.backSlash).replace(/\[/g, rep.leftSquareBracket).replace(/\]/g, rep.rightSquareBracket).replace(/'/g, rep.singleQuotes).replace(/"/g, rep.doubleQuotes);
                            expr = expr.replace(m, str);
                        }
                    }
                    matchs = expr.match(/\[([^\]]+)\]/g);
                    if (matchs) {
                        for (var i = 0; i < matchs.length; i++) {
                            var m = matchs[i],
                                str = m.replace(/\,/g, rep.outsideComma);
                            expr = expr.replace(m, str);
                        }
                    }
                    return expr;
                },
                restore = function (saveExpr) {
                    var reg = function (str) {
                        return new RegExp(str, 'g');
                    };
                    return saveExpr.replace(reg(rep.insideComma), ',').replace(reg(rep.outsideComma), ',').replace(reg(rep.slash), '\\').replace(reg(rep.backSlash), '/').replace(reg(rep.leftSquareBracket), '[').replace(reg(rep.rightSquareBracket), ']').replace(reg(rep.singleQuotes), "'").replace(reg(rep.doubleQuotes), '"');
                },
                safeSpecifies = replaceSafeExpression(specifies).split(','),
                examClass = function (e, name) {
                    return (' ' + e.className + ' ').indexOf(' ' + name + ' ') >= 0;
                },
                examAttr = function (e, expr) {
                    var vexpr = '',
                        val = null,
                        extract = function (symb) {
                            var index = expr.indexOf(symb);
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
                examAttrs = function (e, exprss) {
                    exprss = exprss.substr(1, exprss.length - 2);
                    var pass = true,
                        exprs = exprss.indexOf(rep.outsideComma) >= 0 ? exprss.split(rep.outsideComma) : exprss.split(',');
                    for (var i = 0; i < exprs.length; i++) {
                        pass = pass && examAttr(e, trim(exprs[i]));
                    }
                    return pass;
                };
            safeSpecifies.each(function (i, expr) {
                safeSpecifies[i] = trim(expr);
            });
            return { examClass: examClass, examAttrs: examAttrs, safeSpecifies: safeSpecifies };
        },
        _tags = function (e, specifies) {
            var elements = [],
                examor = new _examor(specifies),
                safeSpecifies = examor.safeSpecifies,
                getDescendants = function (e, tags) {
                    var arr = [];
                    tags.forEach(function (tag) {
                        var name = tag.includes('.') ? tag.substring(0, tag.indexOf('.')) : tag,
                            cls = tag.includes('.') ? tag.substr(tag.indexOf('.') + 1) : '',
                            elements = e.getElementsByTagName(name.toUpperCase());
                        for (var i = 0; i < elements.length; i++) {
                            if (!cls || examor.examClass(elements[i], cls) && !arr.includes(elements[i]))
                                arr.push(elements[i]);
                        }
                    });
                    return arr;
                },
                getDirectChilds = function (e, tags) {
                    var arr = [];
                    for (var i = 0; i < e.childNodes.length; i++) {
                        var tagName = !!e.childNodes[i].tagName ? e.childNodes[i].tagName.toUpperCase() : null;
                        tags.forEach(function (t) {
                            if (t.toUpperCase() == tagName || t.toUpperCase().indexOf(tagName + '.') == 0 && examor.examClass(e.childNodes[i], t.substr(t.indexOf('.') + 1)))
                                arr.push(e.childNodes[i]);
                        });
                    }
                    return arr;
                },
                getLevelElements = function (e, lspec) {
                    var results = [],
                        filter = function (arr, pseudoClassName) {
                            var i = pseudoClassName.indexOf('('),
                                name = i > 0 ? pseudoClassName.substr(0, i) : pseudoClassName,
                                arg = i > 0 ? pseudoClassName.substring(i + 1, pseudoClassName.indexOf(')')) : -1,
                                n = parseInt(arg, 10);
                            switch (name) {
                                case ':first':
                                    return arr[0];
                                case ':last':
                                    return arr[arr.length - 1];
                                case ':even':
                                    for (var i = arr.length - 1; i >= 0 && ((i & 1) == 0 || arr.remove(i)); i--);
                                    return arr;
                                case ':odd':
                                    for (var i = arr.length - 1; i >= 0 && ((i & 1) == 1 || arr.remove(i)); i--);
                                    return arr;
                                case ':eq':
                                    return arr[n];
                                case ':lt':
                                    for (var i = arr.length - 1; i >= 0 && (i < n || arr.remove(i)); i--);
                                    return arr;
                                case ':gt':
                                    for (var i = arr.length - 1; i >= 0 && (i > n || arr.remove(i)); i--);
                                    return arr;
                                default:
                                    return arr;
                            }
                        };
                    if (/^(\\?\w+|\\?\(\w+(?:\.\w+)?(?:\|\w+(?:\.\w+)?)*\))(\.\w+)?(\[[^\]]+\])?(\:(?:first|last|even|odd|(?:eq|gt|lt)\(-?\d+\)))?$/ig.test(trim(lspec))) {
                        var deep = RegExp.$1.charAt(0) == '\\',
                            tags = RegExp.$1.substr(deep ? 1 : 0).replace('(', '').replace(')', '').split('|'),
                            className = !!RegExp.$2 ? RegExp.$2.replace('.', '') : '',
                            express = RegExp.$3,
                            pseudoClassName = RegExp.$4,
                            arr = deep ? getDescendants(e, tags) : getDirectChilds(e, tags);
                        for (var i = 0; i < arr.length; i++)
                            if ((!className || examor.examClass(arr[i], className)) && (!express || examor.examAttrs(arr[i], express))) 
                                results.push(_de(arr[i], document));
                        pseudoClassName && results.length > 0 && (results = filter(results, pseudoClassName));
                    }
                    return results;
                };
            for (var index = 0; index < safeSpecifies.length; index++) {
                var parentNodes = [e],
                    nodes = [],
                    lspecs = safeSpecifies[index].replace(/\\/g, '/').replace(/\/\//g, '/\\').split(/\//g);
                for (var level = 0; level < lspecs.length; level++) {
                    for (var i = 0; i < parentNodes.length; i++) {
                        nodes = nodes.concat(getLevelElements(parentNodes[i], (level == 0 ? '\\' : '') + lspecs[level]));
                    }
                    if (level < lspecs.length - 1) {
                        (parentNodes = nodes) && (nodes = []);
                    }
                }
                for (var i = 0; i < nodes.length; i++) {
                    !elements.includes(nodes[i]) && elements.push(nodes[i]);
                }
            }
            return _deArray(elements);
        },
        _de = function (e, doc) {
            e.bind = function (name, method) {
                if (e.attachEvent) {
                    e.attachEvent('on' + name, method);
                } else if (e.addEventListener) {
                    e.addEventListener(name, method, false);
                } else if (e && e !== undefined) {
                    e[name] = method;
                }
                return e;
            };
            e.unbind = function (name, method) {
                if (e.detachEvent) {
                    e.detachEvent('on' + name, method);
                } else if (e.addEventListener) {
                    e.removeEventListener(name, method, false);
                } else {
                    e[name] = null;
                }
                return e;
            };
            e.attr = function (name, value) {
                return attr(e, name, value);
            };
            e.removeAttr = function (name) {
                return e.removeAttribute(name) || e;
            };
            e.val = function (value) {
                return value === undefined ? e.value : (e.value = value) & 0 || e;
            };
            typeof e.html === "undefined" && (e.html = function (html) {
                return html === undefined ? e.innerHTML : (e.innerHTML = html) & 0 || e;
            });
            var nodeText = typeof e.getAttribute === "function" ? e.getAttribute('text') : null;
            !nodeText && nodeText !== '' && typeof e.text === "undefined" && (e.text = function (str) {
                if (typeof e.innerText === "string") {
                    return str === undefined ? e.innerText : (e.innerText = str) & 0 || e;
                } else if (typeof e.textContent === "string") {
                    return str === undefined ? e.textContent : (e.textContent = str) & 0 || e;
                }
                return e;
            });
            e.css = function (name, value) {
                if (typeof (name) == "string" && value !== undefined) {
                    e.style[name] = value;
                } else if (typeof (name) == "string") {
                    return e.style[name];
                }
                return e;
            };
            e.cs = function (name) {
                var style = win.getComputedStyle ? win.getComputedStyle(e, null) : e.currentStyle;
                return typeof name === undefined ? style : typeof name == "string" ? style[name] : null;
            };
            e.pos = function (mode) {
                var x = 0,
                    y = 0,
                    node = e;
                if (mode === 'OffsetOfClient' || mode === 'OOC' || mode === 'C' || mode === 'c' || mode === 1) {
                    if (typeof node.getBoundingClientRect() === 'function') {
                        var rect = node.getBoundingClientRect();
                        x = rect.left;
                        y = rect.top;
                    }
                }
                else if (mode === undefined || mode === 'OffsetOfBody' || mode === 'OOB' || mode === 'B' || mode === 'b' || mode === 0) {
                    while (node && (!node.tagName || node.tagName.toUpperCase() !== 'BODY')) {
                        x += node.offsetLeft === undefined ? 0 : parseFloat(node.offsetLeft);
                        y += node.offsetTop === undefined ? 0 : parseFloat(node.offsetTop);
                        node = node.offsetParent;
                    }
                }
                return {
                    x: x,
                    y: y
                };
            };
            e.show = function () {
                return showHide(e, true);
            };
            e.hide = function () {
                return showHide(e, false);
            };
            e.removeClass = function (name) {
                if (typeof (name) == "string") {
                    e.className = trim((" " + e.className + " ").replace(" " + trim(name) + " ", " "));
                }
                return e;
            };
            e.addClass = function (name) {
                if (typeof (name) == "string" && (" " + e.className + " ").indexOf(" " + name + " ") < 0) {
                    e.className = e.className + " " + trim(name);
                }
                return e;
            };
            e.append = function (a) {
                if (a !== undefined && a) {
                    a = typeof a === "string" ? doc.createTextNode(a) : a;
                    if (a.nodeType == 1 || a.nodeType == 3) {
                        e.appendChild(a);
                    }
                }
                return e;
            };
            e.insert = function (a, n) {
                if (a !== undefined && a) {
                    a = typeof a === "string" ? doc.createTextNode(a) : a;
                    if (a.nodeType == 1 || a.nodeType == 3) {
                        if (n === undefined) {
                            e.childNodes && e.childNodes.length > 0 ? e.insertBefore(a, e.childNodes[0]) : e.appendChild(a);
                        } else if (typeof n === "number") {
                            e.childNodes && e.childNodes.length > 0 ? e.insertBefore(a, e.childNodes[n]) : e.appendChild(a);
                        } else if (typeof n === "object" && n.nodeType !== undefined) {
                            e.insertBefore(a, n);
                        }
                    }
                }
                return e;
            };
            e.parent = function (specifies) {
                var node = e,
                    examor = new _examor(specifies),
                    examOne = function (e, spec) {
                        if (/^(\\?\w+)(\.\w+)?(\[[^\]]+\])?$/ig.test(trim(spec))) {
                            var deep = RegExp.$1.charAt(0) == '\\',
                                tagName = deep ? RegExp.$1.substring(1) : RegExp.$1,
                                className = !!RegExp.$2 ? RegExp.$2.replace('.', '') : '',
                                express = RegExp.$3;
                            if ((!tagName || e.tagName === tagName.toUpperCase()) && (!className || examor.examClass(e, className)) && (!express || examor.examAttrs(e, express))) {
                                return true;
                            }
                        }
                        return null;
                    },
                    exam = function (e, specs) {
                        for (var i = 0; i < specs.length; i++) {
                            if (examOne(e, specs[i])) {
                                return true;
                            }
                        }
                        return false;
                    };
                while (!!node && !!node.tagName && !exam(node, examor.safeSpecifies)) {
                    node = node.tagName === 'HTML' ? null : (node.parentNode || node.parentElement);
                }
                return !!node ? _de(node, e.ownerDocument) : null;
            };
            e.tags = function (specifies) {
                return _tags(e, specifies);
            };
            //extentions since 1.6b
            //if (typeof $$.extentions === 'object' && typeof $$.extentions[e.tagName] === 'function') {
            //    $$.extentions[e.tagName](e);
            //}
            e._de = true;
            return e;
        },
        _new = function (tag) {
            var doc = arguments[1] === undefined ? document : (typeof arguments[1] === "object" && arguments[1].nodeName == "#document" ? arguments[1] : null);
            var replacor = {
                createReplacement: function () {
                    var randomChars = function (prefix) {
                        return prefix + Math.floor(Math.random() * 100000);
                    };
                    return {
                        blank: randomChars('_blank'),
                        singleQuotes: randomChars('_singleQuotes'),
                        doubleQuotes: randomChars('_doubleQuotes')
                    }
                },
                replace: function (tag, rep) {
                    var matchs = tag.match(/('[^']+')|("[^"]+")/g);
                    if (matchs) {
                        for (var i = 0; i < matchs.length; i++) {
                            var m = matchs[i], str = m.substr(1, m.length - 2).replace(/ /g, rep.blank).replace(/'/g, rep.singleQuotes).replace(/"/g, rep.doubleQuotes);
                            tag = tag.replace(m, str);
                        }
                    }
                    return tag.replace(/[ ]+/g, ' ');
                },
                restore: function (str, rep) {
                    var reg = function (str) {
                        return new RegExp(str, 'g');
                    };
                    return str.replace(reg(rep.blank), ' ').replace(reg(rep.singleQuotes), "'").replace(reg(rep.doubleQuotes), '"');
                }
            },
                replacement = replacor.createReplacement();
            if (typeof tag === "string" && /^<\w+[ ]?.*>$/.test(tag)) {
                var tag0 = tag.substring(1, tag.length - 1),
                    tag1 = replacor.replace(tag0, replacement),
                    attrs = tag1.split(' '),
                    element = doc.createElement(attrs[0]);
                for (var i = 1; i < attrs.length; i++) {
                    var e = attrs[i],
                        index = e.indexOf('='),
                        name = index > 0 ? e.substr(0, index) : e,
                        value = index > 0 ? e.substr(index + 1) : '';
                    value = index > 0 ? (value != '' ? replacor.restore(value, replacement) : value) : true;
                    /^[a-zA-Z_-]+$/i.test(name) && attr(element, name, value);
                }
                return _de(element, doc);
            }
        },
        _format = function () {
            if (arguments.length > 0) {
                var format = arguments[0];
                for (var i = 0; i < arguments.length - 1; i++) {
                    format = format.replace(new RegExp("\\{" + i + "\\}", "g"), arguments[i + 1]);
                }
                return format;
            }
            return null;
        },
        _htmlEncode = function (str, mode) {
            if (typeof str !== "string" || str == '') {
                return '';
            } else if (typeof mode === 'undefined' || mode === 0) {
                return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&apos;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
            } else if (mode === 1) {
                var node = _new('<p>').appendChild(document.createTextNode(str));
                return node.parentNode.innerHTML;
            } else if (mode === 2) {
                return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
            } else if (mode === 3) {
                return str.replace(/&/g, '&#38;').replace(/"/g, '&#34;').replace(/'/g, '&#39;').replace(/</g, '&#60;').replace(/>/g, '&#62;');
            }
        },
        _htmlDecode = function (str, mode) {
            if (typeof str !== "string" || str == '') {
                return '';
            } else if (typeof mode === 'undefined' || mode === 0) {
                return str.replace(/&gt;/g, '>').replace(/&lt;/g, '<').replace(/&apos;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, '&');
            } else if (mode === 1) {
                var node = _new('<p>').html(str);
                return node.innerText || node.textContent;
            } else if (mode === 2) {
                return str.replace(/&lt;/g, '<').replace(/&quot;/g, '"').replace(/&amp;/g, '&');
            } else if (mode === 3) {
                return str.replace(/&#38;/g, '&').replace(/&#34;/g, '"').replace(/&#39;/g, "'").replace(/&#60;/g, '<').replace(/&#62;/g, '>');
            }
        },
        _url2Object = function (url) {
            var getKeyValue = function (expr) {
                var index = expr.indexOf('='),
                    name = index >= 0 ? expr.substr(0, index) : expr,
                    value = index >= 0 ? expr.substr(index + 1) : null;
                return {
                    name: name,
                    value: value
                };
            },
                getValue = function (keyValues, key) {
                    if (typeof key === "string") {
                        for (var i = 0; i < keyValues.length; i++) {
                            var kv = getKeyValue(keyValues[i]);
                            if (kv.name == key) {
                                return kv.value;
                            }
                        };
                        return undefined;
                    }
                },
                data = {
                    url: url,
                    filePath: '',
                    fileDir: '',
                    fileName: '',
                    fileShortName: '',
                    fileExt: '',
                    query: '',
                    queryValue: function (key) {
                        return getValue(data.query.split('&'), key);
                    },
                    hasParam: function (key) {
                        return data.query.indexOf(key + '=') == 0 || data.query.indexOf('&' + key + '=') >= 0;
                    }
                };
            if (typeof (url) == "string" && url) {
                var n = url.indexOf('?');
                data.filePath = n > 0 ? url.substring(0, n) : url;
                data.query = n > 0 ? url.substr(n + 1) : '';
                var m = Math.max(data.filePath.lastIndexOf('/'), data.filePath.lastIndexOf('\\'));
                data.fileDir = m > 0 ? data.filePath.substr(0, m) : '';
                data.fileName = m > 0 ? data.filePath.substr(m + 1) : data.filePath;
                n = data.fileName.lastIndexOf('.');
                data.fileShortName = n > 0 ? data.fileName.substr(0, n) : data.fileName;
                data.fileExt = n > 0 ? data.fileName.substring(n) : '';
            };
            return data;
        },
        _merge = function () {
            var rst = {},
                merge = function (a, b) {
                    var o = {};
                    if (typeof a == 'object') for (var name in a) o[name] = a[name];
                    if (typeof b == 'object') for (var name in b) o[name] = b[name];
                    return o;
                };
            for (var i = 0; i < arguments.length; i++) rst = merge(rst, arguments[i]);
            return rst;
        },
        _ajax = function (conf) {
            var noop = function () { },
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
                getXHR = function () {
                    var newActiveX = function () {
                        var arr = ['Msxml3.XMLHTTP', 'Msxml2.XMLHTTP', 'Microsoft.XMLHTTP'];
                        for (var i = 0; i < arr.length; i++) {
                            try {
                                return new win.ActiveXObject(arr[i]);
                            } catch (err) {
                                continue;
                            }
                        }
                        return null;
                    };
                    return win.XMLHttpRequest && (win.location.protocol !== "file:" || !win.ActiveXObject) ? new win.XMLHttpRequest() : newActiveX();
                },
                xhr = getXHR();
            conf = _merge({}, default_configure, conf)
            xhr.open(conf.method, conf.url, conf.async);
            for (var i = 0; i < conf.headers.length; i++) {
                xhr.setRequestHeader(conf.headers[i].name, conf.headers[i].value);
            }
            try {
                xhr.timeout = conf.timeout;
                xhr.ontimeout = conf.ontimeout;
                xhr.onerror = conf.onerror;
            } catch (err) {
                // IE6 will raise an exception here.
                //$e('msg').innerHTML += err.message;
            }
            xhr.onreadystatechange = function () {
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
    document.ready = function (fn) {
        if (typeof (fn) == "function") {
            readyList.push(fn);
        }
    };
    document.path = _url2Object(document.location.href);
    win.onload = function () {
        for (var i = 0; i < readyList.length; i++) {
            readyList[i].call(document);
        }
    };
    win.$e = function (eid) {
        var doc = arguments[1] === undefined ? document : (typeof arguments[1] === "object" && arguments[1].nodeName == "#document" ? arguments[1] : null);
        if ("object" == typeof (eid) && eid) {
            return eid.nodeType == 1 || eid.nodeType == 3 || (eid.nodeName == doc.nodeName) ? _de(eid, doc) : null;
        } else if ("string" == typeof (eid)) {
            if (eid.charAt(0) == '*') {
                var arr = doc.getElementsByName(eid.substr(1));
                for (var i = 0; i < arr.length; i++) {
                    attr(arr[i], '_de') === true || _de(arr[i], doc);
                };
                return _deArray(arr);
            } else if (/^<\w+.*>$/.test(eid)) {
                return _new(eid, doc);
            } else {
                var e = doc.getElementById(eid);
                return e && e.nodeType == 1 ? (attr(e, '_de') === true ? e : _de(e, doc)) : null;
            }
        }
    };
    win.$tags = function (specifies, doc) {
        return typeof doc === undefined || !doc ? $e(document.documentElement).tags(specifies) : $e(doc.documentElement).tags(specifies);
    };
    win.$t = win.$tags;
    win.$$ = {
        create: _new,
        format: _format,
        htmlEncode: _htmlEncode,
        htmlDecode: _htmlDecode,
        url2Object: _url2Object,
        merge: _merge,
        extensions: {}, //reserve for 1.6b+
        ajax: _ajax
    };
    win._new = _new;
    win._format = _format;
    win._htmlEncode = _htmlEncode;
    win._htmlDecode = _htmlDecode;
    win._url2Object = _url2Object;
    win._merge = _merge;
    win._ajax = _ajax;
})(window, document);