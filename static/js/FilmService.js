
class FilmService {
    // home
    getHome(page = 0){
        let promise = axios({
            method:'GET',
            url: 'https://ga-mobile-api.loklok.tv/cms/app/homePage/getHome',
            params:{
                page:page
            },
            headers: {
                lang: "en",
                versioncode: "11",
                clienttype: "ios_jike_default",
            },
        })
        return promise
    }
    //movie
    getMovie(id,category){
        let promise = axios({
            method: 'GET',
            url: 'https://ga-mobile-api.loklok.tv/cms/app/movieDrama/get',
            params:{
                id:id,
                category:category,
            },
            headers: {
                lang: "en",
                versioncode: "11",
                clienttype: "ios_jike_default",
            },
        })
        return promise
    }
    //movie media
    getMovieMedia = (cate, contentId, episodeId, definition)=>{
        let promise = axios({
            method: 'GET',
            url: 'https://ga-mobile-api.loklok.tv/cms/app/media/previewInfo',
            params:{
                category: cate,
                contentId:contentId,
                episodeId:episodeId,
                definition:definition,
            },
            headers: {
                lang: "en",
                versioncode: "11",
                clienttype: "ios_jike_default",
            },
        })
        return promise
    }
} 
