import React from 'react';
import { Link } from 'react-router-dom';
export default (props)=>{
    return (
        <div>
            this i是首页
            <br/>
            <Link to="/home/test">动态路由1</Link>
            <br/>
            <Link to="/home/456">动态路由2</Link>
            <hr/>
            {props.children}
        </div> 
    )
}