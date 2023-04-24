

class Forecast {
    constructor(){
        this.key = "BgQHiAT8RAYjCFugLt1KY3g8rlGFgKgx";
        this.weatherURL = 'http://dataservice.accuweather.com/currentconditions/v1/';
        this.cityURL = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    }
    //Methods 
    async UpdateCity(city){
        const cityDetails = await this.getCity(city);
    const Weather = await this.getWeather(cityDetails.Key);

    return {
        //Object shorthand notation where if the property and field has same name then only writing it once does the same task as
        //writing citydetails: citydetails
        cityDetails,
        Weather
    }
    }

    async getCity(city){

    //Query that has to be filled to get the data
    const query = `?apikey=${this.key}&q=${city}`;

    //concatinating and fetching both base and query
    const response = await fetch(this.cityURL + query);

    //since the response is in json so we parse it and save it as data
    const data = await response.json();

    //the point of the array is to select the one with the closest resembelence of the search product
    return data[0];
    }

    async getWeather(id){
    //Query that has to be filled to get the data
    const query = `${id}?apikey=${this.key}`;

    //concatinating and fetching both base and query
    const response = await fetch(this.weatherURL + query);

    //since the response is in json so we parse it and save it as data
    const data = await response.json();

    //the point of the array is to select the one with the closest resembelence of the search product
    return data[0];
    }
}



