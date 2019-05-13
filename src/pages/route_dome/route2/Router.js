import React from 'react';
import {HashRouter as Router ,Route,Switch } from 'react-router-dom';
import Home from './Home';
import Info from './Info';
import Main from './../route1/Main';
import About from './../route1/About';
import Topics from './../route1/Topics';
import NoMatch from './NoMatch';
export default ()=>{
    return(
        <Router>
            <Home>
                <Switch>
                    <Route path="/home" render={()=>
                        <Main><Route exact path="/home/:value" component={Info}/></Main>
                    }/>
                    <Route path="/about" component={About}/>
                    <Route path="/topics/:name" component={Topics}/>
                    <Route component={NoMatch}/>
                </Switch>
            </Home>
            
        </Router>
    )
}