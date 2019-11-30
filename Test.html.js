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
            return (arr = $t('a[id~=0]')) && arr.length == 2 && arr[0].id == 'a1';
        };
        var t7 = function () {
            return (arr = $t('a[id$=0]')) && arr.length == 1 && arr[0].id == 'a0';
        };
        var t8 = function () {
            return (arr = $t('a[id^=a]')) && arr.length == 3 && arr[2].id == 'a2';
        };
        var t9 = function () {
            return (arr = $t('a[id!=a1]')) && arr.length == 2 && arr[1].id == 'a2';
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
            var rs = (arr = $t('p.poem/a[id^=a, href*="./X/页/"], div.doc//img[id^="img", src*="/images/"]')) && arr.length == 4 && arr[1].id == 'a1' && arr[3].id == 'img1';
            return rs && (arr = $t('p.poem/a[id^="a", href*="./X/页/"], body//img[id^="img", src*="' + src0 + '"]')) && arr.length == 3 && arr[1].id == 'a1' && arr[2].id == 'img0';
        };
        var t21 = function () {
            return (arr = $t('input[name=group2]', idoc)) && arr.length == 4;
        };
        return this.Test([t0, t1, t2, t3, t4, t5, t6, t7, t8, t9, t10, t11, t12, t13, t14, t15, t16, t17, t18, t19, t20, t21]);
    },
    "$$.ajax": { },
    "$$.format": function () {
        var t0 = function () {
            return $$.format("{0}去{1}{2}里", '一', '二', '三') == '一去二三里';
        };
        var t1 = function () {
            return $$.format("{0}去{1}{2}里=={0}去{1}{2}里", '一', '二', '三') == '一去二三里==一去二三里';
        };
        return this.Test([t0, t1]);
    },
    "$$.htmlEncode": function () {
        var html = 'if (a > b) && (c < a) return "Larger"; else \'Smaller\'; ',
            code0 = 'if (a &gt; b) &amp;&amp; (c &lt; a) return &quot;Larger&quot;; else &apos;Smaller&apos;; ',
            code1 = 'if (a &gt; b) &amp;&amp; (c &lt; a) return "Larger"; else \'Smaller\'; ',
            code2 = 'if (a > b) &amp;&amp; (c &lt; a) return &quot;Larger&quot;; else \'Smaller\'; ',
            code3 = 'if (a &#62; b) &#38;&#38; (c &#60; a) return &#34;Larger&#34;; else &#39;Smaller&#39;; ';
        var t0 = function () {
            return $$.htmlEncode(html) == code0 && $$.htmlEncode(html, 0) == code0;
        };
        var t1 = function () {
            return $$.htmlEncode(html, 1) == code1;
        };
        var t2 = function () {
            return $$.htmlEncode(html, 2) == code2;
        };
        var t3 = function () {
            return $$.htmlEncode(html, 3) == code3;
        };        
        var t4 = function () {
            html = "if (a &gt; b) return &quot;Larger&quot;;";
            return $$.htmlEncode(html, 0) == "if (a &amp;gt; b) return &amp;quot;Larger&amp;quot;;";
        };
        return this.Test([t0, t1, t2, t3, t4]);
    },
    "$$.htmlDecode": function () {
        var html = 'if (a > b) && (c < a) return "Larger"; else \'Smaller\'; ',
            code0 = 'if (a &gt; b) &amp;&amp; (c &lt; a) return &quot;Larger&quot;; else &apos;Smaller&apos;; ',
            code1 = 'if (a &gt; b) &amp;&amp; (c &lt; a) return "Larger"; else \'Smaller\'; ',
            code2 = 'if (a > b) &amp;&amp; (c &lt; a) return &quot;Larger&quot;; else \'Smaller\'; ',
            code3 = 'if (a &#62; b) &#38;&#38; (c &#60; a) return &#34;Larger&#34;; else &#39;Smaller&#39;; ',
            code4 = 'if (a &amp;gt; b) return &amp;quot;Larger&amp;quot;;';
        var t0 = function () {
            return $$.htmlDecode(code0) == html && $$.htmlDecode(code0, 0) == html;
        };
        var t1 = function () {
            return $$.htmlDecode(code1, 1) == html;
        };
        var t2 = function () {
            return $$.htmlDecode(code2, 2) == html;
        };
        var t3 = function () {
            return $$.htmlDecode(code3, 3) == html;
        };
        var t4 = function () {
            return $$.htmlDecode(code4) == 'if (a &gt; b) return &quot;Larger&quot;;';
        };
        return this.Test([t0, t1, t2, t3, t4]);
    },
    "$$.url2Object": function () {
        var url = './images/小图/img1.asp?id=2&name=张三&arr=["e","f","g"]&ref=../pages/a.html?pid=3',
            obj = $$.url2Object(url);
        var t0 = function () {
            return obj.url == url;
        };
        var t1 = function () {
            return obj.filePath == './images/小图/img1.asp';
        };
        var t2 = function () {
            return obj.fileDir == './images/小图';
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
    "document.path": function () {
        var path = $$.url2Object(document.location.href);
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
            return document.getElementById('h2').innerHTML.indexOf('ok') > 0;
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
            return $t('label').addClass('blue').length == 3 && $t('label')[0].className.indexOf('blue') >= 0;
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
            return $e('img0').attr('alt') == 'fake image 0';
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
            return $t('a').css('fontWeight', 'bold').length == 3 && $t('a')[0].css('fontWeight') == 'bold';
        };
        return this.Test([t0, t1, t2, t3, t4]);
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
            return $e('txt0').parent('tr').id = 'tr2';
        };
        var t1 = function () {
            return $e('txt0').parent('tr[id=tr2]') !== undefined && $e('txt0').parent('tr[id=tr1]') == undefined;
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
            var pos0 = $e(divOut).pos();
            return pos0.x >= 1 && pos0.x <= 900 && pos0.y >= 100 && pos0.y <= 800;
        };
        var t1 = function () {
            var pos1 = $e('divOut', idoc).pos();
            return pos1.x >= 1 && pos1.x <= 900 && pos1.y >= 200 && pos1.y <= 1000;
        };
        return this.Test([t0, t1]);
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
            return (arr = $e('form1').tags('tr')) && arr.length == 4;
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
            return $e('txt0').text('text0').id == 'txt0' && $e('txt0').innerHTML == 'text0';
        };
        var t1 = function () {
            return $e('sp0').text() == 'hidden text 0.';
        };
        var t2 = function () {
            return $e('sp2', idoc).text() == 'hidden text 2.';
        };
        var t3 = function () {
            return $t('p/b').text('一').length == 10 && $t('p/b')[1].text() == '一';
        };
        return this.Test([t0, t1, t2, t3]);
    },
    "unbind": { },
    "val": { },
    "value": { },
    "Array.forEach": { },
    "Array.each": { },
    "Array.exists": { },
    "Array.indexof": { },
    "Date.add": { },
    "Date.diff": { },
    "Date.fromString": { },
    "Date.toObject": { },
    "Date.toString": { },
    "String.format": { },
    "String.trim": {},
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
    ////:
}

document.ready(function () {
    var btns = document.getElementsByTagName('BUTTON');
    for (var i = 0; i < btns.length; i++) {
        var name = getTestorFunctionName(btns[i]);
        typeof Testor[name] == 'function' ? bind(btns[i], 'click', btnTest_click) : (btns[i].disabled = true);
    }
    bind(document.getElementById('btnTestAll'), 'click', btnTestAll_click);
    document.getElementById('h2').innerHTML += '<span class="red"> ok!</span>';
});

document.ready(function () {
    document._testReady = 1;
});