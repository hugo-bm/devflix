const BASE_URL = 'https://www.googleapis.com/youtube/v3/'

const  BASIC_FETCH = async (endpoint) =>{
    let req = await fetch(`${BASE_URL}${endpoint}`);
    let json = await req.json();
    return json;
}

const YOUTUBE_FETCH = async (service,options)=>{
    if(service === undefined){
        service = 'search'
    }
    let result = []
    switch(service){
        case 'search':
            let keys = Object.keys(options)
            let values = Object.values(options)
            let parameters
            if(keys.length > 0)
            {
                parameters ='?'
                keys.forEach((item,index)=>{
                    parameters += `${item}=${values[index]}&`
                })
                parameters += `key=${process.env.REACT_APP_API_YT_KEY}`
            }
            let resp = await BASIC_FETCH(`${service}${parameters}`)
            console.log(resp)
            if(resp.items !== undefined){
                if(resp.items.length>0){
                    resp.items.forEach((item)=>{
                    result.push({
                        backdrop_path: item.snippet.thumbnails.high.url,
                        genre_ids: [
                            878,
                            28,
                            12
                        ],
                        id: item.id.videoId,
                        original_language: null,
                        original_title: null,
                        overview: item.snippet.description,
                        popularity: null,
                        poster_path: item.snippet.thumbnails.default.url,
                        release_date: "2021-09-30",
                        title: item.snippet.title,
                        vote_average: null
                        })
                });
                }
            }
            else{
                result = null
            }
        
            break;    
        case 'video':
            
            break;
        default:
            result = null
            break;
        }
        return result;
}

let videoData = {
    getPrincipalList: async ()=>{
        return [
            {
                slug: 'originals',
                title: '',
                itens: await YOUTUBE_FETCH('search',{part:'id,snippet',q:'big data'})
            },
            {
                slug: 'trending',
                title: 'Recomendados para você!',
                itens: await YOUTUBE_FETCH('search',{part:'id,snippet',q:'big data'})
            },
            {
                slug: 'toprated',
                title: 'Em alta',
                itens: await YOUTUBE_FETCH('search',{part:'snippet',q:'big data'})
            },
            {
                slug: 'action',
                title: 'Ação',
                itens: await YOUTUBE_FETCH('search',{part:'id,snippet',q:'big data'})
            },
            {
                slug: 'comedy',
                title: 'Comédia',
                itens: await YOUTUBE_FETCH('search',{part:'id,snippet',q:'big data'})
            },
            {
                slug: 'horror',
                title: 'Terror',
                itens: await YOUTUBE_FETCH('search',{part:'id,snippet',q:'big data'})
            },
            {
                slug: 'romance',
                title: 'Romance',
                itens: await YOUTUBE_FETCH('search',{part:'id,snippet',q:'big data'})
            },
            {
                slug: 'documentary',
                title: 'Documentários',
                itens: await YOUTUBE_FETCH('search',{part:'id,snippet',q:'big data'})
            }
        ]
    },
    getVideoInfo: async(videoId)=>{
        let info = {}
        if(videoId){
            info = await YOUTUBE_FETCH('video',{part:'statistics,topicDetails',q:'big data'})
        }
        return info
    }
}
export default videoData