/*
var list="";
function recurse(key,val){
    list+="<li>";
    if(val instanceof Object){
        list += key + "<ul>";
        $.each(val,recurse);
        list+="</ul>"; 
    }
    else{
        list+="<a href'"+val +"'>"+key+"</a>";
    }
    
}

function recursiveJSON(inputData){
    list="<ul>";
        $.each(inputData,recurse);
    list+="</ul>" ; 
    return list;
}
*/