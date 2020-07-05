import React from 'react';
import './Today.css';
import * as weatherIcons from './../icons.json';

export default class Today extends React.Component{
    // constructor(props){
        // super(props);
        // this.state=this.props.Data;
    // }
    Utc_to_str(date){
        let hours   =new Date(date*1000).getHours();
        let minutes ='0'+new Date(date*1000).getMinutes();
        // let seconds ='0'+new Date(date*1000).getSeconds();
        return hours + ':' + minutes.substr(-2) ;
    }
    render(){
        if(this.props.Data != null){
            let Data=this.props.Data;
            let units=this.props.units;
            const weatherIcon = `today__icon wi wi-${weatherIcons.default[Data.weather[0].id].icon}`;
            console.log(Data)
            return  <div className="today">
                <div className="today__city">{Data.name}</div> 
                <div className="today__weather">                   
                    <div className={weatherIcon}></div>   
                    <div className="today__temp">{Math.round(Data.main.temp)}°</div>
                    <div className="today__units">
                        <button  
                            className={`today__unitsBtn ${(units === 'metric') || 'today__unitsBtn_off' }`}
                            onClick={()=>{this.props.setUnits('metric')}} >C
                        </button>
                        <button  
                            className={`today__unitsBtn ${(units !== 'metric') || 'today__unitsBtn_off' }`}
                            onClick={()=>{this.props.setUnits('imperial')}} >F
                        </button>
                    </div>             
                </div>     
                <div className="today__desc">{Data.weather[0].description}</div>
                <div className="today__details">   
                    <div>Humidity: {Data.main.humidity}%</div>   
                    <div><p className='today__wind wi wi-strong-wind'></p>  {Math.round(Data.wind.speed)} 
                        {(units === 'metric') ? ' km/h' : ' mph'}
                    </div> 
                    <div>Pressure: {Data.main.pressure} mB</div> 
                </div>            
                <div className="today__details">  
                    <div>Visibility: {Data.visibility/1000} км </div> 
                    <div>Sunrise: {this.Utc_to_str(Data.sys.sunrise)} </div> 
                    <div>Sunset: {this.Utc_to_str(Data.sys.sunset)}</div>   
                </div>
            </div>
        }else{return '';}
    }
}