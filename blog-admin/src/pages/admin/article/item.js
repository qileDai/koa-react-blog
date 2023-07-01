import React from "react";
import { Form, Input, Button, Select, message } from "antd";
import Editor from "for-editor";
import "./item.less";

const { Option } = Select;
class createArticle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      tag: [],
      category: [],
      form: {
        author: "",
        title: "",
      },
      imgtype: [
        "image/png",
        "image/jpg",
        "image/gif",
        "image/jpeg",
        "image/PNG",
        "image/JPG",
        "image/GIF",
        "image/JPEG",
      ],
      //editorState: EditorState.createEmpty(),
      editorState: "",
    };
    this.$vm = React.createRef();
  }
  componentDidMount() {
    const id = this.props.match.params.id;
    this.setState({ id });
    this.getTagList();
    this.category();
    id && this.getDetail(id);
    setTimeout(() => {
      message.destroy();
    }, 300);
  }
  async getDetail(id) {
    this.get(`${this.api.article.detail}${id}`)
      .then((res) => {
        if (res.code == 200) {
          const { title, author, summary, category, tag, content } = res.data;
          let tags = tag.split(",");
          let categorys = category.split(",");
          this.props.form.setFieldsValue({
            title,
            author,
            summary,
            category: categorys,
            tag: tags,
          });
          // const contentBlock = htmlToDraft(content);
          // const contentState = ContentState.createFromBlockArray(
          //   contentBlock.contentBlocks
          // );
          // const editorState = EditorState.createWithContent(contentState);
          this.setState({ editorState: content });
        } else {
          message.warning(res.message);
        }
      })
      .catch((res) => {
        message.warning(res.message);
      });
  }

  async getTagList() {
    this.get(`${this.api.tags.tagAll}`)
      .then((res) => {
        if (res.code == 200) {
          this.setState({ tag: res.data });
        }
      })
      .catch((res) => {
        message.warning(res.message);
      });
  }
  async category() {
    this.get(`${this.api.classification.classAll}`)
      .then((res) => {
        if (res.code == 200) {
          this.setState({ category: res.data });
        }
      })
      .catch((res) => {
        message.warning(res.message);
      });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        // const content = draftToHtml(
        //   convertToRaw(this.state.editorState.getCurrentContent())
        // );
        let params = {
          ...values,
          category: String(values.category),
          tag: String(values.tag),
          content: this.state.editorState,
        };
        if (this.state.id) {
          params.id = this.state.id;
          this.post(`${this.api.article.edit}`, params)
            .then((res) => {
              if (res.code == 200) {
                message.success("修改成功");
                this.props.history.push("/admin/article");
              }
            })
            .catch((res) => {
              message.warning(res.message);
            });
        } else {
          this.post(`${this.api.article.add}`, params)
            .then((res) => {
              if (res.code == 200) {
                message.success("新增成功");
                this.props.history.push("/admin/article");
              }
            })
            .catch((res) => {
              message.warning(res.message);
            });
        }
      }
    });
  };
  handleChangeTag(val) {
    //console.log(val);
  }
  handlChangeeCategory(val) {
    //console.log(val);
  }
  onEditorStateChange(editorState) {
    this.setState({
      editorState,
    });
  }
  uploadImageCallBack = (file) => {
    //console.log("file", file);
     const size = file.size / 1024 / 1024;
    // return new Promise((resolve, reject) => {
    //   let formData = new FormData();
    //   formData.append("file", file[0]);
    //   this.post(`${this.api.users.uplod}`, formData)
    //     .then((res) => {
    //       console.log("uplod", res);
    //       if (res.code == 200) {
    //         message.success(res.message);
    //         //this.state.forms.user_img = res.data.path;
    //         resolve({
    //           data: {
    //             title:file[0].name,
    //             url: res.data.url,
    //           },
              
    //         });
    //       } else {
    //         message.warning(res.message);
    //       }
    //     })
    //     .catch((res) => {
    //       message.warning(res.message);
    //     });
    // });
     let formData = new FormData();
     formData.append("file", file);
       if (!this.state.imgtype.includes(file.type)) {
         message.warning("图片格式不对,请重新上传");
         return false;
       } else {
         if(size>20){
            message.warning("图片超过20M,请重新上传");
            return false;
         }else{
            this.post(`${this.api.users.uplod}`, formData)
              .then((res) => {
                console.log("uplod", res);
                if (res.code == 200) {
                  message.success(res.message);
                  this.$vm.current.$img2Url(file.name, res.data.url);
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
  changeValue(val) {
    this.setState({
      editorState:val
    });
  }
  render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 8 },
        sm: { span: 5 },
        xxl: { span: 2 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
        md: { span: 12 },
      },
    };
    const { getFieldDecorator } = this.props.form;
    let categoryOption = this.state.category.map((category) => {
      return (
        <Option value={category.name} key={category.name}>
          {category.name}
        </Option>
      );
    });
    let tagOption = this.state.tag.map((tag) => {
      return (
        <Option value={tag.name} key={tag.name}>
          {tag.name}
        </Option>
      );
    });
    const txt = this.state.id ? "更新" : "提交";
    return (
      <div className="admin-article">
        <Form onSubmit={this.handleSubmit} {...formItemLayout}>
          <Form.Item label="标题">
            {getFieldDecorator("title", {
              rules: [{ required: true, message: "请输入标题" }],
            })(<Input placeholder="请输入标题" />)}
          </Form.Item>
          <Form.Item label="作者">
            {getFieldDecorator("author", {
              rules: [{ required: true, message: "请输入作者" }],
            })(<Input placeholder="请输入作者" />)}
          </Form.Item>
          <Form.Item label="摘要">
            {getFieldDecorator("summary", {
              rules: [{ required: true, message: "请输入描述" }],
            })(<Input placeholder="请输入描述" />)}
          </Form.Item>
          <Form.Item label="分类">
            {getFieldDecorator("category", {
              rules: [{ required: true, message: "请选择分类" }],
            })(
              <Select
                mode="multiple"
                style={{ width: "100%" }}
                placeholder="请选择标签"
                addonBefore="标签"
                onChange={this.handlChangeeCategory.bind(this)}
              >
                {categoryOption}
              </Select>
            )}
          </Form.Item>
          <Form.Item label="标签">
            {getFieldDecorator("tag", {
              rules: [{ required: true, message: "请选择标签" }],
            })(
              <Select
                mode="multiple"
                style={{ width: "100%" }}
                placeholder="请选择标签"
                addonBefore="标签"
                onChange={this.handleChangeTag.bind(this)}
              >
                {tagOption}
              </Select>
            )}
          </Form.Item>
          <Form.Item label="内容" wrapperCol={{ span: 19 }}>
            <Editor
              className="my-editor"
              subfield={true}
              preview={true}
              ref={this.$vm}
              addImg={this.uploadImageCallBack}
              value={this.state.editorState}
              onChange={this.changeValue.bind(this)}
            />
          </Form.Item>
          <Form.Item wrapperCol={{ span: 24 }}>
            <div className="article-button">
              <Button type="primary" htmlType="submit">
                {txt}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const ArticleItem = Form.create({ name: "normal_login" })(createArticle);

export default ArticleItem;
