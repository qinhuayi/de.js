function getFunctonName(span) {
    var name = span.innerHTML,
        index = name.indexOf('(');
    return index > 0 ? name.substring(0, index) : name;
}

var Testor = {
    "$e": function (idoc, divOut) {
        var rs0 = typeof $e('iframe1') == 'object' && $e('iframe1') && $e('iframe1').tagName == 'IFRAME';
        var rs1 = $e(document.body) && $e(document.body).tagName == 'BODY';
        var p = $e('p1', idoc);
        var rs2 = typeof p == 'object' && p && p.tagName == 'P';

        var rs3 = typeof $e('*group1') == 'object' && $e('*group1') && $e('*group1').length == 3;
        var rs4 = typeof $e('*group2', idoc) == 'object' && $e('*group2', idoc) && $e('*group2', idoc).length == 4;

        var sp0 = $e("<span class='red'>");
        var rs5 = typeof sp0 == 'object' && sp0 && sp0.tagName == 'SPAN';
        rs5 && divOut.appendChild(sp0);
        rs5 && (sp0.innerHTML = '$e-sp0');
        var sp1 = $e("<span class='red'>", idoc);
        var divOut2 = idoc && idoc.getElementById('divOut');
        var rs6 = divOut2 && typeof sp1 == 'object' && sp1 && sp1.tagName == 'SPAN';
        divOut2 && divOut2.appendChild(sp1);
        rs6 && (sp1.innerHTML = '$e-sp1');

        return [rs0, rs1, rs2, rs3, rs4, rs5, rs6];
    },
    "$t": function (idoc, divOut) {
        var arr = null;
        var rs0 = typeof $t('form') == 'object' && (arr = $t('form')) && arr.length == 1;
        rs0 = rs0 && typeof $tags('form') == 'object' && (arr = $tags('form')) && arr.length == 1;
        var rs1 = rs0 && (arr = $t('h1,h2')) && arr.length == 3;
        var rs2 = rs0 && (arr = $t('div.doc')) && arr.length == 1 && arr[0].className == 'doc';
        var rs3 = rs0 && (arr = $t('a[id]')) && arr.length == 3 && arr[0].id == 'a0';
        var rs4 = rs0 && (arr = $t('a[id=a1]')) && arr.length == 1 && arr[0].id == 'a1';
        rs4 = rs4 && (arr = $t('a[id==a1]')) && arr.length == 1 && arr[0].id == 'a1';
        var rs5 = rs0 && (arr = $t('a[class*=ink]')) && arr.length == 3 && arr[0].className.indexOf('ink') >= 0;
        var rs6 = rs0 && (arr = $t('a[id~=0]')) && arr.length == 2 && arr[0].id == 'a1';
        var rs7 = rs0 && (arr = $t('a[id$=0]')) && arr.length == 1 && arr[0].id == 'a0';
        var rs8 = rs0 && (arr = $t('a[id^=a]')) && arr.length == 3 && arr[2].id == 'a2';
        var rs9 = rs0 && (arr = $t('a[id!=a1]')) && arr.length == 2 && arr[1].id == 'a2';

        var sdata0 = document.getElementById('img0').getAttribute('_data'), //"\\~!@#$%^&*()_+`-=[中文]\{}|;':,./< >?",
            sdata1 = document.getElementById('img1').getAttribute('_data'); //'\\~!@#$%^&*()_+`-=[中文]\{}|;":,./< >?';
        var rs10 = rs0 && (arr = $t('img[_data]')) && arr.length == 2 && arr[0].id == 'img0';
        var rs11 = rs0 && (arr = $t('img[_data="' + sdata0 + '"]')) && arr.length == 1 && arr[0].id == 'img0';
        rs11 = rs11 && (arr = $t("img[_data='" + sdata1 + "']")) && arr.length == 1 && arr[0].id == 'img1';
        var rs12 = rs0 && (arr = $t('img[_data*="]')) && arr.length == 1 && arr[0].id == 'img1';
        rs12 = rs12 && (arr = $t("img[_data*=']")) && arr.length == 1 && arr[0].id == 'img0';
        var src0 = "'[\\,]'",
            src1 = '"[\\,]"';
        var rs13 = rs0 && (arr = $t('img[src~="' + src0 + '"]')) && arr.length == 1 && arr[0].id == 'img1';
        rs13 = rs13 && (arr = $t("img[src~='" + src1 + "']")) && arr.length == 1 && arr[0].id == 'img0';
        var rs14 = rs0 && (arr = $t("a[href$='detail']")) && arr.length == 1 && arr[0].id == 'a0';
        var rs15 = rs0 && (arr = $t('a[href^="./X/页/a.html"]')) && arr.length == 2 && arr[0].id == 'a0' && arr[1].id == 'a1';
        var rs16 = rs0 && (arr = $t('img[_data!="' + sdata0 + '"]')) && arr.length == 1 && arr[0].id == 'img1';

        var rs17 = rs0 && (arr = $t('a.link1[id*=a, href*="/页/a.html?id=1&mode=more"]')) && arr.length == 1 && arr[0].id == 'a1';
        var rs18 = rs0 && (arr = $t('div.doc\\p\\a[href*="/a.html"]')) && arr.length == 2 && arr[0].id == 'a0' && arr[1].id == 'a1';
        rs18 = rs0 && (arr = $t('div.doc/p/a[href*="/a.html"]')) && arr.length == 2 && arr[0].id == 'a0' && arr[1].id == 'a1';
        var rs19 = rs0 && (arr = $t('div.doc//a[href*="/a.html"]')) && arr.length == 2 && arr[0].id == 'a0' && arr[1].id == 'a1';
        rs19 = rs0 && (arr = $t('div.doc\\\\a[href*="/a.html"]')) && arr.length == 2 && arr[0].id == 'a0' && arr[1].id == 'a1';
        var rs20 = rs0 && (arr = $t('p.poem/a[id^=a, href*="./X/页/"], div.doc//img[id^="img", src*="/images/"]')) && arr.length == 4 && arr[1].id == 'a1' && arr[3].id == 'img1';
        rs20 = rs20 && (arr = $t('p.poem/a[id^="a", href*="./X/页/"], body//img[id^="img", src*="' + src0 + '"]')) && arr.length == 3 && arr[1].id == 'a1' && arr[2].id == 'img0';
        return [rs0, rs1, rs2, rs3, rs4, rs5, rs6, rs7, rs8, rs9, rs10, rs11, rs12, rs13, rs14, rs15, rs16, rs17, rs18, rs19, rs20];
    },
    "$$.ajax": function () {
        return [];
    },
    "$$.format": function () {
        var rs0 = $$.format("{0}去{1}{2}里", '一', '二', '三') == '一去二三里';
        var rs1 = $$.format("{0}去{1}{2}里=={0}去{1}{2}里", '一', '二', '三') == '一去二三里==一去二三里';
        return [rs0, rs1];
    },
    "$$.htmlEncode": function () {
        var html = 'if (a > b) && (c < a) return "Larger"; else \'Smaller\'; ',
            code0 = 'if (a &gt; b) &amp;&amp; (c &lt; a) return &quot;Larger&quot;; else &apos;Smaller&apos;; ',
            code1 = 'if (a &gt; b) &amp;&amp; (c &lt; a) return "Larger"; else \'Smaller\'; ',
            code2 = 'if (a > b) &amp;&amp; (c &lt; a) return &quot;Larger&quot;; else \'Smaller\'; ',
            code3 = 'if (a &#62; b) &#38;&#38; (c &#60; a) return &#34;Larger&#34;; else &#39;Smaller&#39;; ';
        var rs0 = $$.htmlEncode(html) == code0 && $$.htmlEncode(html, 0) == code0;
        var rs1 = $$.htmlEncode(html, 1) == code1;
        var rs2 = $$.htmlEncode(html, 2) == code2;
        var rs3 = $$.htmlEncode(html, 3) == code3;
        html = "if (a &gt; b) return &quot;Larger&quot;;";
        var rs4 = $$.htmlEncode(html, 0) == "if (a &amp;gt; b) return &amp;quot;Larger&amp;quot;;";
        return [rs0, rs1, rs2, rs3, rs4];
    },
    "$$.htmlDecode": function () {
        var html = 'if (a > b) && (c < a) return "Larger"; else \'Smaller\'; ',
            code0 = 'if (a &gt; b) &amp;&amp; (c &lt; a) return &quot;Larger&quot;; else &apos;Smaller&apos;; ',
            code1 = 'if (a &gt; b) &amp;&amp; (c &lt; a) return "Larger"; else \'Smaller\'; ',
            code2 = 'if (a > b) &amp;&amp; (c &lt; a) return &quot;Larger&quot;; else \'Smaller\'; ',
            code3 = 'if (a &#62; b) &#38;&#38; (c &#60; a) return &#34;Larger&#34;; else &#39;Smaller&#39;; ',
            code4 = 'if (a &amp;gt; b) return &amp;quot;Larger&amp;quot;;';
        var rs0 = $$.htmlDecode(code0) == html && $$.htmlDecode(code0, 0) == html;
        var rs1 = $$.htmlDecode(code1, 1) == html;
        var rs2 = $$.htmlDecode(code2, 2) == html;
        var rs3 = $$.htmlDecode(code3, 3) == html;
        var rs4 = $$.htmlDecode(code4) == 'if (a &gt; b) return &quot;Larger&quot;;';
        return [rs0, rs1, rs2, rs3, rs4];
    },
    "$$.url2Object": function () {
        var url = './images/小图/img1.asp?id=2&name=张三&arr=["e","f","g"]&ref=../pages/a.html?pid=3',
            obj = $$.url2Object(url);
        var rs0 = obj.url == url;
        var rs1 = obj.filePath == './images/小图/img1.asp';
        var rs2 = obj.fileDir == './images/小图';
        var rs3 = obj.fileName == 'img1.asp';
        var rs4 = obj.fileShortName == 'img1';
        var rs5 = obj.fileExt == '.asp';
        var rs6 = obj.query == 'id=2&name=张三&arr=["e","f","g"]&ref=../pages/a.html?pid=3';
        var rs7 = obj.queryValue('id') == 2 && obj.queryValue('name') == '张三' && obj.queryValue('arr') == '["e","f","g"]' && obj.queryValue('ref') == '../pages/a.html?pid=3';
        var rs8 = obj.hasParam('id') && obj.hasParam('name') && obj.hasParam('arr') && obj.hasParam('ref') && !obj.hasParam('pid');
        return [rs0, rs1, rs2, rs3, rs4, rs5, rs6, rs7, rs8];
    },
    "document.path": function () {
        var path = $$.url2Object(document.location.href);
        var rs0 = document.path.url === path.url;
        var rs1 = document.path.filePath === path.filePath;
        var rs2 = document.path.fileDir === path.fileDir;
        var rs3 = document.path.fileName === path.fileName;
        var rs4 = document.path.fileShortName === path.fileShortName;
        var rs5 = document.path.fileExt === path.fileExt;
        var rs6 = document.path.query === path.query;
        var rs7 = typeof document.path.queryValue == 'function' && document.path.queryValue('id') == path.queryValue('id');
        var rs8 = typeof document.path.hasParam == 'function' && document.path.hasParam('id') == path.hasParam('id');
        return [rs0, rs1, rs2, rs3, rs4, rs5, rs6, rs7, rs8];
    },
    "document.ready": function () {
        var rs0 = document.getElementById('h2').innerHTML.indexOf('ok') > 0;
        var rs1 = typeof document._testReady == 'number' && document._testReady == 1;
        return [rs0, rs1];
    },
    "addClass": function () {
        var rs0 = $e('a0').addClass('bg_gray').id == 'a0' && $e('a0').className.indexOf('bg_gray') >= 0;
        var rs1 = $e('a1').addClass('bg_gray').id == 'a1' && $e('a1').className.indexOf('bg_gray') >= 0;
        var rs2 = $t('b').addClass('green').length == 10 && $t('b')[9].className.indexOf('green') >= 0;;
        return [rs0, rs1, rs2];
    },
    "append": function (idoc, divOut) {
        var sp0 = document.createElement('SPAN');
        sp0.id = 'span0-append';
        sp0.innerHTML = 'append-span0';
        $e('divOut').append(sp0);
        var rs0 = divOut.childNodes[divOut.childNodes.length - 1].id == 'span0-append';
        var sp1 = idoc.createElement('SPAN');
        sp1.id = 'span1-append';
        sp1.innerHTML = 'append-span1';
        $e('divOut', idoc).append(sp1);
        var divOut2 = idoc.getElementById('divOut');
        var rs1 = divOut2.childNodes[divOut2.childNodes.length - 1].id == 'span1-append';
        return [rs0, rs1];
    },
    "attr": function (idoc) {
        document.expando = true;
        idoc.expando = true;
        var rs0 = $e('img0').attr('alt') == 'fake image 0';
        var rs1 = $e('txt0').attr('_data') == 'Text Data';
        var rs2 = $e('img1').attr('alt', 'Fake Image 1').id == 'img1' && $e('img1').getAttribute('alt') == 'Fake Image 1';
        var rs3 = $e('p1', idoc).attr('_data') == 'p1 data';
        var rs4 = $e('p1', idoc).attr('_data', 'P1Data').id == 'p1' && $e('p1', idoc).getAttribute('_data') == 'P1Data';
        return [rs0, rs1, rs2, rs3, rs4];
    },
    "bind": function (idoc, div, span) {
        var btn = document.getElementById('btnClear'),
            arr = [];
        var onclick = function (evt) {
            try {
                var txt = document.getElementById('txt0');
                txt.value = '';
                var rs0 = txt.value == '';
                var rs1 = !!(evt && evt.srcElement);
                var rs2 = rs1 && evt.srcElement.id == 'btnClear';
                arr = [rs0, rs1, rs2];
                ////: bind idoc element.
            }
            catch (ex) {
                span.innerHTML = ex.message;
            }
        };
        $e(btn).bind('click', onclick);
        typeof btn.fireEvent == 'function' ? btn.fireEvent('click') : typeof btn.click == 'function' ? btn.click() : null;
        return arr;
    },
    "css": function () {
        return [];
    },
    "hide": function () {
        return [];
    },
    "html": function () {
        return [];
    },
    "insert": function () {
        return [];
    },
    "parent": function () {
        return [];
    },
    "pos": function () {
        return [];
    },
    "removeAttr": function () {
        return [];
    },
    "removeClass": function () {
        return [];
    },
    "show": function () {
        return [];
    },
    "tags": function () {
        return [];
    },
    "text": function () {
        return [];
    },
    "unbind": function () {
        return [];
    },
    "val": function () {
        return [];
    },
    "value": function () {
        return [];
    },
    "Array.forEach": function () {
        return [];
    },
    "Array.each": function () {
        return [];
    },
    "Array.exists": function () {
        return [];
    },
    "Array.indexof": function () {
        return [];
    },
    "Date.add": function () {
        return [];
    },
    "Date.diff": function () {
        return [];
    },
    "Date.fromString": function () {
        return [];
    },
    "Date.toObject": function () {
        return [];
    },
    "Date.toString": function () {
        return [];
    },
    "String.format": function () {
        return [];
    },
    "String.trim": function () {
        return [];
    }
}

function btnTest_click(evt) {
    var span = evt.srcElement.nextSibling,
        divOut = document.getElementById('divOut'),
        iframe = document.getElementById('iframe1'),
        frm1 = frames['frame1'] || iframe.contentWindow,
        idoc = frm1 ? frm1.document : null,
        name = getFunctonName(evt.srcElement.previousSibling);
    try {
        var arr = typeof Testor[name] == 'function' ? Testor[name](idoc, divOut, span) : [];
        arr && OnTestSucceed(arr, span);
    } catch (ex) {
        span.innerHTML = ex.message;
    }
}

function OnTestSucceed(arr, span) {
    span.innerHTML = '';
    for (var i = 0; i < arr.length; i++) {
        span.innerHTML += arr[i] ? "<span class='green'>✓</span>" : "<span class='red'>✕</span>";
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
        bind(btns[i], 'click', btnTest_click);
    }
    bind(document.getElementById('btnTestAll'), 'click', btnTestAll_click);
    document.getElementById('h2').innerHTML += '<span class="red"> ok!</span>';
});

document.ready(function () {
    document._testReady = 1;
});