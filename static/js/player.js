// GLOBAL 
const filmService = new FilmService()
const suggestFilmid = document.getElementById('suggestFilmid')
const filmDetailid = document.getElementById('filmDetailid')
const filmEpid = document.getElementById('filmEpid')
const filmPlayerID = document.getElementById('filmPlayerID')
// -------- event action -----------
// param
const queryString = window.location.search
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id')
const category = urlParams.get('category')

// memory id film
if(localStorage.getItem('filmEp')){
    let filmNetfliId = JSON.parse(localStorage.getItem('filmNetfliId'))
    if(filmNetfliId != id){
        localStorage.removeItem("filmEp");
    }
}

// api request
// detail film and media
const getMedia = async (category = 0 , id = 8084, episodeId = 37813, definition='GROOT_LD',subtitleList = [])=>{
    try{
        let result = await filmService.getMovieMedia(category,id,episodeId,definition)
        let subtitle = ""
        if(subtitleList.length > 0){
            subtitle = subtitleList[0].subtitlingUrl
        }
        renderPlayerFilm(result.data.data,subtitle)
    }catch(err){
        console.log(err);
    }
}

const getFilmData = async (id = 0, category = 0) => {
    try {
        // get detail
        let result = await filmService.getMovie(id, category)
        detailFilm(result.data.data)

        // getMedia firt episode
        const {episodeVo} = result.data.data
        const definition = episodeVo[0].definitionList[0].code
        const subTitleList = episodeVo[0].subtitlingList
        if(localStorage.getItem('filmEp')){
            let filmEP = JSON.parse(localStorage.getItem('filmEp'))
            getMedia(category,id,episodeVo[filmEP].id,definition,subTitleList)
        }else{
            localStorage.setItem('filmNetfliId',JSON.stringify(id))
            getMedia(category,id,episodeVo[0].id,definition,subTitleList)
        }
        //----
        // console.log(episodeVo);
        // console.log(episodeVo[0].definitionList[0].code);
        // console.log(episodeVo[0].subtitlingList);
    } catch (err) {
        console.log(err);
    }
}

// change episoda src
const changeEpisode = async (category,id,episodeId,definition,index)=>{
    // style
    for(let i = 1; i < filmEpid.children.length; i++){
        filmEpid.children[i].style.backgroundColor = 'gray'
    }
    filmEpid.children[index + 1].style.backgroundColor = 'red'
    // goi data ep moi
    try{
        // get new src episoda
        getMedia(category,id,episodeId,definition)
        // save episode now
        localStorage.setItem('filmEp',JSON.stringify(index))
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }catch(err){
        console.log(err);
    }
}

// -------------- RENDER -------------------
// player page
const renderSuggestFilm = (arr = []) => {
    let content = '<h1>You should like</h1>'
    let txt = ''
    arr.forEach(film => {
        txt += `
            <a href="./filmPlayer.html?id=${film.id}&category=${film.category}" class="boxItem" style="background-color: gray;">
                <img src="${film.coverVerticalUrl}" alt="123">
                <p class="boxTitle" > ${film.name} </p>
            </a>`
    })
    content += `
            <div class="box">
                ${txt}
            </div> `
    suggestFilmid.innerHTML = content
}
const renderPlayerFilm = async (media = {},sub = "")=>{
    let player = videojs('my_video');
    player.src ({type: 'application/x-mpegURL', src: `${media.mediaUrl}`})
    // player.play();
}
const detailFilm = (film = {}) => {
    // detail film
    let type = ''
    film.tagNameList.forEach((item) => {
        type += item + ' '
    })
    let detail = `            
    <h1>${film.name}</h1>
    <p>
        ${film.introduction}
    </p>
    <div>
        <span style="color: red;">Thể loại:</span>
        <span style="color: gray;">${type}</span>
    </div>`
    filmDetailid.innerHTML = detail
    // episode film
    let episoda = `<h1>Episode</h1>`
    let color = 'gray'
    let filmEP = 0
    // style now episoda
    if(localStorage.getItem('filmEp')){
        filmEP = JSON.parse(localStorage.getItem('filmEp'))
    }
    film.episodeVo.forEach((item, index) => {
        if(index == filmEP){ color = 'red' }else{ color = 'gray' }
        episoda += `<button style="background-color: ${color};" onClick="changeEpisode(${film.category},${film.id},${item.id},'${item.definitionList[0].code}',${index})" >${index + 1}</button>`
    })
    filmEpid.innerHTML = episoda
    // suggest film
    renderSuggestFilm(film.likeList)
}

if (id && category) {
    getFilmData(id, category)
}