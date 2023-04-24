const CityForm = document.querySelector('form');

const card = document.querySelector('.card');
const details = document.querySelector('.details');

const time = document.querySelector('.time');
const icons = document.querySelector('.icon img');

const forecast = new Forecast();

//function for updating UI

const UpdateUI = (data)=>{

    const cityDetails = data.cityDetails;
    const Weather = data.Weather;

    details.innerHTML =`
    <h5 class="my-3">${cityDetails.EnglishName}</h5>
            <div class="my-3">${Weather.WeatherText}</div>
            <div class="display-4 my-4">
              <span>${Weather.Temperature.Metric.Value}</span>
              <span>&deg;C</span>
    `;
    // console.log(data);

    // Adding images and icons

    const IconSrc = `images/icons/${Weather.WeatherIcon}.svg`;

    icons.setAttribute('src', IconSrc);

    let TimeSrc = null;
    if(Weather.IsDayTime){
         TimeSrc= 'images/day.svg';
    }else{
        TimeSrc = 'images/night.svg';
    }

    time.setAttribute('src', TimeSrc);


    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }
}


CityForm.addEventListener('submit', e=>{
    e.preventDefault();
    
    const city = CityForm.city.value.trim();
    CityForm.reset();


    forecast.UpdateCity(city).then(data=>{
        return UpdateUI(data);

    }).catch(err=>{
        console.log(err);
    });

    
    //storing in local storage

    localStorage.setItem('city', city);

})

//checking if there is a city in the local storage

if(localStorage.getItem('city')){
    forecast.UpdateCity(localStorage.getItem('city'))
    .then(data=>{
        UpdateUI(data)
    }).catch(err=>{
        console.log(err);
    })
}
