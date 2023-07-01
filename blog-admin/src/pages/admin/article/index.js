import React from 'react'
import { Link } from 'react-router-dom'
import { color } from '../../../utils'
import { Table, Form, Input, Button, message, Tag, Popconfirm } from 'antd';
import api from '../../../api'
import store from "../../../store";
class articleList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      title: "",
      authority: "",
      data: [],
      pageNo: 1,
      pageSize: 10,
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
          key: "title",
        },
        {
          title: "摘要",
          dataIndex: "summary",
          key: "summary",
          width: 400,
        },
        {
          title: "分类",
          dataIndex: "category",
          key: "category",
          render: (category) =>
            category.split(",").map((v, index) => (
              <Tag
                key={index}
                color={color[Math.floor(Math.random() * color.length)]}
                style={{ marginBottom: "3px" }}
              >
                {v}
              </Tag>
            )),
        },
        {
          title: "访问次数",
          dataIndex: "readedCount",
          key: "readedCount",
          width: 100,
        },
        {
          title: "创建时间",
          dataIndex: "createdAt",
          key: "createdAt",
        },
        {
          title: "更新时间",
          dataIndex: "updatedAt",
          key: "updatedAt",
        },
        {
          title: "操作",
          align: "center",
          width: 180,
          render: (record) => (
            <span>
              <Button
                ghost
                type="primary"
                className="mr10"
                onClick={this.handleEdit.bind(this, record.id)}
                disabled={this.state.authority == "1" ? false : true}
              >
                编辑
              </Button>
              <Popconfirm
                title="确定删除当前标签"
                onConfirm={this.handleDelete.bind(this, record.id)}
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
  async handleDelete(id) {
     this.del(`${this.api.article.del}${id}`)
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
  }
  handleEdit(id) {
    this.props.history.push(`/admin/article-edit/${id}`);
  }
  async getList() {
    this.setState({ loading: true });
    const params = {
      title: this.state.title,
      pageNo: this.state.pageNo,
      pageSize: this.state.pageSize,
    };
    this.post(`${this.api.article.list}`, params)
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
  async handleCreate() {
    const { code } = await api.post("example/add", { name: "小花" });
    if (code === 200) this.getList();
  }
  async handleOnChange(page) {
    await this.setState({
      title: this.state.title,
      pageNo: page.current,
      pageSize: this.state.pageSize,
    });
    this.getList();
  }
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
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Form layout="inline" onSubmit={this.handleSubmit}>
          <Form.Item>
            {getFieldDecorator("title")(
              <Input placeholder="请输入标题" allowClear={true} />
            )}
          </Form.Item>
          <Form.Item>
            <Button className="mr10" type="primary" htmlType="submit">
              查询
            </Button>
            <Link to="/admin/article-add">
              <Button type="primary">新增</Button>
            </Link>
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