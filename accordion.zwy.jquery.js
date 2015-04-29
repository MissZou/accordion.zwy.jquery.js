;
(function ($) {
	$.fn.myAccordion = function (options) {
		var defaults = {
				/**
				 * @name header
				 * @desc 设置自定义头部class
				 * @type string
				 * @default null
				 */
				header: null,
				/**
				 * @name duration
				 * @desc 执行动画耗费的事件
				 * @type string
				 * @default null
				 */
				duration: 200,
				/**
				 * @name isCloseOthers
				 * @desc 在一项展开时是否关闭其他项
				 * @type bool
				 * @default true
				 */
				isCloseOthers: true,
				/**
				 * 当前项折叠时触发
				 * @event collapse
				 * @param {jQuery.Event} e
				 * @param {jQuery} data
				 */
				collapse: null,
				/**
				 * 当前项展开时触发
				 * @event expand
				 * @param {jQuery.Event} e
				 * @param {jQuery} data
				 */
				expand: null,
				/**
				 * @name eventType
				 * @desc 设置自定义事件类型
				 * @type string
				 * @default click
				 */
				eventType: "click", //tap,mouseover
				/**
				 * @name clickArea
				 * @desc 设置自定义点击区域
				 * @type string
				 * @default whole-header
				 */
				clickArea: "whole-header", //only-arrow
				/**
				 * @name startIndex
				 * @desc 设置自定义初始展开的索引
				 * @type number
				 * @default 0
				 */
				startIndex: 0
			},
			settings = $.extend({}, defaults, options),
			selfElement = this;
		_renderPanels = function () {
			var $headers,
				self = this,
				o = settings,
				ele = selfElement;
			if (o.header) {
				$headers = ele.find(o.header).addClass('hui-accordion-title');
			}
			else {
				ele.find(">div").find("div:first-child").each(function (i, el) {
					$(el).addClass("hui-accordion-title");
				});
			}
			o.header = '.hui-accordion-title';
			$headers = ele.find(o.header);
			$headers.next().addClass("hui-content") //.hide();
			$headers.append($("<i class='hui-arrow'></i>"));
			if (o.startIndex !== null) {
				ele.find(".hui-accordion-title").eq(o.startIndex).addClass("on").next().slideDown();
			}
		};
		_togglePanel = function ($curObj) {
			var self = this,
				o = settings,
				eventName = o.eventType,
				duration = +o.duration;

			$curObj.next().slideToggle(duration, function () {
				//self._trigger($(this).is(":visible") ? "expand" : "collapse", null, self);
				if ($(this).is(":visible")) {
					o.expand();
				}
				else {
					o.collapse();
				}

			});
		};
		_bindEvents = function () {
			var self = this,
				o = settings,
				eventName = o.eventType;
			if (o.clickArea === "whole-header") {
				selfElement.find(".hui-accordion-title").css("cursor", "pointer");
				selfElement.on(eventName, o.header, function () {
					_handler($(this));
				});
			}
			else if (o.clickArea === "only-arrow") {
				selfElement.find(".hui-arrow").css("cursor", "pointer");
				selfElement.on(eventName, ".hui-arrow", function () {
					_handler($(this).parent(".hui-accordion-title"));
				});
			}
		};
		_handler = function (ele) {
			var self = this,
				o = settings,
				eventName = o.eventType;
			if (!o.isCloseOthers) {
				ele.toggleClass('on');
				_togglePanel(ele);
			}
			else if (!ele.hasClass('on')) {
				_togglePanel($('.on'));
				selfElement.find('.on').removeClass('on');
				ele.addClass('on');
				_togglePanel(ele);
			}
		};

		selfElement.addClass('hui-accordion');
		_renderPanels();
		_bindEvents();
	}
})(jQuery);