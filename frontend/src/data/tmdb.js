const API_BASE = 'https://api.themoviedb.org/3';
const TMDB_API_KEY = '';

const  BASIC_FETCH = async (endpoint) =>{
    let req = await fetch(`${API_BASE}${endpoint}`);
    let json = await req.json();
    return json;
}   

let movieData = {
    getPrincipalList: async ()=>{
        return [
            {
                slug: 'originals',
                title: 'Originais do Netflix',
                itens: await BASIC_FETCH(`/discover/tv?with_network=213&language=pt-BR&api_key=${TMDB_API_KEY}`)
            },
            {
                slug: 'trending',
                title: 'Recomendados para você!',
                itens: await BASIC_FETCH(`/trending/all/week?language=pt-BR&api_key=${TMDB_API_KEY}`)
            },
            {
                slug: 'toprated',
                title: 'Em alta',
                itens: await BASIC_FETCH(`/movie/top_rated?language=pt-BR&api_key=${TMDB_API_KEY}`)
            },
            {
                slug: 'action',
                title: 'Ação',
                itens: await BASIC_FETCH(`/discover/movie?api_key=${TMDB_API_KEY}&with_genres=28&language=pt_br`)
            },
            {
                slug: 'comedy',
                title: 'Comédia',
                itens: await BASIC_FETCH(`/discover/movie?api_key=${TMDB_API_KEY}&with_genres=35&language=pt_br`)
            },
            {
                slug: 'horror',
                title: 'Terror',
                itens: await BASIC_FETCH(`/discover/movie?api_key=${TMDB_API_KEY}&with_genres=27&language=pt_br`)
            },
            {
                slug: 'romance',
                title: 'Romance',
                itens: await BASIC_FETCH(`/discover/movie?api_key=${TMDB_API_KEY}&with_genres=10749&language=pt_br`)
            },
            {
                slug: 'documentary',
                title: 'Documentários',
                itens: await BASIC_FETCH(`/discover/movie?api_key=${TMDB_API_KEY}&with_genres=99&language=pt_br`)
            },
        ]
    },
    getVideoInfo: async (movieId,type)=>{
        let info = {};
        if(movieId){
            switch(type){
                case 'movie':
                    info = await BASIC_FETCH(`/movie/${movieId}?language=pt-BR&api_key=${TMDB_API_KEY}`);
                    break;
                case 'tv':
                    info = await BASIC_FETCH(`/tv/${movieId}?language=pt-BR&api_key=${TMDB_API_KEY}`);
                    break;
                default:
                    break;
            }
        }
        return info;
    }

}

export default movieData;