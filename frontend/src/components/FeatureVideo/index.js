import React,{useState} from 'react';
import './style.css';
import videoList from '../../data/videoList';
import BtnCallback from '../BtnCallback';

const FeatureVideo = (item) => {
    let firstDate = new Date(item.item.date);

    let genres = [];
    for (let i in item.item.tags) {
        genres.push(item.item.tags[i]);
    }
    const [state,setState] = useState('add');
    let exist = videoList.verify(item.id);
    if(exist === true)
    {
        setState('remove');
    }
     function  click(){
        if(state === 'add')
        {
            videoList.saveItem(item.item);
            setState('remove');
        }
        else{
            videoList.removeItem(item.item.id);
            setState('add');
        }
    }


    return (
        <section className="featured" style={{
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundImage: `url(${item.item.backgroundImage})`
        }}>
            <div className="featured--vertical">
                <div className="featured--horizontal">
                    <div className="featured--name">
                        {item.item.title}
                    </div>
                    <div className="featured--info">
                        <div className="featured--likes">
                            {item.item.likes} Likes
                        </div>
                        <div className="featured--year">{firstDate.getFullYear()}</div>
                        <div className="featured--views">
                            {item.item.views} Vizualizaç{item.item.views !== 1 ? "ões" : "ão"}
                        </div>
                    </div>
                    <div className="featured--description">
                        {item.item.description}
                    </div>
                    <div className="featured--buttons">
                        <a href={`https://www.youtube.com/watch?v=${item.item.id}`} target="_blank" className="featured--watchBtn" rel="noopener noreferrer">&#9658; Assistir</a>
                        {
                            <BtnCallback callback={()=>click()} text={state==='add'?' + Minha Lista':'Remove Minha Lista'} Class='featured--myListBtn'/>
                        }
                    </div>
                    <div className="featured--genres">
                        <strong>Tags: </strong>{genres.join(', ')}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default FeatureVideo;