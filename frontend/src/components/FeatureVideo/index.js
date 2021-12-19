import React from 'react';
import './style.css';

const FeatureVideo = (item) => {
    let firstDate = new Date(item.item.first_air_date);

    let genres = [];
    for(let i in item.item.genres){
        genres.push(item.item.genres[i].name);
    }

    return(
        <section className="featured" style={{
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${item.item.backdrop_path})`
        }}>
            <div className="featured--vertical">
                <div className="featured--horizontal">
                    <div className="featured--name">
                        {item.item.original_name}
                    </div>
                    <div className="featured--info">
                        <div className="featured--points">
                            {item.item.vote_average} pontos
                        </div>
                        <div className="featured--year">{firstDate.getFullYear()}</div>
                        <div className="featured--seasons">
                            {item.item.number_of_seasons} Temporada{item.item.number_of_seasons !==1?"s":""}
                        </div>
                    </div>
                    <div className="featured--description">
                        {item.item.overview}
                    </div>
                    <div className="featured--buttons">
                        <a href={`/watch?id=${item.item.id}`} className="featured--watchBtn">&#9658; Assistir</a>
                        <a href={`/add_list?id=${item.item.id}`} className='featured--myListBtn' > + Minha Lista</a>
                    </div>
                    <div className="featured--genres">
                        <strong>Gêneros: </strong>{genres.join(', ')}
                    </div>
                </div> 
            </div>
        </section>
    );
}

export default FeatureVideo;