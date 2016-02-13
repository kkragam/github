
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
var curTypes={
    string:"string",
    array:"array",
    object:"object"
}
var curval="";

function recurse(key,val){ 
    list+="<li>"; 
    if(val instanceof Array){
        curval=curTypes.array;
        list += textBoxForArrayKey(key) + "</li><ul class='arrayclass'>[";
            $.each(val,recurse);
        list+="<br>]</ul>"; 
    }else if(val instanceof Object){
        curval=curTypes.object;
        list += textBoxForObjKey(key) + "</li><ul class='objclass'> {";
            $.each(val,recurse);
        list+="<br>}</ul>"; 
    }
    else{  
        if(curval == curTypes.array){
            list+=   textBoxForVal(val) ;
             
        }
        else if(curval == curTypes.array){
            list+= textBoxForKey(key)+ " : "+ textBoxForVal(val) ;
             
        }
        else{
            list+= textBoxForKey(key)+ " : "+ textBoxForVal(val) ;
            curval=curTypes.string;    
        }
        
       
    }
    
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
    /*list="<ul>";
        $.each(inputData,recurse);
    list+="</ul>" ; 
    return list;
    */
    if(inputData instanceof Array){
        return "[<ul class='arraybk'>"+iterateAttributesAndFormHTMLLabels(inputData)+"</ul>]";
    }
    else{
        return "{<ul class='objectbk'>"+iterateAttributesAndFormHTMLLabels(inputData)+"</ul>}";
    }
}





 

function iterateAttributesAndFormHTMLLabels(obj){
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
            s+=iterateAttributesAndFormHTMLLabels(obj[key]);
            s+="</ul>]"
        }
        else if (obj[key] instanceof Object){
             
              if(obj instanceof Array){
                s+= key+'</li>{<ul class="objectbk">';
               }
              else {
                s+= textBoxForObjKey(key)+'</li>{<ul class="objectbk">'; 
              } 
                s+=iterateAttributesAndFormHTMLLabels(obj[key]);
                s+="</ul>}"
        }else{
            
            if(obj instanceof Array){
                s+= textBoxForVal(obj[key])+'</li>';
            }
            else if(obj instanceof Object){
                s+=textBoxForKey(key)+':'+textBoxForVal(obj[key])+'</li>';
            }else{
                s+=textBoxForKey(key)+':'+textBoxForVal(obj[key])+'</li>';
            }
            
        }//end if
        
    }//end for
     
    return s;
    
}//end function




//Public access
return{
    loadMenuItem:loadMenuItem,
    recursiveJSON:recursiveJSON
}
}());
