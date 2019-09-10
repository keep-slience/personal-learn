var https = require('https');
var fs = require('fs'); 
// 定义爬虫的目标地址
var aim = 'https://mp.weixin.qq.com/debug/getpublibpercentage';
https.get(aim, function(res) {
    var html = '';
    // 获取页面数据
    res.on('data', function(data) {
        html += data;
    });
    // 数据获取结束
    res.on('end', function() {
        // 通过过滤章节信息获取实际需求的课程信息
        fs.writeFile('getpublibpercentage.json',html, function(err) {  
            if (err) {  
                console.log('出现错误!')  
            }  
            console.log('已输出至getpublibpercentage.json中')  
        })  
    })
}).on('error', function() {
    console.log('获取数据出错！');
});