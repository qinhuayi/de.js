function getFunctonName(span) {
    var name = span.innerHTML,
        index = name.indexOf('(');
    return index > 0 ? name.substring(0, index) : name;
}

var Testor = {
    "$e": function (idoc, divOut) {
        var res0 = typeof $e('iframe1') == 'object' && $e('iframe1').tagName == 'IFRAME';
        var res1 = $e(document.body).tagName == 'BODY';
        var p = $e('p1', idoc);
        var res2 = typeof p == 'object' && p.tagName == 'P';

        var res3 = typeof $e('*group1') == 'object' && $e('*group1').length == 3;
        var res4 = typeof $e('*group2', idoc) == 'object' && $e('*group2', idoc).length == 4;

        var sp0 = $e("<span class='red'>");
        var res5 = typeof sp0 == 'object' && sp0.tagName == 'SPAN';
        res5 && (sp0.innerHTML = '$e-sp0');
        divOut.appendChild(sp0);
        var sp1 = $e("<span class='red'>", idoc);
        var res6 = typeof sp1 == 'object' && sp1.tagName == 'SPAN';
        res6 && (sp1.innerHTML = '$e-sp1');
        idoc.getElementById('divOut').appendChild(sp1);

        return [res0, res1, res2, res3, res4, res5, res6];
    }
}

function btnTest_click(evt) {
    var msg = evt.srcElement.nextSibling,
        divOut = document.getElementById('divOut'),
        idoc = document.getElementById('iframe1').contentWindow.document,
        name = getFunctonName(evt.srcElement.previousSibling),
        arr = Testor[name](idoc, divOut);
    for (var i = 0; i < arr.length; i++) {
        msg.innerHTML += arr[i] ? "<span class='green'>✓</span>" : "<span class='red'>✕</span>";
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
    document.getElementById('h1').innerHTML += ' ok!';
});