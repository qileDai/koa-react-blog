import React, {Component} from 'react'
import { Timeline, Icon, Card,message } from 'antd'
import api from '../../../api'
import { Link } from 'react-router-dom'

class Archive extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: []
    }
  }
  componentDidMount () {
    this.getArticleList()
  }
  async getArticleList () {
     message.destroy();
     this.get(`${this.api.article.all}`).then((res) => {
       if (res.code == 200) {
         this.setState({ data: res.data });
       }
     });
  }
  render () {
    const itemMap = this.state.data.map((v, i) => {
      return <Timeline.Item key={i}>
        <Link to={`/web/detail/${v.id}`}>
          <span className='mr20'>{v.createdAt.slice(0, 10)}</span>
          <span>{v.title}</span>
        </Link>
      </Timeline.Item>
    })
    const date = new Date().getFullYear()
    return (
      <Card bordered={false}>
        <Timeline>
          <Timeline.Item
            dot={<Icon type="clock-circle-o" />}
            color="red"
            style={{ lineHeight: "20px" }}
          >
            <span style={{ fontSize: "20px" }}>{date}</span>
          </Timeline.Item>
          {itemMap}
        </Timeline>
      </Card>
    );
  }
}

export default Archive