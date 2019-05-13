import React from 'react'

import App from './App'
import { HashRouter as Router ,Route,Switch} from 'react-router-dom'
import Admin from './admin';
import Common from './common';
import Login from './pages/login';
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
import OrderDetail from './pages/order/detail';

export default class ERouter extends React.Component{

    render(){
        return (
                <Router>
                    <App>
                    <Route path="/admin" render={()=>
                         <Admin>
                             <Switch>
                             <Route path="/admin/ui/buttons" component={Buttons} />
                             <Route path="/admin/ui/modals" component={Modals} />
                             <Route path="/admin/ui/loadings" component={Loadings} />
                             <Route path="/admin/ui/notification" component={Notifications} />
                             <Route path="/admin/ui/messages" component={Messages} />
                             <Route path="/admin/ui/tabs" component={Tabs} />
                             <Route path="/admin/ui/gallery" component={Gallery} />
                             <Route path="/admin/ui/carousel" component={Carousels} />
                             <Route path="/admin/form/login" component={FormLogin} />
                             <Route path="/admin/form/reg" component={Register} />
                             <Route path="/admin/table/basic" component={BasicTable} />
                             <Route path="/admin/table/high" component={HighTable} />
                             <Route path="/admin/city" component={City} />
                             <Route path="/admin/order" component={Order} />
                             <Route  component={NoMatch} />
                             </Switch>
                         </Admin>} />
                    <Route path="/common" render={()=>
                          <Common>
                                <Route path="/common/order/detail/:orderId" component={OrderDetail} />
                          </Common>
                    } />
                    <Route path="/login" component={Login} />
                    </App>
                </Router>
          
        );
    }
}