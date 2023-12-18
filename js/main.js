const TEN_MILLION = 10000000
const ONE_HUNDRED_MILLION = 100000000
const BLUE_LIGHT = "rgb( 187, 210, 245 )"
const BLUE_MEDIUM = "rgb(118,157,227)" 
const BLUE_STRONG = "rgb(31,101,228)"


class CountryCollection {

    constructor(items){
        this.items = items;
    }

    first(){
        return new CountryPath(this.items[0])
    }

    find(index){
        return new CountryPath(this.items[index])
    }

    last(){

    }

    static get(){
        return new CountryCollection(document.querySelectorAll("path"));
    }

    for(funcion){
        this.items.forEach(item => {
            funcion( new CountryPath(item))
        })
    }
}


class CountryPath{

    constructor(element){
        this.element = element;
        this.setToolTip(this.getName()) //Capitalize
    }

    getName(){
        return this.element.getAttribute("name")
    }

    getID(){
        return this.element.getAttribute("id");
    }

    fill(color){
        this.element.setAttribute("fill", color);
    }

    setToolTip(string){
        this.element.setAttribute("title", string)
    }

    setPopulation(population){
        this.element.setAttribute("population", population)
    }

    static findById(name){
        return new CountryPath( document.getElementById(name))
    }

}


class Response{

    constructor(object){
        this.object = object
    }

    population(){
        return this.object.population
    }

    region(){
        return this.object.region
    }

    subregion(){
        return this.object.subregion
    }

    area(){
        return this.object.area
    }

}


class CountryApi {
    
    static async findByName(name) {
        const response = await fetch(`https://restcountries.com/v3.1/alpha/${name}`)
        if(response.status === 404){
            console.log(`El nombre del país ${name}    No está escrito bien`)
        }
        return new Response( (await response.json())[0])
    }

}


CountryCollection.get().for(async countryPath => {

    const response = await CountryApi.findByName( countryPath.getID() )

    if(response.population() < TEN_MILLION){
        countryPath.fill(BLUE_LIGHT)
        return
    }

    if(response.population() < ONE_HUNDRED_MILLION){
        countryPath.fill(BLUE_MEDIUM)
        return
    }

    countryPath.fill(BLUE_STRONG)

})