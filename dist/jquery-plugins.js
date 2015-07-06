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
            if ($this.hasClass(class1)) {
                $(this).removeClass(class1).addClass(class2);
            }
            else {
                $(this).removeClass(class2).addClass(class1);
            }
        });
    };
    $.fn.toggleText = function (text1, text2) {
        return this.each(function () {
            var $this = $(this);
            if ($this.text() === text1) {
                $(this).text(text2);
            }
            else {
                $(this).text(text1);
            }
        });
    };
    $.fn.ellipsisFill = function (text) {
        var textPassed = true;
        if (!text)
            textPassed = false;
        return this.each(function () {
            var $self = $(this);
            if (!textPassed)
                text = $self.text();
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
                    if (t === lastText)
                        break;
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
            }
            else {
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
            }
            else {
                $span.html(text);
            }
            $self.append($span);
        });
    };
    $.fn.toggleExpandText = function (chars, callback) {
        return this.each(function () {
            var $self = $(this);
            var expandedText = $self.html();
            if (chars > expandedText.length)
                return;
            var expanded = false;
            var collapsedText = expandedText.substr(0, chars);
            collapsedText = collapsedText.substr(0, Math.min(collapsedText.length, collapsedText.lastIndexOf(" ")));
            $self.toggle = function () {
                $self.empty();
                var $toggleButton = $('<a href="#" class="toggle"></a>');
                if (expanded) {
                    $self.html(expandedText + "&nbsp;");
                    $toggleButton.text("less");
                    $toggleButton.toggleClass("less", "more");
                }
                else {
                    $self.html(collapsedText + "&nbsp;");
                    $toggleButton.text("more");
                    $toggleButton.toggleClass("more", "less");
                }
                $toggleButton.one('click', function (e) {
                    e.preventDefault();
                    $self.toggle();
                });
                expanded = !expanded;
                $self.append($toggleButton);
                if (callback)
                    callback();
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
                trimmedText = trimmedText.substr(0, Math.min(trimmedText.length, trimmedText.lastIndexOf(" ")));
                $self.empty().html(trimmedText + "&hellip;");
            }
        });
    };
    $.fn.equaliseHeight = function (reset, average) {
        var maxHeight = -1;
        var minHeight = Number.MAX_VALUE;
        // reset all heights to auto first so they can be re-measured.
        if (reset) {
            this.each(function () {
                $(this).height('auto');
            });
        }
        this.each(function () {
            var currentHeight = $(this).height();
            maxHeight = maxHeight > currentHeight ? maxHeight : currentHeight;
            minHeight = minHeight < currentHeight ? minHeight : currentHeight;
        });
        var finalHeight = maxHeight;
        if (average) {
            finalHeight = (minHeight + maxHeight) * 0.5;
        }
        this.each(function () {
            $(this).height(finalHeight);
        });
        return this;
    };
    // Recursively removes the last empty element (img, audio, etc) or word in an element
    $.fn.removeLastWord = function (chars) {
        if ('undefined' === typeof chars)
            chars = 8;
        return this.each(function () {
            var $self = $(this);
            if ($self.contents().length > 0) {
                var $lastElement = $self.contents().last();
                if ($lastElement[0].nodeType === 3) {
                    var words = $lastElement.text().trim().split(' ');
                    if (words.length > 1) {
                        words.splice(words.length - 1, 1);
                        $lastElement[0].data = words.join(' '); // textnode.data
                        return;
                    }
                    else if ('undefined' !== typeof chars && words.length === 1 && words[0].length > chars) {
                        $lastElement[0].data = words.join(' ').substring(0, chars);
                        return;
                    }
                }
                $lastElement.removeLastWord(chars); // Element
            }
            else {
                // Empty element
                $self.remove();
            }
        });
    };
    // Truncates to a certain number of letters, while ignoring and preserving HTML
    $.fn.ellipsisHtmlFixed = function (chars, callback) {
        return this.each(function () {
            var $self = $(this);
            var expandedText = $self.html();
            var $trunc = $('<span></span>');
            $trunc.html($self.html().replace(/\s[\s]*/g, ' ').trim());
            if ($trunc.text().trim().length <= chars) {
                return; // do nothing if we're under the limit!
            }
            while ($trunc.text().trim().length > chars) {
                $trunc.removeLastWord(chars);
            }
            var collapsedText = $trunc.html();
            // Toggle function
            var expanded = false;
            $self.toggle = function () {
                $self.empty();
                var $toggleButton = $('<a href="#" class="toggle"></a>');
                if (expanded) {
                    $self.html(expandedText + " ");
                    $toggleButton.text("less");
                    $toggleButton.toggleClass("less", "more");
                }
                else {
                    $self.html(collapsedText + "&hellip; ");
                    $toggleButton.text("more");
                    $toggleButton.toggleClass("more", "less");
                }
                $toggleButton.one('click', function (e) {
                    e.preventDefault();
                    $self.toggle();
                });
                expanded = !expanded;
                $self.append($toggleButton);
                if (callback)
                    callback();
            };
            $self.toggle();
        });
    };
    // Toggle expansion by number of lines
    $.fn.toggleExpandTextByLines = function (lines, callback) {
        return this.each(function () {
            var $self = $(this);
            // Calculate line height to get target height
            var lineHeight = parseFloat($self.css('line-height'));
            var cssunit = $self.css('line-height').replace(/[\d\.]/g, '');
            var fontSize = parseFloat($self.css('font-size'));
            if (!lineHeight) {
                cssunit = $self.css('font-size').replace(/[\d\.]/g, '');
            }
            if (!lineHeight) {
                var $current = $self.parent();
                while (!lineHeight && $current.prop('tagName') !== "BODY") {
                    $current = $current.parent();
                    lineHeight = parseFloat($current.css('line-height'));
                    cssunit = $current.css('line-height').replace(/[\d\.]/g, '');
                    if (!(lineHeight && fontSize)) {
                        fontSize = parseFloat($self.css('font-size'));
                        cssunit = $current.css('font-size').replace(/[\d\.]/g, '');
                    }
                }
            }
            // Default line-height is 'normal' (1.2 * font size)
            if (!lineHeight) {
                if (!fontSize) {
                    lineHeight = 16 * 1.2; // CSS default font size
                    cssunit = 'px';
                }
                else {
                    lineHeight = fontSize * 1.2;
                }
            }
            var targetHeight = Length.toPx(this, ((lineHeight + 1) * lines) + cssunit);
            // Collapse
            if ($self.outerHeight() <= targetHeight)
                return;
            var expandedText = $self.html();
            // add 'pad' to account for the right margin in the sidebar
            var $buttonPad = $('<span>&hellip; <a href="#" class="toggle more">morepad</a></span>');
            $self.append($buttonPad);
            while ($self.height() > targetHeight) {
                $buttonPad.remove();
                $self.removeLastWord();
                $self.append($buttonPad);
            }
            $buttonPad.remove();
            var collapsedText = $self.html();
            // Toggle function
            var expanded = false;
            $self.toggle = function () {
                $self.empty();
                var $toggleButton = $('<a href="#" class="toggle"></a>');
                if (expanded) {
                    $self.html(expandedText + " ");
                    $toggleButton.text("less");
                    $toggleButton.toggleClass("less", "more");
                }
                else {
                    $self.html(collapsedText + "&hellip; ");
                    $toggleButton.text("more");
                    $toggleButton.toggleClass("more", "less");
                }
                $toggleButton.one('click', function (e) {
                    e.preventDefault();
                    $self.toggle();
                });
                expanded = !expanded;
                $self.append($toggleButton);
                if (callback)
                    callback();
            };
            $self.toggle();
        });
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
        return this.each(function () {
            var $this = $(this);
            $this.on('click', function (e) {
                e.preventDefault();
                callback();
            });
            $this.on('keyup', function (e) {
                if (e.keyCode === 13) {
                    e.preventDefault();
                    callback();
                }
            });
        });
    };
    $.fn.onEnter = function (callback) {
        return this.each(function () {
            var $this = $(this);
            $this.on('keyup', function (e) {
                if (e.keyCode === 13) {
                    e.preventDefault();
                    callback();
                }
            });
        });
    };
    var on = $.fn.on, timer;
    $.fn.on = function () {
        var args = Array.apply(null, arguments);
        var last = args[args.length - 1];
        if (isNaN(last) || (last === 1 && args.pop()))
            return on.apply(this, args);
        var delay = args.pop();
        var fn = args.pop();
        args.push(function () {
            var self = this, params = arguments;
            clearTimeout(timer);
            timer = setTimeout(function () {
                fn.apply(self, params);
            }, delay);
        });
        return on.apply(this, args);
    };
    $.mlp = { x: 0, y: 0 }; // Mouse Last Position
    function documentHandler() {
        var $current = this === document ? $(this) : $(this).contents();
        $current.mousemove(function (e) {
            jQuery.mlp = { x: e.pageX, y: e.pageY };
        });
        $current.find("iframe").load(documentHandler);
    }
    $(documentHandler);
    $.fn.ismouseover = function (overThis) {
        var result = false;
        this.eq(0).each(function () {
            var $current = $(this).is("iframe") ? $(this).contents().find("body") : $(this);
            var offset = $current.offset();
            result = offset.left <= $.mlp.x && offset.left + $current.outerWidth() > $.mlp.x && offset.top <= $.mlp.y && offset.top + $current.outerHeight() > $.mlp.y;
        });
        return result;
    };
})(jQuery);
