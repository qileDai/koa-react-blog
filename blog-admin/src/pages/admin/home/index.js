import React from 'react'
import { Card, Col, Row, message } from "antd";
import CountUp from "react-countup";
import "./index.less";
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articleToal: 0,
      userTotal: 0,
    };
  }
  componentDidMount() {
    this.getArticle();
    this.getuser();
    setTimeout(() => {
       message.destroy();
     }, 500);
  }
  async getArticle() {
    this.get(`${this.api.article.all}`).then((res) => {
      if (res.code == 200) {
        this.setState({ articleToal: res.data.length });
      }
    });
  }
  async getuser() {
    this.get(`${this.api.users.all}`).then((res) => {
      if (res.code == 200) {
        this.setState({ userTotal: res.data });
      }
    });
  }
  render() {
    return (
      <div className="main">
        <h3>数据统计</h3>
        <div className="groud_card">
          <Row gutter={16}>
            <Col span={6}>
              <Card title="文章总数" bordered={false}>
                <CountUp start={0} end={this.state.articleToal} duration="3" />
              </Card>
            </Col>
            <Col span={6}>
              <Card title="注册用户数" bordered={false}>
                <CountUp start={0} end={this.state.userTotal} duration="3" />
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
export default Home