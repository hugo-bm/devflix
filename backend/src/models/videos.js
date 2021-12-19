class Videos {
    constructor(id='', title = '', description = '', date, likes = 0, views = 0, idChannel ='', nameChannel = '',images={frontCover:'',backgroundImage:''}) {
        let err =0;
         if (typeof(id) !== "string" && id.length == 0) {
            err++;
        }
        if (Object.prototype.toString.call(new Date(date)) !== '[object Date]') {
            err++;
        }
        if (typeof(idChannel) != "string" && idChannel.length == 0) {
            err++;
        }
        if(typeof(images) != 'object')
        {
           err++; 
        } 
        if (err == 0) {
            this.id = id;
            this.title = title;
            this.description = description;
            this.date = new Date(date);
            this.likes = likes;
            this.views = views;
            this.idChannel = idChannel;
            this.nameChannel =nameChannel;
            this.images = images;
        }
        else {
            throw new Error("Invalid parameter(s) on constructor");
        }

    }

    toString() {
        return `Videos{id: ${this.id}, title: ${this.title}, description: ${this.description},date: ${this.date}}`+
        `,likes: ${this.likes}, views: ${this.views}, idChannel: ${this.idChannel},}`;
    }
    getId(){
        return this.id;
    }
    setId(id){
        if (typeof(id) === "string" && id.length > 0){
            this.id =id;
        } 
    }
    getTitle(){
        return this.title;
    }
    setTitle(title=''){
        if(typeof(title) === "string")
        {
            this.title = title;
        }
    }
    getDesc()
    {
        return this.description;
    }

    setDesc(description=''){
        if(typeof(description) === "string")
        {
            this.description = description;
        }
    }
    getDate(){
        return this.date;
    }
    setDate(date){
        if (Object.prototype.toString.call(date) === '[object Date]') {
            this.date = new Date(date);
        }
    }
    getLikes(){
        return this.likes;
    }
    setLikes(likes=0){
        if(typeof(likes) === 'number'){
            this.likes = likes;
        }
    }
    getViews(){
        return this.views;
    }
    setViews(views){
        if(typeof(views) === 'number'){
            this.views = views;
        }
    }
    getIdChannel(){
        return this.idChannel;
    }
    setIdChannel(idChannel){
        if (typeof(idChannel) === "string" && idChannel.length > 0) {
            this.idChannel = idChannel;
        }
    }
    getNameChannel(){
        return this.nameChannel;
    }
    setNameChanel(nameChannel){
        if(typeof(nameChannel) === "string")
        {
            this.nameChannel = nameChannel;
        }
    }
    getImages(){
        return this.images;
    }
    setImages(frontCover='',backgroundImage=''){
        if(typeof(frontCover) === 'string' && typeof(backgroundImage) === 'string')
        {
            this.images= {frontCover,backgroundImage}
        }
    }

}
export default Videos;