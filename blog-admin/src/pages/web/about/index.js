import React, { Component } from 'react'
import './index.less'

import { Divider, Icon, Card } from 'antd'


class About extends Component {
  state = { commentList: [] }


  render() {
    return (
      <Card bordered={false}>
        <div className="content-inner-wrapper about">
          <Divider orientation="left">Blog</Divider>
          <p>
            一直基于 vue 写业务，所以博客选用了 react + react-router + mbox
            这套技术栈，借此熟悉下 react 开发模式
          </p>
          <p>纯函数式开发，很甜</p>
          <p>前端：react + antd + react-router + es6 + webpack + axios</p>
          <p>服务端：koa2 + mysql + sequelize</p>
          <p className="code">源码戳这里</p>
          <p>
            <a
              target="_blank"
              className="link"
              rel="noreferrer noopener"
              href="https://gitee.com/xinxianbaiguoshu/koa-react/tree/master/blog-admin"
            >
              web端
            </a>
          </p>
          <p>
            <a
              target="_blank"
              className="link"
              rel="noreferrer noopener"
              href="https://gitee.com/xinxianbaiguoshu/koa-react/tree/master/koa_blod"
            >
              node服务端
            </a>
          </p>
          <Divider orientation="left">Me</Divider>
          <ul className="about-list">
            <li>姓名：山水有轻音</li>
            <li>
              <Icon type="github" style={{ fontSize: "16px" }} />：
              <a
                target="_blank"
                className="link"
                rel="noreferrer noopener"
                href="https://gitee.com/xinxianbaiguoshu"
              >
                gitee
              </a>
            </li>
            <li>
              联系方式：
              <span>13290785815</span>
              <Divider type="vertical" />
              <i className="iconfont icon-email" />
              <a href="mailto:761406501@qq.com">761406501@qq.com</a>
            </li>
            <li>坐标：郑州市</li>
            <li>
              学历专业：本科
              <Divider type="vertical" />
              电子
            </li>
            <li>
              skill：
              <ul>
                <li>前端：Vue、React、ES6/7/8、Echat、Axios、Electron</li>
                <li>服务端：Node、Koa2</li>
                <li>数据库：Mysql</li>
                <li>其他：webpack、git、nginx</li>
              </ul>
            </li>
          </ul>
        </div>
      </Card>
    );
  }
}

export default About