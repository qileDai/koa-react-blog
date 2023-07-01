import React, { Component } from 'react'
import api from '../../../api'
import { List, message } from "antd";
import './index.less'

class Collect extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      pageNo: 1,
      pageSize: 10,
      total: 0
    }
  }
  componentDidMount () {
    this.getList()
  }
  async getList () {
    // const params = {
    //   title: '',
    //   pageNo: this.state.pageNo,
    //   pageSize: this.state.pageSize
    // }
    // const {data, total } = await api.get('star/list', params)
    // this.setState({
    //   data,
    //   total
    //   })
    message.destroy();
     const params = {
       title: '',
       pageNo: this.state.pageNo,
       pageSize: this.state.pageSize,
     };
     this.post(`${this.api.star.list}`, params)
       .then((res) => {
         if (res.code == 200) {
           this.setState({
             data: res.data,
             total: res.total
           });
         } else {
           message.warning(res.message);
         }
       })
       .catch((res) => {
         message.warning(res.message);
       });
  }
  render() {
    const pagination = {
      pageSize: 10,
      size: "small",
      current: this.state.pageNo,
      total: this.state.total,
      showTotal(total) {
        return `共 ${total} 条 `;
      },
      onChange:async (page) => {
        await this.setState({ pageNo: page });
        this.getList()
      }
    };
    return (
      <div>
        <List
          className="star-list"
          header={<div className="star-header">文章收藏</div>}
          itemLayout="vertical"
          pagination={this.state.data.length ? pagination : null}
          dataSource={this.state.data}
          renderItem={item => (
            <List.Item key={item.id} extra={item.date} >
              <List.Item.Meta description={[<a key={item.url} href={item.url} target='_blank' rel="noopener noreferrer">{item.title}</a>]}/>
            </List.Item>
          )}
        />
      </div>
    )
  }
}

export default Collect