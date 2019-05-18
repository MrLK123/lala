import React from 'react'

import App from './App'
import { HashRouter as Router ,Route,Switch,Redirect} from 'react-router-dom'
import Admin from './admin';
import Common from './common';
import Login from './pages/login';
import Home from './pages/home';
import NoMatch from './pages/nomatch';
import Buttons from './pages/ui/buttons'
import Modals from './pages/ui/modals'
import Loadings from './pages/ui/loadings';
import Notifications from './pages/ui/notifications';
import Messages from './pages/ui/messages';
import Tabs from './pages/ui/tabs';
import Gallery from './pages/ui/gallery';
import Carousels from './pages/ui/carousel';
import FormLogin from './pages/form/formlogin';
import Register from './pages/form/register';
import BasicTable from './pages/table/basicTable';
import HighTable from './pages/table/hightable';
import City from './pages/city';
import Order from './pages/order';
import User from './pages/user';
import OrderDetail from './pages/order/detail';
import BikeMap from './pages/bikeMap';
import Bar from './pages/echarts/bar';
import Pie from './pages/echarts/pie';
import Line from './pages/echarts/line';
import RichText from './pages/rich';
import PermissUser from './pages/permission';

export default class ERouter extends React.Component{

    render(){
        return (
                <Router>
                    <App>
                    <Switch>
                    <Route path="/common" render={()=>
                          <Common>
                                <Route path="/common/order/detail/:orderId" component={OrderDetail} />
                          </Common>
                    } />
                    <Route path="/" render={()=>
                         <Admin>
                             <Switch>
                            <Route path="/home" component={Home} />
                             <Route path="/ui/buttons" component={Buttons} />
                             <Route path="/ui/modals" component={Modals} />
                             <Route path="/ui/loadings" component={Loadings} />
                             <Route path="/ui/notification" component={Notifications} />
                             <Route path="/ui/messages" component={Messages} />
                             <Route path="/ui/tabs" component={Tabs} />
                             <Route path="/ui/gallery" component={Gallery} />
                             <Route path="/ui/carousel" component={Carousels} />
                             <Route path="/form/login" component={FormLogin} />
                             <Route path="/form/reg" component={Register} />
                             <Route path="/table/basic" component={BasicTable} />
                             <Route path="/table/high" component={HighTable} />
                             <Route path="/city" component={City} />
                             <Route path="/order" component={Order} />
                             <Route path="/user" component={User} />
                             <Route path="/bikeMap" component={BikeMap} />
                             <Route path="/charts/bar" component={Bar} />
                             <Route path="/charts/pie" component={Pie} />
                             <Route path="/charts/line" component={Line} />
                             <Route path="/rich" component={RichText} />
                             <Route path="/permission" component={PermissUser} />
                             <Redirect path="/" to="/home"/>
                             <Route  component={NoMatch} />
                             </Switch>
                         </Admin>} />
                    
                    
                    </Switch>
                    </App>
                </Router>
          
        );
    }
}