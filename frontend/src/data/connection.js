const BASE_URL = process.env.REACT_APP_BASE_URL;

const  BASIC_FETCH = async (endpoint) =>{
    let req = await fetch(`${BASE_URL}${endpoint}`,{
        mode:"cors",
        headers: {  
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            'Access-Control-Allow-Origin':'*' 
        }
    });
    let json = await req.json();
    return json;
} 

const SERVER_FETCH = async (service,options)=>{
    if(service === undefined){
        service = 'videos'
    }
    let result = []
    switch(service){
        case 'videos':
            let keys = Object.keys(options)
            let values = Object.values(options)
            let parameters
            if(keys.length > 0)
            {
                parameters ='?'
                keys.forEach((item,index)=>{
                    parameters += `${item}=${values[index]}&`
                })
                //parameters += `key=${process.env.REACT_APP_API_YT_KEY}`
            }
            let resp = await BASIC_FETCH(`${service}${parameters}`)
            if(resp !== undefined){
                if(resp.length > 0){
                    resp.forEach((item)=>{
                    result.push({
                        id: item.id,
                        title: item.title,
                        description: item.description,
                        date: item.date,
                        likes:item.likes,
                        views: item.views,
                        idChannel: item.idChannel,
                        nameChannel: item.nameChannel,
                        frontCover: item.images.frontCover,
                        backgroundImage: item.images.backgroundImage,
                        tags: item.tags,
                        myList: false
                        });
                });
                }
            }
            else{
                result = null
            }
        
            break;    
        case 'video':
            //not implemented yet
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
                slug: 'Recommended',
                title: 'Recomendados para você!',
                itens: await SERVER_FETCH('videos',{order:'relevance',q:'23%programacao'})
            },
            {
                slug: 'Lang',
                title: 'Linguagens de programação',
                itens: await SERVER_FETCH('videos',{order:'rating', q:'linguagem de programação'})
            },
           /*  {
                slug: 'Trending',
                title: 'Tendencias',
                itens: await SERVER_FETCH('videos',{order: 'rating', q:'desenvolvimento de sistemas, programação'})
            }, */
            {
                slug: 'frontend',
                title: 'Frontend',
                itens: await SERVER_FETCH('videos',{q:'frontend web developer'})
            },
            {
                slug: 'computer_vision',
                title: 'Visão computacional',
                itens: await SERVER_FETCH('videos',{q:'Visão computacional'})
            },
            {
                slug: 'backend',
                title: 'Backend',
                itens: await SERVER_FETCH('videos',{q:'backend, desenvolvimento'})
            },
            {
                slug: 'data_cience',
                title: 'Ciência de dados',
                itens: await SERVER_FETCH('videos',{q:'programação ciencia de dados'})
            },
            {
                slug: 'c_dev',
                title: 'Desenvolvimento em C',
                itens: await SERVER_FETCH('videos',{q:'programação em c'})
            }
        ]
    },
    getVideoInfo: async(videoId)=>{
        let info = {}
        if(videoId){
            info = await SERVER_FETCH('video',{part:'statistics,topicDetails',id: videoId})
        }
        return info
    }
}
export default videoData