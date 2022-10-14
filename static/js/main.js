// GLOBAL 
const arrayFilm = []
const filmService = new FilmService()

const getData = async ()=>{
    try{
        let result = await filmService.getHome()
        console.log(result.data.data);
        arrayFilm.push(result.data.data.recommendItems);
        renderHome()
    }catch(err){
        console.log(err);
    }
}

getData();


// -------------- RENDER -------------------
const renderSuggestFilm = ()=>{

}

const renderTypeFilm = ()=>{

}

const renderHome = ()=>{
    for(let i = 1; i < 9; i++){
        console.log(arrayFilm[0][i]);
    }
}

