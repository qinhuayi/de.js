var Testor = {
    "$e": function (idoc, divOut) {
        var t0 = function () {
            return typeof $e('iframe1') == 'object' && $e('iframe1') && $e('iframe1').tagName == 'IFRAME';
        };
        var t1 = function () {
            return $e(document.body) && $e(document.body).tagName == 'BODY';
        };
        var t2 = function () {
            var p = $e('p1', idoc);
            return typeof p == 'object' && p && p.tagName == 'P';
        };
        var t3 = function () {
            return typeof $e('*group1') == 'object' && $e('*group1') && $e('*group1').length == 3;
        };
        var t4 = function () {
            return typeof $e('*group2', idoc) == 'object' && $e('*group2', idoc) && $e('*group2', idoc).length == 4;
        };
        var t5 = function () {
            var sp0 = $e("<span class='red'>");
            var rs = typeof sp0 == 'object' && sp0 && sp0.tagName == 'SPAN';
            rs && divOut.appendChild(sp0);
            return rs && (sp0.innerHTML = '$e-sp0');
        };
        var t6 = function () {
            var sp1 = $e("<span class='red'>", idoc);
            var divOut2 = idoc && idoc.getElementById('divOut');
            var rs = divOut2 && typeof sp1 == 'object' && sp1 && sp1.tagName == 'SPAN';
            divOut2 && divOut2.appendChild(sp1);
            return rs && (sp1.innerHTML = '$e-sp1');
        };
        return this.Test([t0, t1, t2, t3, t4, t5, t6]);
    },
    "$t": function (idoc, divOut) {
        var arr = null;
        var t0 = function () {
            var rs = typeof $t('form') == 'object' && (arr = $t('form')) && arr.length == 1;
            return rs && typeof $tags('form') == 'object' && (arr = $tags('form')) && arr.length == 1;
        };
        var t1 = function () {
            return (arr = $t('h1,h2')) && arr.length == 3;
        };
        var t2 = function () {
            return (arr = $t('div.doc')) && arr.length == 1 && arr[0].className == 'doc';
        };
        var t3 = function () {
            return (arr = $t('a[id]')) && arr.length == 3 && arr[0].id == 'a0';
        };
        var t4 = function () {
            var rs = (arr = $t('a[id=a1]')) && arr.length == 1 && arr[0].id == 'a1';
            return rs && (arr = $t('a[id==a1]')) && arr.length == 1 && arr[0].id == 'a1';
        };
        var t5 = function () {
            return (arr = $t('a[class*=ink]')) && arr.length == 3 && arr[0].className.indexOf('ink') >= 0;
        };
        var t6 = function () {
            return (arr = $t('img[id~=0]')) && arr.length == 1 && arr[0].id == 'img1';
        };
        var t7 = function () {
            return (arr = $t('a[id$=0]')) && arr.length == 1 && arr[0].id == 'a0';
        };
        var t8 = function () {
            return (arr = $t('a[id^=a]')) && arr.length == 3 && arr[2].id == 'a2';
        };
        var t9 = function () {
            return (arr = $t('img[id!=img1]')) && arr.length == 1 && arr[0].id == 'img0';
        };
        var sdata0 = document.getElementById('img0').getAttribute('_data'), //"\\~!@#$%^&*()_+`-=[中文]\{}|;':,./< >?",
            sdata1 = document.getElementById('img1').getAttribute('_data'); //'\\~!@#$%^&*()_+`-=[中文]\{}|;":,./< >?';
        var t10 = function () {
            return (arr = $t('img[_data]')) && arr.length == 2 && arr[0].id == 'img0';
        };
        var t11 = function () {
            var rs = (arr = $t('img[_data="' + sdata0 + '"]')) && arr.length == 1 && arr[0].id == 'img0';
            return rs && (arr = $t("img[_data='" + sdata1 + "']")) && arr.length == 1 && arr[0].id == 'img1';
        };
        var t12 = function () {
            var rs = (arr = $t('img[_data*="]')) && arr.length == 1 && arr[0].id == 'img1';
            return rs && (arr = $t("img[_data*=']")) && arr.length == 1 && arr[0].id == 'img0';
        }
        var src0 = "'[\\,]'",
            src1 = '"[\\,]"';
        var t13 = function () {
            var rs = (arr = $t('img[src~="' + src0 + '"]')) && arr.length == 1 && arr[0].id == 'img1';
            return rs && (arr = $t("img[src~='" + src1 + "']")) && arr.length == 1 && arr[0].id == 'img0';
        };
        var t14 = function () {
            return (arr = $t("a[href$='detail']")) && arr.length == 1 && arr[0].id == 'a0';
        };
        var t15 = function () {
            return (arr = $t('a[href^="./X/页/a.html"]')) && arr.length == 2 && arr[0].id == 'a0' && arr[1].id == 'a1';
        };
        var t16 = function () {
            return (arr = $t('img[_data!="' + sdata0 + '"]')) && arr.length == 1 && arr[0].id == 'img1';
        };
        var t17 = function () {
            return (arr = $t('a.link1[id*=a, href*="/页/a.html?id=1&mode=more"]')) && arr.length == 1 && arr[0].id == 'a1';
        };
        var t18 = function () {
            var rs = (arr = $t('div.doc\\p\\a[href*="/a.html"]')) && arr.length == 2 && arr[0].id == 'a0' && arr[1].id == 'a1';
            return rs && (arr = $t('div.doc/p/a[href*="/a.html"]')) && arr.length == 2 && arr[0].id == 'a0' && arr[1].id == 'a1';
        };
        var t19 = function () {
            var rs = (arr = $t('div.doc//a[href*="/a.html"]')) && arr.length == 2 && arr[0].id == 'a0' && arr[1].id == 'a1';
            return rs && (arr = $t('div.doc\\\\a[href*="/a.html"]')) && arr.length == 2 && arr[0].id == 'a0' && arr[1].id == 'a1';
        };
        var t20 = function () {
            var rs = (arr = $t('p.poem/a[id^=a, href*="./X/页/"], div.doc//img[id^="img", src*="/res/"]')) && arr.length == 4 && arr[1].id == 'a1' && arr[3].id == 'img1';
            return rs && (arr = $t('p.poem/a[id^="a", href*="./X/页/"], body//img[id^="img", src*="' + src0 + '"]')) && arr.length == 3 && arr[1].id == 'a1' && arr[2].id == 'img0';
        };
        var t21 = function () {
            return (arr = $t('input[name=group2]', idoc)) && arr.length == 4;
        };
        var t22 = function () {
            return (arr = $t('a[id]:first')) && arr[0].id == 'a0' && (arr = $t('h2:first,a[id]:first')) && arr.length == 2 && arr[0].id == 'h2' && arr[1].id == 'a0';
        };
        var t23 = function () {
            return (arr = $t('a[id]:last')) && arr[0].id == 'a2' && (arr = $t('h2:last,div.doc//a[id]:last')) && arr.length == 2 && arr[0].id == 'h1' && arr[1].id == 'a2';
        };
        var t24 = function () {
            return (arr = $t('div.doc//a:even')) && arr.length == 2 && arr[0].id == 'a0' && arr[1].id == 'a2';
        };
        var t25 = function () {
            return (arr = $t('div.doc//a:odd')) && arr.length == 1 && arr[0].id == 'a1';
        };
        var t26 = function () {
            return (arr = $t('form//tr:eq(1)')) && arr.length == 1 && arr[0].id == 'tr1' && (arr = $t('table//tr:eq(2)')) && arr.length == 1 && arr[0].id == 'tr2';
        };
        var t27 = function () {
            return (arr = $t('form//tr:gt(1)')) && arr.length == 3 && arr[0].id == 'tr2';
        };
        var t28 = function () {
            return (arr = $t('form//tr:lt(2)')) && arr.length == 2 && arr[0].id == 'tr0' && arr[1].id == 'tr1';
        };
        var t29 = function () {
            return (arr = $t('div.doc//a.link1[id]:gt(0)')) && arr.length == 2 && arr[0].id == 'a1' && arr[1].id == 'a2';
        };
        return this.Test([t0, t1, t2, t3, t4, t5, t6, t7, t8, t9, t10, t11, t12, t13, t14, t15, t16, t17, t18, t19, t20, t21, t22, t23, t24, t25, t26, t27, t28, t29]);
    },
    "_ajax": function (idoc, divOut, span) {
        var t0 = function () {
            var onsuccess = function (xhr) {
                document.getElementById('txtArea').value = xhr.text;
                var rs0 = xhr.text.indexOf('<ID>12</ID>') > 0 && xhr.text.indexOf('<Name>BCD</Name>') > 0 && xhr.text.indexOf('<Text>中文</Text>') > 0;
                span.innerHTML += rs0 ? "<span class='green'>✓</span>" : "<span class='red'>✕</span>";
            };
            _ajax({ url: '../res/data.xml', onsuccess: onsuccess });
            return true;
        };
        var t1 = function () {
            var onsuccess = function (xhr) {
                span.innerHTML += "<span class='green'>✓</span>status=" + xhr.status;
            };
            var onerror = function (xhr) {
                document.getElementById('txtArea').value += xhr.status;
                span.innerHTML += "<span class='green'>✓</span>status=" + xhr.status;
            };
            _ajax({ url: '!@#$%^&*.html', onsuccess: onsuccess, onerror: onerror });
            return true;
        };
        //...
        return this.Test([t0, t1]);
    },
    "_format": function () {
        var t0 = function () {
            return _format("{0}去{1}{2}里", '一', '二', '三') == '一去二三里';
        };
        var t1 = function () {
            return _format("{0}去{1}{2}里=={0}去{1}{2}里", '一', '二', '三') == '一去二三里==一去二三里';
        };
        return this.Test([t0, t1]);
    },
    "_htmlEncode": function () {
        var html = 'if (a > b) && (c < a) return "Larger"; else \'Smaller\'; ',
            code0 = 'if (a &gt; b) &amp;&amp; (c &lt; a) return &quot;Larger&quot;; else &apos;Smaller&apos;; ',
            code1 = 'if (a &gt; b) &amp;&amp; (c &lt; a) return "Larger"; else \'Smaller\'; ',
            code2 = 'if (a > b) &amp;&amp; (c &lt; a) return &quot;Larger&quot;; else \'Smaller\'; ',
            code3 = 'if (a &#62; b) &#38;&#38; (c &#60; a) return &#34;Larger&#34;; else &#39;Smaller&#39;; ';
        var t0 = function () {
            return _htmlEncode(html) == code0 && _htmlEncode(html, 0) == code0;
        };
        var t1 = function () {
            return _htmlEncode(html, 1) == code1;
        };
        var t2 = function () {
            return _htmlEncode(html, 2) == code2;
        };
        var t3 = function () {
            return _htmlEncode(html, 3) == code3;
        };        
        var t4 = function () {
            html = "if (a &gt; b) return &quot;Larger&quot;;";
            return _htmlEncode(html, 0) == "if (a &amp;gt; b) return &amp;quot;Larger&amp;quot;;";
        };
        return this.Test([t0, t1, t2, t3, t4]);
    },
    "_htmlDecode": function () {
        var html = 'if (a > b) && (c < a) return "Larger"; else \'Smaller\'; ',
            code0 = 'if (a &gt; b) &amp;&amp; (c &lt; a) return &quot;Larger&quot;; else &apos;Smaller&apos;; ',
            code1 = 'if (a &gt; b) &amp;&amp; (c &lt; a) return "Larger"; else \'Smaller\'; ',
            code2 = 'if (a > b) &amp;&amp; (c &lt; a) return &quot;Larger&quot;; else \'Smaller\'; ',
            code3 = 'if (a &#62; b) &#38;&#38; (c &#60; a) return &#34;Larger&#34;; else &#39;Smaller&#39;; ',
            code4 = 'if (a &amp;gt; b) return &amp;quot;Larger&amp;quot;;';
        var t0 = function () {
            return _htmlDecode(code0) == html && _htmlDecode(code0, 0) == html;
        };
        var t1 = function () {
            return _htmlDecode(code1, 1) == html;
        };
        var t2 = function () {
            return _htmlDecode(code2, 2) == html;
        };
        var t3 = function () {
            return _htmlDecode(code3, 3) == html;
        };
        var t4 = function () {
            return _htmlDecode(code4) == 'if (a &gt; b) return &quot;Larger&quot;;';
        };
        return this.Test([t0, t1, t2, t3, t4]);
    },
    "_url2Object": function () {
        var url = '../res/小图/img1.asp?id=2&name=张三&arr=["e","f","g"]&ref=../pages/a.html?pid=3',
            obj = _url2Object(url);
        var t0 = function () {
            return obj.url == url;
        };
        var t1 = function () {
            return obj.filePath == '../res/小图/img1.asp';
        };
        var t2 = function () {
            return obj.fileDir == '../res/小图';
        };
        var t3 = function () {
            return obj.fileName == 'img1.asp';
        };
        var t4 = function () {
            return obj.fileShortName == 'img1';
        };
        var t5 = function () {
            return obj.fileExt == '.asp';
        };
        var t6 = function () {
            return obj.query == 'id=2&name=张三&arr=["e","f","g"]&ref=../pages/a.html?pid=3';
        };
        var t7 = function () {
            return obj.queryValue('id') == 2 && obj.queryValue('name') == '张三' && obj.queryValue('arr') == '["e","f","g"]' && obj.queryValue('ref') == '../pages/a.html?pid=3';
        };
        var t8 = function () {
            return obj.hasParam('id') && obj.hasParam('name') && obj.hasParam('arr') && obj.hasParam('ref') && !obj.hasParam('pid');
        };
        return this.Test([t0, t1, t2, t3, t4, t5, t6, t7, t8]);
    },
    "_new": function () {
        var t0 = function () {
            return _new('<i>').tagName == 'I';
        };
        var t1 = function () {
            var el = _new('<span id="s0">');
            return el.tagName == 'SPAN' && el.id == 's0';
        };
        return this.Test([t0, t1]);
    },
    "_merge": function () {
        var equal = function (a, b) {
            for (var n in a) if (b[n] == undefined || b[n] != a[n]) return false;
            return true;
        };
        var t0 = function () {
            var a = { a: 'a', b: 'b0' }, b = { b: 'b1', c: 'c1' }, o = _merge(a, b);
            return equal(o, { a: 'a', b: 'b1', c: 'c1' }) && equal(a, { a: 'a', b: 'b0' }) && equal(b, { b: 'b1', c: 'c1' });
        };
        var t1 = function () {
            var a = { a: 'a', b: 'b0' }, b = { b: 'b1', c: 'c1' }, c = { b: 'b2', c: 'c2', d: 'd2' }, d = null, e = 123, f = 'abc', g = undefined, h = { h: 'h' };
            var o = _merge(a, b, c, d, e, f, g, h);
            return equal(o, { a: 'a', b: 'b2', c: 'c2', d: 'd2', h: 'h' }) && equal(a, { a: 'a', b: 'b0' }) && equal(b, { b: 'b1', c: 'c1' }) && equal(c, { b: 'b2', c: 'c2', d: 'd2' }) && d == null && e == 123 && f == 'abc' && g == undefined && equal(h, { h: 'h' });
        };
        return this.Test([t0, t1]);
    },
    "document.path": function () {
        var path = _url2Object(document.location.href);
        var t0 = function () {
            return document.path.url === path.url;
        };
        var t1 = function () {
            return document.path.filePath === path.filePath;
        };
        var t2 = function () {
            return document.path.fileDir === path.fileDir;
        };
        var t3 = function () {
            return document.path.fileName === path.fileName;
        };
        var t4 = function () {
            return document.path.fileShortName === path.fileShortName;
        };
        var t5 = function () { return document.path.fileExt === path.fileExt; };
        var t6 = function () {
            return document.path.query === path.query;
        };
        var t7 = function () {
            return typeof document.path.queryValue == 'function' && document.path.queryValue('id') == path.queryValue('id');
        };
        var t8 = function () {
            return typeof document.path.hasParam == 'function' && document.path.hasParam('id') == path.hasParam('id');
        };
        return this.Test([t0, t1, t2, t3, t4, t5, t6, t7, t8]);
    },
    "document.ready": function () {
        var t0 = function () {
            return document.getElementById('h2').innerHTML.indexOf('ready') > 0;
        };
        var t1 = function () {
            return typeof document._testReady == 'number' && document._testReady == 1;
        };
        return this.Test([t0, t1]);
    },
    "addClass": function (idoc) {
        var t0 = function () {
            return $e('a0').addClass('bg_gray').id == 'a0' && $e('a0').className.indexOf('bg_gray') >= 0;
        };
        var t1 = function () {
            return $e('a1').addClass('bg_gray').id == 'a1' && $e('a1').className.indexOf('bg_gray') >= 0;
        };
        var t2 = function () {
            return $t('b').addClass('green').length == 10 && $t('b')[9].className.indexOf('green') >= 0;
        };
        var t3 = function () {
            return $e('p1', idoc).addClass('blue') && $e('p1', idoc).className.indexOf('blue') >= 0;
        };
        var t4 = function () {
            return $t('tr[id=tr2]//label').addClass('blue').length == 3 && $t('tr[id=tr2]//label')[0].className.indexOf('blue') >= 0;
        };
        return this.Test([t0, t1, t2, t3, t4]);
    },
    "append": function (idoc, divOut) {
        var sp0 = document.createElement('SPAN');
        sp0.id = 'span0-append';
        sp0.innerHTML = 'append-span0';
        var t0 = function () {
            return $e('divOut').append(sp0).id == 'divOut';
        };
        var t1 = function () {
            return divOut.childNodes[divOut.childNodes.length - 1].id == 'span0-append';
        };
        var sp1 = idoc.createElement('SPAN');
        sp1.id = 'span1-append';
        sp1.innerHTML = 'append-span1';
        var t2 = function () {
            return $e('divOut', idoc).append(sp1).id == 'divOut';
        };
        var divOut2 = idoc.getElementById('divOut');
        var t3 = function () {
            return divOut2.childNodes[divOut2.childNodes.length - 1].id == 'span1-append';
        };
        var t4 = function () {
            var rs = $t('tr[id=tr2]/td').append('append').length == 2;
            var html = $t('tr[id=tr2]/td')[0].innerHTML;
            return rs && html.substr(html.length - 'append'.length, 'append'.length) == 'append';
        };
        return this.Test([t0, t1, t2, t3, t4]);
    },
    "attr": function (idoc) {
        document.expando = true;
        idoc.expando = true;
        var t0 = function () {
            return $e('img0').attr('alt') == 'image 0';
        };
        var t1 = function () {
            return $e('txt0').attr('_data') == 'Text Data';
        };
        var t2 = function () {
            return $e('img1').attr('alt', 'Fake Image 1').id == 'img1' && $e('img1').getAttribute('alt') == 'Fake Image 1';
        };
        var t3 = function () {
            return $e('p1', idoc).attr('_data') == 'p1 data';
        };
        var t4 = function () {
            return $e('p1', idoc).attr('_data', 'P1Data').id == 'p1' && $e('p1', idoc).getAttribute('_data') == 'P1Data';
        };
        var t5 = function () {
            return $t('img').attr('alt').length == 2;
        };
        var t6 = function () {
            return $t('img[id=img1]').attr('alt', 'FAKE IMAGE 1').length == 1 && $t('img[id=img1]')[0].getAttribute('alt') == 'FAKE IMAGE 1';
        };
        return this.Test([t0, t1, t2, t3, t4, t5, t6]);
    },
    "bind": function (idoc, divOut, span) {
        var btn0 = document.getElementById('btnClear'),
            btn1 = idoc.getElementById('btnSubmit'),
            rs00 = false,
            arr = [];
        var onclick = function (evt) {
            try {
                var txt = document.getElementById('txt0');
                txt.value = '';
                var rs0 = txt.value == '';
                var rs1 = !!(evt && evt.srcElement);
                var rs2 = rs1 && evt.srcElement.id == 'btnClear';
                arr = [rs0, rs1, rs2];
            }
            catch (ex) {
                span.innerHTML = ex.message;
            }
        };
        var onsubmit = function (evt) {
            try {
                var div = idoc.getElementById('divOut');
                div.innerHTML += '<span>onsubmit</span>'
                var rs0 = div.innerHTML.indexOf('onsubmit') > 0;
                var rs1 = !!(evt && evt.srcElement);
                var rs2 = rs1 && evt.srcElement.id == 'btnSubmit';
                arr = arr.concat([rs0, rs1, rs2]);
            }
            catch (ex) {
                span.innerHTML = ex.message;
            }
        };
        var onreset = function (evt) {
            rs00 = true;
        };
        $e(btn0).bind('click', onclick);
        typeof btn0.fireEvent == 'function' ? btn0.fireEvent('click') : typeof btn0.click == 'function' ? btn0.click() : null;
        $e(btn1).bind('click', onsubmit);
        typeof btn1.fireEvent == 'function' ? btn1.fireEvent('click') : typeof btn1.click == 'function' ? btn1.click() : null;
        var rs = $t('input[id=btnReset]').bind('click', onreset).length == 1;
        arr.push(rs);
        var btn2 = $t('input[id=btnReset]')[0];
        typeof btn2.fireEvent == 'function' ? btn2.fireEvent('click') : typeof btn2.click == 'function' ? btn2.click() : null;
        arr.push(rs00);
        return arr;
    },
    "css": function (idoc) {
        var t0 = function () {
            return $e('txt0').css('color', 'red').id == 'txt0';
        };
        var t1 = function () {
            return $e('txt0').css('color') == 'red';
        };
        var t2 = function () {
            return $e('p1', idoc).css('color', 'red').id == 'p1';
        };
        var t3 = function () {
            return $e('p1', idoc).css('color') == 'red';
        };
        var t4 = function () {
            return $t('div.doc//a').css('fontWeight', 'bold').length == 3 && $t('div.doc//a')[0].css('fontWeight') == 'bold';
        };
        return this.Test([t0, t1, t2, t3, t4]);
    },
    "cs": function (idoc) {
        var t0 = function () {
            return $e('divTestor').cs('width') == '920px';
        };
        var t1 = function () {
            return $e('divSide', idoc).cs('width') == '80px' && $e('divSide', idoc).cs('height') == '40px'
        };
        return this.Test([t0, t1]);
    },
    "hide": function (idoc) {
        var t0 = function () {
            return $e('btnClear').hide().id == 'btnClear' && $e('btnClear').style.display == 'none';
        };
        var t1 = function () {
            return $e('p1', idoc).hide().id == 'p1' && $e('p1', idoc).style.display == 'none';
        };
        var t2 = function () {
            return $t('b').hide().length == 10 && $t('b')[0].style.display == 'none';
        };
        return this.Test([t0, t1, t2]);
    },
    "html": function (idoc) {
        var t0 = function () {
            return $e('h1').html('HTML Scripts Zone').id == 'h1' && $e('h1').innerHTML == 'HTML Scripts Zone';
        };
        var t1 = function () {
            return $e('p1', idoc).html('de is awesome!').id == 'p1' && $e('p1', idoc).innerHTML == 'de is awesome!';
        };
        var t2 = function () {
            return $e('h1').html() == 'HTML Scripts Zone';
        };
        var t3 = function () {
            return $e('p1', idoc).html() == 'de is awesome!';
        };
        var t4 = function () {
            var rs = $t('div[id=divOut]').html('HTML').length == 1;
            return rs && $t('div[id=divOut]')[0].html() == 'HTML';
        };
        return this.Test([t0, t1, t2, t3, t4]);
    },
    "insert": function (idoc, divOut) {
        var opt = document.createElement('OPTION');
        opt.text = 'AA类';
        opt.value = 'AA';
        var childCount = $e('sel').childNodes.length;
        var t0 = function () {
            return $e('sel').insert(opt, 2).id == 'sel';
        };
        var t1 = function () {
            return $e('sel').childNodes.length == childCount + 1 && $e('sel').options.length == 4 && $e('sel').childNodes[2].value == 'AA';
        };
        var hr = idoc.createElement('HR');
        var t2 = function () {
            return $e('p2', idoc).insert(hr, 6).id == 'p2';
        };
        var t3 = function () {
            return $e('p2', idoc).childNodes[6].tagName == 'HR';
        };
        var t4 = function () {
            return $e(divOut).insert('insert').innerHTML.substring(0, 'insert'.length) == 'insert';
        };
        var t5 = function () {
            var rs = $t('tr[id=tr1]/td').insert(' insert1 ').length == 2;
            return rs && $t('tr[id=tr1]/td')[0].innerHTML.substr(0, 4) == ' ins';
        };
        return this.Test([t0, t1, t2, t3, t4, t5]);
    },
    "parent": function (idoc) {
        var t0 = function () {
            return $e('txt0').parent('tr').id = 'tr3';
        };
        var t1 = function () {
            return $e('txt0').parent('tr[id=tr3]') !== undefined && $e('txt0').parent('tr[id=tr2]') == undefined;
        };
        var t2 = function () {
            return $t('script')[0].parent('head').tagName == 'HEAD';
        };
        var t3 = function () {
            return $e('btnSubmit', idoc).parent('p[id=p2]') !== undefined && $e('btnSubmit', idoc).parent('p[id=p2]').id == 'p2';
        };
        return this.Test([t0, t1, t2, t3]);
    },
    "pos": function (idoc, divOut) {
        var t0 = function () {
            var pos = $e('spSideText').pos();
            var rs = pos.x == 16 && pos.y == 15;
            return "<span class='green'>#0</span>x=#1, y=#2".replace('#0', rs ? '✓' : '✕').replace('#1', pos.x).replace('#2', pos.y);
        };
        var t1 = function () {
            var pos = $e('spSideText', idoc).pos();
            var rs = pos.x == 210 && pos.y == 20;
            return "<span class='green'>#0</span>x=#1, y=#2".replace('#0', rs ? '✓' : '✕').replace('#1', pos.x).replace('#2', pos.y);
        };
        return [t0(), t1()];
    },
    "removeAttr": function (idoc, divOut) {
        var t0 = function () {
            return $e('btnClear').removeAttr('_data').id == 'btnClear' && $e('btnClear').getAttribute('_data') == null;
        };
        var t1 = function () {
            var rs = $t('img[id=img1]').removeAttr('alt').length == 1;
            var val = $e('img1').getAttribute('alt');
            return rs && !val;
        };
        var t2 = function () {
            return $e('p1', idoc).removeAttr('_data').id == 'p1' && $e('p1', idoc).getAttribute('_data') == null;
        };
        return this.Test([t0, t1, t2]);
    },
    "removeClass": function (idoc, divOut) {
        var t0 = function () {
            return $e('a0').removeClass('link1').id == 'a0' && $e('a0').className.indexOf('link1') < 0;
        };
        var t1 = function () {
            return $t('a[id=a1]').removeClass('link1').length == 1 && $t('a[id=a1]')[0].className.indexOf('link1') < 0;
        };
        var t2 = function () {
            return $e('p1', idoc).removeClass('dark1').id == 'p1' && $e('p1', idoc).className.indexOf('dark1') < 0;
        };
        return this.Test([t0, t1, t2]);
    },
    "show": function (idoc, divOut) {
        var t0 = function () {
            return $e('sp0').show().id == 'sp0' && $e('sp0').style.display != 'none';
        };
        var t1 = function () {
            return $t('span.hidden').show().length == 2 && $t('span.hidden')[1].style.display != 'none';
        };
        var t2 = function () {
            return $e('sp2', idoc).show().id == 'sp2' && $e('sp2', idoc).style.display != 'none';
        };
        return this.Test([t0, t1, t2]);
    },
    "tags": function (idoc, divOut) {
        var arr = null;
        var src0 = "'[\\,]'",
            src1 = '"[\\,]"';
        var t0 = function () {
            return (arr = $e('form1').tags('tr')) && arr.length == 5;
        };
        var t1 = function () {
            return (arr = $e('form1').tags('tr[id=tr1]')) && arr.length == 1 && arr[0].id == 'tr1';
        };
        var t2 = function () {
            return (arr = $e('divOut').tags('a,p,div,tr')) && arr.length == 0;
        };
        var t3 = function () {
            return (arr = $e('p2', idoc).tags('input[type=radio]')) && arr.length == 4;
        };
        var t4 = function () {
            return (arr = $e(document.body).tags('img[src~="' + src0 + '"]')) && arr.length == 1 && arr[0].id == 'img1';
        };
        var t5 = function () {
            return (arr = $e(document.body).tags('div.doc\\p\\a[href*="/a.html"]')) && arr.length == 2 && arr[0].id == 'a0' && arr[1].id == 'a1';
        };
        return this.Test([t0, t1, t2, t3, t4, t5]);
    },
    "text": function (idoc, divOut) {
        var t0 = function () {
            return $e('sp0').text() == 'hidden text 0.';
        };
        var t1 = function () {
            return $e('sp2', idoc).text() == 'hidden text 2.';
        };
        var t2 = function () {
            return $t('p/b').text('一').length == 10 && $t('p/b')[1].text() == '一';
        };
        var t3 = function () {
            return $e('txt0').text('TEXT0').id == 'txt0' && ($e('txt0').innerText || $e('txt0').textContent || '') == 'TEXT0';
        };
        return this.Test([t0, t1, t2, t3]);
    },
    "unbind": function (idoc, divOut) {
        var btn0 = document.getElementById('btnClear'),
            btn1 = idoc.getElementById('btnSubmit'),
            rs0 = false,
            rs1 = false,
            onclick0 = function (evt) {
                rs0 = false;
            },
            onclick1 = function (evt) {
                rs1 = false;
            };
        $e(btn1).bind('click', onclick1);
        var t0 = function () {
            rs0 = $e(btn0).bind('click', onclick0).id == 'btnClear';
            rs0 = rs0 && $e(btn0).unbind('click', onclick0).id == 'btnClear';
            typeof btn0.fireEvent == 'function' ? btn0.fireEvent('click') : typeof btn0.click == 'function' ? btn0.click() : null;
            return rs0;
        };
        var t1 = function () {
            rs1 = $e(btn1).bind('click', onclick1).id == 'btnSubmit';
            rs1 = rs1 && $e(btn1).unbind('click', onclick1).id == 'btnSubmit';
            typeof btn1.fireEvent == 'function' ? btn1.fireEvent('click') : typeof btn1.click == 'function' ? btn1.click() : null;
            return rs1;
        };
        return this.Test([t0, t1]);
    },
    "val": function (idoc, divOut) {
        var t0 = function () {
            var rs = $e('txt0').val('test val().').id == 'txt0';
            return rs && $e('txt0').val() == 'test val().';
        };
        var t1 = function () {
            $e('sel').selectedIndex = 0;
            var rs = $e('sel').val() == 'A';
            rs = rs && $e('sel').val('B').id == 'sel';
            return rs && $e('sel').val() == 'B';
        };
        var t2 = function () {
            var rs = $e('sp0').val() == null || $e('sp0').val() == undefined;
            return rs && $e('divOut').val('test val()-t2()').id == 'divOut';
        };
        var t3 = function () {
            $e('*group2').each(function (i, e) {
                e.checked = false;
            });
            $e('cb1').checked = true;
            $e('cb2').checked = true;
            return $e('*group2').val() == '100-500,500-1000';
        };
        var t4 = function () {
            $e('rb0').checked = true;
            var rs = $e('*group1').val() == 'red';
            $e('*group1')[0].val('yellow');
            $t('label').each(function (i, e) {
                e.innerHTML = document.getElementById(e.getAttribute('for')).value;
            });
            return rs && $e('*group1').val() == 'yellow';
        };
        var t5 = function () {
            $e('rb0', idoc).checked = true;
            var rs = $e('*group2', idoc).val() == 'east';
            $t('input[name=group2,id=rb0]', idoc).val('EAST');
            $t('label', idoc).each(function (i, e) {
                e.innerHTML = idoc.getElementById(e.getAttribute('for')).value;
            });
            return rs && $e('*group2', idoc).val() == 'EAST';
        };
        return this.Test([t0, t1, t2, t3, t4, t5]);
    },
    "value": function (idoc, divOut) {
        var t0 = function () {
            $e('rb1').checked = true;
            var rs = $e('*group1').value == 'green';
            $e('rb2').checked = true;
            return rs && $e('*group1').value == 'blue';
        };
        var t1 = function () {
            $e('*group2').each(function (i, e) {
                e.checked = false;
            });
            $e('cb1').checked = true;
            $e('cb2').checked = true;
            return $e('*group2').value == '100-500,500-1000' && $t('input[id^=cb]').value == '100-500,500-1000';
        };
        var t2 = function () {
            $e('rb1', idoc).checked = true;
            return $e('*group2', idoc).value == 'south';
        };
        return this.Test([t0, t1, t2]);
    },
    //"Array.forEach": function () {
    //    var rs = true;
    //    var t0 = function () {
    //        var arr = [], indexs = [];
    //        [1, 3, 7].forEach(function (e, i) {
    //            arr.push(e);
    //            indexs.push(i);
    //            rs = rs && e != this;
    //        });
    //        return arr[0] == 1 && arr[1] == 3 && arr[2] == 7 && indexs[0] == 0 && indexs[1] == 1 && indexs[2] == 2;
    //    };
    //    return this.Test([t0]).concat([rs]);
    //},
    "Array.each": function () {
        var rs = true;
        var t0 = function () {
            var arr = [], indexs = [], rs = [];
            [1, 3, 7].each(function (i, e) {
                arr.push(e);
                indexs.push(i);
                rs = rs && e == this;
            });
            return arr[0] == 1 && arr[1] == 3 && arr[2] == 7 && indexs[0] == 0 && indexs[1] == 1 && indexs[2] == 2;
        };
        return this.Test([t0]).concat([rs]);
    },
    "Array.exists": function () {
        var t0 = function () {
            var arr0 = [1, 3, 7],
                arr1 = ['a', 'c', 'e'];
            return arr0.exists(1) && arr0.exists(3) && arr0.exists(7) && !arr0.exists(2)
                && arr1.exists('a') && arr1.exists('c') && arr1.exists('e') && !arr1.exists('b');
        };
        return this.Test([t0]);
    },
    "Array.indexOf": function () {
        var t0 = function () {
            var arr = [1, 3, 7, 'a', 'c', 'e'];
            return arr.indexOf(1) == 0 && arr.indexOf(7) == 2 && arr.indexOf('c') == 4 && arr.indexOf('e') == 5;
        };
        return this.Test([t0]);
    },
    "Array.remove": function () {
        var t0 = function () {
            var arr = [0,1,2,3,4];
            return arr.remove(1) && arr[0] == 0 && arr[1] == 2 && arr.length == 4;
        };
        return this.Test([t0]);
    },
    "Date.add": function () {
        var t0 = function () {
            var date = new Date('2019-12-01'),
                date0 = date.add('d', 1),
                date1 = date.add('D', -2);
            return date.getDate() == 1 && date0.getDate() == 2 && date1.getDate() == 29 && date1.getMonth() == 10;
        };
        var t1 = function () {
            var date = new Date('2019-12-01'),
                date0 = date.add('M', 1),
                date1 = date.add('M', -2);
            return date.getMonth() == 11 && date0.getMonth() == 0 && date0.getFullYear() == 2020 && date1.getMonth() == 9;
        };
        var t2 = function () {
            var date = new Date('2019-12-01'),
                date0 = date.add('y', 1),
                date1 = date.add('Y', -2);
            return date.getFullYear() == 2019 && date0.getFullYear() == 2020 && date1.getFullYear() == 2017;
        };
        var t3 = function () {
            var date = new Date('2019-12-01'),
                date0 = date.add('w', 1),
                date1 = date.add('W', -2);
            return date.getDate() == 1 && date0.getDate() == 8 && date0.getMonth() == 11 && date1.getDate() == 17 && date1.getMonth() == 10;
        };
        var t4 = function () {
            var date = new Date(2019, 11, 31, 23, 59, 59, 150),
                date0 = date.add('f', 100),
                date1 = date.add('f', -200);
            return date.getMilliseconds() == 150 && date0.getMilliseconds() == 250 && date1.getMilliseconds() == 950 && date1.getSeconds() == 58;
        };
        var t5 = function () {
            var date = new Date(2019, 11, 31, 23, 59, 59, 150),
                date0 = date.add('s', 2),
                date1 = date.add('s', -3);
            return date.getSeconds() == 59 && date0.getSeconds() == 1 && date0.getMinutes() == 0 && date1.getSeconds() == 56;
        };
        var t6 = function () {
            var date = new Date(2019, 11, 31, 23, 59, 59, 150),
                date0 = date.add('m', 2),
                date1 = date.add('m', -4);
            var m = date.getMinutes(),
                m0 = date0.getMinutes(),
                h0 = date0.getHours(),
                m1 = date1.getMinutes();
            return date.getMinutes() == 59 && date0.getMinutes() == 1 && date0.getHours() == 0 && date1.getMinutes() == 55;
        };
        var t7 = function () {
            var date = new Date(2019, 11, 31, 23, 59, 59, 150),
                date0 = date.add('h', 3),
                date1 = date.add('H', -4);
            return date.getHours() == 23 && date0.getHours() == 2 && date0.getDate() == 1 && date0.getFullYear() == 2020 && date1.getHours() == 19;
        };
        return this.Test([t0, t1, t2, t3, t4, t5, t6, t7]);
    },
    "Date.diff": function () {
        var t0 = function () {
            var date0 = new Date(2019, 11, 30, 23, 59, 59, 150),
                date1 = new Date(2019, 11, 31, 0, 0, 0);
            return date0.diff('f', date1) == 850;
        };
        var t1 = function () {
            var date0 = new Date(2019, 11, 30, 23, 59, 59, 150),
                date1 = new Date(2019, 11, 31, 0, 0, 0),
                date2 = new Date(2020, 0, 1, 0, 0, 0);
            return date0.diff('s', date1) == 0 && date1.diff('s', date2) == 24 * 60 * 60;
        };
        var t2 = function () {
            var date1 = new Date('2019-12-31'),
                date2 = new Date('2020-01-01');
            return date1.diff('m', date2) == 24 * 60;
        };
        var t3 = function () {
            var date1 = new Date('2019-12-31'),
                date2 = new Date('2020-01-01');
            return date1.diff('h', date2) == 24 && date1.diff('H', date2) == 24;
        };
        var t4 = function () {
            var date0 = new Date(2019, 11, 30, 12, 30, 0),
                date1 = new Date(2019, 11, 31, 0, 0, 0),
                date2 = new Date(2020, 0, 1, 0, 0, 0),
                date3 = new Date(2020, 11, 31, 0, 0, 0);
            return date0.diff('d', date1) == 0 && date1.diff('d', date2) == 1 && date1.diff('D', date3) == 366;
        };
        var t5 = function () {
            var date1 = new Date('2019-12-31'),
                date2 = new Date('2020-01-01'),
                date3 = new Date('2020-12-31');
            return date1.diff('M', date2) == 1 && date1.diff('M', date3) == 12;
        };
        return this.Test([t0, t1, t2, t3, t4, t5]);
    },
    "Date.fromString": function () {
        var Y, M, D, h, m, s, f;
        var extract = function (date) {
            Y = M = D = h = m = s = f = 0;
            if (!isNaN(date)) {
                Y = date.getFullYear();
                M = date.getMonth();
                D = date.getDate();
                h = date.getHours();
                m = date.getMinutes();
                s = date.getSeconds();
                f = date.getMilliseconds();
            }
            return !isNaN(date);
        };
        var t0 = function () {
            var date = new Date().fromString("2019.9.20", "YYYY.M.D");
            return extract(date) && Y == 2019 && M == 8 && D == 20 && h == 0 && m == 0 && s == 0 && f == 0;
        };
        var t1 = function () {
            var date = new Date().fromString("2019-09-20 02:34:09.150", "YYYY-MM-DD hh:mm:ss.fff");
            return extract(date) && Y == 2019 && M == 8 && D == 20 && h == 2 && m == 34 && s == 9 && f == 150;
        };
        var t2 = function () {
            var d0 = new Date().fromString("2019-09-20 02:34:09.150", "YYYY-MM-DD hh:mm:ss.fff");
            var d1 = new Date().fromString("2019-09-20 02:34:09.150", "YYYY-MM-DD HH:MIN:SS.FFF");
            var d2 = new Date().fromString("2019-09-20 02:34:09.150", "yyyy-MM-dd hh:Min:ss.fff");
            var d3 = new Date().fromString("2019-09-20 02:34:09.150", "yyyy-MM-dd hh:min:ss.fff");
            var d4 = new Date().fromString("2019-09-20 02:34:09.150", "yyyy-MM-dd hh:mm:ss.fff");
            var d5 = new Date().fromString("2019-09-20 02:34:09.150", "yyyy-MM-DD hh:mm:SS.fff");
            return d0.valueOf() == d1.valueOf() && d1.valueOf() == d2.valueOf() && d2.valueOf() == d3.valueOf() && d3.valueOf() == d4.valueOf() && d4.valueOf() == d5.valueOf();
        };
        var t3 = function () {
            var date = new Date().fromString("9/20/2019 2:34:9.150", "M/D/YYYY h:m:s.fff");
            return extract(date) && Y == 2019 && M == 8 && D == 20 && h == 2 && m == 34 && s == 9 && f == 150;
        };
        var t4 = function () {
            var date = new Date().fromString("Friday September 20 2019 02:34:09.150", "Week Month DD YYYY hh:mm:ss.fff");
            return extract(date) && Y == 2019 && M == 8 && D == 20 && h == 2 && m == 34 && s == 9 && f == 150;
        };
        var t5 = function () {
            var d0 = new Date().fromString("Friday September 20 2019 02:34:09.150", "Week Month dd YYYY hh:mm:ss.fff");
            var d1 = new Date().fromString("Friday September 20 2019 02:34:09.150", "WEEK MONTH DD YYYY hh:mm:ss.fff");
            var d2 = new Date().fromString("Friday September 20 2019 02:34:09.150", "week month dd yyyy hh:mm:ss.fff");
            return t4() && d0.valueOf() == d1.valueOf() && d1.valueOf() == d2.valueOf();
        };
        var t6 = function () {
            var date = new Date().fromString("Fri Sep 20/2019 02:34:09.150", "Wee Mon DD/YYYY hh:mm:ss.fff");
            return extract(date) && Y == 2019 && M == 8 && D == 20 && h == 2 && m == 34 && s == 9 && f == 150;
        };
        var t7 = function () {
            var d0 = new Date().fromString("Fri Sep 20/2019 02:34:09.150", "Wee Mon DD/YYYY hh:mm:ss.fff");
            var d1 = new Date().fromString("Fri Sep 20/2019 02:34:09.150", "WEE MON DD/YYYY hh:mm:ss.fff");
            var d2 = new Date().fromString("Fri Sep 20/2019 02:34:09.150", "wee mon dd/yyyy hh:mm:ss.fff");
            return t6() && d0.valueOf() == d1.valueOf() && d1.valueOf() == d2.valueOf();
        };
        var t8 = function () {
            var d0 = new Date().fromString("Fr Se 20 19 2:34:9.150", "WE MO D YY h:m:s.fff");
            var d1 = new Date().fromString("Fr Se 20 19 2:34:9.150", "We Mo D YY h:m:s.fff");
            var d2 = new Date().fromString("Fr Se 20 19 2:34:9.150", "we mo d yy h:m:s.fff");
            return d0.valueOf() == d1.valueOf() && d1.valueOf() == d2.valueOf()
                && extract(d0) && Y == 2019 && M == 8 && D == 20 && h == 2 && m == 34 && s == 9 && f == 150;
        };
        var t9 = function () {
            var date = new Date().fromString("2019年9月20日 2时34分9秒", "YYYY年M月D日 h时m分s秒");
            return extract(date) && Y == 2019 && M == 8 && D == 20 && h == 2 && m == 34 && s == 9 && f == 0;
        };
        var t10 = function () {
            var date = new Date().fromString("9/20/2019 PM 2:34", "M/D/YYYY AM h:min");
            return extract(date) && Y == 2019 && M == 8 && D == 20 && h == 14 && m == 34 && s == 0 && f == 0;
        };
        var t11 = function () {
            var date = new Date().fromString("9/20/2019PM2:34", "M/D/YYYYAMh:m");
            return extract(date) && Y == 2019 && M == 8 && D == 20 && h == 14 && m == 34 && s == 0 && f == 0;
        };
        return this.Test([t0, t1, t2, t3, t4, t5, t6, t7, t8, t9, t10, t11]);
    },
    "Date.toObject": function () {
        var date = new Date(2019, 11, 1, 12, 30, 45, 150),
            dt = date.toObject();
        return [dt.Y == 2019, dt.M == 11, dt.D == 1, dt.W == 0, dt.h == 12, dt.m == 30, dt.s == 45, dt.f == 150];
    },
    "Date.toString": function () {
        var date = new Date(2019, 11, 1, 9, 8, 45, 150);
        var t0 = function () {
            return date.toString('YYYY.M.D') == '2019.12.1';
        };
        var t1 = function () {
            return date.toString('YYYY-MM-DD hh:mm:ss.fff') == '2019-12-01 09:08:45.150';
        };
        var t2 = function () {
            var s0 = date.toString('YYYY-MM-DD hh:mm:ss.fff');
            var s1 = date.toString('YYYY-MM-DD HH:MIN:SS.FFF');
            var s2 = date.toString('yyyy-MM-dd HH:Min:SS.FFF');
            var s3 = date.toString('yyyy-MM-dd hh:min:ss.fff');
            var s4 = date.toString('yyyy-MM-dd hh:mm:ss.fff');
            return t1() && s0 == s1 && s1 == s2 && s2 == s3 && s3 == s4;
        };
        var t3 = function () {
            return date.toString('M/D/YY h:m:s.fff') == '12/1/19 9:8:45.150';
        };
        var t4 = function () {
            var s = date.toString('WEEK MONTH DD/YYYY HH:MIN:SS.FFF'); 
            return s == 'Sunday December 01/2019 09:08:45.150';
        };
        var t5 = function () {
            var s0 = date.toString('WEEK MONTH DD/YYYY HH:MIN:SS.FFF');
            var s1 = date.toString('Week Month DD/YYYY hh:min:ss.fff');
            var s2 = date.toString('week month dd/yyyy hh:min:ss.fff');
            var s3 = date.toString('week month dd/yyyy hh:mm:ss.fff');
            var s4 = date.toString('WEEK month DD/yyyy HH:mm:SS.fff');
            return t4() && s0 == s1 && s1 == s2 && s2 == s3 && s3 == s4;
        };
        var t6 = function () {
            return date.toString('WE MO DD/YY hh:min:ss') == 'Su De 01/19 09:08:45';
        };
        var t7 = function () {
            var s0 = date.toString('WE MO DD/YY hh:min:ss');
            var s1 = date.toString('WE MO DD/YY HH:MIN:SS');
            var s2 = date.toString('We Mo DD/YY hh:min:ss');
            var s3 = date.toString('we mo dd/yy hh:min:ss');
            var s4 = date.toString('we mo dd/yy hh:mm:ss');
            return t6() && s0 == s1 && s1 == s2 && s2 == s3 && s3 == s4;
        };
        var t8 = function () {
            return date.toString('WEE MON DD-YY') == 'Sun Dec 01-19';
        };
        var t9 = function () {
            var s0 = date.toString('WEE MON DD-YY');
            var s1 = date.toString('Wee Mon DD-YY');
            var s2 = date.toString('wee mon dd-yy');
            var s3 = date.toString('Wee mon DD-yy');
            return t8() && s0 == s1 && s1 == s2 && s2 == s3;
        };
        return this.Test([t0, t1, t2, t3, t4, t5, t6, t7, t8, t9]);
    },
    "String.format": function () {
        var t0 = function () {
            var str = 'A+B={0}, C-D={1}'.format(12, 34);
            return str === 'A+B=12, C-D=34';
        };
        var t1 = function () {
            var data0 = "\\~!@#$%^&*()_+`-=[中文]\{}|;':,./< >?",
                data1 = '\\~!@#$%^&*()_+`-=[中文]\{}|;":,./< >?';
            var str = '_dat0=\'{0}\' and _data1 = "{1}"'.format(data0, data1);
            return str === '_dat0=\'\\~!@#$%^&*()_+`-=[中文]\{}|;\':,./< >?\' and _data1 = "\\~!@#$%^&*()_+`-=[中文]\{}|;":,./< >?"';
        };
        var t2 = function () {
            var data0 = '\\~!@#$%^&*()_+`-=[中文]\{}|;":,./< >?';
            var ptn = 'if (A > {0}) { B = "{1}"; C = \'{2}\'; D = "{3}"; }';
            var str = ptn.format(3, data0, '{2}', "{3, 4}");
            return str === 'if (A > 3) { B = "\\~!@#$%^&*()_+`-=[中文]\{}|;":,./< >?"; C = \'{2}\'; D = "{3, 4}"; }';
        };
        return this.Test([t0, t1, t2]);
    },
    "String.trim": function () {
        var t0 = function () {
            var s0 = '\t\r\n AB CD 中文 \r\r\n';
            return s0.trim() == 'AB CD 中文';
        };
        var t1 = function () {
            var s0 = '\t\r\n \uFEFF\xA0 AB\tCD\n中文 \uFEFF\xA0 \t\r\n';
            return s0.trim() == 'AB\tCD\n中文';
        };
        return this.Test([t0, t1]);
    },
    "String.includes": function () {
        var t0 = function () {
            var s0 = 'AB中文CD';
            return s0.includes('AB') && s0.includes('中文') && s0.includes('CD');
        };
        var t1 = function () {
            var s0 = '\t\r\n \uFEFF\xA0 AB\tCD\n中文 \uFEFF\xA0 \t\r\n';
            return s0.includes('中文');
        };
        return this.Test([t0, t1]);
    },
    Test: function (testors) {
        var arr = [];
        for (var i = 0; i < testors.length; i++) {
            try {
                arr.push(!!testors[i]());
            }
            catch (ex) {
                arr.push(ex.message);
            }
        }
        return arr;
    }
}

