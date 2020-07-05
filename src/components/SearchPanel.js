import React from 'react';
import './SearchPanel.css';

export default class SearchPanel extends React.Component{
    constructor(props){
        super(props);
        this.state={city:''};
    }
    render(){
        return <div className="search">
            <div className="search__wrap">
            <input 
                onChange={(e)=>{this.setState({city: e.target.value})}}
            />
            <button 
                onClick={()=>{this.props.Search(this.state.city)}} 
            >Получить</button>
            </div>
        </div>
        }
    }