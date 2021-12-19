import axios from 'axios';

class AcessYoutube{
    constructor(){
        this.BASIC_URL = 'https://youtube.googleapis.com/youtube/v3';
    }

    async basicUrl(url){
       return await axios.get(`${this.BASIC_URL}${url}key=${process.env.API_KEY}`);

    }
    
}
export default AcessYoutube; 