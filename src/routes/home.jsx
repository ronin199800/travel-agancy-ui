import React, { Component } from 'react';
import appContext from '../context/app';
class Home extends Component {
    static contextType = appContext
    state = {  } 
    render() { 
        return (
            <h1 className={`theme-text-${this.context.mode}`}>صفحه اصلی</h1>     
        );
    }
}
 
export default Home;