import React,{useEffect, useState} from 'react';
import './App.css';
import VRow from './components/VideoRow';
import FeatureVideo from './components/FeatureVideo';
import Header from './components/Header';
import LoadingGif from "./assets/loadinfo.net.gif";
import videoData from './data/connection';
import vL from './data/videoList';

const App = () =>{

  const [videoList,setVideoList] = useState([]);
  const [featureData,setFeatureData] = useState(null);
  const [rolling,setRolling] = useState(false);

  useEffect(()=>{
    const loadAllInfo = async ()=>{

      let list = await videoData.getPrincipalList()
      let myList = {
        slug: "myList",
        title: 'Minha Lista',
        itens: vL.getAllItems()
      }
      if(myList.itens !== null){
        list.push(myList);
      }
      setVideoList(list);
      
      //Selecting featured video
      let recommended = list.filter(i=>i.slug === 'Recommended');
      let randomChosen = Math.floor(Math.random() * (recommended[0].itens.length -1));
      setFeatureData(recommended[0].itens[randomChosen]);
      
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
          Feito com muito <span role='img' aria-label='coração'>❤</span> por <a href="https://github.com/hugo-bm" target="_blank" rel='noreferrer'>Hugo Moreno</a><br/>
          Projeto inspirado no vídeo <a href="https://www.youtube.com/watch?v=tBweoUiMsDg&list=WL&index=5&t=3674s" target="_blank" rel='noreferrer'><span role="img" aria-label="fogo">🔥</span> Clone do NETFLIX em REACTJS
          para Iniciantes</a> do canal <a href="https://www.youtube.com/channel/UCw9mYSlqKRXI6l4vH-tAYpQ" target="_blank" rel='noreferrer'>Bonieky Lacerda</a><br/>
          Projeto inpirado na interface da Netflix<br/>
          Dados pegos da API: <a href="https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwjCqI287J_1AhV-qZUCHTm6D0QQFnoECAcQAQ&url=https%3A%2F%2Fdevelopers.google.com%2Fyoutube%2Fv3&usg=AOvVaw1vqb6TFqS_49i0ix264s-i" target="_blank" rel='noreferrer'>YouTube Data API</a>
        </footer>
      }
       
    </div>
    </>
  );
}
export default  App;
