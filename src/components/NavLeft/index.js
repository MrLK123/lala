import React from 'react';
import { Menu } from 'antd';
import menuConfig from './../../config/menuConfig';
import {NavLink} from 'react-router-dom'
import { switchMenu } from './../../redux/action';
import { connect } from 'react-redux';
import './index.less';
const SubMenu = Menu.SubMenu;
class NavLeft extends React.Component {
    state={
        currentKey:""
    }
    handleClick=({item,key})=>{
        
        this.props.switchMenu(item.props.title);
        this.setState({
            currentKey:key
        })
    }
    componentWillMount(){
        const menuTreeNode=this.renderMenu(menuConfig);
        const currentKey=window.location.hash.replace(/#|\?.*/g,"");
       this.setState({
           menuTreeNode,
           currentKey
       })
    }
    renderMenu=(data)=>{
        return (data.map(item=>{
            if(item.children){
                return <SubMenu key={item.key} title={item.title}>{this.renderMenu(item.children)}</SubMenu>;
            }
            return <Menu.Item key={item.key} title={item.title}>
             <NavLink to={item.key}>{item.title}</NavLink>
            </Menu.Item>;
            
        }))
    }
    render() {
       
        return (
            <div>
                <div className="logo">
                    <img src='/assets/logo-ant.svg' alt="" />
                    <h1>kk like</h1>
                </div>
                <Menu
                onClick={this.handleClick}
                 selectedKeys={[this.state.currentKey]}
                theme="dark">
                   {this.state.menuTreeNode}
                </Menu>
            </div>
        )
    }
}
export default connect(null,{switchMenu})(NavLeft);