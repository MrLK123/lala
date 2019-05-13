import React from 'react';
import { Link } from 'react-router-dom';

export default ()=>{
    return (
           <div>
               <ul>
                   <li><Link to="/home"  >首页</Link></li>
                   <li> <Link to="/about">关于</Link></li>
                   <li> <Link to="/topics"> topics</Link></li>
               </ul>
           </div>
   
    )
}