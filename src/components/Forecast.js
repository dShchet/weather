import React from 'react';
import './Forecast.css';
import * as weatherIcons from './../icons.json';
import Swiper from 'swiper';

export default class Forecast extends React.Component{
    componentDidUpdate () {
      new Swiper('.swiper-container', {
        direction: 'horizontal',
        slidesPerView: 'auto',
      });
    }
    render(){
        if(this.props.Data != null){
          let units=this.props.units;
            // console.log(this.props.Data);
            let list =this.props.Data.list.map(function(el, index){
                const icon = `forecast__icon wi wi-${weatherIcons.default[el.weather[0].id].icon}`;
                return <div key={index}
                className="forecast__item swiper-slide">
                <div>{el.dt_txt.substr(10,6)}</div> 
                <p className={icon} ></p>
                <div className='forecast__temp'
                >{Math.round(el.main.temp)}°</div>
                <div>{el.weather[0].description}</div>
                <div>
                  <p className='today__wind wi wi-strong-wind'></p> {Math.round(el.wind.speed)} 
                  {(units === 'metric') ? ' km/h' : ' mph'}</div>
                </div>
           });
           return <div className='forecast swiper-container'>
                <div className="swiper-wrapper">{list}</div>
             </div>
        }else{return '';}
    }
}