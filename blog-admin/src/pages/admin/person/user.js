import React from "react";
import zhCN from "antd/es/locale/zh_CN"; 
import { ConfigProvider,Table, Form, Input, Button, message, Modal, Switch, Popconfirm } from "antd";
import store from "../../../store";
import { updateinfo } from "../../../store/actions/actionCreators";
import { encrypt } from "../../../utils/util";
import  './index.less'
class person extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      local: zhCN,
      loading: false,
      visible: false,
      username: "",
      loginname: "",
      authority: "",
      url: "",
      form: {
        user_id: "",
        username: "",
        password: "",
        authority: "0",
        roleType:''
      },
      pageNo: 1,
      pageSize: 10,
      total: 0,
      data: [],
      titleName: "新增用户",
      columns: [
        {
          title: "序号",
          dataIndex: "index",
          key: "index",
          width: 80,
          align: "center",
          render: (text, record, index) => `${index + 1}`,
        },
        {
          title: "用户名称",
          dataIndex: "username",
        },
        {
          title: "用户密码",
          dataIndex: "passwd",
        },
        {
          title: "用户权限",
          dataIndex: "authority",
          render: (o, record, index) => {
            return <Switch checked={o == "1" ? true : false} />;
          },
        },
        {
          title: "创建时间",
          dataIndex: "createdAt",
        },
        {
          title: "操作",
          key: "action",
          width: 120,
          align: "center",
          render: (record) => (
            <span>
              <Popconfirm
                title="确定删除当前标签"
                onConfirm={this.handleDelete.bind(this, record)}
                okText="是"
                cancelText="否"
                disabled={
                  this.state.authority == "1" &&
                  this.state.loginname == record.username
                    ? true
                    : this.state.authority == "1" &&
                      this.state.loginname != record.username
                    ? false
                    : true
                }
              >
                <Button
                  ghost
                  type="danger"
                  disabled={
                    this.state.authority == "1" &&
                    this.state.loginname == record.username
                      ? true
                      : this.state.authority == "1" &&
                        this.state.loginname != record.username
                      ? false
                      : true
                  }
                >
                  删除
                </Button>
              </Popconfirm>
              <Button
                ghost
                type="primary"
                className="btn_edit"
                onClick={this.handleEdit.bind(this, record)}
                disabled={this.state.authority == "1" ? false : true}>
                编辑
              </Button>
            </span>
          ),
        },
      ],
    };
  }
  componentDidMount() {
    this.state.loginname = store.getState().userInfo.username;
    this.state.authority = store.getState().userInfo.authority;
    this.getList();
  }
  handleDelete = (record) => {
    this.del(`${this.api.users.del}${record.user_id}`)
      .then((res) => {
        if (res.code == 200) {
          message.success(res.message);
          this.getList();
        } else {
          message.warning(res.message);
        }
      })
      .catch((res) => {
        message.warning(res.message);
      });
  };
  handleEdit(item) {//编辑
    this.setState({
      titleName: "编辑用户",
      visible: true,
    });
    this.setState({
      form: {
        username: item.username,
        password: item.passwd,
        authority: item.authority,
        user_id: item.user_id,
        roleType: item.roleType
      },
    });
  }
  handleAdd() {
    this.setState({
      titleName: "新增用户",
      visible: true,
      form: {
        username: "",
        password: "",
        authority: "0",
        user_id: "",
        roleType:""
      },
    });
  }
  async getList() {
    this.setState({ loading: true });
    const params = {
      username: this.state.username,
      pageNo: this.state.pageNo,
      pageSize: this.state.pageSize,
    };
    this.post(`${this.api.users.list}`, params)
      .then((res) => {
        if (res.code == 200) {
          this.setState({
            data: res.data,
            total: res.total,
            loading: false,
          });
        } else {
          message.warning(res.message);
        }
      })
      .catch((res) => {
        message.warning(res.message);
      });
  }
  // 查询
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        await this.setState({
          pageNo: 1,
          username: values.username || "",
        });
        this.getList();
      }
    });
  };
  handdleChange = (e, name) => {
    // this.state.form[name] = e.target.value;
    let data = this.state.form;
    data[name] = e.target.value;
    this.setState({
      form: data,
    });
  };
  // 新增
  handleOk() {
    if(!this.state.form.user_id){
         this.state.form.roleType = this.state.form.authority=='1'?'admin':'normal'
         if (this.state.form.username==''){
           message.warning('请输入用户名称');
         }else if (this.state.form.password=='') {
           message.warning("请输入用户密码");
         } else {
             this.post(`${this.api.users.adduser}`, this.state.form)
               .then((res) => {
                 if (res.code == 200) {
                   message.success(res.message);
                   this.state.visible = false;
                   this.getList();
                 } else {
                   message.warning(res.message);
                 }
               })
               .catch((res) => {
                 message.warning(res.message);
               });
         }
    }else{
       if (this.state.form.username == "") {
         message.warning("请输入用户名称");
       } else if (this.state.form.password=='') {
         message.warning("请输入用户密码");
       } else {
         this.post(`${this.api.users.editauthority}`, this.state.form)
           .then((res) => {
             if (res.code == 200) {
               message.success(res.message);
               this.state.visible = false;
               if (this.state.loginname == this.state.form.username) {
                 this.props.history.push("/login");
               } else {
                 this.getList();
               }
             } else {
               message.warning(res.message);
             }
           })
           .catch((res) => {
             message.warning(res.message);
           });
       }
    }
  }
  handleCancel() {
    this.setState({ visible: false });
  }
  handleChange = (val) => {   //开关切换
    let data = this.state.form
    if (val) {
      //this.state.form.authority = "1";
      data.authority = "1";
    } else {
      //this.state.form.authority = "0";
       data.authority = "0";
    }
    this.setState({
       form: data,
    });
  };
  // page
  async handleOnChange(page) {
    await this.setState({
      pageNo: page.current,
      pageSize: page.pageSize,
    });
    this.getList();
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { local, form } = this.state;
    const layout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 16 },
    };
    return (
      <div>
        <ConfigProvider local={local}>
          <Modal
            title={this.state.titleName}
            visible={this.state.visible}
            okText="确认"
            cancelText="取消"
            onOk={this.handleOk.bind(this)}
            onCancel={this.handleCancel.bind(this)}
          >
            <Form {...layout} ref={this.formRef}>
              <Form.Item
                label="用户名称"
                name="username"
                rules={[{ required: true, message: "请输入用户名" }]}
              >
                <Input
                  placeholder="请输入用户名"
                  value={this.state.form.username}
                  onChange={(e) => this.handdleChange(e, "username")}
                  allowClear={true}
                />
              </Form.Item>

              <Form.Item
                label="密码"
                name="password"
                rules={[{ required: true, message: "请输入用户密码" }]}
              >
                <Input.Password
                  placeholder="请输入密码"
                  allowClear={true}
                  value={this.state.form.password}
                  onChange={(e) => this.handdleChange(e, "password")}
                />
              </Form.Item>
              <Form.Item
                label="权限"
                name="authority"
                rules={[{ required: true }]}
              >
                <Switch
                  onChange={this.handleChange}
                  checked={this.state.form.authority == "0" ? false : true}
                  disabled={
                    this.state.authority == "1" &&
                    this.state.loginname == this.state.form.username
                      ? true
                      : this.state.authority == "1" &&
                        this.state.loginname != this.state.form.username
                      ? false
                      : true
                  }
                />
              </Form.Item>
            </Form>
          </Modal>
          <Form layout="inline" onSubmit={this.handleSubmit}>
            <Form.Item>
              {getFieldDecorator("username")(
                <Input placeholder="请输入用户名" allowClear={true} />
              )}
            </Form.Item>
            <Form.Item>
              {/* htmlType="submit" */}
              <Button className="mr10" type="primary" htmlType="submit">
                查询
              </Button>
              <Button
                type="primary"
                onClick={this.handleAdd.bind(this)}
                disabled={this.state.authority == "1" ? false : true}
              >
                新增
              </Button>
            </Form.Item>
          </Form>

          <Table
            bordered
            className="mt10"
            pagination={{
              current: this.state.pageNo,
              showSizeChanger: false,
              total: this.state.total,
              pageSize: this.state.pageSize,
              pageSizeOptions: ["10", "20", "30", "40"],
              showTotal(total) {
                return `共${total}条 `;
              },
            }}
            loading={this.state.loading}
            columns={this.state.columns}
            dataSource={this.state.data}
            rowKey={(record) => record.user_id}
            onChange={(page) => this.handleOnChange(page)}
          />
        </ConfigProvider>
      </div>
    );
  }
}
const Person = Form.create({ name: "horizontal_login" })(person);

export default Person;
