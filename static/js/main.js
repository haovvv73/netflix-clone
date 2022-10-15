// GLOBAL 
const arrayFilm = []
const filmService = new FilmService()

const filmHome = document.getElementById('filmHome')
const filmSearch = document.getElementById('filmSearch')
const inputSearchFilm = document.getElementById('inputSearchFilm')

const suggestFilmid = document.getElementById('suggestFilmid')
const filmDetailid = document.getElementById('filmDetailid')
const filmEpid = document.getElementById('filmEpid')


// -------- event action -----------
// param
const queryString = window.location.search
const urlParams = new URLSearchParams(queryString);
const page = urlParams.get('page')
const id = urlParams.get('id')
const category = urlParams.get('category')

// logic
const getData = async () => {
    try {
        let result
        //
        if (page) {
            result = await filmService.getHome(page)
        } else {
            result = await filmService.getHome()
        }
        //
        console.log(result.data.data);
        arrayFilm.push(result.data.data.recommendItems);
        if (filmHome) {
            renderHome()
        }
        if (filmSearch) {
            renderSearchFilm()
            inputSearchFilm.addEventListener('keyup', (e) => {
                searchData(e.currentTarget.value.trim())
            })
        }
    } catch (err) {
        console.log(err);
    }
}

const searchData = (text = '') => {
    let tenFilm = ''
    let arrayFilmSearch = []
    let tuKhoa = text.toLowerCase()
    arrayFilm[0].forEach((element, index) => {
        if (element.homeSectionType !== "BANNER" && element.homeSectionType !== "BLOCK_GROUP") {
            element.recommendContentVOList.forEach(film => {
                tenFilm = film.title.toLowerCase()
                let result = tenFilm.indexOf(tuKhoa)
                if (result >= 0) {
                    arrayFilmSearch.push(film)
                }
            })
        }
    });
    renderSearchFilm([{
        homeSectionType: 'SIGLE_ALBUM',
        recommendContentVOList: [...arrayFilmSearch]
    }])
}

const getMedia = async (category = 0 , id = 8084, episodeId = 37813, definition='GROOT_LD')=>{
    try{
        let result = await filmService.getMovieMedia(category,id,episodeId,definition)
        console.log("🚀 ~ file: main.js ~ line 73 ~ getMedia ~ media", result.data)
    }catch(err){
        console.log(err);
    }
}

const getFilmData = async (id = 0, category = 0) => {
    try {
        console.log('id = category', id, category);
        // get detail
        let result = await filmService.getMovie(id, category)
        console.log("🚀 ~ file: main.js ~ line 69 ~ getFilmData ~ detail", result.data.data)
        detailFilm(result.data.data)

        // getMedia firt episode
        const {episodeVo} = result.data.data
        getMedia(category,id,episodeVo[0].id)
    } catch (err) {
        console.log(err);
    }
}


getData();
if (id && category) {
    getFilmData(id, category)
}

// -------------- RENDER -------------------
// player page
const renderSuggestFilm = (arr = []) => {
    let content = '<h1>You should like</h1>'
    let txt = ''
    arr.forEach(film => {
        txt += `
            <a href="./filmPlayer.html?id=${film.id}&category=${film.category}" class="boxItem">
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
    film.episodeVo.forEach((item, index) => {
        episoda += `<button>${index + 1}</button>`
    })
    filmEpid.innerHTML = episoda
    // suggest film
    renderSuggestFilm(film.likeList)
}

// search page
const renderSearchFilm = (arr = arrayFilm[0]) => {
    let content = ''
    let txt = ''
    arr.forEach((element) => {
        txt = ''
        if (element.homeSectionType !== "BANNER" && element.homeSectionType !== "BLOCK_GROUP") {
            element.recommendContentVOList.forEach(film => {
                txt += `
                <a href="./filmPlayer.html?id=${film.id}&category=${film.category}" class="boxItem">
                    <img src="${film.imageUrl}" alt="123">
                    <p class="boxTitle" > ${film.title} </p>
                </a>`
            })
            content += `
                <div class="box" style="margin-bottom:60px">
                    ${txt}
                </div> `
        }
    });
    filmSearch.innerHTML = content
}

// home page
const renderHome = () => {
    let content = ''
    let txt = ''
    arrayFilm[0].forEach((element) => {
        txt = ''
        if (element.homeSectionType !== "BANNER" && element.homeSectionType !== "BLOCK_GROUP") {
            content += `<br> <h1>${element.homeSectionName}</h1>`
            element.recommendContentVOList.forEach(film => {
                txt += `<a href="./static/page/filmPlayer.html?id=${film.id}&category=${film.category}"><img src="${film.imageUrl}" alt="123"></a>`
            })
            content += `
                <div class="box">
                    ${txt}
                </div>`
        }
    });
    filmHome.innerHTML = content
}

