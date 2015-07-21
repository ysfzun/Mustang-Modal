var messageBox = {

    definations: {
        containerId: ".mustang-modal",
        activeModal: ".active-modal",
        mainMessageBox: ".mustang-modal",
        messageBoxBackground: "#mustang-modal-bg",
        messageBoxBody: ".mustang-modal-body",
        animationDuration: 350
    },

    setTitle: function (title) {

        return '<div class="mustang-modal-title"><h3>' + title + '</h3></div>';
    },

    setBody: function (body) {

        if (body == undefined || body == "" || body == null) {
            return '<div class="mustang-modal-body"></div>';
        }

        return '<div class="mustang-modal-body">' + body + '</div>'
    },

    setWidth: function (width) {

        $(messageBox.definations.activeModal).css({

            'width': width + 'px',
            'margin-left': -(Math.floor(width / 2)) + 'px'

        });

    },

    setHeight: function (height) {

        $(messageBox.definations.activeModal + " " + messageBox.definations.messageBoxBody).css({

            'height': (height == 0 ? '110px' : height + 'px')

        });
    },

    setButtons: function (buttons) {

        if (buttons == [])
            return "";

        var buttonsHtml = '';

        for (var i = 0; i < buttons.length; i++) {

            var button = buttons[i];

            if (button.id == undefined) {
                button.id = messageBox.generateGuidId();
                buttons[i] = button;
            }

            buttonsHtml += '<input id="' + button.id + '" type="button" class="button btn btn-' + button.type + ' pbutton" value="' + button.text + '"/>';
        }

        return '<div class="mustang-modal-footer messageBoxButtons">' + buttonsHtml + '</div>';
    },

    addBackground: function () {
        $('body').append('<div id="mustang-modal-bg"></div>');
    },

    removeBackground: function () {

        if ($(messageBox.definations.mainMessageBox).length == 0) {
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

        messageBox.resetActiveModal();

        //loading width and height properties
        messageBox.setWidth(_width);
        messageBox.setHeight(_height);

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
            ajaxMethods.load(messageBox.definations.activeModal + " " + messageBox.definations.messageBoxBody, _loadPath, _parameters, _callback);
        }

        if (messageBox.hasAnimate()) {

            var activeModal = $(messageBox.definations.activeModal),
                activeModalHeight = $(messageBox.definations.activeModal).height();

            activeModal.css({ top: '-' + activeModalHeight + 'px' });
        }
    },

    open: function () {

        var title = messageBox.setTitle(_title);
        var body = "";

        if (!__isAsnyc) {
            messageBox.setBody('');
            body = messageBox.setBody(_body);
        }
        else {
            body = messageBox.setBody();
        }

        var buttons = messageBox.setButtons(_buttons);
        $(messageBox.definations.activeModal).fadeIn(300);

        messageBox.appendModal(title + body + buttons);

    },

    close: function () {

        $(messageBox.definations.activeModal).remove();
        messageBox.resetActiveModal();
    },

    loadMessageBox: function (options) {

        __isAsnyc = false;
        options = $.extend({

            title: '',
            body: '',
            width: 700,
            height: 0,
            buttons: [],
            animate: ''

        }, options);

        //{ id: 'btn', text: '', callback: null, type: 'btn-primary' }

        _title = options.title;
        _body = options.body;

        _width = options.width;
        _height = options.height;
        _buttons = options.buttons;
        _animate = options.animate;
    },

    resetActiveModal: function () {

        $(messageBox.definations.mainMessageBox).removeClass("active-modal");
        $(messageBox.definations.mainMessageBox).last().addClass("active-modal");

        $(messageBox.definations.mainMessageBox).css("z-index", 0);
        $(messageBox.definations.activeModal).css("z-index", 9999);

        if ($(messageBox.definations.messageBoxBackground).length == 0) {
            messageBox.addBackground();
        }

        $(messageBox.definations.messageBoxBackground).css("z-index", 9990);

        if ($(messageBox.definations.mainMessageBox).length == 0) {
            messageBox.removeBackground();
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
    }

};

var __isAsnyc = false;

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

    this.popup = function (options) {

        messageBox.loadMessageBox(options);
        return this;
    };

    this.load = function (loadPath, parameters, callback) {

        __isAsnyc = true;
        messageBox.setBody('');

        _parameters = parameters;
        _loadPath = loadPath;
        _callback = callback;

        return this;
    },

    this.openIframe = function (url) {

        messageBox.setBody('');
        var iframeHtml = '';

        iframeHtml += '<iframe style="width:100%;height:100%;" src="' + url + ' ">';
        iframeHtml += '</iframe>';

        _body = iframeHtml;

        return this;
    };

    this.open = function () {

        messageBox.open();
        $(messageBox.definations.activeModal).animate({ top: '0px' }, messageBox.definations.animationDuration);

        return this;
    };

    this.close = function () {

        var activeModal = $(messageBox.definations.activeModal),
            activeModalHeight = activeModal.height();

        if (messageBox.hasAnimate()) {

            $(messageBox.definations.activeModal)
                .animate(
                    {
                        top: "-" + activeModalHeight + "px"
                    },
                    messageBox.definations.animationDuration, function() {

                        messageBox.close();
                    });
        } else {
            messageBox.close();
        }

        return this;
    };

    this.changeBody = function (html) {

        var body = messageBox.setBody(html);
        $(messageBox.definations.activeModal + " " + messageBox.definations.messageBoxBody).html(body);
    };

    this.get = {

        load: function (eq, url, parameters, callback) {

            var element = $(messageBox.definations.containerId)
           .eq(eq)
           .children(messageBox.definations.messageBoxBody);

            ajaxMethods.load(element, url, parameters, callback);
        },

        iframe: function (eq, url) {

            messageBox.setBody('');
            var iframeHtml = '';

            iframeHtml += '<iframe style="width:100%;height:100%;" src="' + url + ' ">';
            iframeHtml += '</iframe>';

            $(messageBox.definations.containerId)
                .eq(eq)
                .children(messageBox.definations.messageBoxBody)
                .html(iframeHtml);
        }

    };
};

MustangModal.Close = function () {

    messageBox.close();
};

var ajaxMethods = {

    load: function (element, url, parameters, callback) {

        $(element).load(url, parameters, callback);
    },
};