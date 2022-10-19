const lazyLoad = ()=>{
    if('IntersectionObserver' in window){
        const arrImg = document.querySelectorAll('[data-src]')
        // item in view  port  - obsever
        let observer = new IntersectionObserver((entries,observer)=>{
            // console.log(entries);
            entries.forEach(entry => {
            // console.log('sdsd',entry.isIntersecting);
                /* Placeholder replacement */
                if(entry.isIntersecting){
                    entry.target.src = entry.target.dataset.src;
                    observer.unobserve(entry.target);
                }
            });
        },{rootMargin: "10px 10px -20px 10px"})
        // item in view  port 

        arrImg.forEach(item=>{
            observer.observe(item)
        })
    }else{
        console.log('not suport');
    }
}