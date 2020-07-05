import React from 'react';
import './Wallpaper.css';
import * as weatherIcons from './../icons.json';

export default class Wallpaper extends React.Component{
    // constructor(props){
        // super(props);
        // this.state=this.props.Data;
    // }
    render(){
        if(this.props.weather != null){
            let weather=this.props.weather;
            // console.log(weather);
            // let list =this.props.Data.list.map(function(el, index){
            // const icon = prefix + weatherIcons.default[el.weather[0].id].icon;
                const source= `url(images/${weatherIcons.default[weather].back}.jpg)`;
                // console.log(source); 
                return  <div
                className="wallpaper"
                style={{backgroundImage: source}}>
                    <div className="wallpaper__shadow"></div>
                </div>
            // });
            }else{return '';}
        }
    }