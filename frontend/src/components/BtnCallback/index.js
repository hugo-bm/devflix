import React from "react";

const BtnCallback = (props) => {
 let {text,callback,Class} = props;
   
    
 return(
    <button onClick={callback} className={Class} >{text}</button>
 )
}

export default BtnCallback;