//get document elements by value
const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#Message-One');
const messageTwo = document.querySelector('#Message-Two');



// fetch forcast 
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
      const searchLocation = search.value;
        messageOne.textContent = '';
         messageTwo.textContent= 'Loading.....';

    
    fetch('http://localhost:3000/weather?address=' + searchLocation).then((response) => {
    
    response.json().then((data)=> { 
        if(data.error) {
            messageOne.textContent = data.error;
            messageTwo.textContent = '';
            } else {
            messageOne.textContent = data.location;
            messageTwo.textContent = data.forecast;
            }   
        })
    })
})