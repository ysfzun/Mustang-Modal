var __isAsnyc = false;

var _MustangHub = {

    definations: {
        containerId: ".mustang-modal",
        activeModal: ".active-modal",
        mainMessageBox: ".mustang-modal",
        messageBoxBackground: "#mustang-modal-bg",
        messageBoxBody: ".mustang-modal-body",
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
            duration: 500,
            escapeClose: false

        }, options);

        _title = options.title;
        _body = options.body;

        _width = options.width;
        _height = options.height;
        _buttons = options.buttons;
        _animate = options.animate;
        _duration = options.duration;
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

        $(_MustangHub.definations.activeModal).css({

            'width': width + 'px',
            'margin-left': -(Math.floor(width / 2)) + 'px'

        });

    },

    setHeight: function (height) {

        $(_MustangHub.definations.activeModal + " " + _MustangHub.definations.messageBoxBody).css({

            'height': (height == 0 ? '110px' : height + 'px')

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

        if ($(_MustangHub.definations.mainMessageBox).length == 0) {
            $("#mustang-modal-bg").remove();
        }
    },

    appendModal: function (html) {

        //adding new modal
        if (_buttons.length == 0) {

            $("body")
                .append('<div class="mustang-modal active-modal"> <div class="mustang-modal-close"><a href=# onclick="MustangModal.Close();">X</div>' + html + '</div>');
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
            ajaxMethods.load(_MustangHub.definations.activeModal + " " + _MustangHub.definations.messageBoxBody, _loadPath, _parameters, _callback);
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
                .animate({ top: '0px' }, _duration);
                break;
            case "toggle":
                $(_MustangHub.definations.activeModal)
               .css({ top: "0", display: "none" })
               .slideDown(_duration);
                break;
            case "opacity":
                $(_MustangHub.definations.activeModal)
                .css({ top: "0", display: "none" })
                .fadeIn(_duration);
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
                     .animate({ top: "-" + activeModalHeight + "px" }, _duration, function() {
                         $(activeModal).remove();
                         _MustangHub.resetActiveModal();
                    });
                    break;
                case "toggle":
                    $(_MustangHub.definations.activeModal)
                    .slideUp(_duration, function() {
                        
                        $(activeModal).remove();
                        _MustangHub.resetActiveModal();
                    });
                    break;
                case "opacity":
                    $(_MustangHub.definations.activeModal)
                    .fadeOut(_duration, function() {
                        
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
    },

    resetActiveModal: function () {

        $(_MustangHub.definations.mainMessageBox).removeClass("active-modal");
        $(_MustangHub.definations.mainMessageBox).last().addClass("active-modal");

        $(_MustangHub.definations.mainMessageBox).css("z-index", 0);
        $(_MustangHub.definations.activeModal).css("z-index", 9999);

        if ($(_MustangHub.definations.messageBoxBackground).length == 0) {
            _MustangHub.addBackground();
        }

        $(_MustangHub.definations.messageBoxBackground).css("z-index", 9990);

        if ($(_MustangHub.definations.mainMessageBox).length == 0) {
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
    }

};

var ajaxMethods = {

    load: function (element, url, parameters, callback) {

        $(element).load(url, parameters, callback);
    }
};

var MustangModal = function () {

    this._title = '';
    this._body = '';
    this._buttons = '';
    this._width = 0;
    this._height = 0;
    this._loadPath = '';
    this._parameters = {};
    this._callback = null;
    this._animate = '';
    this._duration = 0;
    this._escapeClose = false;

    this.popup = function (options) {

        _MustangHub.loadMessageBox(options);
        return this;
    };

    this.load = function (loadPath, parameters, callback) {

        __isAsnyc = true;
        _MustangHub.setBody('');

        _parameters = parameters;
        _loadPath = loadPath;
        _callback = callback;

        return this;
    },

    this.openIframe = function (url) {

        _MustangHub.setBody('');

        var iframeHtml = '';
        iframeHtml += '<iframe style="width:100%;height:100%;" src="' + url + ' ">';
        iframeHtml += '</iframe>';

        _body = iframeHtml;

        return this;
    };

    this.open = function () {

        _MustangHub.open();
        return this;
    };

    this.close = function () {

        _MustangHub.close();
        return this;
    };

    this.changeBody = function (html) {

        var body = _MustangHub.setBody(html);
        $(_MustangHub.definations.activeModal + " " + _MustangHub.definations.messageBoxBody).html(body);
    };

    this.get = {

        load: function (eq, url, parameters, callback) {

            var element = $(_MustangHub.definations.containerId)
           .eq(eq)
           .children(_MustangHub.definations.messageBoxBody);

            ajaxMethods.load(element, url, parameters, callback);
        },

        iframe: function (eq, url) {

            _MustangHub.setBody('');
            var iframeHtml = '';

            iframeHtml += '<iframe style="width:100%;height:100%;" src="' + url + ' ">';
            iframeHtml += '</iframe>';

            $(_MustangHub.definations.containerId)
                .eq(eq)
                .children(_MustangHub.definations.messageBoxBody)
                .html(iframeHtml);
        },

        body: function (html) {

            $(_MustangHub.definations.containerId)
               .eq(eq)
               .children(_MustangHub.definations.messageBoxBody)
               .html(html);
        }
    };
};

MustangModal.Close = function () {

    _MustangHub.close();
};

