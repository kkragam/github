
var utils=(function(){
function getJSON(url,data,callback){ 
    logInfo("Request fired with URL = "+url +" | Data ="+data);
    var request = $.ajax({
        url: url,
        method: "POST",
        data: data,
        dataType: "json"
    });
    request.done(function( result ) {
        logInfo("Response success = "+result);
         callback(result)
    });
    request.fail(function( jqXHR, textStatus ) {
       logError("Responese failed : " + textStatus);
    });
}
function loadMenuItem(){
    getJSON('/home',{},menuItemDataResult); 
}
var menuItemDataResult=function(data){ 
    logInfo("Success"+data); 
}
//Public access
return{
    loadMenuItem:loadMenuItem
}
}());
