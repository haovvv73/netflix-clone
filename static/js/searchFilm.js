// GLOBAL
const inpKeySearch = document.getElementById('inpKeySearch')
const contentSearch = document.getElementById('contentSearch')
const filmService = new FilmService()
// api 
// get top film week
const getLeaderData = async () => {
    try {
        let result = await filmService.getSearchLeaderBoard()
        renderLeaderFilm(result.data.data.list)
    } catch (err) {
        console.log(err);
    }
}
// post key to sever to get result 
const searchKeyWord = async (key = '')=>{
    try{
        let result = await filmService.SearchWithKeyword({
            "searchKeyWord": `${key.toLocaleLowerCase()}`,
            "size": 50,
            "sort": "",
            "searchType": ""
        })
        const { searchResults } = result.data.data
        console.log("🚀 ~ file: searchFilm.js ~ line 23 ~ searchKeyWord ~ searchResults", searchResults)
        renderResultSearch(searchResults)
    }catch(err){
        console.log(err);
    }
}

getLeaderData() 

// --------- event -------------
inpKeySearch.addEventListener('change',(e)=>{
    if(e.currentTarget.value.trim() != ''){
        searchKeyWord(e.currentTarget.value.trim())
    }else{
        getLeaderData()
    }
})

// --------- render -------------

const renderLeaderFilm = (arr = []) => {
    let content = ''
    let txt = ''
    arr.forEach(film => {
        txt += `
            <a href="./filmPlayer.html?id=${film.id}&category=${film.domainType}" class="boxItem" style="background-color: gray;">
                <img src="${film.cover}" alt="123">
                <p class="boxTitle" > ${film.title} </p>
            </a>`
    })
    content += `
            <div class="box" style="grid-template-columns: repeat(5, minmax(100px, 1fr));">
                ${txt}
            </div> `
    contentSearch.innerHTML = content
}

const renderResultSearch = (arr = [])=>{
    let content = ''
    let txt = ''
    arr.forEach(film => {
        txt += `
            <a href="./filmPlayer.html?id=${film.id}&category=${film.domainType}" class="boxItem" style="background-color: gray;">
                <img src="${film.coverVerticalUrl}" alt="123">
                <p class="boxTitle" >${film.name} </p>
            </a>`
    })
    content += `
            <div class="box">
                ${txt}
            </div> `
    contentSearch.innerHTML = content
}


