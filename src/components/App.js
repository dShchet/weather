import React, { Fragment } from 'react';
import './App.css';
import Wallpaper from './Wallpaper';
import SearchPanel from './SearchPanel';
import Today from './Today';
import Forecast from './Forecast';
export default class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      // city: "Podolsk",
      city: "Moscow",
      currentWeather: null,
      REACT_APP_API_URL:'https://api.openweathermap.org/data/2.5',
      REACT_APP_API_KEY:'63ce596fa93b679e9353a67f97bf99f1',
      units: 'metric',
      cityId: '',
      lang:'en',
      error: "",
      forecast: null,
      weather: null
    };
  }
  componentDidMount() {
    // console.log('componentDidMount')
    // this.setState({ error: "" });
    this.getWeather(
      this.state.city, 
      this.state.units,
      this.state.lang
    );
  }
  handleResponse (response) {
    if ((response.ok)||(response.statusText==='Not Found')) {
      return response.json();
    } else {
      throw new Error("Error: Location " + response.statusText);
    }
  }
  getWeather =(city, units, lang)=> {
    fetch(
      `${this.state.REACT_APP_API_URL}/weather/?q=${city}&units=${units}&lang=${lang}&APPID=${this.state.REACT_APP_API_KEY}`
    )
      .then(res => this.handleResponse(res))
      .then(result => {
        if(result.cod == '404'){
          this.setState({error: result.message})
          return result;
        } else
        if (Object.entries(result).length) {
          this.setState({
            weather:result,
            currentWeather: result.weather[0].id,
            cityId: result.id
          });
          this.getForecast (
            result.id,
            this.state.units,
            this.state.lang)
          return result;
        }
      })
      .catch(error => {
        console.error(
          `Error fetching current weather for ${this.state.city}: `,
          error
        );
        this.setState({ error: error.message });
      });
  }
  getForecast (cityId, units, lang) {
    fetch(
      `${this.state.REACT_APP_API_URL}/forecast/?id=${cityId}&units=${units}&lang=${lang}&APPID=${this.state.REACT_APP_API_KEY}`
    )
      .then(res => this.handleResponse(res))
      .then(result => {
        if (Object.entries(result).length) {
          this.setState({forecast: result});
        }
      })
      .catch(error => {
        console.error(
          `Error fetching forecast for ${this.state.city}: `,
          error
        );
        return [];
      });
  }
  changeCity =(city)=> {
    this.setState({
      error:'',
      city: city});
    this.getWeather(
      city, 
      this.state.units,
      this.state.lang
    );
  }
  setUnits =(units)=>{
    this.setState({units: units});
    this.getWeather(
      this.state.city, 
      units,
      this.state.lang
    );
  }
  render(){
    let mainBlock ;
    if (this.state.error==='city not found'){
      mainBlock = <p
        style={{textAlign: 'center',
          color: '#fff',
          fontSize: '25px'}}
      >Not found city: {this.state.city}</p>
    }else{
      mainBlock = <Fragment>
        <Today 
          Data={this.state.weather}
          units={this.state.units}
          setUnits={this.setUnits}
        />
        <Forecast 
          Data={this.state.forecast} 
          units={this.state.units}
        />
        </Fragment>
    }
    return (
      <div className="Weather">
        <Wallpaper weather={this.state.currentWeather}/>
        <SearchPanel Search={this.changeCity} />
        <div className="Weather__content">
        {mainBlock}
        </div>
      </div>
    );
  }
}

