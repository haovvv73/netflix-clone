


class FilmService {
    // home
    getHome(){
        let promise = axios({
            method:'GET',
            url: 'https://ga-mobile-api.loklok.tv/cms/app/homePage/getHome?page=0',
            headers: {
                lang: "en",
                versioncode: "11",
                clienttype: "ios_jike_default",
            },
        })
        return promise
    }
    //movie
    getMovie(){
        let promise = axios({
            method: 'GET',
            url: 'https://ga-mobile-api.loklok.tv/cms/app/media/previewInfo?category=0&contentId=8084&episodeId=37813&definition=GROOT_LD',
        })
        return promise
    }
    //tv
    getTv(){
        let promise = axios({
            method: 'GET',
            url: 'https://ga-mobile-api.loklok.tv/cms/app/movieDrama/get?id=6432&category=1',
        })
        return promise
    }
    //search
    getSearch(){
        let promise = axios({
            method: 'GET',
            url: 'https://ga-mobile-api.loklok.tv/cms/app/homePage/getHome?page=1',
        })
        return promise
    }
} 
