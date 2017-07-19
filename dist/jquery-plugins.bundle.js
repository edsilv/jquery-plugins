// extensions v0.2.0 https://github.com/edsilv/extensions
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.extensions = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
///<reference path="../node_modules/typescript/lib/lib.es6.d.ts"/> 

Array.prototype.clone = function () {
    return this.slice(0);
};
if (!Array.prototype.includes) {
    Array.prototype.includes = function (val) {
        return this.indexOf(val) !== -1;
    };
}
Array.prototype.insert = function (item, index) {
    this.splice(index, 0, item);
};
Array.prototype.move = function (fromIndex, toIndex) {
    this.splice(toIndex, 0, this.splice(fromIndex, 1)[0]);
};
Array.prototype.remove = function (item) {
    var index = this.indexOf(item);
    if (index > -1) {
        this.splice(index, 1);
    }
};
Array.prototype.removeAt = function (index) {
    this.splice(index, 1);
};

if (!Math.clamp) {
    Math.clamp = function (value, min, max) {
        return Math.min(Math.max(value, min), max);
    };
}
if (!Math.radians) {
    Math.radians = function (degrees) {
        return Math.TAU * (degrees / 360);
    };
}
Math.distanceBetween = function (x1, y1, x2, y2) {
    return Math.sqrt(((x2 - x1) * 2) + ((y2 - y1) * 2));
};
Math.lerp = function (start, stop, amount) {
    return start + (stop - start) * amount;
};
Math.mag = function (a, b, c) {
    return Math.sqrt(a * a + b * b + c * c);
};
Math.map = function (value, start1, stop1, start2, stop2) {
    return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
};
Math.median = function (values) {
    values.sort(function (a, b) { return a - b; });
    var half = Math.floor(values.length / 2);
    if (values.length % 2) {
        return values[half];
    }
    else {
        return (values[half - 1] + values[half]) / 2.0;
    }
};
Math.normalise = function (num, min, max) {
    return (num - min) / (max - min);
};
if (!Math.degrees) {
    Math.degrees = function (radians) {
        return (radians * 360) / Math.TAU;
    };
}
/**
 * Get a random number between two numbers.
 * If 'high' isn't passed, get a number from 0 to 'low'.
 * @param {Number} low The low number.
 * @param {Number} [high] The high number.
 */
Math.randomBetween = function (low, high) {
    if (!high) {
        high = low;
        low = 0;
    }
    if (low >= high)
        return low;
    return low + (high - low) * Math.random();
};
Math.roundToDecimalPlace = function (num, dec) {
    return Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
};
Math.TAU = Math.PI * 2;

