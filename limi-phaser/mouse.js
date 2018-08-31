/**
 * 自定义控件-光标
 * create by j.y.du 
 */
var du = this.du || {};
du.yue = this.du.yue || {};
du.yue.TextCursor = function(ctx, width, color)
{
	/**
	 * 初始化属性
	 */
	var _ctx = ctx;
	var _width = width || 1;
	var _color = color || "RGBA(0, 0, 0, 0.8)";
	var _top, _left, _bottom;
	Object.defineProperties(this, {
		width : { 
			get : function() { return _width; }
		},
		color : { 
			get : function() { return _color; }
		},
		height : {
			get : _getHeight
		},
		top : {
			get : function(){ return _top; }
		},
		left : {
			get : function(){ return _left; },
			set : function(param)
			{
				if(!isNaN(param))
				{
					_left = param;
					_draw();
				}
			}
		},
		bottom : {
			get : function(){ return _bottom; },
			set : function(param)
			{
				if(!isNaN(param))
				{
					_bottom = param;
					_top = _bottom - this.height;
					_draw();
				}
			}
		}
	});
	/**
	 * 对外画图方法
	 */
	this.draw = function(left, bottom)
	{
		!isNaN(left) && (_left = left);
		if(!isNaN(bottom))
		{
			_bottom = bottom;
			_top = _bottom - _getHeight();
		}
		_draw();
	}
	/**
	 * 擦除
	 */
	this.erase = function(imageData)
	{
		_ctx.putImageData(imageData, 0, 0, _left, _top, _width, _getHeight());
	}
	/**
	 * 内部画图方法
	 */
	function _draw()
	{
		if(Object.prototype.toString.call(_ctx) !== "[object CanvasRenderingContext2D]")
		{
			throw new Error("typeError : 'Context' must be a 'CanvasRenderingContext2D'");
		}
		_ctx.save();
		_ctx.beginPath();
		_ctx.rect(_left, _top, _width, _getHeight());
		_ctx.fillStyle = _color;
		_ctx.fill();
		_ctx.closePath();
		_ctx.restore();
	}
	/**
	 * 获取光标高度
	 */
	function _getHeight()
	{
		if(Object.prototype.toString.call(_ctx) !== "[object CanvasRenderingContext2D]")
		{
			throw new Error("typeError : 'Context' must be a 'CanvasRenderingContext2D'");
		}
		var fontHeight = _ctx.measureText("W").width;
		return fontHeight * 2;
	}
	
	Object.freeze(this);
}