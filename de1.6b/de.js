/// de.js ver1.6b 分拆出来的独立文件
////: 1 几处array.each需改为for语句.  2 _tags(s) 和 parent(s)需要测试 @20180711
(function (window, document, undefined) {
    var readyList = [],
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
            if (blocks.exists(e.tagName)) {
                return e.css('display', show ? "block" : "none");
            } else if (inline.exists(e.tagName)) {
                return e.css('display', show ? "inline" : "none");
            } else if (list_items.exists(e.tagName)) {
                return e.css('display', show ? "list-item" : "none");
            } else if (table.exists(e.tagName)) {
                return e.css('display', show ? "table" : "none");
            } else if (table_caption.exists(e.tagName)) {
                return e.css('display', show ? "table-caption" : "none");
            } else if (table_cell.exists(e.tagName)) {
                return e.css('display', show ? "table-cell" : "none");
            } else if (table_row.exists(e.tagName)) {
                return e.css('display', show ? "table-row" : "none");
            } else if (table_row_group.exists(e.tagName)) {
                return e.css('display', show ? "table-row-group" : "none");
            } else if (table_column.exists(e.tagName)) {
                return e.css('display', show ? "table-column" : "none");
            } else if (table_column_group.exists(e.tagName)) {
                return e.css('display', show ? "table-column-group" : "none");
            } else if (table_header_group.exists(e.tagName)) {
                return e.css('display', show ? "table-header-group" : "none");
            } else if (table_footer_group.exists(e.tagName)) {
                return e.css('display', show ? "table-footer-group" : "none");
            } else if (nones.exists(e.tagName)) {
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
                return each(elements, 'val', value);
            };
            elements.html = function (html) {
                return each(elements, 'html', html);
            };
            elements.text = function (str) {
                return each(elements, 'text', text);
            };
            elements.css = function (name, value) {
                return each(elements, 'css', name, value);
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
            elements.tags = function (selector) {
                throw 'Not support!';
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
        _examor = function (specifies){
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
                        matchs.each(function (i, m) {
                            var str = m.substr(1, m.length - 2).replace(/\,/g, rep.insideComma).replace(/\\/g, rep.slash).replace(/\//g, rep.backSlash).replace(/\[/g, rep.leftSquareBracket).replace(/\]/g, rep.rightSquareBracket).replace(/'/g, rep.singleQuotes).replace(/"/g, rep.doubleQuotes);
                            expr = expr.replace(m, str);
                        });
                    }
                    matchs = expr.match(/\[([^\]]+)\]/g);
                    if (matchs) {
                        matchs.each(function (i, m) {
                            var str = m.replace(/\,/g, rep.outsideComma);
                            expr = expr.replace(m, str);
                        });
                    }
                    return expr;
                },
                restore = function (saveExpr) {
                    var reg = function (str) {
                        return new RegExp(str, 'g');
                    };
                    return saveExpr.replace(reg(rep.insideComma), ',').replace(reg(rep.outsideComma), ',').replace(rep.slash, '\\').replace(rep.backSlash, '/').replace(reg(rep.leftSquareBracket), '[').replace(reg(rep.rightSquareBracket), ']').replace(reg(rep.singleQuotes), "'").replace(reg(rep.doubleQuotes), '"');
                },
                safeSpecifies = replaceSafeExpression(specifies).split(','),
                examClass = function (e, name) {
                    return (' ' + e.className + ' ').indexOf(' ' + name + ' ') >= 0;
                },
                examAttr = function (e, expr) {
                    var vexpr = '',
                        val = null,
                        extract = function (symbol) {
                            if (expr.indexOf(symbol) > 0) {
                                var arr = expr.split(symbol);
                                val = attr(e, arr[0]);
                                if (/(^'[^']+'$)|(^"[^"]+"$)/g.test(arr[1])) {
                                    vexpr = arr[1].substr(1, arr[1].length - 2);
                                    vexpr = restore(vexpr);
                                } else {
                                    vexpr = arr[1];
                                }
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
                    exprs.each(function (i, expr) {
                        pass = pass && examAttr(e, expr.trim());
                    });
                    return pass;
                };
            return { examClass: examClass, examAttrs: examAttrs, safeSpecifies: safeSpecifies  };
        },
        _tags = function (e, specifies) {
            var elements = [],
                examor = new _examor(specifies),
                safeSpecifies = examor.safeSpecifies,
                getChildElements = function (e, tagName) {
                    var arr = [];
                    for (var i = 0; i < e.childNodes.length; i++) {
                        !!e.childNodes[i].tagName && e.childNodes[i].tagName.toUpperCase() == tagName.toUpperCase() && arr.push(e.childNodes[i]);
                    }
                    return arr;
                },
                getLevelElements = function (e, lspec) {
                    var results = [];
                    if (/^(\\?\w+)(\.\w+)?(\[[^\]]+\])?$/ig.test(lspec.trim())) {
                        var deep = RegExp.$1.charAt(0) == '\\',
                            tagName = deep ? RegExp.$1.substring(1) : RegExp.$1,
                            className = !!RegExp.$2 ? RegExp.$2.replace('.', '') : '',
                            express = RegExp.$3,
                            arr = deep ? e.getElementsByTagName(tagName.toUpperCase()) : getChildElements(e, tagName);
                        for (var i = 0; i < arr.length; i++) {
                            if ((!className || examor.examClass(arr[i], className)) && (!express || examor.examAttrs(arr[i], express))) {
                                results.push(_de(arr[i]));
                            }
                        }
                    }
                    return results;
                };
            safeSpecifies.each(function (index, specs) {
                var parentNodes = [e],
                    nodes = [],
                    lspecs = specs.replace(/\\/g, '/').replace(/\/\//g, '/\\').split(/\//g);
                for (var level = 0; level < lspecs.length; level++) {
                    for (var i = 0; i < parentNodes.length; i++) {
                        nodes = nodes.concat(getLevelElements(parentNodes[i], (level == 0 ? '\\' : '') + lspecs[level]));
                    }
                    if (level < lspecs.length - 1) {
                        (parentNodes = nodes) && (nodes = []);
                    }
                }
                nodes.each(function (i, e) {
                    !elements.exists(e) && elements.push(e);
                });
            });
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
                    return e.currentStyle[name];
                }
                return e;
            };
            e.pos = function () {
                var x = 0,
                    y = 0,
                    node = e;
                if (node && typeof node.getBoundingClientRect === 'function') {
                    var rect = node.getBoundingClientRect(),
                        doc = node.ownerDocument,
                        body = doc.body,
                        docElement = doc.documentElement,
                        clientTop = docElement.clientTop || body.clientTop || 0,
                        clientLeft = docElement.clientLeft || body.clientLeft || 0,
                        x = rect.left + (self.pageXOffset || (node && node.scrollLeft) || body.scrollLeft),
                        y = rect.top + (self.pageYOffset || (node && node.scrollTop) || body.scrollTop);
                } else {
                    while (node && (!node.tagName || node.tagName.toUpperCase() !== 'BODY')) {
                        x += node.offsetLeft === undefined ? 0 : parseInt(node.offsetLeft);
                        y += node.offsetTop === undefined ? 0 : parseInt(node.offsetTop);
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
                        e.className = (" " + e.className + " ").replace(" " + name.trim() + " ", " ").trim();
                    }
                    return e;
                };
            e.addClass = function (name) {
                if (typeof (name) == "string") {
                    e.removeClass(e, name);
                    e.className = e.className + " " + name.trim();
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
                        if (/^(\\?\w+)(\.\w+)?(\[[^\]]+\])?$/ig.test(spec.trim())) {
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
                    node = node.parentNode || node.parentElement;
                }
                return !!node && node.tagName === tagName ? _de(node) : null;
            };
            e.tags = function (specifies) {
                return _tags(e, specifies);
            };
            //扩展de方法 1.6b
            if (typeof $$.extends === 'object' & typeof $$.extends[e.tagName] === 'function') {
                $$.extends[e.tagName](e);
            }
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
                        matchs.each(function (i, m) {
                            var str = m.substr(1, m.length - 2).replace(/ /g, rep.blank).replace(/'/g, rep.singleQuotes).replace(/"/g, rep.doubleQuotes);
                            tag = tag.replace(m, str);
                        });
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
                return _de(element);
            }
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
                fillConfigure = function (conf, default_configure) {
                    for (var name in default_configure) {
                        conf[name] = conf[name] === undefined ? default_configure[name] : conf[name];
                    };
                    conf.headers.each(function (i, h) {
                        if (h.name.toLowerCase() == "content-type") {
                            return conf;
                        }
                    });
                    conf.headers.push(default_configure.headers[0]);
                    return conf;
                },
                getXHR = function () {
                    var newActiveX = function () {
                        var arr = ['Msxml3.XMLHTTP', 'Msxml2.XMLHTTP', 'Microsoft.XMLHTTP'];
                        for (var i = 0; i < arr.length; i++) {
                            try {
                                return new window.ActiveXObject(arr[i]);
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
            conf.headers.each(function (i, e) {
                xhr.setRequestHeader(e.name, e.value);
            });
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
    window.onload = function () {
        readyList.each(function (i, f) {
            f.call(document);
        });
    };
    window.$e = function (eid) {
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
    window.$tags = function (specifies) {
        return $e(document.documentElement).tags(specifies);
    };
    window.$t = window.$tags;
    window.$$ = {
        create: _new,
        htmlEncode: _htmlEncode,
        htmlDecode: _htmlDecode,
        url2Object: _url2Object,
        extends: {}, //扩展de方法 1.6b
        ajax: _ajax
    };
    document.path = _url2Object(document.location.href);
})(window, document);