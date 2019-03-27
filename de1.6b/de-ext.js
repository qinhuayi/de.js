/// depend on de.js v1.6b
(function (window, document, undefined) {
    var _attach = function (sel) {
        sel.addOption = function (text, value) {
            var opt = $e('<option>');
            sel.options.add(opt);
            opt.innerText = text;
            opt.value = value;
        };
        sel.clear = function () {
            for (var i = sel.options.length - 1; i >= 0; i--) {
                sel.options.remove(i);
            }
        };
        sel.remove = function (istr) {
            if (typeof istr === 'number') {
                sel.childNodes[istr].removeNode(true);
            }
            else if (typeof istr === "string") {
                for (var i = sel.options.length - 1; i >= 0; i--) {
                    if (sel.options[i].value == istr) {
                        sel.childNodes[i].removeNode(true);
                        break;
                    }                
                }
            }
        };
        sel.load = function (arr) {
            arr.each(function (i, e) {
                if (e.text !== undefined && e.value !== undefined) {
                    sel.addOption(e.text, e.value);
                }
                else {
                    sel.addOption(e, e);
                }
            });
        };
        sel.select = function (istr) {
            if (typeof istr === 'number') {
                sel.selectedIndex = istr;
            }
            else if (typeof istr === "string") {
                for (var i = 0; i < sel.options.length; i++) {
                    if (sel.options[i].value == value) {
                        sel.selectedIndex = i;
                        break;
                    }
                }
            }
        };
        sel.selected = function () {
            return sel.selectedIndex >= 0 && sel.selectedIndex < sel.options.length ? sel.options[sel.selectedIndex].value : null;
        };
        return sel;
    };
    document.ready(function () {
        var selects = document.getElementsByTagName('SELECT');
        for (var i = 0; i < selects.length; i++) {
            _attach(selects[i]);
        }
    });

    $$.extends['SELECT'] = _attach;
    //window.SelectEx = { attach: _attach };
})(window, document);

