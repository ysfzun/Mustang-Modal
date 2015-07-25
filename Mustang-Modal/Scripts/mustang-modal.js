var __isAsnyc = false,
    _title = '',
    _body = '',
    _buttons = [],
    _width = 0,
    _height = 0,
    _loadPath = '',
    _parameters = {},
    _callback = null,
    _animate = 'top',
    _speed = 500,
    _escapeClose = false;


var _MustangHub = {

    definations: {
        activeModal: ".active-modal",
        mainMustangModal: ".mustang-modal",
        mustangModalTitle: ".mustang-modal-title",
        mustangModalBody: ".mustang-modal-body",
        mustangModalFooter: ".mustang-modal-footer",
        mustangModalBg: "#mustang-modal-bg",
    },

    loadMessageBox: function (options) {

        __isAsnyc = false;
        options = $.extend({

            title: '',
            body: '',
            width: 700,
            height: 0,
            buttons: [],
            animate: 'top',
            speed: 500,
            escapeClose: false

        }, options);

        _title = options.title;
        _body = options.body;

        _width = options.width;
        _height = options.height;
        _buttons = options.buttons;
        _animate = options.animate;
        _speed = options.speed;
        _escapeClose = options.escapeClose;
    },

    setTitle: function (title) {

        if (title == "") {
            return "";
        }

        return "<div class='mustang-modal-title'><h3>" + title + "</h3></div>";
    },

    setBody: function (body) {

        if (body == undefined || body == "") {
            return '<div class="mustang-modal-body"></div>';
        }

        return '<div class="mustang-modal-body">' + body + '</div>';
    },

    setWidth: function (width) {

        if (width == 0 || width == undefined) {
            width = $(_MustangHub.definations.activeModal).css("width");
        }

        $(_MustangHub.definations.activeModal).css({

            'width': width,
            'margin-left': -(Math.floor(width / 2)) + 'px'
        });

    },

    setHeight: function (height) {

        var mustangModalBody = $(_MustangHub.definations.activeModal + " " + _MustangHub.definations.mustangModalBody),
            paddingTop = mustangModalBody.css("padding-top").replace('px', ''),
            paddingBottom = mustangModalBody.css("padding-top").replace('px', '');

        console.log("height : " + height);
        console.log("mustangModalBodyHeight : " + mustangModalBody.height());
        console.log("paddingTop : " + paddingTop);
        console.log("paddingBottom : " + paddingBottom);
        console.log("total : " + (Number(mustangModalBody.height()) + Number(paddingBottom) + Number(paddingTop)));

        if (height == 0 || height == undefined) {

            var bodyHeight = Number(mustangModalBody.height()) + Number(paddingBottom) + Number(paddingTop);
            height = bodyHeight;

        } else {

            height = Number(height) + Number(paddingBottom) + Number(paddingTop);
        }

        $(_MustangHub.definations.activeModal + " " + _MustangHub.definations.mustangModalBody).css({

            'height': (height)
        });
    },

    setButtons: function (buttons) {

        if (buttons == [] || buttons == "")
            return "";

        var buttonsHtml = '';

        for (var i = 0; i < buttons.length; i++) {

            var button = buttons[i];

            if (button.id == undefined) {
                button.id = _MustangHub.generateGuidId();
                buttons[i] = button;
            }

            if (button.type == undefined) {
                button.type = "default";
            }

            if (button.text == undefined) {
                button.text = "Button Name";
            }

            buttonsHtml += '<input id="' + button.id + '" type="button" class="button btn btn-' + button.type + ' pbutton" value="' + button.text + '"/>';
        }

        return '<div class="mustang-modal-footer messageBoxButtons">' + buttonsHtml + '</div>';
    },

    addBackground: function () {
        $('body').append('<div id="mustang-modal-bg"></div>');
    },

    removeBackground: function () {

        if ($(_MustangHub.definations.mainMustangModal).length == 0) {
            $("#mustang-modal-bg").remove();
        }
    },

    appendModal: function (html) {

        //adding new modal
        if (_buttons.length == 0) {

            $("body")
                .append('<div class="mustang-modal active-modal"> <div class="mustang-modal-close"><a href=# onclick="MustangModal.Close(); return false;">X</div></a>' + html + '</div>');
        }
        else {
            $("body")
              .append('<div class="mustang-modal active-modal">' + html + '</div>');
        }

        _MustangHub.resetActiveModal();

        //loading width and height properties
        _MustangHub.setWidth(_width);
        _MustangHub.setHeight(_height);

        //loading buttons callbacks
        var buttons = _buttons;

        if (_buttons != []) {

            $(".pbutton").on('click', function () {

                var parameterButtonId = $(this).attr('id');
                if (parameterButtonId == 'undefined') {
                    alert("You must fill the id field(s).");
                }

                for (var t = 0; t < buttons.length; t++) {
                    if (buttons[t].id == parameterButtonId) {
                        $.call(this, buttons[t].callback);
                    }
                }

                return false;
            });
        }

        if (__isAsnyc) {
            ajaxMethods.load(_MustangHub.definations.activeModal + " " + _MustangHub.definations.mustangModalBody, _loadPath, _parameters, _callback);
        }

        if (_MustangHub.hasAnimate()) {

            var activeModal = $(_MustangHub.definations.activeModal),
                activeModalHeight = $(_MustangHub.definations.activeModal).height();

            activeModal.css({ top: '-' + activeModalHeight + 'px' });
        }

        _MustangHub.escapeClose();
    },

    open: function () {

        var title = _MustangHub.setTitle(_title);
        var body = "";

        if (!__isAsnyc) {
            _MustangHub.setBody('');
            body = _MustangHub.setBody(_body);
        }
        else {
            body = _MustangHub.setBody();
        }

        var buttons = _MustangHub.setButtons(_buttons);
        $(_MustangHub.definations.activeModal).fadeIn(300);

        _MustangHub.appendModal(title + body + buttons);

        switch (_animate) {
            case "top":
                $(_MustangHub.definations.activeModal)
                .animate({ top: '0px' }, _speed);
                break;
            case "toggle":
                $(_MustangHub.definations.activeModal)
               .css({ top: "0", display: "none" })
               .slideDown(_speed);
                break;
            case "opacity":
                $(_MustangHub.definations.activeModal)
                .css({ top: "0", display: "none" })
                .fadeIn(_speed);
                break;
            default:
        }
    },

    close: function () {

        var activeModal = $(_MustangHub.definations.activeModal),
            activeModalHeight = activeModal.height();

        if (_MustangHub.hasAnimate()) {

            switch (_animate) {
                case "top":
                    $(_MustangHub.definations.activeModal)
                     .animate({ top: "-" + activeModalHeight + "px" }, _speed, function () {
                         $(activeModal).remove();
                         _MustangHub.resetActiveModal();
                     });
                    break;
                case "toggle":
                    $(_MustangHub.definations.activeModal)
                    .slideUp(_speed, function () {

                        $(activeModal).remove();
                        _MustangHub.resetActiveModal();
                    });
                    break;
                case "opacity":
                    $(_MustangHub.definations.activeModal)
                    .fadeOut(_speed, function () {

                        $(activeModal).remove();
                        _MustangHub.resetActiveModal();
                    });
                    break;
                default:
            }

        } else {
            $(activeModal).remove();
            _MustangHub.resetActiveModal();
        }

        __isAsnyc = false;
        _MustangHub.resetOptions();
    },

    resetActiveModal: function () {

        $(_MustangHub.definations.mainMustangModal).removeClass("active-modal");
        $(_MustangHub.definations.mainMustangModal).last().addClass("active-modal");

        $(_MustangHub.definations.mainMustangModal).css("z-index", 0);
        $(_MustangHub.definations.activeModal).css("z-index", 9999);

        if ($(_MustangHub.definations.mustangModalBg).length == 0) {
            _MustangHub.addBackground();
        }

        $(_MustangHub.definations.mustangModalBg).css("z-index", 9990);

        if ($(_MustangHub.definations.mainMustangModal).length == 0) {
            _MustangHub.removeBackground();
        }
    },

    generateGuidId: function () {

        var id = "";
        var value = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 7; i++)
            id += value.charAt(Math.floor(Math.random() * value.length));

        return id;
    },

    hasAnimate: function () {

        return _animate != "" ? true : false;
    },

    escapeClose: function () {

        if (_escapeClose == true) {

            $(window).on("keyup", function (e) {

                if (e.keyCode == 27) {

                    _MustangHub.close();
                }
            });
        }
    },

    resize: function () {

        _MustangHub.setWidth(_width);
        _MustangHub.setHeight(_height);
    },

    resetOptions: function () {

        _width = 0,
        _height = 0,
        _loadPath = '',
        _parameters = {},
        _callback = null,
        _animate = 'top',
        _speed = 500,
        _escapeClose = false;
        _title = "";
        _body = "";
        _buttons = [];
    }
};

