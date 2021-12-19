import React,{useState} from 'react';
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
const VRow = ({title, items})=>{

    const [scrollX,setScrollX]=useState(0);

    let handleLeftArrow = ()=>{
        let x = scrollX + Math.round(window.innerWidth / 2);
        if(x > 0){
            x=0
        }
        setScrollX(x);
    }

    let handleRightArrow = () =>{
        let x = scrollX - Math.round(window.innerWidth / 2);
        let listW = items.results.length * 150;// 150 é o tamnaho da largura do poster do filme
        if((window.innerWidth - listW) > x){
            x = (window.innerWidth - listW) - 60;//60 é o valor de padding para ambos os lados
        }
        setScrollX(x);
    }
    return(
        <div className="videoRow">
            <h2>{title}</h2>
            <div className="videoRow--left" onClick={handleLeftArrow}>
                <FontAwesomeIcon icon={faAngleLeft} size='2x'/>
            </div>
            <div className="videoRow--right" onClick={handleRightArrow}>
                <FontAwesomeIcon icon={faAngleRight} size='2x'/>
            </div>
            <div className="videoRow--listarea">
                <div className="videoRow--list"  style={{
                    marginLeft: scrollX,
                    width: items.results.length *150// 150 é o tamnaho da largura do poster do filme
                }}>
                    {
                    items.results.length > 0 && items.results.map((item,key)=>(
                    
                        <div key={key} className="videoRow--item">
                            <img alt={item.original_title} src={`https://image.tmdb.org/t/p/w300/${item.poster_path}`} />
                        </div>

                    ))}
                </div>
            </div>
        </div>
    );
}
export default VRow;