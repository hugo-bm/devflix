import React from "react";
import './style.css';

const VideoDetails = (props) => {
    let { item } = props;
    let date = new Date(item.date)
    return (
        <div className='model'>
            <div className="details--mainContent">
                <div className="details--title">
                    <h3>{item.title}</h3>
                </div>
                <div className="details--description">
                    {item.description}
                </div>

                <div className="details--btnContent">
                    <a href={`https://www.youtube.com/watch?v=${item.id}`} target="_blank" className="details--watchBtn" rel="noopener noreferrer">&#9658; Assistir</a>
                    {/* <button className="whatList"></button> */}
                </div>
            </div>

            <div className="imageContent">
                <img src={item.frontCover} alt={`Video thumbnail: ${item.title}`} />
                <div className="details--info">
                    <div className="details--likes">
                    Likes: {item.likes}
                    </div>
                    <div className="details--year">Ano de exibição: {date.getFullYear()}</div>
                    <div className="details--views">
                        Vizualizaç{item.views !== 1 ? "ões" : "ão"}: {item.views}
                    </div>
                </div>
                <a href={`http://youtube.com/c/${item.nameChannel}`} target="_blank" className="details--channelBtn" rel="noopener noreferrer">Canal: {item.nameChannel}</a>
            </div>

        </div>
    )
}
export default VideoDetails;