/**
 * 自定义控件-文本输入框
 * create by j.y.du 
 */
var du = this.du || {};
du.yue = this.du.yue || {};
du.yue.TextLine = function(ctx)
{
	var _TextLine = this;
	var _ctx = ctx;
	var _isFocus = false;
	var _oldImage,_newImage;
	var _TextCursor = new du.yue.TextCursor(_ctx, 1, "red");
	/**
	 * 对外属性
	 */
	var _style = {}, _value = "";
	Object.defineProperties(this, {
		style : {
			get : function()
			{
				return _style;
			},
			set : function(param)
			{
				if(!_isFocus && Object.prototype.toString.call(param) === "[object Object]")
				{
					for(var key in param)
					{
						_style[key] = param[key];
					}
				}
			}
		},
		value : {
			get : function()
			{
				return _value;
			},
			set : function(param)
			{
				if(Object.prototype.toString.call(param) === "[object String]" && _value !== param)
				{
					_value = param;
					_draw();
				}
			}
		}
	});
	/**
	 * style中的属性变量
	 */
	var _styleVo = new du.yue.Bean(_TextLine.style);
	_styleVo.add("left", 0, _draw, _validValue);
	_styleVo.add("top", 0, _draw, _validValue);
	_styleVo.add("width", 200, _draw, _validValue);
	_styleVo.add("height", 30, _draw, _validValue);
	_styleVo.add("color", "RGBA(0, 0, 0, 1)", _draw, _validValue);
	_styleVo.add("fontSize", 12, _draw, _validValue);
	_styleVo.add("fontWeight", "normal", _draw, _validValue);
	_styleVo.add("fontFamily", "Consolas", _draw, _validValue);
	_styleVo.add("backgroundColor", "RGBA(255, 255, 255, 1)", _draw, _validValue);
	_styleVo.add("borderColor", "RGBA(0, 0, 0, 1)", _draw, _validValue);
	_styleVo.add("borderWidth", 1, _draw, _validValue);
	_styleVo.add("borderStyle", "solid", _draw, _validValue);
	/**
	 * 公共校验
	 */
	function _validValue(oldValue, newValue)
	{
		if(!_isFocus)
		{
			return oldValue !== newValue ? true : false;
		}
		return false;
	}
	
	/**
	 * 绘制
	 */
	function _draw()
	{
		if(!_isFocus)
		{
			return;
		}
		var style = _TextLine.style;
		_ctx.beginPath();
		var lineWidth = style.borderWidth;
		_ctx.rect(style.left + lineWidth / 2, style.top + lineWidth/ 2, style.width, style.height);
		_ctx.clip();
		_ctx.clearRect(0, 0, _ctx.canvas.width, _ctx.canvas.height);
		_ctx.strokeStyle = style.borderColor;
		_ctx.fillStyle = style.backgroundColor;
		_ctx.lineWidth = lineWidth;
		_ctx.fill();
		_ctx.stroke();
		_ctx.font = style.fontWeight + " " + style.fontSize + "px " + style.fontFamily;
		_ctx.textAlign = "left";
		_ctx.textBaseline = "middle";
		_ctx.fillStyle = style.color;
		_ctx.fillText(_TextLine.value, style.left + lineWidth / 2, style.top + lineWidth / 2 + style.height / 2);
		_ctx.closePath();
	}
	
	/**
	 * 聚焦
	 */
	this.focus = function(mouseX, mouseY)
	{
		if(!_isFocus)
		{
			_isFocus = true;
			var style = _TextLine.style;
			_oldImage = _ctx.getImageData(style.left - 10, style.top - 10, style.width + 20, style.height + 20);
			_ctx.save();
			_draw();
		}
		var cursorBottom = style.top + style.height / 2 + _TextCursor.height / 2;
		_TextCursor.draw(mouseX, cursorBottom);
	}
	/**
	 * 失去焦点
	 */
	var _blurEvents = new Array();
	this.blur = function()
	{
		if(_isFocus)
		{
			_isFocus = false;
			var style = _TextLine.style;
			_ctx.putImageData(_oldImage, style.left - 10, style.top - 10);
			_oldImage = undefined;
			_ctx.restore();
			for(var a = 0; a < _blurEvents.length; a++)
			{
				_blurEvents[a].call(this);
			}
		}
	}
	this.addBlurEvent = function(fnc)
	{
		if(Object.prototype.toString.call(fnc) === "[object Function]")
		{
			_blurEvents.push(fnc);
		}
	}
	/**
	 * 光标
	 */
	var _blinkingInterval;
	function blinkCursor(x, y)
	{
		clearInterval(_blinkingInterval);
		_blinkingInterval = setInterval(function(e){
			
		});
	}
	
	
	Object.freeze(this);
}
du.yue.Bean = function(vo)
{
	var map = {};
	this.add = function(key, value, changeFnc, validFnc)
	{
		map[key] = value;
		Object.defineProperty(vo, key, {
			get : function()
			{
				return map[key];
			},
			set : function(param)
			{
				var oldValue = map[key];
				if(!validFnc || (Object.prototype.toString.call(validFnc) === "[object Function]" && validFnc.call(vo, oldValue, param)))
				{
					map[key] = param;
					Object.prototype.toString.call(changeFnc) === "[object Function]" && changeFnc.call(vo, oldValue, param);
				}
			}
		});
	}
	Object.freeze(this);
}