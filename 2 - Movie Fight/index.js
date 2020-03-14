let left;
let right;

async function onMovieSelect (movie, element,s) {
    //    console.log(movie.Title)
        const res = await axios.get('http://www.omdbapi.com/',{
                    params:{
                        apikey: '75a29927',
                        i: `${movie.imdbID}`,
                
                    }
        });
        
        element.innerHTML = movieTemplate(res.data,s);
        if(left&&right)
        movieComparison()
        
        
    }
    // let = [];        
    // let = [];
    const movieTemplate = (movie,s) => {        
        
//        if(s==='left'){
            let boxoffice = parseInt(movie.BoxOffice.replace(/\$/g,'').replace(/\,/g,''));
            if(movie.BoxOffice==='N/A')
            boxoffice = 0;
            let rotten = parseInt(movie.Ratings[1].Value)
            let meta = parseInt(movie.Metascore)
            let imdb = parseInt(movie.imdbRating)
            
        // }
        // else{
        //     boxoffice = parseInt(movie.BoxOffice.replace(/\$/g,'').replace(/\,/g,''));
        //     if(movie.BoxOffice==='N/A')
        //     boxoffice = 0;
        //     rotten = parseInt(movie.Ratings[1].Value)
        //     meta = parseInt(movie.Metascore)
        //     imdb = parseInt(movie.imdbRating)
            
        // }        

        return `
        <article class="media">
            <figure class="media-left">
                <p class="image">
                    <img src="${movie.Poster}" />
                </p>
            </figure>
            <div class="media-content">
                <div class="content">
                    <h1>${movie.Title} (${movie.Year})</h1>
                    <h4>${movie.Genre}</h4>
                    <h4>${movie.Runtime}</h4>
                    <p>${movie.Plot}</p>
                </div>
            </div>
        </article>
        <article data-value=0 class="notification is-primary">
            <p class="title">${movie.Awards}</p>
            <p class="subtitle">Awards</p>
        </article>
        <article data-value=${boxoffice} class="notification is-primary">
            <p class="title">${movie.BoxOffice}</p>
            <p class="subtitle">Box Office</p>
        </article>
        <article data-value=${rotten} class="notification is-primary">
            <p class="title">${movie.Ratings[1].Value}</p>
            <p class="subtitle">Rotten Tomatoes</p>
        </article>
        <article data-value=${meta} class="notification is-primary">
            <p class="title">${movie.Metascore}</p>
            <p class="subtitle">Metacritic</p>
        </article>
        <article data-value=${imdb} class="notification is-primary">
            <p class="title">${movie.imdbRating}</p>
            <p class="subtitle">IMDB Rating</p>
        </article>
        `
    }

autoConfig = {
    renderOption(movie) {
        const imgSRC = movie.Poster ==='N/A' ? '' : movie.Poster;

        return `
        <img src="${imgSRC}" />
        ${movie.Title} (${movie.Year})
        `
    },
    async fetchData(movie){
        const res = await axios.get('http://www.omdbapi.com/',{
        params:{
            apikey: '75a29927',
            s: `${movie}`,
        }
    });

    return res.data.Search;
    },
    inputValue(movie){
        return movie.Title;
    }
}


createAutoComplete({
    ...autoConfig,
    root: document.querySelector('.left-auto'),
    onOptionSelect(movie){
        left=1;
        onMovieSelect(movie, document.querySelector('.left-summ'),'left');
    }
})
createAutoComplete({
    ...autoConfig,
    root: document.querySelector('.right-auto'),
    onOptionSelect(movie){
        right=1;
        onMovieSelect(movie, document.querySelector('.right-summ'));
    }
})


movieComparison = () => {
    let ll = document.querySelectorAll('.left-summ .notification')
    let rr = document.querySelectorAll('.right-summ .notification')
    // console.log(ll,rr)
    ll.forEach((left,idx) => {
        if(left.dataset.value === rr[idx].dataset.value)
        return;

        if(left.dataset.value > rr[idx].dataset.value){

        rr[idx].classList.remove('is-primary')
        rr[idx].classList.add('is-warning')
        }
        else{
        left.classList.remove('is-primary')
        left.classList.add('is-warning')
        }
    })   
}
