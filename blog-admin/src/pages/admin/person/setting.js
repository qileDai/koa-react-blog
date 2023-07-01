import React from "react";
import { Tabs, Form, Input, Upload, Button, message , Avatar } from "antd";
import "./index.less";
import store from "../../../store";
import { updateinfo } from "../../../store/actions/actionCreators";
const { TabPane } = Tabs;
const layout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 20 },
};
class setting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabPosition: "left",
      uplod: `${this.api.login.login}`,
      forms: {
        user_id: "",
        nick_name: "",
        user_img:'',
        path: "",
        email: "",
        motto: "",
        intersting: "",
        introduction: "",
      },
      username: "",
    };
  }
  componentDidMount() {
    this.state.forms.user_id = store.getState().userInfo.user_id;
    this.state.username = store.getState().userInfo.username;
    this.getuserDetail();
  }
  getuserDetail(){
       let userinfo = store.getState().userInfo;
        this.setState({
          forms: {
            nick_name: userinfo.nick_name,
            user_img: userinfo.user_img,
            path: userinfo.path,
            email: userinfo.email,
            motto: userinfo.motto,
            intersting: userinfo.intersting,
            introduction: userinfo.introduction,
            user_id: userinfo.user_id,
          },
        });
  }
  handdleChange = (e, name) => { //设置值
    let data = this.state.forms;
    data[name] = e.target.value;
    this.setState({
      forms: data,
    });
  };
  handleSubmit() {
    this.post(`${this.api.users.edit}`, this.state.forms)
      .then((res) => {
        if (res.code == 200) {
          message.success(res.message);
          const action = updateinfo(res.data);
          store.dispatch(action);
        } else {
          message.warning(res.message);
        }
      })
      .catch((res) => {
        message.warning(res.message);
      });
  }
  beforeUpload = (e) => {
    let userinfo = store.getState().userInfo;
    const size = e.size / 1024 / 1024;
    if (
      e.type != "image/png" &&
      e.type != "image/jpeg" &&
      e.type != "image/jpg"
    ) {
      message.warning("格式不对");
      return false;
    } else {
      const formData = new FormData();
      formData.append("file", e);
      if (size > 20) {
        message.warning("图片上传超过20M,请重新上传");
      } else {
        this.post(`${this.api.users.uplod}`, formData)
          .then((res) => {
            if (res.code == 200) {
              message.success(res.message);
              //this.state.forms.user_img = res.data.url;
              this.setState({
                forms: {
                  nick_name: userinfo.nick_name,
                  user_img: res.data.url,
                  path: res.data.path,
                  email: userinfo.email,
                  motto: userinfo.motto,
                  intersting: userinfo.intersting,
                  introduction: userinfo.introduction,
                  user_id: userinfo.user_id,
                }
              });
              this.handleSubmit();
            } else {
              message.warning(res.message);
            }
          })
          .catch((res) => {
            message.warning(res.message);
          });
      }
    }
  };
  render() {
    const { tabPosition } = this.state;
    return (
      <div>
        <Tabs
          defaultActiveKey="0"
          tabPosition={tabPosition}
          style={{ height: 500 }}
        >
          <TabPane tab="个人设置" key="1">
            <div className="baseView">
              <Form
                {...layout}
                ref="addForm"
                name="nest-messages"
                className="form"
              >
                <Form.Item
                  name="nick_name"
                  label="用户昵称"
                  rules={[{ required: true, message: "请输入用户昵称!" }]}
                >
                  <Input
                    placeholder="请输入个人昵称"
                    value={this.state.forms.nick_name}
                    onChange={(e) => this.handdleChange(e, "nick_name")}
                    allowClear={true}
                  />
                </Form.Item>
                <Form.Item
                  name="email"
                  label="邮箱"
                  rules={[
                    {
                      type: "email",
                      required: true,
                      message: "请输入用户邮箱!",
                    },
                  ]}
                >
                  <Input
                    placeholder="请输入个人邮箱"
                    value={this.state.forms.email}
                    onChange={(e) => this.handdleChange(e, "email")}
                    allowClear={true}
                  />
                </Form.Item>
                <Form.Item
                  name="motto"
                  label="座右铭"
                  rules={[{ required: true, message: "请输入个人名言!" }]}
                >
                  <Input
                    placeholder="请输入个人名言"
                    value={this.state.forms.motto}
                    onChange={(e) => this.handdleChange(e, "motto")}
                    allowClear={true}
                  />
                </Form.Item>
                <Form.Item
                  name="intersting"
                  label="兴趣爱好"
                  rules={[{ required: true, message: "请输入个人兴趣爱好!" }]}
                >
                  <Input
                    placeholder="请输入个人兴趣爱好"
                    value={this.state.forms.intersting}
                    onChange={(e) => this.handdleChange(e, "intersting")}
                    allowClear={true}
                  />
                </Form.Item>
                <Form.Item
                  name="introduction"
                  label="个人简介"
                  rules={[{ required: true, message: "请输入个人简介!" }]}
                >
                  <Input.TextArea
                    rows={4}
                    placeholder="请输入个人简介"
                    value={this.state.forms.introduction}
                    onChange={(e) => this.handdleChange(e, "introduction")}
                    allowClear={true}
                  />
                </Form.Item>
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 3 }}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    onClick={this.handleSubmit.bind(this)}
                  >
                    更新基本信息
                  </Button>
                </Form.Item>
              </Form>
              <div className="userImage">
                <h5>头像</h5>
                <Avatar size={100} src={process.env.NODE_ENV === "development"?this.state.forms.path:this.state.forms.user_img} />
                <Upload
                  name="file"
                  action={`${this.api.login.uplod}`}
                  beforeUpload={this.beforeUpload}
                  className="uplod"
                  showUploadList={false}
                >
                  <Button icon="upload">上传图片</Button>
                </Upload>
              </div>
            </div>
          </TabPane>
        </Tabs>
      </div>
    );
  }
}
export default setting;