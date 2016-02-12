
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


var list="";
function recurse(key,val){
    list+="<li>";
    if(val instanceof Array){
        list += key + "</li><ul class='arrayclass'";
            $.each(val,recurse);
        list+="</ul>"; 
    }else if(val instanceof Object){
        list += key + "</li><ul class='objclass'>";
            $.each(val,recurse);
        list+="</ul>"; 
    }
    else{
       // list+="<a href'"+key +"'>"+val+"</a> </li>";
       list+= "<input type='text' value='"+key+"' class='form-control input-sm keystyle' /> <-> <input type='text' value='"+val+"' class='form-control input-sm valstyle' />" ;
    }
    
}

function recursiveJSON(inputData){
    list="<ul>";
        $.each(inputData,recurse);
    list+="</ul>" ; 
    return list;
}



//Public access
return{
    loadMenuItem:loadMenuItem,
    recursiveJSON:recursiveJSON
}
}());
