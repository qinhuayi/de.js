/// de.js ver1.7.1 (2019-11-28 ++)
///   1. Fix some bugs;
///   2. Upgrade $t(specifies) to $t(specifies, doc), equal to $e(doc.documentElement).tags(specifies).
/// author: hoy qin; email: qinhuayi@qq.com, qinhuayi@kezhida.com.cn
const _url2JSON = (url) => {
    let data = {
        url: url,
        params: {},
        hasParam: (name) => this.params.HasOwnProperty(name)
    },
        getOneKey = (expr) => {
            var index = expr.indexOf('='),
                name = index >= 0 ? expr.substr(0, index) : expr,
                value = index >= 0 ? expr.substr(index + 1) : null;
            return { name, value };
        };
    if (typeof (url) === "string" && url) {
        var n = url.indexOf('?');
        data.filePath = n > 0 ? url.substring(0, n) : url;
        data.query = n > 0 ? url.substr(n + 1) : '';
        var m = Math.max(data.filePath.lastIndexOf('/'), data.filePath.lastIndexOf('\\'));
        data.fileDir = m > 0 ? data.filePath.substr(0, m) : '';
        data.fileName = m > 0 ? data.filePath.substr(m + 1) : data.filePath;
        n = data.fileName.lastIndexOf('.');
        data.fileShortName = n > 0 ? data.fileName.substr(0, n) : data.fileName;
        data.fileExt = n > 0 ? data.fileName.substring(n) : '';
        for (let expr of data.query.split('&')) {
            var key = getOneKey(expr);
            data.params[key.name] = key.value;
        }
    };
    return data;
};

