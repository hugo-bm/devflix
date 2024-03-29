import Videos from './videos.js';
import AcessYoutube from '../data/acessYT.js';
import errs from '../error/index.js';

class VideosDAO{
    constructor(){
        this.yt = new AcessYoutube();
    }

    async listAll(query='',order='relevance',qtd=10){
        const PART = 'snippet';
        let videoList =[];
        try {
            const RESP = await this.yt.basicUrl(`/search?part=${PART}&type=video&maxResults=${qtd}&regionCode=BR&order=${order}&q=${(query.length>0)?query.concat('&'):''}`);
            if(RESP.data.kind === 	"youtube#searchListResponse")
            {
                let v=null;
                for(let video of RESP.data.items)
                {
                    let {id,snippet} = video;
                    const DATA = await this.videoInfo(id.videoId,'snippet,statistics');
                    let background = (DATA.snippet.thumbnails.maxres)?DATA.snippet.thumbnails.maxres.url:snippet.thumbnails.high.url;
                    let {viewCount,likeCount} = DATA.statistics;
                    v = new Videos(
                        id.videoId,
                        snippet.title,
                        snippet.description,
                        snippet.publishedAt,
                        viewCount,
                        likeCount,
                        snippet.channelId,
                        snippet.channelTitle,
                        {frontCover: snippet.thumbnails.medium.url,backgroundImage: background},
                        DATA.snippet.tags
                    );
                    videoList.push(v);
                }
            }
        } catch (error) {
            
            throw new errs.YTDataAPIError(error);
            
        }
        return videoList;
    }
    async videoInfo(id,part){
        let item=null;
        try {
            const RESP = await this.yt.basicUrl(`/videos/?part=${part}&id=${(id.length>0)?id.concat('&'):''}`);
            if(RESP !== undefined)
            {
                item = RESP.data.items[0];
            }
        } catch(error) {
            throw new errs.YTDataAPIError(error);
        }
        return item;
    }
}

export default VideosDAO;