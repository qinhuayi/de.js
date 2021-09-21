class Testor {
    $e(idoc, divOut) {
        const t0 = () => typeof $e('iframe1') == 'object' && $e('iframe1') && $e('iframe1').tagName == 'IFRAME';
        const t1 = () => $e(document.body) && $e(document.body).tagName == 'BODY';
        const t2 = () => {
            let p = $e('p1', idoc);
            return typeof p == 'object' && p && p.tagName == 'P';
        };
        const t3 = () => typeof $e('*group1') == 'object' && $e('*group1') && $e('*group1').length == 3;
        const t4 = () => typeof $e('*group2', idoc) == 'object' && $e('*group2', idoc) && $e('*group2', idoc).length == 4;
        const t5 = () => {
            let sp0 = $e("<span class='red'>");
            let rs = typeof sp0 == 'object' && sp0 && sp0.tagName == 'SPAN';
            rs && divOut.appendChild(sp0);
            return rs && (sp0.innerHTML = '$e-sp0');
        };
        const t6 = () => {
            let sp1 = $e("<span class='red'>", idoc);
            let divOut2 = idoc && idoc.getElementById('divOut');
            let rs = divOut2 && typeof sp1 == 'object' && sp1 && sp1.tagName == 'SPAN';
            divOut2 && divOut2.appendChild(sp1);
            return rs && (sp1.innerHTML = '$e-sp1');
        };
        return this.Test([t0, t1, t2, t3, t4, t5, t6]);
    }

    $t(idoc, divOut) {
        let arr = null;
        const t0 = () => {
            let rs = typeof $t('form') == 'object' && (arr = $t('form')) && arr.length == 1;
            return rs && typeof $tags('form') == 'object' && (arr = $tags('form')) && arr.length == 1;
        };
        const t1 = () => (arr = $t('h1,h2')) && arr.length == 3;
        const t2 = () => (arr = $t('div.doc')) && arr.length == 1 && arr[0].className == 'doc';
        const t3 = () => (arr = $t('a[id]')) && arr.length == 3 && arr[0].id == 'a0';
        const t4 = () => {
            let rs = (arr = $t('a[id=a1]')) && arr.length == 1 && arr[0].id == 'a1';
            return rs && (arr = $t('a[id==a1]')) && arr.length == 1 && arr[0].id == 'a1';
        };
        const t5 = () => (arr = $t('a[class*=ink]')) && arr.length == 3 && arr[0].className.indexOf('ink') >= 0;
        const t6 = () => (arr = $t('img[id~=0]')) && arr.length == 1 && arr[0].id == 'img1';
        const t7 = () => (arr = $t('a[id$=0]')) && arr.length == 1 && arr[0].id == 'a0';
        const t8 = () => (arr = $t('a[id^=a]')) && arr.length == 3 && arr[2].id == 'a2';
        const t9 = () => (arr = $t('img[id!=img1]')) && arr.length == 1 && arr[0].id == 'img0';
        let sdata0 = document.getElementById('img0').getAttribute('_data'), //"\\~!@#$%^&*()_+`-=[中文]\{}|;':,./< >?",
            sdata1 = document.getElementById('img1').getAttribute('_data'); //'\\~!@#$%^&*()_+`-=[中文]\{}|;":,./< >?';
        const t10 = () => (arr = $t('img[_data]')) && arr.length == 2 && arr[0].id == 'img0';
        const t11 = () => {
            let rs = (arr = $t('img[_data="' + sdata0 + '"]')) && arr.length == 1 && arr[0].id == 'img0';
            return rs && (arr = $t("img[_data='" + sdata1 + "']")) && arr.length == 1 && arr[0].id == 'img1';
        };
        const t12 = () => {
            let rs = (arr = $t('img[_data*="]')) && arr.length == 1 && arr[0].id == 'img1';
            return rs && (arr = $t("img[_data*=']")) && arr.length == 1 && arr[0].id == 'img0';
        }
        let src0 = "'[\\,]'",
            src1 = '"[\\,]"';
        const t13 = () => {
            let rs = (arr = $t('img[src~="' + src0 + '"]')) && arr.length == 1 && arr[0].id == 'img1';
            return rs && (arr = $t("img[src~='" + src1 + "']")) && arr.length == 1 && arr[0].id == 'img0';
        };
        const t14 = () => (arr = $t("a[href$='detail']")) && arr.length == 1 && arr[0].id == 'a0';
        const t15 = () => (arr = $t('a[href^="./X/页/a.html"]')) && arr.length == 2 && arr[0].id == 'a0' && arr[1].id == 'a1';
        const t16 = () => (arr = $t('img[_data!="' + sdata0 + '"]')) && arr.length == 1 && arr[0].id == 'img1';
        const t17 = () => (arr = $t('a.link1[id*=a, href*="/页/a.html?id=1&mode=more"]')) && arr.length == 1 && arr[0].id == 'a1';
        const t18 = () => {
            let rs = (arr = $t('div.doc\\p\\a[href*="/a.html"]')) && arr.length == 2 && arr[0].id == 'a0' && arr[1].id == 'a1';
            return rs && (arr = $t('div.doc/p/a[href*="/a.html"]')) && arr.length == 2 && arr[0].id == 'a0' && arr[1].id == 'a1';
        };
        const t19 = () => {
            let rs = (arr = $t('div.doc//a[href*="/a.html"]')) && arr.length == 2 && arr[0].id == 'a0' && arr[1].id == 'a1';
            return rs && (arr = $t('div.doc\\\\a[href*="/a.html"]')) && arr.length == 2 && arr[0].id == 'a0' && arr[1].id == 'a1';
        };
        const t20 = () => {
            let rs = (arr = $t('p.poem/a[id^=a, href*="./X/页/"], div.doc//img[id^="img", src*="/res/"]')) && arr.length == 4 && arr[1].id == 'a1' && arr[3].id == 'img1';
            return rs && (arr = $t('p.poem/a[id^="a", href*="./X/页/"], body//img[id^="img", src*="' + src0 + '"]')) && arr.length == 3 && arr[1].id == 'a1' && arr[2].id == 'img0';
        };
        const t21 = () => (arr = $t('input[name=group2]', idoc)) && arr.length == 4;
        const t22 = () => (arr = $t('a[id]:first')) && arr[0].id == 'a0' && (arr = $t('h2:first,a[id]:first')) && arr.length == 2 && arr[0].id == 'h2' && arr[1].id == 'a0';
        const t23 = () => (arr = $t('a[id]:last')) && arr[0].id == 'a2' && (arr = $t('h2:last,div.doc//a[id]:last')) && arr.length == 2 && arr[0].id == 'h1' && arr[1].id == 'a2';
        const t24 = () => (arr = $t('div.doc//a:even')) && arr.length == 2 && arr[0].id == 'a0' && arr[1].id == 'a2';
        const t25 = () => (arr = $t('div.doc//a:odd')) && arr.length == 1 && arr[0].id == 'a1';
        const t26 = () => (arr = $t('form//tr:eq(1)')) && arr.length == 1 && arr[0].id == 'tr1' && (arr = $t('table//tr:eq(2)')) && arr.length == 1 && arr[0].id == 'tr2';
        const t27 = () => (arr = $t('form//tr:gt(1)')) && arr.length == 3 && arr[0].id == 'tr2';
        const t28 = () => (arr = $t('form//tr:lt(2)')) && arr.length == 2 && arr[0].id == 'tr0' && arr[1].id == 'tr1';
        const t29 = () => (arr = $t('div.doc//a.link1[id]:gt(0)')) && arr.length == 2 && arr[0].id == 'a1' && arr[1].id == 'a2';
        const t30 = () => (arr = $t('(a|img).link1[id]')) && arr.length == 3 && arr[0].id == 'a0' && (arr = $t('div.doc//(a|img).link1[id],textarea')) && arr.length == 4 && arr[0].id == 'a0' && arr[3].id == 'txtArea';
        const t31 = () => (arr = $t('(a.link1|img)[id]')) && arr.length == 5 && arr[0].id == 'a0' && arr[4].id == 'img1' && (arr = $t('div.doc//(a.link1|img)[id],textarea')) && arr.length == 6 && arr[0].id == 'a0' && arr[5].id == 'txtArea';

        return this.Test([t0, t1, t2, t3, t4, t5, t6, t7, t8, t9, t10, t11, t12, t13, t14, t15, t16, t17, t18, t19, t20, t21, t22, t23, t24, t25, t26, t27, t28, t29, t30, t31]);
    }

    _ajax(idoc, divOut, span) {
        const t0 = () => {
            const onsuccess = function (xhr) {
                document.getElementById('txtArea').value = xhr.text;
                let rs0 = xhr.text.indexOf('<ID>12</ID>') > 0 && xhr.text.indexOf('<Name>BCD</Name>') > 0 && xhr.text.indexOf('<Text>中文</Text>') > 0;
                span.innerHTML += rs0 ? "<span class='green'>✓</span>" : "<span class='red'>✕</span>";
            };
            _ajax({ url: '../res/data.xml', onsuccess: onsuccess });
            return true;
        };
        const t1 = () => {
            const onsuccess = function (xhr) {
                span.innerHTML += "<span class='green'>✓</span>status=" + xhr.status;
            };
            const onerror = function (xhr) {
                document.getElementById('txtArea').value += xhr.status;
                span.innerHTML += "<span class='green'>✓</span>status=" + xhr.status;
            };
            _ajax({ url: '!@#$%^&*.html', onsuccess: onsuccess, onerror: onerror });
            return true;
        };
        //...
        return this.Test([t0, t1]);
    }

    _htmlEncode() {
        let html = 'if (a > b) && (c < a) return "Larger"; else \'Smaller\';',
            code0 = 'if (a &gt; b) &amp;&amp; (c &lt; a) return &quot;Larger&quot;; else &apos;Smaller&apos;;',
            code1 = 'if (a &#62; b) &#38;&#38; (c &#60; a) return &#34;Larger&#34;; else &#39;Smaller&#39;;';
        const t0 = () => {
            let str0 = _htmlEncode(html),
                str1 = _htmlEncode(html, 0);
            return str0 == code0 && str1 == code0;
        };
        const t1 = () => _htmlEncode(html, 1) == code1;        
        const t2 = () => {
            html = "if (a &gt; b) return &quot;Larger&quot;";
            return _htmlEncode(html, 0) == "if (a &amp;gt; b) return &amp;quot;Larger&amp;quot;";
        };
        return this.Test([t0, t1, t2]);
    }

    _htmlDecode() {
        let html = 'if (a > b) && (c < a) return "Larger"; else \'Smaller\';',
            code0 = 'if (a &gt; b) &amp;&amp; (c &lt; a) return &quot;Larger&quot;; else &apos;Smaller&apos;;',
            code1 = 'if (a &#62; b) &#38;&#38; (c &#60; a) return &#34;Larger&#34;; else &#39;Smaller&#39;;',
            code2 = 'if (a &amp;gt; b) return &amp;quot;Larger&amp;quot;';
        const t0 = () => _htmlDecode(code0) == html && _htmlDecode(code0, 0) == html;
        const t1 = () => {
            let str = _htmlDecode(code1, 1);
            return str == html;
        };
        const t2 = () => _htmlDecode(code2) == 'if (a &gt; b) return &quot;Larger&quot;';
        return this.Test([t0, t1, t2]);
    }

    _url2JSON() {
        let url = '../res/小图/img1.asp?id=2&name=张三&arr=["e","f","g"]&ref=../pages/a.html?pid=3',
            obj = _url2JSON(url);
        const t0 = () => obj.url == url;
        const t1 = () => obj.filePath == '../res/小图/img1.asp';
        const t2 = () => obj.fileDir == '../res/小图';
        const t3 = () => obj.fileName == 'img1.asp';
        const t4 = () => obj.fileShortName == 'img1';
        const t5 = () => obj.fileExt == '.asp';
        const t6 = () => obj.query == 'id=2&name=张三&arr=["e","f","g"]&ref=../pages/a.html?pid=3';
        const t7 = () => obj.queryValue('id') == 2 && obj.queryValue('name') == '张三' && obj.queryValue('arr') == '["e","f","g"]' && obj.queryValue('ref') == '../pages/a.html?pid=3';
        const t8 = () => obj.hasParam('id') && obj.hasParam('name') && obj.hasParam('arr') && obj.hasParam('ref') && !obj.hasParam('pid');
        const t9 = () => obj.params.length == 4 && obj.params[0].name == 'id' && obj.params[0].value == 2 && obj.params[1].name == 'name' && obj.params[1].value == '张三' && obj.params[2].name == 'arr' && obj.params[2].value == '["e","f","g"]' && obj.params[3].name == 'ref' && obj.params[3].value == '../pages/a.html?pid=3';
        return this.Test([t0, t1, t2, t3, t4, t5, t6, t7, t8, t9]);
    }

    _new(idoc) {
        const t0 = () => _new('<i>').tagName == 'I';
        const t1 = () => {
            var el = _new('<span id="s0">');
            return el.tagName == 'SPAN' && el.id == 's0';
        };
        const t2 = function () {
            var el = _new('<span id="s01">', idoc);
            idoc.body.appendChild(el);
            return el.tagName == 'SPAN' && el.id == 's01' && idoc.getElementById('s01') == el;
        };
        return this.Test([t0, t1, t2]);
    }

    _merge() {
        const equal = (a, b) => {
            for (var n in a) if (b[n] == undefined || b[n] != a[n]) return false;
            return true;
        };
        const t0 = function () {
            const a = { a: 'a', b: 'b0' }, b = { b: 'b1', c: 'c1' }, o = _merge(a, b);
            return equal(o, { a: 'a', b: 'b1', c: 'c1' }) && equal(a, { a: 'a', b: 'b0' }) && equal(b, { b: 'b1', c: 'c1' });
        };
        const t1 = function () {
            const a = { a: 'a', b: 'b0' }, b = { b: 'b1', c: 'c1' }, c = { b: 'b2', c: 'c2', d: 'd2' }, d = null, e = 123, f = 'abc', g = undefined, h = { h: 'h' };
            const o = _merge(a, b, c, d, e, f, g, h);
            return equal(o, { a: 'a', b: 'b2', c: 'c2', d: 'd2', h: 'h' }) && equal(a, { a: 'a', b: 'b0' }) && equal(b, { b: 'b1', c: 'c1' }) && equal(c, { b: 'b2', c: 'c2', d: 'd2' }) && d == null && e == 123 && f == 'abc' && g == undefined && equal(h, { h: 'h' });
        };
        return this.Test([t0, t1]);
    }

    ['document.path']() {
        let path = _url2JSON(document.location.href);
        const t0 = () => document.path.url === path.url;
        const t1 = () => document.path.filePath === path.filePath;
        const t2 = () => document.path.fileDir === path.fileDir;
        const t3 = () => document.path.fileName === path.fileName;
        const t4 = () => document.path.fileShortName === path.fileShortName;
        const t5 = () => document.path.fileExt === path.fileExt;
        const t6 = () => document.path.query === path.query;
        const t7 = () => typeof document.path.queryValue == 'function' && document.path.queryValue('id') == path.queryValue('id');
        const t8 = () => typeof document.path.hasParam == 'function' && document.path.hasParam('id') == path.hasParam('id');
        const t9 = () => typeof document.path.params == typeof [] && document.path.params.length == 1 && document.path.params[0].name == 'id' && path.params[0].name == 'id' && path.params[0].value == 6;
        return this.Test([t0, t1, t2, t3, t4, t5, t6, t7, t8, t9]);
    }

    ['document.ready']() {
        const t0 = () => document.getElementById('h2').innerHTML.indexOf('ready') > 0;
        const t1 = () => typeof document._testReady == 'number' && document._testReady == 1;
        return this.Test([t0, t1]);
    }

    addClass(idoc) {
        const t0 = () => $e('a0').addClass('bg_gray').id == 'a0' && $e('a0').className.indexOf('bg_gray') >= 0;
        const t1 = () => $e('a1').addClass('bg_gray').id == 'a1' && $e('a1').className.indexOf('bg_gray') >= 0;
        const t2 = () => $t('b').addClass('green').length == 10 && $t('b')[9].className.indexOf('green') >= 0;
        const t3 = () => $e('p1', idoc).addClass('blue') && $e('p1', idoc).className.indexOf('blue') >= 0;
        const t4 = () => $t('tr[id=tr2]//label').addClass('blue').length == 3 && $t('tr[id=tr2]//label')[0].className.indexOf('blue') >= 0;
        return this.Test([t0, t1, t2, t3, t4]);
    }

    append(idoc, divOut) {
        let sp0 = document.createElement('SPAN');
        sp0.id = 'span0-append';
        sp0.innerHTML = 'append-span0';
        const t0 = () => $e('divOut').append(sp0).id == 'divOut';
        const t1 = () => divOut.childNodes[divOut.childNodes.length - 1].id == 'span0-append';
        let sp1 = idoc.createElement('SPAN');
        sp1.id = 'span1-append';
        sp1.innerHTML = 'append-span1';
        const t2 = () => $e('divOut', idoc).append(sp1).id == 'divOut';
        let divOut2 = idoc.getElementById('divOut');
        const t3 = () => divOut2.childNodes[divOut2.childNodes.length - 1].id == 'span1-append';
        const t4 = () => {
            let rs = $t('tr[id=tr2]/td').append('append').length == 2;
            let html = $t('tr[id=tr2]/td')[0].innerHTML;
            return rs && html.substr(html.length - 'append'.length, 'append'.length) == 'append';
        };
        return this.Test([t0, t1, t2, t3, t4]);
    }

    attr(idoc) {
        document.expando = true;
        idoc.expando = true;
        const t0 = () => $e('img0').attr('alt') == 'image 0';
        const t1 = () => $e('txt0').attr('_data') == 'Text Data';
        const t2 = () => $e('img1').attr('alt', 'Fake Image 1').id == 'img1' && $e('img1').getAttribute('alt') == 'Fake Image 1';
        const t3 = () => $e('p1', idoc).attr('_data') == 'p1 data';
        const t4 = () => $e('p1', idoc).attr('_data', 'P1Data').id == 'p1' && $e('p1', idoc).getAttribute('_data') == 'P1Data';
        const t5 = () => $t('img').attr('alt').length == 2;
        const t6 = () => $t('img[id=img1]').attr('alt', 'FAKE IMAGE 1').length == 1 && $t('img[id=img1]')[0].getAttribute('alt') == 'FAKE IMAGE 1';
        return this.Test([t0, t1, t2, t3, t4, t5, t6]);
    }

    bind(idoc, divOut, span) {
        const btn0 = document.getElementById('btnClear'),
            btn1 = idoc.getElementById('btnSubmit');
        let rs00 = false,
            arr = [];
        const onclick = function (evt) {
            try {
                let txt = document.getElementById('txt0');
                txt.value = '';
                let rs0 = txt.value == '';
                let rs1 = !!(evt && evt.srcElement);
                let rs2 = rs1 && evt.srcElement.id == 'btnClear';
                arr = [rs0, rs1, rs2];
            }
            catch (ex) {
                span.innerHTML = ex.message;
            }
        };
        const onsubmit = function (evt) {
            try {
                let div = idoc.getElementById('divOut');
                div.innerHTML += '<span>onsubmit</span>'
                let rs0 = div.innerHTML.indexOf('onsubmit') > 0;
                let rs1 = !!(evt && evt.srcElement);
                let rs2 = rs1 && evt.srcElement.id == 'btnSubmit';
                arr = arr.concat([rs0, rs1, rs2]);
            }
            catch (ex) {
                span.innerHTML = ex.message;
            }
        };
        const onreset = function (evt) {
            rs00 = true;
        };
        $e(btn0).bind('click', onclick);
        typeof btn0.fireEvent == 'function' ? btn0.fireEvent('click') : typeof btn0.click == 'function' ? btn0.click() : null;
        $e(btn1).bind('click', onsubmit);
        typeof btn1.fireEvent == 'function' ? btn1.fireEvent('click') : typeof btn1.click == 'function' ? btn1.click() : null;
        let rs = $t('input[id=btnReset]').bind('click', onreset).length == 1;
        arr.push(rs);
        let btn2 = $t('input[id=btnReset]')[0];
        typeof btn2.fireEvent == 'function' ? btn2.fireEvent('click') : typeof btn2.click == 'function' ? btn2.click() : null;
        arr.push(rs00);
        return arr;
    }

    css(idoc) {
        const t0 = () => $e('txt0').css('color', 'red').id == 'txt0';
        const t1 = () => $e('txt0').css('color') == 'red';
        const t2 = () => $e('p1', idoc).css('color', 'red').id == 'p1';
        const t3 = () => $e('p1', idoc).css('color') == 'red';
        const t4 = () => $t('div.doc//a').css('fontWeight', 'bold').length == 3 && $t('div.doc//a')[0].css('fontWeight') == 'bold';
        return this.Test([t0, t1, t2, t3, t4]);
    }

    cs(idoc) {
        var t0 = () => $e('divTestor').cs('width') == '920px';
        var t1 = () => $e('divSide', idoc).cs('width') == '80px' && $e('divSide', idoc).cs('height') == '40px';
        return this.Test([t0, t1]);
    }

    hide(idoc) {
        const t0 = () => $e('btnClear').hide().id == 'btnClear' && $e('btnClear').style.display == 'none';
        const t1 = () => $e('p1', idoc).hide().id == 'p1' && $e('p1', idoc).style.display == 'none';
        const t2 = () => $t('b').hide().length == 10 && $t('b')[0].style.display == 'none';
        return this.Test([t0, t1, t2]);
    }

    html(idoc) {
        const t0 = () => $e('h1').html('HTML Scripts Zone').id == 'h1' && $e('h1').innerHTML == 'HTML Scripts Zone';
        const t1 = () => $e('p1', idoc).html('de is awesome!').id == 'p1' && $e('p1', idoc).innerHTML == 'de is awesome!';
        const t2 = () => $e('h1').html() == 'HTML Scripts Zone';
        const t3 = () => $e('p1', idoc).html() == 'de is awesome!';
        const t4 = () => {
            let rs = $t('div[id=divOut]').html('HTML').length == 1;
            return rs && $t('div[id=divOut]')[0].html() == 'HTML';
        };
        return this.Test([t0, t1, t2, t3, t4]);
    }

    insert(idoc, divOut) {
        let opt = document.createElement('OPTION');
        opt.text = 'AA类';
        opt.value = 'AA';
        let childCount = $e('sel').childNodes.length;
        const t0 = () => $e('sel').insert(opt, 2).id == 'sel';
        const t1 = () => $e('sel').childNodes.length == childCount + 1 && $e('sel').options.length == 4 && $e('sel').childNodes[2].value == 'AA';
        let hr = idoc.createElement('HR');
        const t2 = () => $e('p2', idoc).insert(hr, 6).id == 'p2';
        const t3 = () => $e('p2', idoc).childNodes[6].tagName == 'HR';
        const t4 = () => $e(divOut).insert('insert').innerHTML.substring(0, 'insert'.length) == 'insert';
        const t5 = () => {
            let rs = $t('tr[id=tr1]/td').insert(' insert1 ').length == 2;
            return rs && $t('tr[id=tr1]/td')[0].innerHTML.substr(0, 4) == ' ins';
        };
        return this.Test([t0, t1, t2, t3, t4, t5]);
    }

    parent(idoc) {
        const t0 = () => $e('txt0').parent('tr').id = 'tr3';
        const t1 = () => $e('txt0').parent('tr[id=tr3]') !== undefined && $e('txt0').parent('tr[id=tr2]') == undefined;
        const t2 = () => $t('script')[0].parent('head').tagName == 'HEAD';
        const t3 = () => $e('btnSubmit', idoc).parent('p[id=p2]') !== undefined && $e('btnSubmit', idoc).parent('p[id=p2]').id == 'p2';
        const t4 = () => $e('sp0').parent('span').className == 'test_parent';
        return this.Test([t0, t1, t2, t3, t4]);
    }

    pos(idoc, divOut) {
        const t0 = () => {
            let pos = $e('spSideText').pos();
            let rs = pos.x == 16 && pos.y == 15;
            return "<span class='green'>#0</span>x=#1, y=#2".replace('#0', rs ? '✓' : '✕').replace('#1', pos.x).replace('#2', pos.y);
        };
        const t1 = () => {
            let pos = $e('spSideText', idoc).pos();
            let rs = pos.x == 210 && pos.y == 20;
            return "<span class='green'>#0</span>x=#1, y=#2".replace('#0', rs ? '✓' : '✕').replace('#1', pos.x).replace('#2', pos.y);
        };
        return [t0(), t1()];
    }

    removeAttr(idoc, divOut) {
        const t0 = () => $e('btnClear').removeAttr('_data').id == 'btnClear' && $e('btnClear').getAttribute('_data') == null;
        const t1 = () => {
            let rs = $t('img[id=img1]').removeAttr('alt').length == 1;
            let val = $e('img1').getAttribute('alt');
            return rs && !val;
        };
        const t2 = () => $e('p1', idoc).removeAttr('_data').id == 'p1' && $e('p1', idoc).getAttribute('_data') == null;
        return this.Test([t0, t1, t2]);
    }

    removeClass(idoc, divOut) {
        const t0 = () => $e('a0').removeClass('link1').id == 'a0' && $e('a0').className.indexOf('link1') < 0;
        const t1 = () => $t('a[id=a1]').removeClass('link1').length == 1 && $t('a[id=a1]')[0].className.indexOf('link1') < 0;
        const t2 = () => $e('p1', idoc).removeClass('dark1').id == 'p1' && $e('p1', idoc).className.indexOf('dark1') < 0;
        return this.Test([t0, t1, t2]);
    }

    show(idoc, divOut) {
        const t0 = () => $e('sp0').show().id == 'sp0' && $e('sp0').style.display != 'none';
        const t1 = () => $t('span.hidden').show().length == 2 && $t('span.hidden')[1].style.display != 'none';
        const t2 = () => $e('sp2', idoc).show().id == 'sp2' && $e('sp2', idoc).style.display != 'none';
        return this.Test([t0, t1, t2]);
    }

    tags(idoc, divOut) {
        let arr = null;
        let src0 = "'[\\,]'",
            src1 = '"[\\,]"';
        const t0 = () => (arr = $e('form1').tags('tr')) && arr.length == 5;
        const t1 = () => (arr = $e('form1').tags('tr[id=tr1]')) && arr.length == 1 && arr[0].id == 'tr1';
        const t2 = () => (arr = $e('divOut').tags('a,p,div,tr')) && arr.length == 0;
        const t3 = () => (arr = $e('p2', idoc).tags('input[type=radio]')) && arr.length == 4;
        const t4 = () => (arr = $e(document.body).tags('img[src~="' + src0 + '"]')) && arr.length == 1 && arr[0].id == 'img1';
        const t5 = () => (arr = $e(document.body).tags('div.doc\\p\\a[href*="/a.html"]')) && arr.length == 2 && arr[0].id == 'a0' && arr[1].id == 'a1';
        return this.Test([t0, t1, t2, t3, t4, t5]);
    }

    text(idoc, divOut) {
        const t0 = () => $e('sp0').text() == 'hidden text 0.';
        const t1 = () => $e('sp2', idoc).text() == 'hidden text 2.';
        const t2 = () => $t('p/b').text('一').length == 10 && $t('p/b')[1].text() == '一';
        const t3 = () => $e('txt0').text('TEXT0').id == 'txt0' && ($e('txt0').innerText || $e('txt0').textContent || '') == 'TEXT0';
        return this.Test([t0, t1, t2, t3]);
    }

    unbind(idoc, divOut) {
        const btn0 = document.getElementById('btnClear'),
            btn1 = idoc.getElementById('btnSubmit');
        let rs0 = false,
            rs1 = false;
        const onclick0 = function (evt) {
            rs0 = false;
        },
            onclick1 = function (evt) {
                rs1 = false;
            };
        $e(btn1).bind('click', onclick1);
        const t0 = () => {
            rs0 = $e(btn0).bind('click', onclick0).id == 'btnClear';
            rs0 = rs0 && $e(btn0).unbind('click', onclick0).id == 'btnClear';
            typeof btn0.fireEvent == 'function' ? btn0.fireEvent('click') : typeof btn0.click == 'function' ? btn0.click() : null;
            return rs0;
        };
        const t1 = () => {
            rs1 = $e(btn1).bind('click', onclick1).id == 'btnSubmit';
            rs1 = rs1 && $e(btn1).unbind('click', onclick1).id == 'btnSubmit';
            typeof btn1.fireEvent == 'function' ? btn1.fireEvent('click') : typeof btn1.click == 'function' ? btn1.click() : null;
            return rs1;
        };
        return this.Test([t0, t1]);
    }

    val(idoc, divOut) {
        const t0 = () => {
            let rs = $e('txt0').val('test val().').id == 'txt0';
            return rs && $e('txt0').val() == 'test val().';
        };
        const t1 = () => {
            $e('sel').selectedIndex = 0;
            let rs = $e('sel').val() == 'A';
            rs = rs && $e('sel').val('B').id == 'sel';
            return rs && $e('sel').val() == 'B';
        };
        const t2 = () => {
            let rs = $e('sp0').val() == null || $e('sp0').val() == undefined;
            return rs && $e('divOut').val('test val()-t2()').id == 'divOut';
        };
        const t3 = () => {
            for (let el of $e('*group2')) {
                el.checked = false;
            }
            $e('cb1').checked = true;
            $e('cb2').checked = true;
            return $e('*group2').val() == '100-500,500-1000';
        };
        const t4 = () => {
            $e('rb0').checked = true;
            let rs = $e('*group1').val() == 'red';
            $e('*group1')[0].val('yellow');
            for (let e of $t('label')) {
                e.innerHTML = document.getElementById(e.getAttribute('for')).value;
            }
            return rs && $e('*group1').val() == 'yellow';
        };
        const t5 = () => {
            $e('rb0', idoc).checked = true;
            let rs = $e('*group2', idoc).val() == 'east';
            $t('input[name=group2,id=rb0]', idoc).val('EAST');
            for (let e of $t('label', idoc)) {
                e.innerHTML = idoc.getElementById(e.getAttribute('for')).value;
            }
            return rs && $e('*group2', idoc).val() == 'EAST';
        };
        return this.Test([t0, t1, t2, t3, t4, t5]);
    }

    value(idoc, divOut) {
        const t0 = () => {
            $e('rb1').checked = true;
            let rs = $e('*group1').value == 'green';
            $e('rb2').checked = true;
            return rs && $e('*group1').value == 'blue';
        };
        const t1 = () => {
            for (let e of $e('*group2')) {
                e.checked = false;
            }
            $e('cb1').checked = true;
            $e('cb2').checked = true;
            return $e('*group2').value == '100-500,500-1000' && $t('input[id^=cb]').value == '100-500,500-1000';
        };
        const t2 = () => {
            $e('rb1', idoc).checked = true;
            return $e('*group2', idoc).value == 'south';
        };
        return this.Test([t0, t1, t2]);
    }

    ['Array.remove']() {
        const t0 = () => {
            let arr = [0, 1, 2, 3, 4];
            return arr.remove(1) && arr[0] == 0 && arr[1] == 2 && arr.length == 4;
        };
        return this.Test([t0]);
    }

    ['Date.add']() {
        const t0 = () => {
            let date = new Date('2019-12-01'),
                date0 = date.add('d', 1),
                date1 = date.add('D', -2);
            return date.getDate() == 1 && date0.getDate() == 2 && date1.getDate() == 29 && date1.getMonth() == 10;
        };
        const t1 = () => {
            let date = new Date('2019-12-01'),
                date0 = date.add('M', 1),
                date1 = date.add('M', -2);
            return date.getMonth() == 11 && date0.getMonth() == 0 && date0.getFullYear() == 2020 && date1.getMonth() == 9;
        };
        const t2 = () => {
            let date = new Date('2019-12-01'),
                date0 = date.add('y', 1),
                date1 = date.add('Y', -2);
            return date.getFullYear() == 2019 && date0.getFullYear() == 2020 && date1.getFullYear() == 2017;
        };
        const t3 = () => {
            let date = new Date('2019-12-01'),
                date0 = date.add('w', 1),
                date1 = date.add('W', -2);
            return date.getDate() == 1 && date0.getDate() == 8 && date0.getMonth() == 11 && date1.getDate() == 17 && date1.getMonth() == 10;
        };
        const t4 = () => {
            let date = new Date(2019, 11, 31, 23, 59, 59, 150),
                date0 = date.add('f', 100),
                date1 = date.add('f', -200);
            return date.getMilliseconds() == 150 && date0.getMilliseconds() == 250 && date1.getMilliseconds() == 950 && date1.getSeconds() == 58;
        };
        const t5 = () => {
            let date = new Date(2019, 11, 31, 23, 59, 59, 150),
                date0 = date.add('s', 2),
                date1 = date.add('s', -3);
            return date.getSeconds() == 59 && date0.getSeconds() == 1 && date0.getMinutes() == 0 && date1.getSeconds() == 56;
        };
        const t6 = () => {
            let date = new Date(2019, 11, 31, 23, 59, 59, 150),
                date0 = date.add('m', 2),
                date1 = date.add('m', -4);
            let m = date.getMinutes(),
                m0 = date0.getMinutes(),
                h0 = date0.getHours(),
                m1 = date1.getMinutes();
            return date.getMinutes() == 59 && date0.getMinutes() == 1 && date0.getHours() == 0 && date1.getMinutes() == 55;
        };
        const t7 = () => {
            let date = new Date(2019, 11, 31, 23, 59, 59, 150),
                date0 = date.add('h', 3),
                date1 = date.add('H', -4);
            return date.getHours() == 23 && date0.getHours() == 2 && date0.getDate() == 1 && date0.getFullYear() == 2020 && date1.getHours() == 19;
        };
        return this.Test([t0, t1, t2, t3, t4, t5, t6, t7]);
    }

    ['Date.diff']() {
        const t0 = () => {
            let date0 = new Date(2019, 11, 30, 23, 59, 59, 150),
                date1 = new Date(2019, 11, 31, 0, 0, 0);
            return date0.diff('f', date1) == 850;
        };
        const t1 = () => {
            let date0 = new Date(2019, 11, 30, 23, 59, 59, 150),
                date1 = new Date(2019, 11, 31, 0, 0, 0),
                date2 = new Date(2020, 0, 1, 0, 0, 0);
            return date0.diff('s', date1) == 0 && date1.diff('s', date2) == 24 * 60 * 60;
        };
        const t2 = () => {
            let date1 = new Date('2019-12-31'),
                date2 = new Date('2020-01-01');
            return date1.diff('m', date2) == 24 * 60;
        };
        const t3 = () => {
            let date1 = new Date('2019-12-31'),
                date2 = new Date('2020-01-01');
            return date1.diff('h', date2) == 24 && date1.diff('H', date2) == 24;
        };
        const t4 = () => {
            let date0 = new Date(2019, 11, 30, 12, 30, 0),
                date1 = new Date(2019, 11, 31, 0, 0, 0),
                date2 = new Date(2020, 0, 1, 0, 0, 0),
                date3 = new Date(2020, 11, 31, 0, 0, 0);
            return date0.diff('d', date1) == 0 && date1.diff('d', date2) == 1 && date1.diff('D', date3) == 366;
        };
        const t5 = () => {
            let date1 = new Date('2019-12-31'),
                date2 = new Date('2020-01-01'),
                date3 = new Date('2020-12-31');
            return date1.diff('M', date2) == 1 && date1.diff('M', date3) == 12;
        };
        return this.Test([t0, t1, t2, t3, t4, t5]);
    }

    ['Date.fromString']() {
        let Y, M, D, h, m, s, f;
        const extract = date => {
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
        const t0 = () => {
            let date = new Date().fromString("2019.9.20", "YYYY.M.D");
            return extract(date) && Y == 2019 && M == 8 && D == 20 && h == 0 && m == 0 && s == 0 && f == 0;
        };
        const t1 = () => {
            let date = new Date().fromString("2019-09-20 02:34:09.150", "YYYY-MM-DD hh:mm:ss.fff");
            return extract(date) && Y == 2019 && M == 8 && D == 20 && h == 2 && m == 34 && s == 9 && f == 150;
        };
        const t2 = () => {
            let d0 = new Date().fromString("2019-09-20 02:34:09.150", "YYYY-MM-DD hh:mm:ss.fff");
            let d1 = new Date().fromString("2019-09-20 02:34:09.150", "YYYY-MM-DD HH:MIN:SS.FFF");
            let d2 = new Date().fromString("2019-09-20 02:34:09.150", "yyyy-MM-dd hh:Min:ss.fff");
            let d3 = new Date().fromString("2019-09-20 02:34:09.150", "yyyy-MM-dd hh:min:ss.fff");
            let d4 = new Date().fromString("2019-09-20 02:34:09.150", "yyyy-MM-dd hh:mm:ss.fff");
            let d5 = new Date().fromString("2019-09-20 02:34:09.150", "yyyy-MM-DD hh:mm:SS.fff");
            return d0.valueOf() == d1.valueOf() && d1.valueOf() == d2.valueOf() && d2.valueOf() == d3.valueOf() && d3.valueOf() == d4.valueOf() && d4.valueOf() == d5.valueOf();
        };
        const t3 = () => {
            let date = new Date().fromString("9/20/2019 2:34:9.150", "M/D/YYYY h:m:s.fff");
            return extract(date) && Y == 2019 && M == 8 && D == 20 && h == 2 && m == 34 && s == 9 && f == 150;
        };
        const t4 = () => {
            let date = new Date().fromString("Friday September 20 2019 02:34:09.150", "Week Month DD YYYY hh:mm:ss.fff");
            return extract(date) && Y == 2019 && M == 8 && D == 20 && h == 2 && m == 34 && s == 9 && f == 150;
        };
        const t5 = () => {
            let d0 = new Date().fromString("Friday September 20 2019 02:34:09.150", "Week Month dd YYYY hh:mm:ss.fff");
            let d1 = new Date().fromString("Friday September 20 2019 02:34:09.150", "WEEK MONTH DD YYYY hh:mm:ss.fff");
            let d2 = new Date().fromString("Friday September 20 2019 02:34:09.150", "week month dd yyyy hh:mm:ss.fff");
            return t4() && d0.valueOf() == d1.valueOf() && d1.valueOf() == d2.valueOf();
        };
        const t6 = () => {
            let date = new Date().fromString("Fri Sep 20/2019 02:34:09.150", "Wee Mon DD/YYYY hh:mm:ss.fff");
            return extract(date) && Y == 2019 && M == 8 && D == 20 && h == 2 && m == 34 && s == 9 && f == 150;
        };
        const t7 = () => {
            let d0 = new Date().fromString("Fri Sep 20/2019 02:34:09.150", "Wee Mon DD/YYYY hh:mm:ss.fff");
            let d1 = new Date().fromString("Fri Sep 20/2019 02:34:09.150", "WEE MON DD/YYYY hh:mm:ss.fff");
            let d2 = new Date().fromString("Fri Sep 20/2019 02:34:09.150", "wee mon dd/yyyy hh:mm:ss.fff");
            return t6() && d0.valueOf() == d1.valueOf() && d1.valueOf() == d2.valueOf();
        };
        const t8 = () => {
            let d0 = new Date().fromString("Fr Se 20 19 2:34:9.150", "WE MO D YY h:m:s.fff");
            let d1 = new Date().fromString("Fr Se 20 19 2:34:9.150", "We Mo D YY h:m:s.fff");
            let d2 = new Date().fromString("Fr Se 20 19 2:34:9.150", "we mo d yy h:m:s.fff");
            return d0.valueOf() == d1.valueOf() && d1.valueOf() == d2.valueOf()
                && extract(d0) && Y == 2019 && M == 8 && D == 20 && h == 2 && m == 34 && s == 9 && f == 150;
        };
        const t9 = () => {
            let date = new Date().fromString("2019年9月20日 2时34分9秒", "YYYY年M月D日 h时m分s秒");
            return extract(date) && Y == 2019 && M == 8 && D == 20 && h == 2 && m == 34 && s == 9 && f == 0;
        };
        const t10 = () => {
            let date = new Date().fromString("9/20/2019 PM 2:34", "M/D/YYYY AM h:min");
            return extract(date) && Y == 2019 && M == 8 && D == 20 && h == 14 && m == 34 && s == 0 && f == 0;
        };
        const t11 = () => {
            let date = new Date().fromString("9/20/2019PM2:34", "M/D/YYYYAMh:m");
            return extract(date) && Y == 2019 && M == 8 && D == 20 && h == 14 && m == 34 && s == 0 && f == 0;
        };
        return this.Test([t0, t1, t2, t3, t4, t5, t6, t7, t8, t9, t10, t11]);
    }

    ['Date.toJSON']() {
        let date = new Date(2019, 11, 1, 12, 30, 45, 150),
            dt = date.toJSON();
        return [dt.Y == 2019, dt.M == 11, dt.D == 1, dt.W == 0, dt.h == 12, dt.m == 30, dt.s == 45, dt.f == 150];
    }

    ['Date.toString']() {
        let date = new Date(2019, 11, 1, 9, 8, 45, 150);
        const t0 = () => date.toString('YYYY.M.D') == '2019.12.1';
        const t1 = () => date.toString('YYYY-MM-DD hh:mm:ss.fff') == '2019-12-01 09:08:45.150';
        const t2 = () => {
            let s0 = date.toString('YYYY-MM-DD hh:mm:ss.fff');
            let s1 = date.toString('YYYY-MM-DD HH:MIN:SS.FFF');
            let s2 = date.toString('yyyy-MM-dd HH:Min:SS.FFF');
            let s3 = date.toString('yyyy-MM-dd hh:min:ss.fff');
            let s4 = date.toString('yyyy-MM-dd hh:mm:ss.fff');
            return t1() && s0 == s1 && s1 == s2 && s2 == s3 && s3 == s4;
        };
        const t3 = () => date.toString('M/D/YY h:m:s.fff') == '12/1/19 9:8:45.150';
        const t4 = () => {
            let s = date.toString('WEEK MONTH DD/YYYY HH:MIN:SS.FFF'); 
            return s == 'Sunday December 01/2019 09:08:45.150';
        };
        const t5 = () => {
            let s0 = date.toString('WEEK MONTH DD/YYYY HH:MIN:SS.FFF');
            let s1 = date.toString('Week Month DD/YYYY hh:min:ss.fff');
            let s2 = date.toString('week month dd/yyyy hh:min:ss.fff');
            let s3 = date.toString('week month dd/yyyy hh:mm:ss.fff');
            let s4 = date.toString('WEEK month DD/yyyy HH:mm:SS.fff');
            return t4() && s0 == s1 && s1 == s2 && s2 == s3 && s3 == s4;
        };
        const t6 = () => date.toString('WE MO DD/YY hh:min:ss') == 'Su De 01/19 09:08:45';
        const t7 = () => {
            let s0 = date.toString('WE MO DD/YY hh:min:ss');
            let s1 = date.toString('WE MO DD/YY HH:MIN:SS');
            let s2 = date.toString('We Mo DD/YY hh:min:ss');
            let s3 = date.toString('we mo dd/yy hh:min:ss');
            let s4 = date.toString('we mo dd/yy hh:mm:ss');
            return t6() && s0 == s1 && s1 == s2 && s2 == s3 && s3 == s4;
        };
        const t8 = () => date.toString('WEE MON DD-YY') == 'Sun Dec 01-19';
        const t9 = () => {
            let s0 = date.toString('WEE MON DD-YY');
            let s1 = date.toString('Wee Mon DD-YY');
            let s2 = date.toString('wee mon dd-yy');
            let s3 = date.toString('Wee mon DD-yy');
            return t8() && s0 == s1 && s1 == s2 && s2 == s3;
        };
        return this.Test([t0, t1, t2, t3, t4, t5, t6, t7, t8, t9]);
    }

    Test(testors) {
        const arr = [];
        for (let testor of testors) {
            try {
                arr.push(!!testor());
            }
            catch (ex) {
                arr.push(ex.message);
            }
        }
        return arr;
    }
}

function getTestorFunctionName(btn) {
    const span = btn.previousSibling.tagName == 'SPAN' ? btn.previousSibling : btn.previousSibling.previousSibling,
        index = span.innerHTML.indexOf('('); 
    return index > 0 ? span.innerHTML.substring(0, index) : span.innerHTML;
}

function btnTest_click(evt) {
    const span = evt.srcElement.nextSibling,
        divOut = document.getElementById('divOut'),
        iframe = document.getElementById('iframe1'),
        frm1 = frames['frame1'] || iframe.contentWindow;
    try {
        const idoc = frm1 ? frm1.document : null,
            name = getTestorFunctionName(evt.srcElement),
            testor = new Testor();
        let arr = typeof testor[name] == 'function' ? testor[name](idoc, divOut, span) : [];
        OnTestSucceed(arr, span);
    } catch (ex) {
        span.innerHTML = ex.message;
    }
}

function OnTestSucceed(arr, span) {
    span.innerHTML = '';
    arr.forEach((el, i) => {
        span.innerHTML += typeof el == 'string' ? el : el ? "<span class='green'>✓</span>" : `<span class='red' title='${i}'>✕</span>`;
        span.innerHTML += i % 5 == 4 ? ' ' : '';
    });
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
    const btns = document.getElementById('divTestor').getElementsByTagName('BUTTON');
    for (let btn of btns) {
        new Promise(() => {
            btn.click();
        });        
    }
}

document.ready(() => {
    const testor = new Testor(),
        btns = document.getElementById('divTestor').getElementsByTagName('BUTTON');
    for (let btn of btns) {
        const name = getTestorFunctionName(btn);
        typeof testor[name] == 'function' ? bind(btn, 'click', btnTest_click) : (btn.disabled = true);
    }
    bind(document.getElementById('btnTestAll'), 'click', btnTestAll_click);
    document.getElementById('h2').innerHTML += '<span class="red"> Testers are ready!</span>';
});

document.ready(() => {
    document._testReady = 1;
});