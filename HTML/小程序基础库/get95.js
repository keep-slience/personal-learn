function get95(sdkVer,percentage){
    var percentage95=0;
    for(var i=0;i<sdkVer.length;i++){
        if(percentage95<95){
            percentage95=parseFloat(percentage95)+parseFloat(percentage[i]);
        }else{
            return i-1;
        }
    }
}