//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Main.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        egret.lifecycle.addLifecycleListener(function (context) {
            // custom lifecycle plugin
        });
        egret.lifecycle.onPause = function () {
            egret.ticker.pause();
        };
        egret.lifecycle.onResume = function () {
            egret.ticker.resume();
        };
        //inject the custom material parser
        //注入自定义的素材解析器
        var assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
        this.runGame().catch(function (e) {
            console.log(e);
        });
    };
    Main.prototype.runGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            var userInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadResource()];
                    case 1:
                        _a.sent();
                        this.createGameScene();
                        // const result = await RES.getResAsync("description_json")//走马灯的文字来源
                        // this.startAnimation(result);//走马灯动画
                        return [4 /*yield*/, platform.login()];
                    case 2:
                        // const result = await RES.getResAsync("description_json")//走马灯的文字来源
                        // this.startAnimation(result);//走马灯动画
                        _a.sent();
                        return [4 /*yield*/, platform.getUserInfo()];
                    case 3:
                        userInfo = _a.sent();
                        console.log(userInfo);
                        return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.loadResource = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loadingView, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        loadingView = new LoadingUI();
                        this.stage.addChild(loadingView);
                        return [4 /*yield*/, RES.loadConfig("resource/default.res.json", "resource/")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.loadTheme()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, RES.loadGroup("preload", 0, loadingView)];
                    case 3:
                        _a.sent();
                        this.stage.removeChild(loadingView);
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.loadTheme = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            var theme = new eui.Theme("resource/default.thm.json", _this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, function () {
                resolve();
            }, _this);
        });
    };
    /**
     * 创建场景界面
     * Create scene interface
     */
    Main.prototype.createGameScene = function () {
        var sky = this.createBitmapByName("bg_png");
        this.addChild(sky);
        var stageW = this.stage.stageWidth;
        var stageH = this.stage.stageHeight;
        sky.width = stageW;
        sky.height = stageH;
        var scorebg = this.createBitmapByName("scorebg_png");
        this.addChild(scorebg);
        scorebg.x = stageW * 0.5;
        scorebg.y = stageH * 0.5;
        scorebg.anchorOffsetX = scorebg.width * 0.5;
        scorebg.anchorOffsetY = scorebg.height * 0.5;
        var btn = new eui.Button();
        btn.label = '开始做题';
        btn.x = stageW * 0.5;
        btn.y = stageH * 0.7;
        btn.width = 367;
        btn.height = 94;
        btn.anchorOffsetX = btn.width * 0.5;
        btn.anchorOffsetY = btn.height * 0.5;
        this.addChild(btn);
        btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
        var title = new egret.TextField();
        var json = RES.getRes("test_json");
        var calculate = this.calculate(json.num);
        title.text = '本次做对' + json.num + '题  达到' + calculate + '星水平';
        this.addChild(title);
        title.textColor = 0x000000;
        title.size = 44;
        title.x = stageW * 0.5;
        title.y = stageH * 0.28;
        title.anchorOffsetX = title.width * 0.5;
        title.anchorOffsetY = title.height * 0.5;
        var loadbg = this.createBitmapByName('loadbg_png');
        loadbg.x = stageW * 0.5;
        loadbg.y = stageH * 0.5;
        loadbg.anchorOffsetX = loadbg.width * 0.5;
        loadbg.anchorOffsetY = loadbg.height * 0.5;
        this.addChild(loadbg);
        var g11 = this.createBitmapByName('staroff_png');
        this.addChild(g11);
        g11.x = 0.35 * stageW;
        g11.y = 0.43 * stageH;
        var g21 = this.createBitmapByName('staroff_png');
        this.addChild(g21);
        g21.x = 0.55 * stageW;
        g21.y = 0.43 * stageH;
        var g22 = this.createBitmapByName('staroff_png');
        this.addChild(g22);
        g22.x = 0.59 * stageW;
        g22.y = 0.43 * stageH;
        var g31 = this.createBitmapByName('staroff_png');
        this.addChild(g31);
        g31.x = 0.68 * stageW;
        g31.y = 0.43 * stageH;
        var g32 = this.createBitmapByName('staroff_png');
        this.addChild(g32);
        g32.x = 0.71 * stageW;
        g32.y = 0.43 * stageH;
        var g33 = this.createBitmapByName('staroff_png');
        this.addChild(g33);
        g33.x = 0.74 * stageW;
        g33.y = 0.43 * stageH;
        /**
         * 自己写的进度条，用遮罩
         */
        for (var i = 0; i < json.num / 30; i += 0.01) {
            this.clock = new egret.Timer(500 * i, 1);
            this.clock.addEventListener(egret.TimerEvent.TIMER, this.timerCallFuc.bind(this, i, loadbg, g11, g21, g22, g31, g32, g33), this);
            this.clock.start();
        }
        /**
         * 系统自带进度条
         */
        this.bar = new eui.ProgressBar();
        this.bar.maximum = 100;
        this.bar.minimum = 0;
        this.bar.width = 550;
        this.bar.height = 48;
        this.bar.anchorOffsetX = this.bar.width * 0.5;
        this.bar.anchorOffsetY = this.bar.height * 0.5;
        this.bar.x = stageW * 0.5;
        this.bar.y = stageH * 0.6;
        this.addChild(this.bar);
        this.timer = new egret.Timer(10, 0);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.timerHandler, this);
        this.timer.start();
        /**
         * 输入框样式
         */
        var shape = new egret.Shape();
        shape.graphics.beginFill(0xffffff);
        shape.graphics.lineStyle(2, 0x000000, 1, true);
        shape.graphics.drawRect(stageW / 2, stageH / 2, 300, 60);
        shape.anchorOffsetX = shape.width / 2;
        shape.anchorOffsetY = shape.height / 2;
        shape.$alpha = 0; //先隐藏起来，textfield可以直接做输入框
        shape.graphics.endFill();
        this.addChild(shape);
        /**
         * 输入框
         */
        var text = new egret.TextField();
        text.text = 'test';
        this.addChild(text);
        text.width = stageW - 100;
        text.height = 48;
        text.size = 36;
        text.textColor = 0x2241e0;
        text.x = 60;
        text.y = 300;
        text.border = true;
        //text.borderColor = 0xa1a1a1;
        text.strokeColor = 0xa1a1a1;
        text.verticalAlign = egret.VerticalAlign.MIDDLE;
        text.type = egret.TextFieldType.INPUT;
        text.addEventListener(egret.Event.FOCUS_IN, function (e) { text.text = ''; }, this);
    };
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    Main.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    /**
     * 描述文件加载成功，开始播放动画
     * Description file loading is successful, start to play the animation
     */
    Main.prototype.startAnimation = function (result) {
        var _this = this;
        var parser = new egret.HtmlTextParser();
        var textflowArr = result.map(function (text) { return parser.parse(text); });
        var textfield = this.textfield;
        var count = -1;
        var change = function () {
            count++;
            if (count >= textflowArr.length) {
                count = 0;
            }
            var textFlow = textflowArr[count];
            // 切换描述内容
            // Switch to described content
            textfield.textFlow = textFlow;
            var tw = egret.Tween.get(textfield);
            tw.to({ "alpha": 1 }, 200);
            tw.wait(2000);
            tw.to({ "alpha": 0 }, 200);
            tw.call(change, _this);
        };
        change();
    };
    /**
     * 点击按钮
     * Click the button
     */
    Main.prototype.onButtonClick = function (e) {
        var panel = new eui.Panel();
        panel.title = "111???";
        panel.horizontalCenter = 0;
        panel.verticalCenter = 0;
        this.addChild(panel);
        document.location.reload();
    };
    /**
     * 计算数据
     */
    Main.prototype.calculate = function (a) {
        var calculate;
        if (a < 18) {
            calculate = "一";
        }
        else if (a >= 18 && a < 24) {
            calculate = "二";
        }
        else {
            calculate = "三";
        }
        return calculate;
    };
    /**
     * 进度条
     */
    Main.prototype.timerHandler = function () {
        var a = RES.getRes('test_json');
        this.bar.value += 1;
        if (this.bar.value = a.num / 30 * 100) {
            this.timer.stop();
        }
    };
    Main.prototype.timerCallFuc = function (i, a, g11, g21, g22, g31, g32, g33) {
        var loadfinal = this.createBitmapByName('loadfinal_png');
        loadfinal.x = this.stage.stageWidth * 0.5;
        loadfinal.y = this.stage.stageHeight * 0.5;
        loadfinal.anchorOffsetX = loadfinal.width * 0.5;
        loadfinal.anchorOffsetY = loadfinal.height * 0.5;
        this.addChild(loadfinal);
        var loadbg = a;
        var loading = new egret.Shape();
        loading.graphics.beginFill(0x61d6ce);
        loading.graphics.drawRect(0.5 * this.stage.stageWidth - loadbg.width * 0.5, 0.5 * this.stage.stageHeight - loadbg.height * 0.5, loadbg.width * i, loadbg.height);
        loading.graphics.endFill();
        this.addChild(loading);
        loadfinal.mask = loading;
        if (i < 18 / 30) {
            g11.texture = RES.getRes('staron_png');
        }
        else if (i < 24 / 30) {
            g11.texture = RES.getRes('staron_png');
            g21.texture = RES.getRes('staron_png');
            g22.texture = RES.getRes('staron_png');
        }
        else {
            g11.texture = RES.getRes('staron_png');
            g21.texture = RES.getRes('staron_png');
            g22.texture = RES.getRes('staron_png');
            g31.texture = RES.getRes('staron_png');
            g32.texture = RES.getRes('staron_png');
            g33.texture = RES.getRes('staron_png');
        }
    };
    return Main;
}(eui.UILayer));
__reflect(Main.prototype, "Main");
//# sourceMappingURL=Main.js.map