import React from 'react'
import { Table, Form, Input, Button, message, Modal, Popconfirm } from "antd";
import store from "../../../store";
class articleList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      visible: false,
      title: "",
      url: "",
      authority: "",
      pageNo: 1,
      pageSize: 10,
      total: null,
      data: [],
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
          title: "标题",
          dataIndex: "title",
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
                disabled={this.state.authority == "1" ? false : true}
              >
                <Button
                  ghost
                  type="danger"
                  disabled={this.state.authority == "1" ? false : true}
                >
                  删除
                </Button>
              </Popconfirm>
            </span>
          ),
        },
      ],
    };
  }
  componentDidMount() {
    this.state.authority = store.getState().userInfo.authority;
    this.getList();
  }
  async handleDelete(record) {
      this.del(`${this.api.star.delete}${record.id}`).then((res) => {
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
  }
  async getList() {
    this.setState({ loading: true });
    const params = {
      title: this.state.title,
      pageNo: this.state.pageNo,
      pageSize: this.state.pageSize,
    };
    this.post(`${this.api.star.list}`, params)
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
          title: values.title || "",
        });
        this.getList();
      }
    });
  };
  handdleChange(e, name) {
    this.setState({
      [name]: e.target.value,
    });
  }
  // 新增
  async handleOk() {
    const { url, title } = this.state;
    let prams = {
      title: title,
      url:url
    };
    this.post(`${this.api.star.add}`, prams)
      .then((res) => {
        if (res.code == 200) {
          message.success(res.message);
          this.setState({
            visible: false,
            title: "",
            url:""
          });
          this.getList();
        } else {
          message.warning(res.message);
        }
      })
      .catch((res) => {
        message.warning(res.message);
      });
  }
  handleCancel() {
    this.setState({ visible: false });
  }
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
    return (
      <div>
        <Modal
          title="标签"
          visible={this.state.visible}
          okText="确定"
          cancelText="取消"
          onOk={this.handleOk.bind(this)}
          onCancel={this.handleCancel.bind(this)}
        >
          <Input
            placeholder="请输入标题"
            value={this.state.title}
            onChange={(e) => this.handdleChange(e, "title")}
          />
          <Input
            placeholder="请输入链接"
            value={this.state.url}
            onChange={(e) => this.handdleChange(e, "url")}
            style={{ marginTop: "10px" }}
          />
        </Modal>
        <Form layout="inline" onSubmit={this.handleSubmit}>
          <Form.Item>
            {getFieldDecorator("title")(
              <Input placeholder="请输入标题" allowClear={true} />
            )}
          </Form.Item>
          <Form.Item>
            {/* htmlType="submit" */}
            <Button className="mr10" type="primary" htmlType="submit">
              查询
            </Button>
            <Button
              type="primary"
              onClick={(_) => this.setState({ visible: true })}
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
               return `共 ${total} 条`;
            },
          }}
          loading={this.state.loading}
          columns={this.state.columns}
          dataSource={this.state.data}
          rowKey={(record) => record.id}
          onChange={(page) => this.handleOnChange(page)}
        />
      </div>
    );
  }
}
const article = Form.create({ name: 'horizontal_login' })(articleList)

export default article