String.prototype.b64_to_utf8 = function () {
    return decodeURIComponent(escape(window.atob(this)));
};
String.format = function () {
    var s = arguments[0];
    for (var i = 0; i < arguments.length - 1; i++) {
        var reg = new RegExp("\\{" + i + "\\}", "gm");
        s = s.replace(reg, arguments[i + 1]);
    }
    return s;
};
if (!String.prototype.includes) {
    String.prototype.includes = function (str) {
        return this.indexOf(str) !== -1;
    };
}
String.prototype.isAlphanumeric = function () {
    return /^[a-zA-Z0-9]*$/.test(this);
};
String.prototype.ltrim = function () {
    return this.replace(/^\s+/, '');
};
String.prototype.rtrim = function () {
    return this.replace(/\s+$/, '');
};
String.prototype.toCssClass = function () {
    return this.replace(/[^a-z0-9]/g, function (s) {
        var c = s.charCodeAt(0);
        if (c == 32)
            return '-';
        if (c >= 65 && c <= 90)
            return '_' + s.toLowerCase();
        return '__' + ('000' + c.toString(16)).slice(-4);
    });
};
String.prototype.toFileName = function () {
    return this.replace(/[^a-z0-9]/gi, '_').toLowerCase();
};
String.prototype.utf8_to_b64 = function () {
    return window.btoa(unescape(encodeURIComponent(this)));
};

},{}]},{},[1])(1)
});
!function(f){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=f();else if("function"==typeof define&&define.amd)define([],f);else{var g;g="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,g.jqueryPlugins=f()}}(function(){return function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a="function"==typeof require&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}for(var i="function"==typeof require&&require,o=0;o<r.length;o++)s(r[o]);return s}({1:[function(require,module,exports){!function($){function documentHandler(){var $current=this===document?$(this):$(this).contents();$current.mousemove(function(e){jQuery.mlp={x:e.pageX,y:e.pageY}}),$current.find("iframe").load(documentHandler)}$.fn.checkboxButton=function(onClick){return this.each(function(){var $this=$(this);$this.on("click",function(e){var tagName=e.target.tagName,$checkbox=$(this).find(":checkbox");"INPUT"!==tagName&&(e.preventDefault(),$checkbox.prop("checked",!$checkbox.prop("checked")));var checked=$checkbox.is(":checked");onClick.call(this,checked)})})},$.fn.disable=function(){return this.each(function(){var $this=$(this);$this.addClass("disabled"),$this.data("tabindex",$this.attr("tabindex")),$this.removeAttr("tabindex")})},$.fn.ellipsis=function(chars){return this.each(function(){var $self=$(this),text=$self.text();if(text.length>chars){var trimmedText=text.substr(0,chars);trimmedText=trimmedText.substr(0,Math.min(trimmedText.length,trimmedText.lastIndexOf(" "))),$self.empty().html(trimmedText+"&hellip;")}})},$.fn.ellipsisFill=function(text){var textPassed=!0;return text||(textPassed=!1),this.each(function(){var $self=$(this);textPassed||(text=$self.text()),$self.empty();var $spanElem=$('<span title="'+text+'"></span>');if($self.append($spanElem),$self.css("overflow","hidden"),$spanElem.css("white-space","nowrap"),$spanElem.html(text),$spanElem.width()>$self.width())for(var lastText=null;$spanElem.width()>$self.width();){var t=$spanElem.html();if(t=t.substring(0,t.lastIndexOf(" "))+"&hellip;",t===lastText)break;$spanElem.html(t),lastText=t}})},$.fn.ellipsisHtmlFixed=function(chars,cb){return this.each(function(){var $self=$(this),expandedText=$self.html(),$trunc=$("<span></span>");if($trunc.html($self.html().replace(/\s[\s]*/g," ").trim()),!($trunc.text().trim().length<=chars)){for(;$trunc.text().trim().length>chars;)$trunc.removeLastWord(chars);var collapsedText=$trunc.html(),expanded=!1;$self.toggle=function(){$self.empty();var $toggleButton=$('<a href="#" class="toggle"></a>');expanded?($self.html(expandedText+" "),$toggleButton.text("less"),$toggleButton.toggleClass("less","more")):($self.html(collapsedText+"&hellip; "),$toggleButton.text("more"),$toggleButton.toggleClass("more","less")),$toggleButton.one("click",function(e){e.preventDefault(),$self.toggle()}),expanded=!expanded,$self.append($toggleButton),cb&&cb()},$self.toggle()}})},$.fn.enable=function(){return this.each(function(){var $self=$(this);$self.removeClass("disabled"),$self.attr("tabindex",$self.data("tabindex"))})},$.fn.equaliseHeight=function(reset,average){var maxHeight=-1,minHeight=Number.MAX_VALUE,heights=[];reset&&this.each(function(){$(this).height("auto")}),this.each(function(){var currentHeight=$(this).height();heights.push(currentHeight),maxHeight=maxHeight>currentHeight?maxHeight:currentHeight,minHeight=minHeight<currentHeight?minHeight:currentHeight});var finalHeight=maxHeight;return average&&(finalHeight=Math.median(heights)),this.each(function(){$(this).height(finalHeight)}),this},$.fn.getVisibleElementWithGreatestTabIndex=function(){var $self=$(this),maxTabIndex=0,$elementWithGreatestTabIndex=null;return $self.find("*:visible[tabindex]").each(function(index,el){var $el=$(el),tabIndex=parseInt($el.attr("tabindex"));tabIndex>maxTabIndex&&(maxTabIndex=tabIndex,$elementWithGreatestTabIndex=$el)}),$elementWithGreatestTabIndex},$.fn.horizontalMargins=function(){var $self=$(this);return parseInt($self.css("marginLeft"))+parseInt($self.css("marginRight"))},$.fn.leftMargin=function(){var $self=$(this);return parseInt($self.css("marginLeft"))},$.fn.rightMargin=function(){var $self=$(this);return parseInt($self.css("marginRight"))},$.fn.horizontalPadding=function(){var $self=$(this);return parseInt($self.css("paddingLeft"))+parseInt($self.css("paddingRight"))},$.fn.leftPadding=function(){var $self=$(this);return parseInt($self.css("paddingLeft"))},$.fn.rightPadding=function(){var $self=$(this);return parseInt($self.css("paddingRight"))},$.mlp={x:0,y:0},$(documentHandler),$.fn.ismouseover=function(){var result=!1;return this.eq(0).each(function(){var $current=$(this).is("iframe")?$(this).contents().find("body"):$(this),offset=$current.offset();result=offset.left<=$.mlp.x&&offset.left+$current.outerWidth()>$.mlp.x&&offset.top<=$.mlp.y&&offset.top+$current.outerHeight()>$.mlp.y}),result};var timer,on=$.fn.on;$.fn.on=function(){var args=Array.apply(null,arguments),last=args[args.length-1];if(isNaN(last)||1===last&&args.pop())return on.apply(this,args);var delay=args.pop(),fn=args.pop();return args.push(function(){var self=this,params=arguments;clearTimeout(timer),timer=setTimeout(function(){fn.apply(self,params)},delay)}),on.apply(this,args)},$.fn.onEnter=function(cb){return this.each(function(){var $this=$(this);$this.on("keyup",function(e){13===e.keyCode&&(e.preventDefault(),cb())})})},$.fn.onPressed=function(cb){return this.each(function(){var $this=$(this);$this.on("touchstart click",function(e){e.preventDefault(),cb(e)}),$this.on("keyup",function(e){13===e.keyCode&&(e.preventDefault(),cb(e))})})},$.fn.removeLastWord=function(chars,depth){return void 0===chars&&(chars=8),void 0===depth&&(depth=0),this.each(function(){var $self=$(this);if($self.contents().length>0){var $lastElement=$self.contents().last();if(3===$lastElement[0].nodeType){var words=$lastElement.text().trim().split(" ");if(words.length>1)return words.splice(words.length-1,1),void($lastElement[0].data=words.join(" "));if("undefined"!=typeof chars&&1===words.length&&words[0].length>chars)return void($lastElement[0].data=words.join(" ").substring(0,chars))}$lastElement.removeLastWord(chars,depth+1)}else depth>0&&$self.remove()})},$.fn.swapClass=function(removeClass,addClass){return this.each(function(){$(this).removeClass(removeClass).addClass(addClass)})},$.fn.targetBlank=function(){return this.each(function(){$(this).find("a").prop("target","_blank")})},$.fn.toggleClass=function(class1,class2){return this.each(function(){var $this=$(this);$this.hasClass(class1)?$(this).removeClass(class1).addClass(class2):$(this).removeClass(class2).addClass(class1)})},$.fn.toggleExpandText=function(chars,lessText,moreText,cb){return this.each(function(){var $self=$(this),expandedText=$self.html();if(!(chars>expandedText.length)){var expanded=!1,collapsedText=expandedText.substr(0,chars);collapsedText=collapsedText.substr(0,Math.min(collapsedText.length,collapsedText.lastIndexOf(" "))),$self.toggle=function(){$self.empty();var $toggleButton=$('<a href="#" class="toggle"></a>');expanded?($self.html(expandedText+"&nbsp;"),$toggleButton.text(lessText),$toggleButton.toggleClass("less","more")):($self.html(collapsedText+"&nbsp;"),$toggleButton.text(moreText),$toggleButton.toggleClass("more","less")),$toggleButton.one("click",function(e){e.preventDefault(),$self.toggle()}),expanded=!expanded,$self.append($toggleButton),cb&&cb()},$self.toggle()}})},$.fn.toggleExpandTextByLines=function(lines,lessText,moreText,cb){return this.each(function(){for(var $self=$(this),expandedText=$self.html(),$buttonPad=$('<span>&hellip; <a href="#" class="toggle more">morepad</a></span>'),stringsByLine=[expandedText],lastHeight=$self.height();$self.text().length>0;){$self.removeLastWord();var html=$self.html();$self.append($buttonPad),lastHeight>$self.height()&&(stringsByLine.unshift(html),lastHeight=$self.height()),$buttonPad.remove()}if(stringsByLine.length<=lines)return void $self.html(expandedText);var collapsedText=stringsByLine[lines-1],expanded=!1;$self.toggle=function(){$self.empty();var $toggleButton=$('<a href="#" class="toggle"></a>');expanded?($self.html(expandedText+" "),$toggleButton.text(lessText),$toggleButton.toggleClass("less","more")):($self.html(collapsedText+"&hellip; "),$toggleButton.text(moreText),$toggleButton.toggleClass("more","less")),$toggleButton.one("click",function(e){e.preventDefault(),$self.toggle()}),expanded=!expanded,$self.append($toggleButton),cb&&cb()},$self.toggle()})},$.fn.toggleText=function(text1,text2){return this.each(function(){var $self=$(this);$self.text()===text1?$(this).text(text2):$(this).text(text1)})},$.fn.updateAttr=function(attrName,oldVal,newVal){return this.each(function(){var $self=$(this),attr=$self.attr(attrName);attr&&0===attr.indexOf(oldVal)&&(attr=attr.replace(oldVal,newVal),$self.attr(attrName,attr))})},$.fn.verticalMargins=function(){var $self=$(this);return parseInt($self.css("marginTop"))+parseInt($self.css("marginBottom"))},$.fn.verticalPadding=function(){var $self=$(this);return parseInt($self.css("paddingTop"))+parseInt($self.css("paddingBottom"))}}(jQuery)},{}]},{},[1])(1)});