(function (window, document, undefined) {
    "use strict"
    let readyList = [],
        attr = (e, name, value) => {
            if (typeof (name) == "string") {
                if (value !== undefined) {
                    e.setAttribute(name, value);
                } else {
                    let val = e.getAttribute(name);
                    return val || (e[name] === undefined ? val : e[name]);
                }
            }
            return e;
        },
        _examor = function (specifies) {
            let createReplacement = () => {
                let randomChars = prefix => prefix + Math.floor(Math.random() * 100000);
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
                    let reg = str => new RegExp(str, 'g');
                    return saveExpr.replace(reg(rep.insideComma), ',').replace(reg(rep.outsideComma), ',').replace(reg(rep.slash), '\\').replace(reg(rep.backSlash), '/').replace(reg(rep.leftSquareBracket), '[').replace(reg(rep.rightSquareBracket), ']').replace(reg(rep.singleQuotes), "'").replace(reg(rep.doubleQuotes), '"');
                },
                safeSpecifies = replaceSafeExpression(specifies).split(','),
                examClass = (e, name) => (' ' + e.className + ' ').indexOf(' ' + name + ' ') >= 0,
                examAttr = (e, expr) => {
                    let vexpr = '',
                        val = null,
                        extract = symb => {
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
            return { examClass: examClass, examAttrs: examAttrs, safeSpecifies: safeSpecifies };
        },
        showHide = (e, show) => {
            let blocks = "ARTICLE ASIDE BODY CANVAS CENTER DIALOG DIR DIV FIELDSET FOOTER FORM HEADER H1 H2 H3 H4 H5 H6 HR IFRAME LEGEND MARQUEE MENU NAV OBJECT OL OPTGROUP OPTION OUTPUT P PRE SECTION TABLE UL".split(' '),
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
        _deArray = arr => {
            let each = function (arr, name, arg0, arg1) {
                for (let el of arr) {
                    el[name](arg0, arg1);
                }
                return arr;
            },
                elements = (arr === undefined || !arr) ? [] : arr;
            elements.bind = (name, method) => each(elements, 'bind', name, method);
            elements.unbind = (name, method) => each(elements, 'unbind', name, method);
            elements.attr = (name, value) => each(elements, 'attr', name, value);
            elements.removeAttr = name => each(elements, 'removeAttr', name);
            elements.val = value => value === undefined ? getValue(elements) : each(elements, 'val', value);
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
            let getValue = arr => {
                let values = '';
                for (let el of arr) {
                    let checked = attr(el, 'checked');
                    if (el.value !== undefined && ((el.checked !== undefined && el.checked) || checked == 'true')) {
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
            let elements = [],
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
                let parentNodes = [e],
                    nodes = [],
                    lspecs = spec.replace(/\\/g, '/').replace(/\/\//g, '/\\').split(/\//g);
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
                } else if (e && e !== undefined) {
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
            e.val = value => value === undefined ? e.value : (e.value = value) & 0 || e;
            typeof e.html === "undefined" && (e.html = html => html === undefined ? e.innerHTML : (e.innerHTML = html) & 0 || e);
            let nodeText = typeof e.getAttribute === "function" ? e.getAttribute('text') : null;
            !nodeText && nodeText !== '' && typeof e.text === "undefined" && (e.text = str => {
                if (typeof e.innerText === "string") {
                    return str === undefined ? e.innerText : (e.innerText = str) & 0 || e;
                } else if (typeof e.textContent === "string") {
                    return str === undefined ? e.textContent : (e.textContent = str) & 0 || e;
                }
                return e;
            });
            e.css = (name, value) => {
                if (typeof (name) == "string" && value !== undefined) {
                    e.style[name] = value;
                } else if (typeof (name) == "string") {
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
                        clientLeft = docElement.clientLeft || body.clientLeft || 0,
                        x = rect.left + (self.pageXOffset || (node && node.scrollLeft) || body.scrollLeft),
                        y = rect.top + (self.pageYOffset || (node && node.scrollTop) || body.scrollTop);
                } else {
                    while (node && (!node.tagName || node.tagName.toUpperCase() !== 'BODY')) {
                        x += node.offsetLeft === undefined ? 0 : parseInt(node.offsetLeft, 10);
                        y += node.offsetTop === undefined ? 0 : parseInt(node.offsetTop, 10);
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
                if (typeof (name) == "string") {
                    e.className = (" " + e.className + " ").replace(" " + name.trim() + " ", " ").trim();
                }
                return e;
            };
            e.addClass = name => {
                if (typeof (name) == "string") {
                    e.removeClass(e, name);
                    e.className = e.className + " " + name.trim();
                }
                return e;
            };
            e.append = a => {
                if (a !== undefined && a) {
                    a = typeof a === "string" ? doc.createTextNode(a) : a;
                    if (a.nodeType == 1 || a.nodeType == 3) {
                        e.appendChild(a);
                    }
                }
                return e;
            };
            e.insert = (a, n) => {
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
            e.parent = specifies => {
                let node = e,
                    examor = new _examor(specifies),
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
                while (!!node && !!node.tagName && !exam(node, examor.safeSpecifies)) {
                    node = node.tagName === 'HTML' ? null : (node.parentNode || node.parentElement);
                }
                return !!node ? _de(node, e.ownerDocument) : null;
            };
            e.tags = specifies => _tags(e, specifies);
            //extentions since 1.6b
            if (typeof $$.extentions === 'object' && typeof $$.extentions[e.tagName] === 'function') {
                $$.extentions[e.tagName](e);
            }
            e._de = true;
            return e;
        },
        _new = (tag, ...args) => {
            let doc = args[0] === undefined ? document : (typeof args[0] === "object" && args[0].nodeName == "#document" ? args[0] : null);
            let replacor = {
                createReplacement: () => {
                    let randomChars = prefix => prefix + Math.floor(Math.random() * 100000);
                    return {
                        blank: randomChars('_blank'),
                        singleQuotes: randomChars('_singleQuotes'),
                        doubleQuotes: randomChars('_doubleQuotes')
                    }
                },
                replace: (tag, rep) => {
                    let matchs = tag.match(/('[^']+')|("[^"]+")/g);
                    if (matchs) {
                        for (let m of matchs) {
                            let str = m.substr(1, m.length - 2).replace(/ /g, rep.blank).replace(/'/g, rep.singleQuotes).replace(/"/g, rep.doubleQuotes);
                            tag = tag.replace(m, str);
                        }
                    }
                    return tag.replace(/[ ]+/g, ' ');
                },
                restore: (str, rep) => {
                    let reg = str => new RegExp(str, 'g');
                    return str.replace(reg(rep.blank), ' ').replace(reg(rep.singleQuotes), "'").replace(reg(rep.doubleQuotes), '"');
                }
            },
                replacement = replacor.createReplacement();
            if (typeof tag === "string" && /^<\w+[ ]?.*>$/.test(tag)) {
                let tag0 = tag.substring(1, tag.length - 1),
                    tag1 = replacor.replace(tag0, replacement),
                    attrs = tag1.split(' '),
                    element = doc.createElement(attrs[0]);
                for (let i = 1; i < attrs.length; i++) {
                    let e = attrs[i],
                        index = e.indexOf('='),
                        name = index > 0 ? e.substr(0, index) : e,
                        value = index > 0 ? e.substr(index + 1) : '';
                    value = index > 0 ? (value != '' ? replacor.restore(value, replacement) : value) : true;
                    /^[a-zA-Z_-]+$/i.test(name) && attr(element, name, value);
                }
                return _de(element, doc);
            }
        },
        _ajax = conf => {
            let noop = () => { },
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
                    for (let name in default_configure) {
                        conf[name] = conf[name] === undefined ? default_configure[name] : conf[name];
                    };
                    for (let header of conf.headers) {
                        if (header.name.toLowerCase() == "content-type") {
                            return conf;
                        }
                    }
                    conf.headers.push(default_configure.headers[0]);
                    return conf;
                },
                getXHR = () => {
                    let newActiveX = () => {
                        let arr = ['Msxml3.XMLHTTP', 'Msxml2.XMLHTTP', 'Microsoft.XMLHTTP'];
                        for (let el of arr) {
                            try {
                                return new window.ActiveXObject(el);
                            } catch (err) {
                                continue;
                            }
                        }
                        return null;
                    };
                    return window.XMLHttpRequest && (window.location.protocol !== "file:" || !window.ActiveXObject) ? new window.XMLHttpRequest() : newActiveX();
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
            } catch (err) {
                // IE6 will raise an exception here.
                //$e('msg').innerHTML += err.message;
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
    document.ready = fn => {
        if (typeof (fn) == "function") {
            readyList.push(fn);
        }
    };
    document.path = _url2JSON(document.location.href);
    window.onload = () => {
        for (let fn of readyList) {
            fn.call(document);
        }
    };
    window.$e = (eid, ...args) => {
        let doc = args[0] === undefined ? document : (typeof args[0] === "object" && args[0].nodeName == "#document" ? args[0] : null);
        if ("object" == typeof (eid) && eid) {
            return eid.nodeType == 1 || eid.nodeType == 3 || (eid.nodeName == doc.nodeName) ? _de(eid, doc) : null;
        } else if ("string" == typeof (eid)) {
            if (eid.charAt(0) == '*') {
                let arr = doc.getElementsByName(eid.substr(1));
                for (let el of arr) {
                    attr(el, '_de') === true || _de(el, doc);
                };
                return _deArray(arr);
            } else if (/^<\w+.*>$/.test(eid)) {
                return _new(eid, doc);
            } else {
                let e = doc.getElementById(eid);
                return e && e.nodeType == 1 ? (attr(e, '_de') === true ? e : _de(e, doc)) : null;
            }
        }
    };
    window.$tags = (specifies, doc) => typeof doc === undefined || !doc ? $e(document.documentElement).tags(specifies) : $e(doc.documentElement).tags(specifies);
    window.$t = window.$tags;
    window.$$ = {};
})(window, document);