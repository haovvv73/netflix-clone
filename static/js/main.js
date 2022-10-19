// GLOBAL 
const arrayFilm = []
const filmService = new FilmService()

const filmHome = document.getElementById('filmHome')
const filmSearch = document.getElementById('filmSearch')
const inputSearchFilm = document.getElementById('inputSearchFilm')

// -------- event action -----------
// param
const queryString = window.location.search
const urlParams = new URLSearchParams(queryString);
const page = urlParams.get('page')

// api request
// all data film
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
        // console.log(result.data.data);
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

// search explore film with key
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

// -------------- RENDER -------------------
// eplore page
const renderSearchFilm = (arr = arrayFilm[0]) => {
    let content = ''
    let txt = ''
    arr.forEach((element) => {
        txt = ''
        if (element.homeSectionType !== "BANNER" && element.homeSectionType !== "BLOCK_GROUP") {
            element.recommendContentVOList.forEach(film => {
                txt += `
                <a href="./filmPlayer.html?id=${film.id}&category=${film.category}" class="boxItem">
                    <img  data-src="${film.imageUrl}" src="../img/Rectangle 1.jpg" alt="123">
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
    lazyLoad()
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
                txt += `
                <a href="./static/page/filmPlayer.html?id=${film.id}&category=${film.category}">
                    <img  data-src="${film.imageUrl}" src="./static/img/Rectangle 1.jpg" alt="123">
                </a>`
            })
            content += `
                <div class="box">
                    ${txt}
                </div>`
        }
    });
    filmHome.innerHTML = content
    lazyLoad()
}

getData();
