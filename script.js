const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')
const loader = document.getElementById('loader');
// Get quote from API
let apiQuotes = [];

// Show Loading
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide loading
function complete(){
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// Show new quote
function newQuote(){
    loading()
// Pick a random Quote from apiQuotes array
const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
console.log(quote)
console.log(quote.text)
console.log(quote.author)

if(quote.text.length > 100) {
    quoteText.classList.add('longe-quote');
}
else{
    quoteText.classList.remove('longe-quote');
}
quoteText.textContent = quote.text;
complete()

if(!quote.author) {
    authorText.textContent = 'Unknown';
 }
else { 
    // set quote hide loader
    authorText.textContent = quote.author;
    
 }

}

async function getQuotes(){
    loading()
    const apiUrl = "https://type.fit/api/quotes";
    
    try{
         const response = await fetch(apiUrl);
         apiQuotes = await response.json()
         newQuote()
    } catch(error){
        // Catch the error 
    }
}

// Tweet quote
function tweetQuote(){
    tweetUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(tweetUrl, '_blank');
}

// Event Listners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click' , tweetQuote);

// Onload

getQuotes()
