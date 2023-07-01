import React, { Component } from 'react'
import { Card, Icon, message, Avatar  } from "antd";
import { LeftCircleFilled } from "@ant-design/icons";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";
import {jsx,javascript,} from "react-syntax-highlighter/dist/esm/languages/prism";
//import CodeBlock from '../../../components/Codeblock/index.jsx'
import './detail.less'
const { Meta } = Card;
class ArticleDetail extends Component {
  constructor (props) {
    super(props)
    this.state = {
      id: '',
      data: {
        title: ''
      },
      editorState:''
    }
  }
  componentWillReceiveProps(nextProps) {
     SyntaxHighlighter.registerLanguage("jsx", jsx);
     SyntaxHighlighter.registerLanguage("javascript", javascript);
     SyntaxHighlighter.registerLanguage("js", javascript);
    const id = nextProps.match.params.id
    const preId = this.props.match.params.id
    id !== preId && this.getDetail(id)
  }
  componentDidMount () {
    const id = this.props.match.params.id
    this.getDetail(id)
    
  }
  async getDetail (id) {
     message.destroy();
     this.get(`${this.api.article.detail}${id}`).then((res) => {
         if (res.code == 200) {
           let data = res.data
           const {  content } = data;
           this.setState({ data });
           const editorState = content;
           this.setState({ editorState });
         } else {
           message.warning(res.message);
         }
       })
       .catch((res) => {
         message.warning(res.message);
       });
  }
  handleBack(){ //返回主页
    this.props.history.push("/web/index");
  }
  render () {
    const { data } = this.state
    const extra = <div className='content-extra'>
      <Icon type='calendar' style={{ marginRight: 8 }} />
      { data.createdAt }
      <Icon type="eye" style={{ marginRight: 8, marginLeft: 8 }} />
      { data.readedCount } 次预览
    </div>
    const components = {
      code({ node, inline, className, children, ...props }) {
        const match = /language-(\w+)/.exec(className || "");
        return !inline && match ? (
          <SyntaxHighlighter
            style={tomorrow}
            language={match[1]}
            PreTag="div"
            children={String(children).replace(/\n$/, "")}
            {...props}
          />) : (
          <code className={className} {...props}  />
        );
      },
    };
    return (
      <div>
        <LeftCircleFilled
          className="back"
          onClick={this.handleBack.bind(this)}
        />
        <Card title={data.title} extra={extra}>
          <ReactMarkdown
            remarkPlugins={[gfm, { singleTilde: false }]}
            rehypePlugins={[rehypeRaw]}
            escapeHtml={false}
            components={components}
            source={this.state.editorState}
            children={this.state.editorState}
          ></ReactMarkdown>
        </Card>
      </div>
    );
  }
}

export default ArticleDetail