
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




function textBoxForArrayKey(input){ 
    return  "<input type='text' value='"+input+"' class='input-sm arraykey'/>";
}
function textBoxForObjKey(input){
    return  "<input type='text' value='"+input+"' class='input-sm  keystyle'/>";
}
function textBoxForVal(input){
    return  "<input type='text' value='"+input+"' class='input-sm valstyle' />";
}

function textBoxForKey(input){
    return "<input type='text' value='"+input+"' class='input-sm keystyle' />";
}

function recursiveJSON(inputData){
  
    if(inputData instanceof Array){
        return "[<ul class='arraybk'>"+iterateJSONToHTML(inputData)+"</ul>]";
    }
    else{
        return "{<ul class='objectbk'>"+iterateJSONToHTML(inputData)+"</ul>}";
    }
}


function iterateJSONToHTML(obj){
    var s = '';
    for(var key in obj){ 
        
        s+="<li>"; 
        if (obj[key] instanceof Array){
          if (obj instanceof Array){
                s+=key+'</li>[<ul class="arraybk">';
            }else{
                s+=textBoxForArrayKey(key)+'</li>[<ul class="arraybk">';
            }
            //s+='[<ul class="arraybk">';
            s+=iterateJSONToHTML(obj[key]);
            s+="</ul>]"
        }
        else if (obj[key] instanceof Object){
             
              if(obj instanceof Array){
                s+= key+'</li>{<ul class="objectbk">';
               }
              else {
                s+= textBoxForObjKey(key)+'</li>{<ul class="objectbk">'; 
              } 
                s+=iterateJSONToHTML(obj[key]);
                s+="</ul>}"
        }else{
            
            if(obj instanceof Array){
                s+= textBoxForVal(obj[key])+'</li>';
            }
            else if(obj instanceof Object){
                s+=textBoxForKey(key)+' : '+textBoxForVal(obj[key])+'</li>';
            }else{
                s+=textBoxForKey(key)+' : '+textBoxForVal(obj[key])+'</li>';
            }
            
        }//end if
        
    }//end for
     
    return s;
    
}//end function
 

 