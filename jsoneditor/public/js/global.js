 //Global vars for settings    
var CONFIG={
    info:true,
    error:true
};

function logInfo(input){
    if(CONFIG.info){
        console.log(input);
    }
}

function logError(input){
    if(CONFIG.error){
        console.log(input);
    }
}
 
   