import React,{useEffect, useState} from 'react';
import './App.css'
import Tmdb from './data/tmdb.js';
import VRow from './components/VideoRow';
import FeatureVideo from './components/FeatureVideo';
import Header from './components/Header';
import LoadingGif from "./assets/loadinfo.net.gif"

const App = () =>{

  const [videoList,setVideoList] = useState([]);
  const [featureData,setFeatureData] = useState(null);
  const [rolling,setRolling] = useState(false);

  useEffect(()=>{
    const loadAllInfo = async ()=>{
      let list = await Tmdb.getPrincipalList();
      setVideoList(list);
      //Selecting featured video
      let originals = list.filter(i=>i.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].itens.results.length -1));
      let chosen = originals[0].itens.results[randomChosen];
      let chosenInfo = await Tmdb.getVideoInfo(chosen.id,'tv');
      setFeatureData(chosenInfo);
      
    }

    loadAllInfo();
  },[]);

  useEffect(()=>{
    const scrollListiner =()=>{
      if(window.scrollY > 10){
        setRolling(true);
      }
      else{
        setRolling(false);
      }
    }
    window.addEventListener('scroll',scrollListiner);
    return ()=>{
      window.removeEventListener('scroll',scrollListiner);
    }
  },[]);
  
  return(
    <>
    <div className="page">
      <Header rolling={rolling}/>
      {featureData?<FeatureVideo item={featureData}/>:null}
      <section className="lists">
        {
          
          videoList.map(
            (item, key)=>(
              <div key={key}>
                  <VRow  title={item.title} items={item.itens}/>
              </div>
            ) 
          )
        }
      </section>
      {videoList.length <=0 && 
      <div className="loading">
        <img src={LoadingGif} alt="carregamento" />
      </div>}
      

      {
        videoList.length > 0 && 
        <footer>
          Feito com muito <span role='img' aria-label='coração'>❤</span> por Hugo Moreno<br/>
          Projeto inspirado no vídeo <a href="https://www.youtube.com/watch?v=tBweoUiMsDg&list=WL&index=5&t=3674s"><span role="img" aria-label="fogo">🔥</span> Clone do NETFLIX em REACTJS
          para Iniciantes</a> do canal <a href="https://www.youtube.com/channel/UCw9mYSlqKRXI6l4vH-tAYpQ">Bonieky Lacerda</a><br/>
          Projeto inpirado na interface da Netflix<br/>
          Todos os direitos de imagem para a Netflix<br/>
          Dados pegos do site themoviedb.org
        </footer>
      }
      
    </div>
    </>
  );
}
export default  App;