var ajaxMethods = {

    load: function (element, url, parameters, callback) {

        $(element).load(url, parameters, callback);
    }
};

var MustangModal = {

    prop: function (options) {

        _MustangHub.loadMessageBox(options);
        return this;
    },

    load: function (loadPath, parameters, callback) {

        __isAsnyc = true;
        _MustangHub.setBody('');

        _parameters = parameters;
        _loadPath = loadPath;
        _callback = callback;

        return this;
    },

    openIframe: function (url) {

        _MustangHub.setBody('');

        var iframeHtml = '';
        iframeHtml += '<iframe style="width:100%;height:100%;" src="' + url + ' ">';
        iframeHtml += '</iframe>';

        _body = iframeHtml;

        return this;
    },

    open: function (selector) {

        if (selector != undefined) {
            _body = selector.html();
        }

        _MustangHub.open();
        return this;
    },

    close: function () {

        _MustangHub.close();
        return this;
    },

    changeBody: function (html) {

        $(_MustangHub.definations.activeModal + " " + _MustangHub.definations.mustangModalBody).remove();
        _body = _MustangHub.setBody(html);

        $(_MustangHub.definations.activeModal + " " + _MustangHub.definations.mustangModalTitle)
            .after(_body);

        _MustangHub.resize();
    },

    changeTitle: function (title) {

        $(_MustangHub.definations.activeModal + " " + _MustangHub.definations.mustangModalTitle).text(title);
        _body = _MustangHub.setTitle(html);
    },

    set: {

        load: function (eq, url, parameters, callback) {

            var element = $(_MustangHub.definations.mainMustangModal)
           .eq(eq)
           .children(_MustangHub.definations.mustangModalBody);

            ajaxMethods.load(element, url, parameters, callback);
        },

        iframe: function (eq, url) {

            _MustangHub.setBody('');
            var iframeHtml = '';

            iframeHtml += '<iframe style="width:100%;height:100%;" src="' + url + ' ">';
            iframeHtml += '</iframe>';

            $(_MustangHub.definations.mainMustangModal)
                .eq(eq)
                .children(_MustangHub.definations.mustangModalBody)
                .html(iframeHtml);
        },

        body: function (eq, html) {

            $(_MustangHub.definations.mainMustangModal)
               .eq(eq)
               .children(_MustangHub.definations.mustangModalBody)
               .html(html);
        }
    },
};

MustangModal.Close = function () {

    _MustangHub.close();

};