function getTestorFunctionName(btn) {
    var span = btn.previousSibling.tagName == 'SPAN' ? btn.previousSibling : btn.previousSibling.previousSibling,
        index = span.innerHTML.indexOf('('); 
    return index > 0 ? span.innerHTML.substring(0, index) : span.innerHTML;
}

function btnTest_click(evt) {
    var span = evt.srcElement.nextSibling,
        divOut = document.getElementById('divOut'),
        iframe = document.getElementById('iframe1'),
        frm1 = frames['frame1'] || iframe.contentWindow,
        idoc = frm1 ? frm1.document : null,
        name = getTestorFunctionName(evt.srcElement);
    try {
        var arr = typeof Testor[name] == 'function' ? Testor[name](idoc, divOut, span) : [];
        OnTestSucceed(arr, span);
    } catch (ex) {
        span.innerHTML = ex.message;
    }
}

function OnTestSucceed(arr, span) {
    span.innerHTML = '';
    for (var i = 0; i < arr.length; i++) {
        span.innerHTML += typeof arr[i] == 'string' ? arr[i] : arr[i] ? "<span class='green'>✓</span>" : "<span class='red'>✕</span>";
        span.innerHTML += ((i & 0x03) == 3 ? ' ' : '');
    }
}

function bind(e, name, method) {
    if (e.attachEvent) {
        e.attachEvent('on' + name, method);
    } else if (e.addEventListener) {
        e.addEventListener(name, method, false);
    } else if (e && e !== undefined) {
        e[name] = method;
    }
}

function btnTestAll_click(evt) {
    var btns = document.getElementById('divTestor').getElementsByTagName('BUTTON');
    for (var i = 0; i < btns.length; i++) {
        btns[i].click();
    }
}

document.ready(function () {
    var btns = document.getElementById('divTestor').getElementsByTagName('BUTTON');
    for (var i = 0; i < btns.length; i++) {
        var name = getTestorFunctionName(btns[i]);
        typeof Testor[name] == 'function' ? bind(btns[i], 'click', btnTest_click) : (btns[i].disabled = true);
    }
    bind(document.getElementById('btnTestAll'), 'click', btnTestAll_click);
    document.getElementById('h2').innerHTML += '<span class="red"> Testers are ready!</span>';
});

document.ready(function () {
    document._testReady = 1;
});