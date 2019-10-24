/* eslint no-restricted-globals: 'off' */

// Iteration 1: All rates average - Get the average of all rates with 2 decimals 
console.log(movies)
movies = [...movies]

function ratesAverage(movies) {

    let total = movies.reduce((sum, eachMovie) => {
        // console.log(sum, eachMovie)
        sum += Number(eachMovie.rate) //convert string to number 
        return sum;
    },0)
    return Number(( total / movies.length ).toFixed(2)) || 0 //return zero if the previous stuff is undefined, '', NaN, 0, false
}

// console.log('ratesAverage',
//     ratesAverage(movies)
// )


 
// Iteration 2: Drama movies - Get the average of Drama Movies

function dramaMoviesRate(movies){

    let dramaticMovies = movies.filter(eachMovie => {
        return eachMovie.genre.includes('Drama')
    })
    return ratesAverage(dramaticMovies)
}

// console.log('dramaMoviesRate',
//     dramaMoviesRate(movies)
// )


// Iteration 3: Ordering by duration - Order by time duration, ascending (in growing order)

function orderByYear(movies){
    let sortedArray = movies.sort((a,b)=>{
        if(a.year > b.year){ return 1 } 
        if(a.year < b.year){ return -1 }
        //the years are the same 

        if(a.title > b.title){ return 1}
        if(a.title < b.title){ return -1}
        // the yars and the titles are the same 

        return 0
    })
    return sortedArray;
}
// console.log('orderByYear',
//     orderByYear(movies)
// )



// Iteration 4: Steven Spielberg. The best? - How many movies did STEVEN SPIELBERG direct
function howManyMovies(movies){
    let spielbergMovies = movies.filter(eachMovie => {
        return eachMovie.director === 'Steven Spielberg' && eachMovie.genre.includes('Drama')
    })
    return spielbergMovies.length
}

// console.log('howManyMovies',
//     howManyMovies(movies)
// )

// Iteration 5: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(movies) {

    let sortedArray = movies.sort((a,b)=>{
        if(a.title > b.title){ return 1}
        if(a.title < b.title){ return -1}
        // the yars and the titles are the same 

        return 0
    })
    return sortedArray.slice(0,20).map(eachMovie=>eachMovie.title);
}


// console.log('orderAlphabetically',
//     orderAlphabetically(movies)
// )

// Iteration 6: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes(movies){
    let copyOfMovies = [...movies]
    let mappedMovies = movies.map(eachMovie => {

        eachMovie.duration =  convertDuration(String(eachMovie.duration))

        return { ...eachMovie }
    })
    return mappedMovies
}

console.log('turnHoursToMinutes',
    turnHoursToMinutes(movies)
)


function convertDuration(strToConvert) {
    console.log(typeof strToConvert)

    let sepArr = strToConvert.split(' ');
    let hour = 0;
    let min = 0;
    if (sepArr.length > 1) {
        hour = sepArr[0].slice(0, sepArr[0].indexOf('h'));
        min = sepArr[1].slice(0, sepArr[1].indexOf('m'));
    } else if (sepArr.length === 1) {
        if (sepArr[0].search('m') !== -1) {
            hour = 0;
            min = sepArr[0].slice(0, sepArr[0].indexOf('m'));
        } else {
            hour = sepArr[0].slice(0, sepArr[0].indexOf('h'));
            min = 0;
        }
    } else {
        hour = 0;
        min = 0;
    }
    let convertedDuration = Number(hour) * 60 + Number(min);
    return convertedDuration;
 }
// BONUS Iteration: Best yearly rate average - Best yearly rate average





function bestYearAvg(movies){
    let bestMoviesOfThatYear = []
    let orderedMovies = orderByYear(movies)
    let currentYear = 0; 
    let highestAverage = 0;
    let highestYearAverage = 0;  
    orderedMovies.forEach(movie=> {
        if(movie.year != currentYear){ //we have changed years
            let average = ratesAverage(bestMoviesOfThatYear)
            if(average > highestAverage){
                highestAverage = average;
                highestYearAverage = currentYear;
            }
            currentYear = movie.year
        } else { //where in the same year so we keep collecting movies
            bestMoviesOfThatYear.push(movie)
        }
    })
    console.log(highestAverage, highestYearAverage)
    return `The best year was ${highestYearAverage} with an average rate of ${highestAverage}`
}
console.log('bestYearAvg',
    bestYearAvg(movies)
)
