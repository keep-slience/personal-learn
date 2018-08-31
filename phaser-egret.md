# 初学：phaser-egret区别
* 2018/7/23
## phaser
* 在html里开发，直接在script标签内用JS编写，从头至尾只需要一个html文件，入口函数new Phaser.Game()，容易找到入口
* 函数内的传参为元素定义时自己输入的key，key唯一指定一个元素
* 在canvas内设定具体大小，也可以用百分比，有屏幕适配模式，横竖屏旋转暂时没找到函数方法（可能存在），应该需要自己写一个函数封装使用。
* canvas内定义舞台场景，每个场景提供预先定义的init()，preload(),create()等函数,state内手动调用load函数加载需要的资源，加载到缓存cache里，load函数一般是在state内的preload函数里使用，在create内用make或add创建元素
* phaser内场景切换调用start函数，参数为state的key
* 支持2D开发，不支持3D，加载速度感觉比egret快，封装了很多功能，查一下API说不定就能查到需要的功能
## egret
* 提供的wing是一个编辑器，需要先编译才能看到渲染，调试起来比直接CTRL+S的HTML麻烦，**与phaser的单个文件不同，egret创建的是一个包含很多文件的项目**，用TypeScript编写，定义严格，使用的函数包含但不限于ES6,ES7等,函数用类和对象的方式命名
* 在launcher创建egret项目时需要定义舞台的具体大小，在编写时根据scaleMode进行屏幕适配，~~不能用百分百填充感觉很奇怪，不过能大概理解原因了，~~，提供横竖屏切换
* 初始化的文件很多，~~初学者看起来很乱，~~ 在最外层的html（默认index.html）是渲染的页面，div的class属性中的data-entry-class指向入口
* default.res.json自动加载放到组内的资源,将资源名称转换为key（可修改）,直接在create里加载，通过addChild加入到舞台
* 切换场景需要自己写函数处理，添加监听和渲染画面（addChild/addEventListener)，切换时删除上一个场景的监听和渲染(removeChild/removeEventListener)并添加下一个场景的渲染和监听
* addEventListener中的function传参要用function().bind(this,xx)，直接在function里传参似乎不行
* 支持2D和3D开发，wing提供的函数补全很方便，提供的API感觉也比较多，但是加载速度慢
* 提供皮肤组件，方便精灵的调用