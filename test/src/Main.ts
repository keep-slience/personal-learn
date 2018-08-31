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

class Main extends eui.UILayer {


    protected createChildren(): void {
        super.createChildren();

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }

        //inject the custom material parser
        //注入自定义的素材解析器
        let assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());


        this.runGame().catch(e => {
            console.log(e);
        })
    }

    private async runGame() {
        await this.loadResource()
        this.createGameScene();
        // const result = await RES.getResAsync("description_json")//走马灯的文字来源
        // this.startAnimation(result);//走马灯动画
        await platform.login();
        const userInfo = await platform.getUserInfo();
        console.log(userInfo);

    }

    private async loadResource() {
        try {
            const loadingView = new LoadingUI();
            this.stage.addChild(loadingView);
            await RES.loadConfig("resource/default.res.json", "resource/");
            await this.loadTheme();
            await RES.loadGroup("preload", 0, loadingView);
            this.stage.removeChild(loadingView);
        }
        catch (e) {
            console.error(e);
        }
    }

    private loadTheme() {
        return new Promise((resolve, reject) => {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            let theme = new eui.Theme("resource/default.thm.json", this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, () => {
                resolve();
            }, this);

        })
    }

    private bar: eui.ProgressBar;
    private timer:egret.Timer;
    private clock:egret.Timer;
    private textfield: egret.TextField;
    /**
     * 创建场景界面
     * Create scene interface
     */
    protected createGameScene(): void {
        let sky = this.createBitmapByName("bg_png");
        this.addChild(sky);
        let stageW = this.stage.stageWidth;
        let stageH = this.stage.stageHeight;
        sky.width = stageW;
        sky.height = stageH;

        let scorebg = this.createBitmapByName("scorebg_png");
        this.addChild(scorebg);
        scorebg.x = stageW*0.5;
        scorebg.y = stageH*0.5;
        scorebg.anchorOffsetX = scorebg.width*0.5;
        scorebg.anchorOffsetY = scorebg.height*0.5;

        let btn = new eui.Button();
        btn.label = '开始做题';
        btn.x = stageW*0.5;
        btn.y = stageH*0.7;
        btn.width = 367;
        btn.height = 94;
        btn.anchorOffsetX = btn.width*0.5;
        btn.anchorOffsetY = btn.height*0.5;
        this.addChild(btn);
        btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);

        let title = new egret.TextField();
        let json = RES.getRes("test_json");
        let calculate = this.calculate(json.num);
        title.text = '本次做对'+json.num+'题  达到'+calculate+'星水平' ;
        this.addChild(title);
        title.textColor = 0x000000;
        title.size = 44;
        title.x = stageW*0.5;
        title.y = stageH*0.28;
        title.anchorOffsetX = title.width*0.5;
        title.anchorOffsetY = title.height*0.5;


        let loadbg = this.createBitmapByName('loadbg_png');
        loadbg.x = stageW*0.5;
        loadbg.y = stageH*0.5;
        loadbg.anchorOffsetX = loadbg.width*0.5;
        loadbg.anchorOffsetY = loadbg.height*0.5;
        this.addChild(loadbg);

        let g11 = this.createBitmapByName('staroff_png');
        this.addChild(g11);
        g11.x = 0.35*stageW;
        g11.y = 0.43*stageH;
        let g21 = this.createBitmapByName('staroff_png');
        this.addChild(g21);
        g21.x = 0.55*stageW;
        g21.y = 0.43*stageH;
        let g22 = this.createBitmapByName('staroff_png');
        this.addChild(g22);
        g22.x = 0.59*stageW;
        g22.y = 0.43*stageH;
        let g31 = this.createBitmapByName('staroff_png');
        this.addChild(g31);
        g31.x = 0.68*stageW;
        g31.y = 0.43*stageH;
        let g32 = this.createBitmapByName('staroff_png');
        this.addChild(g32);
        g32.x = 0.71*stageW;
        g32.y = 0.43*stageH;
        let g33 = this.createBitmapByName('staroff_png');
        this.addChild(g33);
        g33.x = 0.74*stageW;
        g33.y = 0.43*stageH;

        /**
         * 自己写的进度条，用遮罩
         */      
        for(let i=0;i<json.num/30;i+=0.01){
            this.clock = new egret.Timer(500*i,1);
            this.clock.addEventListener(egret.TimerEvent.TIMER,this.timerCallFuc.bind(this,i,loadbg,g11,g21,g22,g31,g32,g33),this);
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
        this.bar.anchorOffsetX = this.bar.width*0.5;
        this.bar.anchorOffsetY = this.bar.height*0.5;
        this.bar.x = stageW*0.5;
        this.bar.y = stageH*0.6;
        this.addChild(this.bar);
        this.timer = new egret.Timer(10,0);
        this.timer.addEventListener(egret.TimerEvent.TIMER,this.timerHandler,this);
        this.timer.start();
        
        /**
         * 输入框样式
         */
        var shape:egret.Shape = new egret.Shape();
        shape.graphics.beginFill(0xffffff);
        shape.graphics.lineStyle(2,0x000000,1,true);
        shape.graphics.drawRect(stageW/2,stageH/2,300,60);
        shape.anchorOffsetX = shape.width/2;
        shape.anchorOffsetY = shape.height/2;
        shape.$alpha = 0;//先隐藏起来，textfield可以直接做输入框
        shape.graphics.endFill();
        this.addChild(shape);

        /**
         * 输入框
         */
        let text:egret.TextField = new egret.TextField();
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
        text.addEventListener(egret.Event.FOCUS_IN,function(e:egret.FocusEvent){text.text = ''},this)
    }
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name: string): egret.Bitmap {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
    /**
     * 描述文件加载成功，开始播放动画
     * Description file loading is successful, start to play the animation
     */
    private startAnimation(result: Array<any>): void {
        let parser = new egret.HtmlTextParser();
        let textflowArr = result.map(text => parser.parse(text));

        let textfield = this.textfield;
        let count = -1;
        let change = () => {
            count++;
            if (count >= textflowArr.length) {
                count = 0;
            }
            let textFlow = textflowArr[count];

            // 切换描述内容
            // Switch to described content
            textfield.textFlow = textFlow;
            let tw = egret.Tween.get(textfield);
            tw.to({ "alpha": 1 }, 200);
            tw.wait(2000);
            tw.to({ "alpha": 0 }, 200);
            tw.call(change, this);
        };

        change();
    }

    /**
     * 点击按钮
     * Click the button
     */
    private onButtonClick(e: egret.TouchEvent) {
        let panel = new eui.Panel();
        panel.title = "111???";
        panel.horizontalCenter = 0;
        panel.verticalCenter = 0;
        this.addChild(panel);
        document.location.reload();
    }   

    /**
     * 计算数据
     */
    private calculate(a:egret.NumberUtils):Object{
        var calculate;
        if(a<18){
            calculate = "一"
                        }
        else if(a>=18&&a<24){
            calculate = "二"
                        }
        else{
            calculate = "三"
                        }
        return calculate
    }

    /**
     * 进度条
     */
    private timerHandler(){
    var a = RES.getRes('test_json');
    this.bar.value += 1;
    if(this.bar.value=a.num/30*100){this.timer.stop();}
}

    private timerCallFuc(i,a,g11,g21,g22,g31,g32,g33){
        let loadfinal = this.createBitmapByName('loadfinal_png')
        loadfinal.x = this.stage.stageWidth*0.5;
        loadfinal.y = this.stage.stageHeight*0.5;
        loadfinal.anchorOffsetX = loadfinal.width*0.5;
        loadfinal.anchorOffsetY = loadfinal.height*0.5;
        this.addChild(loadfinal);

        let loadbg = a;
        let loading = new egret.Shape();
        loading.graphics.beginFill(0x61d6ce);
        loading.graphics.drawRect(0.5*this.stage.stageWidth-loadbg.width*0.5,0.5*this.stage.stageHeight-loadbg.height*0.5,loadbg.width*i,loadbg.height);
        loading.graphics.endFill();
        this.addChild(loading);
        loadfinal.mask = loading;

        if(i<18/30){g11.texture = RES.getRes('staron_png')}
            else if(i<24/30){g11.texture = RES.getRes('staron_png');
                             g21.texture = RES.getRes('staron_png');
                             g22.texture = RES.getRes('staron_png')}
            else{g11.texture = RES.getRes('staron_png');
                 g21.texture = RES.getRes('staron_png');
                 g22.texture = RES.getRes('staron_png');
                 g31.texture = RES.getRes('staron_png');
                 g32.texture = RES.getRes('staron_png');
                 g33.texture = RES.getRes('staron_png')}
    }
}
