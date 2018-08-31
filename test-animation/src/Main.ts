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
        const result = await RES.getResAsync("description_json")
        this.startAnimation(result);
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
    
    private topMask:egret.Shape;
    private textfield: egret.TextField;
    /**
     * 创建场景界面
     * Create scene interface
     */
    protected createGameScene(): void {
        let stageW = this.stage.stageWidth;
        let stageH = this.stage.stageHeight;

        let boxm = this.createBitmapByName('box_png');
        boxm.x = stageW*0.5;
        boxm.y = stageH*0.5;
        boxm.anchorOffsetX = boxm.width*0.5;
        boxm.anchorOffsetY = boxm.height*0.5;
        boxm.touchEnabled = true;
        let boxl = this.createBitmapByName('box_png');
        boxl.x = stageW*0.2;
        boxl.y = stageH*0.5;
        boxl.anchorOffsetX = boxl.width*0.5;
        boxl.anchorOffsetY = boxl.height*0.5;
        boxl.touchEnabled = true;
        let boxr = this.createBitmapByName('box_png');
        boxr.x = stageW*0.8;
        boxr.y = stageH*0.5;
        boxr.anchorOffsetX = boxr.width*0.5;
        boxr.anchorOffsetY = boxr.height*0.5;
        boxr.touchEnabled = true;
        this.addChild(boxm);
        this.addChild(boxl);
        this.addChild(boxr);
        let topMask = new egret.Shape();
        topMask.graphics.beginFill(0x000000, 0.7);
        topMask.graphics.drawRect(0, 0, this.stage.stageWidth, this.stage.stageHeight);
        topMask.graphics.endFill();
        topMask.touchEnabled = true;
        let maskbg = this.createBitmapByName('maskbg_png');
        let medal = this.createBitmapByName('medal_png');
        medal.x = stageW*0.5;
        medal.y = stageH*0.5;
        medal.anchorOffsetX = medal.width*0.5;
        medal.anchorOffsetY = medal.height*0.5;
        boxm.addEventListener( egret.TouchEvent.TOUCH_BEGIN,this.click.bind(this,boxm,boxl,boxr,topMask,maskbg,medal), this );
        boxl.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.click.bind(this,boxm,boxl,boxr,topMask,maskbg,medal), this );
        boxr.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.click.bind(this,boxm,boxl,boxr,topMask,maskbg,medal), this );
        topMask.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.cancel.bind(this,boxm,boxl,boxr,topMask,maskbg,medal), this );

        let textfield = new egret.TextField();
        this.addChild(textfield);
        textfield.alpha = 0;
        textfield.width = stageW - 172;
        textfield.textAlign = egret.HorizontalAlign.CENTER;
        textfield.size = 24;
        textfield.textColor = 0xffffff;
        textfield.x = 172;
        textfield.y = 135;
        this.textfield = textfield;
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
        panel.title = "Title";
        panel.horizontalCenter = 0;
        panel.verticalCenter = 0;
        this.addChild(panel);
    }

    private click(boxm,boxl,boxr,topMask,maskbg,medal){       
            this.addChild(topMask);
            this.addChild(maskbg);
            this.addChild(medal);
            egret.Tween.get(medal).to({scaleX:0,scaleY:0},500,egret.Ease.circIn).to({scaleX:1,scaleY:1},500,egret.Ease.circIn);
            boxr.touchEnabled = false;
            boxm.touchEnabled = false;
            boxl.touchEnabled = false;
    }

    private cancel(boxm,boxl,boxr,topMask,maskbg,medal){
        topMask.parent.removeChild(topMask);
        maskbg.parent.removeChild(maskbg);
        medal.parent.removeChild(medal);
        boxr.touchEnabled = true;
        boxm.touchEnabled = true;
        boxl.touchEnabled = true;  
    }

}
