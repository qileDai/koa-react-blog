// import api from './api'
import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import { Layout, Menu, Icon, Avatar, Dropdown } from 'antd'
import { UserOutlined, SettingOutlined, PoweroffOutlined } from "@ant-design/icons";
import routes from '../../../Router/admin'
import './index.less'
import store from "../../../store/index";
const authority = store.getState().userInfo.authority;
const { Header, Sider, Content } = Layout
const { SubMenu } = Menu;
class App extends Component {
  constructor(props) {
    // es6继承必须用super调用父类的constructor
    super(props);
    this.state = {
      collapsed: false,
      data: "hello",
      person: "",
      userName: sessionStorage.getItem("blogUser") || "",
      menuItem: [
        { label: "个人中心", index: 1 },
        { label: "用户设置", index: 2 },
        { label: "退出登录", index: 3 },
      ],
      active:0
    };
  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  componentDidMount() {
    document.title = "admin";
    this.setState({
      active: sessionStorage.getItem("active"),
    });
  }
  handleClickMenuItem(item) {
    sessionStorage.setItem("menuItmeKey", String(item.key));
  }
  handleClickDrop(item,index) {
    if (item.index == 1) {
      this.props.history.push("/admin/person/setting");
      if (authority=='1'){
        this.state.active = 6;
        sessionStorage.setItem("active", 6);
      }else{
        this.state.active = 5;
        sessionStorage.setItem("active", 5);
      } 
    } else if (item.index == 2) {
      this.props.history.push("/admin/person/user");
      this.state.active = 5;
      sessionStorage.setItem("active", 5);
    } else {
      this.props.history.push("/login");
    }
  }
  handleSwitch(index){
    this.state.active = index
    sessionStorage.setItem("active", index);
  }
  renderMenu = ({ title, path, icon },index) => {
    return (
      <Menu.Item
        key={path}
        onClick={this.handleSwitch.bind(this, index)}
        className={index == this.state.active ? "altem_active" : ""}
      >
        <Link to={path}>
          {icon && <Icon type={icon} />}
          <span>{title}</span>
        </Link>
      </Menu.Item>
    );
  };
  renderSubMnenu = ({ title, path, children, icon }, index) => {
    return (
      <SubMenu
        key={path}
        title={
          <span>
            <Icon
              type={icon}
              className="adddtes"
            />
            <span>{title}</span>
          </span>
        }
      >
        {children &&
          children.map((item) => {
            return item.children && item.children.length > 0
              ? this.renderSubMnenu(item)
              : this.renderMenu(item);
          })}
      </SubMenu>
    );
  };

  menuItem = () => {
    return routes
      .filter((item) => item.menu)
      .map((item, index) => {
        return item.children && item.children.length > 0
          ? this.renderSubMnenu(item, index)
          : this.renderMenu(item, index);
        /*  return (
         <Menu.Item key={ index } onClick={ item => this.handleClickMenuItem(item) }>
          <Link to={item.path}>
            <Icon type={ item.icon } />
            <span>{ item.title }</span>
          </Link>
        </Menu.Item>
      ); */
      });
  };
  render() {
    const logoClass = this.state.collapsed ? "logoMin" : "logoMax";
    const { menuItem } = this.state;
    const menu = (
      <Menu>
        {menuItem.map((item, index) => {
          if (index == 1 && authority==1){
              return (
                <Menu.Item
                  key={index}
                  onClick={this.handleClickDrop.bind(this, item,index)}
                >
                  {index == 0 ? (
                    <UserOutlined />
                  ) : index == 1 ? (
                    <SettingOutlined />
                  ) : (
                    <PoweroffOutlined />
                  )}
                  <span>{item.label}</span>
                </Menu.Item>
              );
          }else if(index!=1){
             return (
               <Menu.Item
                 key={index}
                 onClick={this.handleClickDrop.bind(this, item, index)}
               >
                 {index == 0 ? (
                   <UserOutlined />
                 ) : index == 1 ? (
                   <SettingOutlined />
                 ) : (
                   <PoweroffOutlined />
                 )}
                 <span>{item.label}</span>
               </Menu.Item>
             );
          }
          
        })}
      </Menu>
    );
    return (
      <div>
        <Layout style={{ minHeight: "100vh" }}>
          <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
            <div className={logoClass} />
            <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={[
                sessionStorage.getItem("menuItmeKey") || "0",
              ]}
            >
              {this.menuItem()}
            </Menu>
          </Sider>
          <Layout>
            <Header style={{ background: "#fff", padding: 0 }}>
              <Icon
                className="trigger"
                type={this.state.collapsed ? "menu-unfold" : "menu-fold"}
                onClick={this.toggle}
              />
              <span className="user">
                <Avatar style={{ backgroundColor: "#f56a00" }}>
                  {this.state.userName}
                </Avatar>
                <Dropdown overlay={menu} className="ml10">
                  <Icon type="down" />
                </Dropdown>
              </span>
            </Header>
            <div className="wrap-content">
              <Content className="content">
                {routes.map((route, i) => (
                  <Route
                    key={i}
                    excat={route.excat}
                    path={route.path}
                    component={route.component}
                  />
                ))}
              </Content>
            </div>
            {/* <Footer style={{ textAlign: 'center' }}>
                Created by Gong
              </Footer> */}
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default App;
