
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




function textBoxForArrayKey(input,id){ 
    if(id){
        return  "<input onkeyup='textInputChanged(this)' type='text' id='"+id+"' value='"+input+"' class='input-sm arraykey'/>";
    }
    return  "<input type='text' value='"+input+"' class='input-sm arraykey'/>";
}
function textBoxForObjKey(input,id){
    if(id){
        return  "<input onkeyup='textInputChanged(this)' type='text' id='"+id+"' value='"+input+"' class='input-sm  keystyle'/>";    
    }
    return  "<input type='text' value='"+input+"' class='input-sm  keystyle'/>";
}
function textBoxForVal(input,id){
    if(id){
         return  "<input onkeyup='textInputChanged(this)' type='text' id='"+id+"' value='"+input+"' class='input-sm valstyle' />";
    }
    return  "<input type='text'  value='"+input+"' class='input-sm valstyle' />";
}

function textBoxForKey(input,id){
    if(id){
        return "<input onkeyup='textInputChanged(this)' type='text' id='"+id+"' value='"+input+"' class='input-sm keystyle' />";
    }
    return "<input type='text' value='"+input+"' class='input-sm keystyle' />";
}
var jshtml = '';
var jstemp ='';

 
 
function getKeysLenghtOfObj(obj){
     var size=0;
     if(obj instanceof Array){
         size=obj.length;
     }
     else{
         for(key in obj){
             size++;
         }
     }
     
     return size;
 }
  
function recursiveJSON(inputData){
  iterateJSONToHTML(inputData)
    if(inputData instanceof Array){
        jstemp=("[<ul class='arraybk'>"+jstemp+"</ul>]");
       
        //console.log(jstemp);
        return "[<ul class='arraybk'>"+jshtml+"</ul>]";
    }
    else{
        jstemp=("{<ul class='objectbk'>"+jstemp+"</ul>}");
       // $("#col3").html(jstemp);
        //console.log(jstemp);
        return "{<ul class='objectbk'>"+jshtml+"</ul>}";
    }
}

var seq=0;

function iterateJSONToHTML(obj){ 
    var keylength=getKeysLenghtOfObj(obj);
   // console.log("next>>"+keylength);
    var i=1;
    for(var key in obj){ 
        seq+=1; 
        jshtml+="<li>"; 
        jstemp+="<li>";
        if (obj[key] instanceof Array){
          if (obj instanceof Array){
                jshtml+=key+'</li>[<ul class="arraybk">';
                jstemp+='</li>[<ul class="arraybk">';
            }else{
                jshtml+=textBoxForArrayKey(key,'id'+seq)+'</li>[<ul class="arraybk">';
                jstemp+='"<span id="sid'+seq+'">'+key+' </span>":</li>[<ul class="arraybk">';
            }
            //jshtml+='[<ul class="arraybk">';
           // jshtml+=iterateJSONToHTML(obj[key]);
           iterateJSONToHTML(obj[key]);
            jshtml+="</ul>]" 
            //Don't Apply ',' for last element
            if(i==keylength){
              jstemp+="</ul>]"
            }else{
                jstemp+="</ul>],"
            }
            
        }
        else if (obj[key] instanceof Object){
             
              if(obj instanceof Array){
                jshtml+= key+'</li>{<ul class="objectbk">';
                jstemp+= '</li>{<ul class="objectbk">';
               }
              else {
                jshtml+= textBoxForObjKey(key,'id'+seq)+'</li>{<ul class="objectbk">';
                jstemp += '"<span id="sid'+seq+'">'+key+' </span>" : </li>{<ul class="objectbk">';
              } 
              //  jshtml+=iterateJSONToHTML(obj[key]);
              iterateJSONToHTML(obj[key]);
              
                jshtml+="</ul>}"
                
                //Don't Apply ',' for last element
                if(i==keylength){
                    jstemp+="</ul>}"
                }
                else{
                    jstemp+="</ul>},"
                }
        }else{
            
            if(obj instanceof Array){
                jshtml+= textBoxForVal(obj[key],'id'+seq)+'</li>';
                
                //Don't Apply ',' for last element
                 if(i==keylength){
                    jstemp+= '"<span id="sid'+seq+ '">' +obj[key]+'</span>"</li>';
                 }else{
                     jstemp+= '"<span id="sid'+seq+ '">' +obj[key]+'</span>",</li>';
                 }
            }
            else if(obj instanceof Object){
                jshtml+=textBoxForKey(key,'id'+seq)+' <span >:</span> '+textBoxForVal(obj[key],'iv'+seq)+'</li>';
                if(i==keylength){
                    jstemp+='"<span id="sid'+seq+'">'+key+'</span>" <span >:</span> "<span id="siv'+seq+ '">' +obj[key]+'</span>"</li>';
                }else{ 
                    jstemp+='"<span id="sid'+seq+'">'+key+'</span>" <span >:</span> "<span id="siv'+seq+ '">' +obj[key]+'</span>",</li>';
                 
                }
            }else{
                jshtml+=textBoxForKey(key,'id'+seq)+' <span >:</span> '+textBoxForVal(obj[key],'iv'+seq)+'</li>';
                if(i==keylength){
                    jstemp+= '"<span id="sid'+seq+'">'+key+'</span>" <span >:</span> "<span id="siv'+seq+ '">' +obj[key]+'</span>"</li>';
                }else{
                    jstemp+= '"<span id="sid'+seq+'">'+key+'</span>" <span >:</span> "<span id="siv'+seq+ '">' +obj[key]+'</span>",</li>';
                }
            }
            
        }//end if
        i++;
        //console.log(i);
    }//end for
     
   // return s;
    
}//end function
 
 function textInputChanged(obj){
      
     document.getElementById('s'+obj.id).innerText=obj.value;
     //console.log(obj.id);
     //var obj = JSON.parse($('#tempHtml').text());
     //$("#code").html(JSON.stringify(obj,null,'\t'));
 }