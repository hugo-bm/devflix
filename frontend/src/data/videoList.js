const videoList = {
    saveItem: async (item)=>{
        if(item !== undefined)
        {
            //removing information no longer needed
            let {backgroundImage,myList,...rest} = item;
            myList = true;
            rest = {...rest,myList};
            //checking the existing list
            let list = localStorage.getItem('myList');
            if(list !== null)
            {
                list = await JSON.parse(list);
            }
            else
            {
                list = [];
            }
            if(!videoList.verify(rest.id))
            {
                //add new item to list
                list.push(rest);
                localStorage.setItem('myList',JSON.stringify(list));
            }
           
        }
    },
    getAllItems:  ()=>{
        let list = null; 
        list = localStorage.getItem('myList');

        if(list !== null)
        {
            list =  JSON.parse(list);
        }
        if(list.length === 0)
        {
            list = null;
        }
        return list;
    },
    removeItem:  (id)=>{
        if( typeof(id) === "string"){
            let list =  videoList.getAllItems();
            if(list !== null){
                let index = list.findIndex((el=>el.id === id));
                if(index > -1)
                {
                    list.splice(index,1);
                    localStorage.setItem('myList',JSON.stringify(list));
                }
            }
        }
    },
    verify:  (id)=>{
        let resp = false;
        if( typeof(id) === "string"){
            let list =  videoList.getAllItems();
            if(list !== null){
                let index = list.find((el=>el.id === id));
                if(index !== undefined)
                {
                   resp = true;
                }
            }
        }
        else{
            resp = undefined;
        }
        return resp;
    }
}

export default videoList