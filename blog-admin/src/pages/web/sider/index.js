import React, { Component } from 'react'
import avatar from '../../../assets/img/user.jpg'
import {
  Card,
  Tag,
  Divider,
  message
} from 'antd'
import './index.less'
import { color } from '../../../utils'

class SiderCustom extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tags: [],
      articleData: []
    }
  }
  componentDidMount() {
    message.destroy();
    this.getTags()
    this.getArticleList()
  }
  async getArticleList () {
     const params = {
       pageNo: 1,
       pageSize: 5,
     };
     await this.post(`${this.api.article.list}`, params).then((res) => {
       if (res.code == 200) {
         this.setState({
           articleData: res.data,
         });
       }
     });
  }
  async getTags () {
     this.get(`${this.api.tags.tagAll}`).then((res) => {
         if (res.code == 200) {
           this.setState({ tags:res.data });
         }
       })
   }
   handleDetail (id) {
    this.props.history.push(`/web/detail/${id}`)
  }
  render() {
    const list = this.state.articleData.map(v => (
      <li key={v.id} onClick={ this.handleDetail.bind(this, v.id) }>
        {v.title}
      </li>
    ))
    return (
      <div className="sider-container">
        <div className='web_silder'>
          <div className="admin-info">
            <header>
              <img
                src={avatar}
                alt="avatar"
                title="我叫山水有轻音，用代码改变世界"
              />
            </header>
            <p className="admin-name">山水有轻音</p>
            <p className="admin-desc">
              爱骑行，不爱跳舞
              <br />
              前端摸鱼人员，不断学习的程序猿
            </p>
          </div>
          <div className="recent-article">
            <Card bordered={false}>
              <Divider orientation="left">最近文章</Divider>
              <ul className="recent-list">{list}</ul>
            </Card>
          </div>
          <div className="tags-wrapper">
            <Card bordered={false}>
              <Divider orientation="left">标签</Divider>
              <div className="tags-content">
                {this.state.tags.map((v) => (
                  <Tag
                    key={v.id}
                    color={color[Math.floor(Math.random() * color.length)]}
                  >
                    {v.name}
                  </Tag>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

export default SiderCustom
