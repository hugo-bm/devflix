
function displayError(error){
    
    console.log('###Server-> Error found:')
    console.error(error)
}

class YTDataAPIError extends Error{
    constructor(message){
        super(`\n###Server-> Error description:\n ${message}`)
        this.name= "Youtube Data API Error";
    }
}



const errs = {YTDataAPIError,displayError};
export default errs;