import React from 'react';
import { Link } from 'react-router-dom';
export default (props)=>{
    return (
        <div>
            <ul>
                <li><Link to="/home">home</Link></li>
                <li><Link to="/about">about</Link></li>
                <li><Link to="/topics/tom">topics</Link></li>
                <li><Link to="/sfsdfsdf">错误也买你</Link></li>
                </ul>
                <hr/>
                {props.children}
            
        </div>
    )
}