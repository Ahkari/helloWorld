/*!
 * jQuery UI Widget @VERSION
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/jQuery.widget/
 */
 
//这里判定是否支持amd or cmd 模式
(function(factory) {
    if (typeof define === "function" && define.amd) {
 
        // AMD. Register as an anonymous module.
        define(["jquery"], factory);
    } else {
 
        // Browser globals
        factory(jQuery);
    }
}(function($) {
 
    var widget_uuid = 0,
        //插件的实例化数量
        widget_slice = Array.prototype.slice; //数组的slice方法，这里的作用是将参赛arguments 转为真正的数组
 
    //清除插件的数据及缓存
    $.cleanData = (function(orig) {
        return function(elems) {
            for (var i = 0, elem;
            (elem = elems[i]) != null; i++) {
                try {
                    // 重写cleanData方法，调用后触发每个元素的remove事件
                    $(elem).triggerHandler("remove");
                    // http://bugs.jquery.com/ticket/8235
                } catch (e) {}
            }
            orig(elems);
        };
    })($.cleanData);
 
    /**
     * widget工厂方法，用于创建插件
     * @param name 包含命名空间的插件名称，格式 xx.xxx
     * @param base 需要继承的ui组件
     * @param prototype 插件的实际代码
     * @returns {Function}
     */
    $.widget = function(name, base, prototype) {
        var fullName, //插件全称
        existingConstructor, //原有的构造函数
        constructor, //当前构造函数
        basePrototype, //父类的Prototype
        // proxiedPrototype allows the provided prototype to remain unmodified
        // so that it can be used as a mixin for multiple widgets (#8876)
        proxiedPrototype = {},
            //可调用父类方法_spuer的prototype对象,扩展于prototype
            namespace = name.split(".")[0];
 
        name = name.split(".")[1];
        fullName = namespace + "-" + name;
        //如果只有2个参数  base默认为Widget类，组件默认会继承base类的所有方法
        if (!prototype) {
            prototype = base;
            base = $.Widget;
        }
 
        //    console.log(base, $.Widget)
 
        // create selector for plugin
        //创建一个自定义的伪类选择器
        //如 $(':ui-menu') 则表示选择定义了ui-menu插件的元素
        $.expr[":"][fullName.toLowerCase()] = function(elem) {
            return !!$.data(elem, fullName);
        };
 
        // 判定命名空间对象是否存在，没有的话 则创建一个空对象
        $[namespace] = $[namespace] || {};
        //这里存一份旧版的插件，如果这个插件已经被使用或者定义了
        existingConstructor = $[namespace][name];
        //这个是插件实例化的主要部分
        //constructor存储了插件的实例，同时也创建了基于命名空间的对象
        //如$.ui.menu
        constructor = $[namespace][name] = function(options, element) {
            // allow instantiation without "new" keyword
            //允许直接调用命名空间上的方法来创建组件
            //比如：$.ui.menu({},'#id') 这种方式创建的话，默认没有new 实例化。因为_createWidget是prototype上的方法，需要new关键字来实例化
            //通过 调用 $.ui.menu 来实例化插件
            if (!this._createWidget) {
                console.info(this)
                return new constructor(options, element);
            }
 
            // allow instantiation without initializing for simple inheritance
            // must use "new" keyword (the code above always passes args)
            //如果存在参数，则说明是正常调用插件
            //_createWidget是创建插件的核心方法
            if (arguments.length) {
                this._createWidget(options, element);
            }
        };
        // extend with the existing constructor to carry over any static properties
        //合并对象，将旧插件实例，及版本号、prototype合并到constructor
        $.extend(constructor, existingConstructor, {
 
            version: prototype.version,
            // copy the object used to create the prototype in case we need to
            // redefine the widget later
            //创建一个新的插件对象
            //将插件实例暴露给外部，可用户修改及覆盖
            _proto: $.extend({}, prototype),
            // track widgets that inherit from this widget in case this widget is
            // redefined after a widget inherits from it
            _childConstructors: []
        });
 
        //实例化父类 获取父类的  prototype
        basePrototype = new base();
        // we need to make the options hash a property directly on the new instance
        // otherwise we'll modify the options hash on the prototype that we're
        // inheriting from
        //这里深复制一份options
        basePrototype.options = $.widget.extend({}, basePrototype.options);
        //在传入的ui原型中有方法调用this._super 和this.__superApply会调用到base上（最基类上）的方法
        $.each(prototype, function(prop, value) {
            //如果val不是function 则直接给对象赋值字符串
            if (!$.isFunction(value)) {
                proxiedPrototype[prop] = value;
                return;
            }
            //如果val是function
            proxiedPrototype[prop] = (function() {
                //两种调用父类函数的方法
                var _super = function() {
                        //将当期实例调用父类的方法
                        return base.prototype[prop].apply(this, arguments);
                    },
                    _superApply = function(args) {
                        return base.prototype[prop].apply(this, args);
                    };
                return function() {
                    var __super = this._super,
                        __superApply = this._superApply,
                        returnValue;
                    //                console.log(prop, value,this,this._super,'===')
                    //                debugger;
                    //在这里调用父类的函数
                    this._super = _super;
                    this._superApply = _superApply;
 
                    returnValue = value.apply(this, arguments);
 
                    this._super = __super;
                    this._superApply = __superApply;
                    //                console.log(this,value,returnValue,prop,'===')
                    return returnValue;
                };
            })();
        });
        //    console.info(proxiedPrototype)
        //    debugger;
        //这里是实例化获取的内容
        constructor.prototype = $.widget.extend(basePrototype, {
            // TODO: remove support for widgetEventPrefix
            // always use the name + a colon as the prefix, e.g., draggable:start
            // don't prefix for widgets that aren't DOM-based
            widgetEventPrefix: existingConstructor ? (basePrototype.widgetEventPrefix || name) : name
        }, proxiedPrototype, {
            //重新把constructor指向 constructor 变量
            constructor: constructor,
            namespace: namespace,
            widgetName: name,
            widgetFullName: fullName
        });
 
        // If this widget is being redefined then we need to find all widgets that
        // are inheriting from it and redefine all of them so that they inherit from
        // the new version of this widget. We're essentially trying to replace one
        // level in the prototype chain.
        //这里判定插件是否被使用了。一般来说，都不会被使用的。
        //因为插件的开发者都是我们自己，呵呵
        if (existingConstructor) {
            $.each(existingConstructor._childConstructors, function(i, child) {
                var childPrototype = child.prototype;
 
                // redefine the child widget using the same prototype that was
                // originally used, but inherit from the new version of the base
                $.widget(childPrototype.namespace + "." + childPrototype.widgetName, constructor, child._proto);
            });
            // remove the list of existing child constructors from the old constructor
            // so the old child constructors can be garbage collected
            delete existingConstructor._childConstructors;
        } else {
            //父类添加当前插件的实例 主要用于作用域链查找 不至于断层
            base._childConstructors.push(constructor);
        }
 
        //将此方法挂在jQuery对象上
        $.widget.bridge(name, constructor);
 
        return constructor;
    };
 
    //扩展jq的extend方法，实际上类似$.extend(true,..) 深复制
    $.widget.extend = function(target) {
        var input = widget_slice.call(arguments, 1),
            inputIndex = 0,
            inputLength = input.length,
            key, value;
        for (; inputIndex < inputLength; inputIndex++) {
            for (key in input[inputIndex]) {
                value = input[inputIndex][key];
                if (input[inputIndex].hasOwnProperty(key) && value !== undefined) {
                    // Clone objects
                    if ($.isPlainObject(value)) {
                        target[key] = $.isPlainObject(target[key]) ? $.widget.extend({}, target[key], value) :
                        // Don't extend strings, arrays, etc. with objects
                        $.widget.extend({}, value);
                        // Copy everything else by reference
                    } else {
                        target[key] = value;
                    }
                }
            }
        }
        return target;
    };
 
    //bridge 是设计模式的一种，这里将对象转为插件调用
    $.widget.bridge = function(name, object) {
        var fullName = object.prototype.widgetFullName || name;
        //这里就是插件了
        //这部分的实现主要做了几个工作，也是制作一个优雅的插件的主要代码
        //1、初次实例化时将插件对象缓存在dom上，后续则可直接调用，避免在相同元素下widget的多实例化。简单的说，就是一个单例方法。
        //2、合并用户提供的默认设置选项options
        //3、可以通过调用插件时传递字符串来调用插件内的方法。如:$('#id').menu('hide') 实际就是实例插件并调用hide()方法。
        //4、同时限制外部调用“_”下划线的私有方法
        $.fn[name] = function(options) {
            var isMethodCall = typeof options === "string",
                args = widget_slice.call(arguments, 1),
                returnValue = this;
 
            // allow multiple hashes to be passed on init.
            //可以简单认为是$.extend(true,options,args[0],...),args可以是一个参数或是数组
            options = !isMethodCall && args.length ? $.widget.extend.apply(null, [options].concat(args)) : options;
            //这里对字符串和对象分别作处理
            if (isMethodCall) {
                this.each(function() {
                    var methodValue, instance = $.data(this, fullName);
                    //如果传递的是instance则将this返回。
                    if (options === "instance") {
                        returnValue = instance;
                        return false;
                    }
                    if (!instance) {
                        return $.error("cannot call methods on " + name + " prior to initialization; " + "attempted to call method '" + options + "'");
                    }
                    //这里对私有方法的调用做了限制，直接调用会抛出异常事件
                    if (!$.isFunction(instance[options]) || options.charAt(0) === "_") {
                        return $.error("no such method '" + options + "' for " + name + " widget instance");
                    }
                    //这里是如果传递的是字符串，则调用字符串方法，并传递对应的参数.
                    //比如插件有个方法hide(a,b); 有2个参数：a，b
                    //则调用时$('#id').menu('hide',1,2);//1和2 分别就是参数a和b了。
                    methodValue = instance[options].apply(instance, args);
                    if (methodValue !== instance && methodValue !== undefined) {
                        returnValue = methodValue && methodValue.jquery ? returnValue.pushStack(methodValue.get()) : methodValue;
                        return false;
                    }
                });
            } else {
                this.each(function() {
                    var instance = $.data(this, fullName);
 
                    if (instance) {
                        instance.option(options || {});
                        //这里每次都调用init方法
                        if (instance._init) {
                            instance._init();
                        }
                    } else {
                        //缓存插件实例
                        $.data(this, fullName, new object(options, this));
                    }
                });
            }
 
            return returnValue;
        };
    };
 
    //这里是真正的widget基类
    $.Widget = function( /* options, element */ ) {};
    $.Widget._childConstructors = [];
 
    $.Widget.prototype = {
        widgetName: "widget",
        //用来决定事件的名称和插件提供的callbacks的关联。
        // 比如dialog有一个close的callback，当close的callback被执行的时候，一个dialogclose的事件被触发。
        // 事件的名称和事件的prefix+callback的名称。widgetEventPrefix 默认就是控件的名称，但是如果事件需要不同的名称也可以被重写。
        // 比如一个用户开始拖拽一个元素,我们不想使用draggablestart作为事件的名称，我们想使用dragstart，所以我们可以重写事件的prefix。
        // 如果callback的名称和事件的prefix相同，事件的名称将不会是prefix。
        // 它阻止像dragdrag一样的事件名称。
        widgetEventPrefix: "",
        defaultElement: "<div>",
        //属性会在创建模块时被覆盖
        options: {
            disabled: false,
 
            // callbacks
            create: null
        },
        _createWidget: function(options, element) {
            element = $(element || this.defaultElement || this)[0];
            this.element = $(element);
            this.uuid = widget_uuid++;
            this.eventNamespace = "." + this.widgetName + this.uuid;
            this.options = $.widget.extend({}, this.options, this._getCreateOptions(), options);
 
            this.bindings = $();
            this.hoverable = $();
            this.focusable = $();
 
            if (element !== this) {
                //            debugger
                $.data(element, this.widgetFullName, this);
                this._on(true, this.element, {
                    remove: function(event) {
                        if (event.target === element) {
                            this.destroy();
                        }
                    }
                });
                this.document = $(element.style ?
                // element within the document
                element.ownerDocument :
                // element is window or document
                element.document || element);
                this.window = $(this.document[0].defaultView || this.document[0].parentWindow);
            }
 
            this._create();
            //创建插件时，有个create的回调
            this._trigger("create", null, this._getCreateEventData());
            this._init();
        },
        _getCreateOptions: $.noop,
        _getCreateEventData: $.noop,
        _create: $.noop,
        _init: $.noop,
        //销毁模块：去除绑定事件、去除数据、去除样式、属性
        destroy: function() {
            this._destroy();
            // we can probably remove the unbind calls in 2.0
            // all event bindings should go through this._on()
            this.element.unbind(this.eventNamespace).removeData(this.widgetFullName)
            // support: jquery <1.6.3
            // http://bugs.jquery.com/ticket/9413
            .removeData($.camelCase(this.widgetFullName));
            this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(
            this.widgetFullName + "-disabled " + "ui-state-disabled");
 
            // clean up events and states
            this.bindings.unbind(this.eventNamespace);
            this.hoverable.removeClass("ui-state-hover");
            this.focusable.removeClass("ui-state-focus");
        },
        _destroy: $.noop,
 
        widget: function() {
            return this.element;
        },
        //设置选项函数
        option: function(key, value) {
            var options = key,
                parts, curOption, i;
 
            if (arguments.length === 0) {
                // don't return a reference to the internal hash
                //返回一个新的对象，不是内部数据的引用
                return $.widget.extend({}, this.options);
            }
 
            if (typeof key === "string") {
                // handle nested keys, e.g., "foo.bar" => { foo: { bar: ___ } }
                options = {};
                parts = key.split(".");
                key = parts.shift();
                if (parts.length) {
                    curOption = options[key] = $.widget.extend({}, this.options[key]);
                    for (i = 0; i < parts.length - 1; i++) {
                        curOption[parts[i]] = curOption[parts[i]] || {};
                        curOption = curOption[parts[i]];
                    }
                    key = parts.pop();
                    if (arguments.length === 1) {
                        return curOption[key] === undefined ? null : curOption[key];
                    }
                    curOption[key] = value;
                } else {
                    if (arguments.length === 1) {
                        return this.options[key] === undefined ? null : this.options[key];
                    }
                    options[key] = value;
                }
            }
 
            this._setOptions(options);
 
            return this;
        },
        _setOptions: function(options) {
            var key;
 
            for (key in options) {
                this._setOption(key, options[key]);
            }
 
            return this;
        },
        _setOption: function(key, value) {
            this.options[key] = value;
 
            if (key === "disabled") {
                this.widget().toggleClass(this.widgetFullName + "-disabled", !! value);
 
                // If the widget is becoming disabled, then nothing is interactive
                if (value) {
                    this.hoverable.removeClass("ui-state-hover");
                    this.focusable.removeClass("ui-state-focus");
                }
            }
 
            return this;
        },
 
        enable: function() {
            return this._setOptions({
                disabled: false
            });
        },
        disable: function() {
            return this._setOptions({
                disabled: true
            });
        },
 
        _on: function(suppressDisabledCheck, element, handlers) {
            var delegateElement, instance = this;
 
            // no suppressDisabledCheck flag, shuffle arguments
            if (typeof suppressDisabledCheck !== "boolean") {
                handlers = element;
                element = suppressDisabledCheck;
                suppressDisabledCheck = false;
            }
 
            // no element argument, shuffle and use this.element
            if (!handlers) {
                handlers = element;
                element = this.element;
                delegateElement = this.widget();
            } else {
                // accept selectors, DOM elements
                element = delegateElement = $(element);
                this.bindings = this.bindings.add(element);
            }
 
            $.each(handlers, function(event, handler) {
                function handlerProxy() {
                    // allow widgets to customize the disabled handling
                    // - disabled as an array instead of boolean
                    // - disabled class as method for disabling individual parts
                    if (!suppressDisabledCheck && (instance.options.disabled === true || $(this).hasClass("ui-state-disabled"))) {
                        return;
                    }
                    return (typeof handler === "string" ? instance[handler] : handler).apply(instance, arguments);
                }
 
                // copy the guid so direct unbinding works
                if (typeof handler !== "string") {
                    handlerProxy.guid = handler.guid = handler.guid || handlerProxy.guid || $.guid++;
                }
 
                var match = event.match(/^([\w:-]*)\s*(.*)$/),
                    eventName = match[1] + instance.eventNamespace,
                    selector = match[2];
                if (selector) {
                    delegateElement.delegate(selector, eventName, handlerProxy);
                } else {
                    element.bind(eventName, handlerProxy);
                }
            });
        },
 
        _off: function(element, eventName) {
            eventName = (eventName || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace;
            element.unbind(eventName).undelegate(eventName);
        },
 
        _delay: function(handler, delay) {
            function handlerProxy() {
                return (typeof handler === "string" ? instance[handler] : handler).apply(instance, arguments);
            }
            var instance = this;
            return setTimeout(handlerProxy, delay || 0);
        },
 
        _hoverable: function(element) {
            this.hoverable = this.hoverable.add(element);
            this._on(element, {
                mouseenter: function(event) {
                    $(event.currentTarget).addClass("ui-state-hover");
                },
                mouseleave: function(event) {
                    $(event.currentTarget).removeClass("ui-state-hover");
                }
            });
        },
 
        _focusable: function(element) {
            this.focusable = this.focusable.add(element);
            this._on(element, {
                focusin: function(event) {
                    $(event.currentTarget).addClass("ui-state-focus");
                },
                focusout: function(event) {
                    $(event.currentTarget).removeClass("ui-state-focus");
                }
            });
        },
 
        _trigger: function(type, event, data) {
            var prop, orig, callback = this.options[type];
 
            data = data || {};
            event = $.Event(event);
            event.type = (type === this.widgetEventPrefix ? type : this.widgetEventPrefix + type).toLowerCase();
            // the original event may come from any element
            // so we need to reset the target on the new event
            event.target = this.element[0];
 
            // copy original event properties over to the new event
            orig = event.originalEvent;
            if (orig) {
                for (prop in orig) {
                    if (!(prop in event)) {
                        event[prop] = orig[prop];
                    }
                }
            }
 
            this.element.trigger(event, data);
            return !($.isFunction(callback) && callback.apply(this.element[0], [event].concat(data)) === false || event.isDefaultPrevented());
        }
    };
 
    $.each({
        show: "fadeIn",
        hide: "fadeOut"
    }, function(method, defaultEffect) {
        $.Widget.prototype["_" + method] = function(element, options, callback) {
            if (typeof options === "string") {
                options = {
                    effect: options
                };
            }
            var hasOptions, effectName = !options ? method : options === true || typeof options === "number" ? defaultEffect : options.effect || defaultEffect;
            options = options || {};
            if (typeof options === "number") {
                options = {
                    duration: options
                };
            }
            hasOptions = !$.isEmptyObject(options);
            options.complete = callback;
            if (options.delay) {
                element.delay(options.delay);
            }
            if (hasOptions && $.effects && $.effects.effect[effectName]) {
                element[method](options);
            } else if (effectName !== method && element[effectName]) {
                element[effectName](options.duration, options.easing, callback);
            } else {
                element.queue(function(next) {
                    $(this)[method]();
                    if (callback) {
                        callback.call(element[0]);
                    }
                    next();
                });
            }
        };
    });
 
    return $.widget;
 
}));