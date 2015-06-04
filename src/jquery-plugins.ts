(function ($) {

    $.fn.disable = function () {
        return this.each(function () {
            var $this = $(this);
            $this.addClass('disabled');
            $this.data('tabindex', $this.attr('tabindex'));
            $this.removeAttr('tabindex');
        });
    };

    $.fn.enable = function () {
        return this.each(function () {
            var $this = $(this);
            $this.removeClass('disabled');
            $this.attr('tabindex', $this.data('tabindex'));
        });
    };

    $.fn.targetBlank = function () {
        return this.each(function () {
            $(this).find('a').prop('target', '_blank');
        });
    };

    $.fn.swapClass = function (removeClass, addClass) {
        return this.each(function () {
            $(this).removeClass(removeClass).addClass(addClass);
        });
    };

    $.fn.toggleClass = function (class1, class2) {
        return this.each(function () {
            var $this = $(this);

            if ($this.hasClass(class1)){
                $(this).removeClass(class1).addClass(class2);
            } else {
                $(this).removeClass(class2).addClass(class1);
            }

        });
    };

    $.fn.toggleText = function (text1, text2) {
        return this.each(function () {
            var $this = $(this);

            if ($this.text() === text1){
                $(this).text(text2);
            } else {
                $(this).text(text1);
            }

        });
    };

    $.fn.ellipsisFill = function (text) {

        var textPassed = true;
        if (!text) textPassed = false;

        return this.each(function () {

            var $self = $(this);

            if (!textPassed) text = $self.text();

            $self.empty();

            $self.spanElem = $('<span title="' + text + '"></span>');
            $self.append($self.spanElem);

            $self.css('overflow', 'hidden');
            $self.spanElem.css('white-space', 'nowrap');

            $self.spanElem.html(text);

            // get the width of the span.
            // if it's wider than the container, remove a word until it's not.
            if ($self.spanElem.width() > $self.width()) {
                var lastText;

                while ($self.spanElem.width() > $self.width()) {
                    var t = $self.spanElem.html();

                    t = t.substring(0, t.lastIndexOf(' ')) + '&hellip;';

                    if (t === lastText) break;

                    $self.spanElem.html(t);

                    lastText = t;
                }
            }
        });
    };

    $.fn.ellipsisFixed = function (chars, buttonText) {

        return this.each(function () {

            var $self = $(this);

            var text = $self.text();

            $self.empty();

            var $span = $('<span></span>');

            var $ellipsis = $('<a href="#" title="more" class="ellipsis"></a>');

            if (buttonText) {
                $ellipsis.html(buttonText);
            } else {
                $ellipsis.html('&hellip;');
            }

            $ellipsis.click(function (e) {
                e.preventDefault();

                var $this = $(this);

                $span.html(text);

                $this.remove();
            });

            if (text.length > chars) {
                var trimmedText = text.substr(0, chars);
                trimmedText = trimmedText.substr(0, Math.min(trimmedText.length, trimmedText.lastIndexOf(" ")));

                $span.html(trimmedText + "&nbsp;");

                $span.append($ellipsis);
            } else {
                $span.html(text);
            }

            $self.append($span);
        });

    };

    $.fn.toggleExpandText = function (chars, callback) {

        return this.each(function () {

            var $self = $(this);

            var expandedText = $self.html();

            if (chars > expandedText.length) return;

            var expanded = false;

            var collapsedText = expandedText.substr(0, chars);
            collapsedText = collapsedText.substr(0, Math.min(collapsedText.length, collapsedText.lastIndexOf(" ")));

            $self.toggle = function() {
                $self.empty();

                var $toggleButton = $('<a href="#" class="toggle"></a>');

                if (expanded) {
                    $self.html(expandedText + "&nbsp;");
                    $toggleButton.text("less");
                    $toggleButton.toggleClass("less", "more");
                } else {
                    $self.html(collapsedText + "&nbsp;");
                    $toggleButton.text("more");
                    $toggleButton.toggleClass("more", "less");
                }

                $toggleButton.one('click', function(e) {
                    e.preventDefault();

                    $self.toggle();
                });

                expanded = !expanded;

                $self.append($toggleButton);

                if (callback) callback();
            };

            $self.toggle();
        });

    };

    $.fn.ellipsis = function (chars) {

        return this.each(function () {

            var $self = $(this);

            var text = $self.text();

            if (text.length > chars) {
                var trimmedText = text.substr(0, chars);
                trimmedText = trimmedText.substr(0, Math.min(trimmedText.length, trimmedText.lastIndexOf(" ")))

                $self.empty().html(trimmedText + "&hellip;");
            }
        });

    };

    $.fn.equaliseHeight = function (reset) {

        var maxHeight = -1;

        // reset all heights to auto first so they can be re-measured.
        if (reset){
            this.each(function () {
                $(this).height('auto');
            });
        }

        this.each(function () {
            maxHeight = maxHeight > $(this).height() ? maxHeight : $(this).height();
        });

        this.each(function () {
            $(this).height(maxHeight);
        });

        return this;
    };

    $.fn.horizontalMargins = function () {
        var $self = $(this);
        return parseInt($self.css('marginLeft')) + parseInt($self.css('marginRight'));
    };

    $.fn.verticalMargins = function () {
        var $self = $(this);
        return parseInt($self.css('marginTop')) + parseInt($self.css('marginBottom'));
    };

    $.fn.horizontalPadding = function () {
        var $self = $(this);
        return parseInt($self.css('paddingLeft')) + parseInt($self.css('paddingRight'));
    };

    $.fn.verticalPadding = function () {
        var $self = $(this);
        return parseInt($self.css('paddingTop')) + parseInt($self.css('paddingBottom'));
    };

    $.fn.onPressed = function (callback) {

        return this.each(function() {

            var $this = $(this);

            $this.on('click', function(e) {
                e.preventDefault();
                callback();
            });

            $this.on('keyup', function(e) {
                if (e.keyCode === 13) {
                    e.preventDefault();
                    callback();
                }
            });
        });
    };

    $.fn.onEnter = function (callback) {

        return this.each(function() {

            var $this = $(this);

            $this.on('keyup', function(e) {
                if (e.keyCode === 13) {
                    e.preventDefault();
                    callback();
                }
            });
        });
    };

})(jQuery);