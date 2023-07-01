import React from 'react'
import { Form, Input, message } from 'antd'
import Promptbox from "../../../components/PromptBox/index";
import { debounce, encrypt } from "../../../utils/util";
import store from "../../../store";
import { updateinfo } from "../../../store/actions/actionCreators";
//import { get, post } from "../../../utils/ajax";

//@Form.create()
class RegisterForm extends React.Component {
    state = {
        focusItem: -1,   //当前焦点聚焦在哪一项上
        loading: false   //注册的loding
    }
    /**
     * 返回登录面板
     */
    backLogin = () => {
        this.props.form.resetFields()
        this.props.toggleShow()
    }
    onSubmit = () => {
        this.props.form.validateFields((errors, values) => {
            if (!errors) {
                this.onRegister(values)
            }
        });
    }
    /**
     * 注册函数
     */
    onRegister = async (values) => {
        //const ciphertext = encrypt(values.registerPassword)
        let pragrams = {
          username: values.registerUsername,
          password: values.registerPassword,
        };
        this.post(`${this.api.login.adduser}`, pragrams).then((res) => {
            console.log(res);
            if (res.code == 200) {
               message.success(res.message);
            //   const action = updateinfo(res.data.user_info);
            //   store.dispatch(action);
            //   sessionStorage.setItem("token", res.data.token);
            //   sessionStorage.setItem("menuItmeKey", "0");
            //   sessionStorage.setItem("blogUser", values.registerUsername);
            //   this.props.history.push("/admin/page");
            } else {
              message.warning(res.message);
            }
          }).catch((res) => {
            message.warning(res.message);
          });
    }

    render() {
        const { getFieldDecorator, getFieldValue, getFieldError } = this.props.form
        const { focusItem } = this.state
        return (
            <div>
                <h3 className="title">管理员注册</h3>
                <Form hideRequiredMark>
                    <Form.Item
                        help={<Promptbox info={getFieldError('registerUsername') && getFieldError('registerUsername')[0]} />}
                        style={{ marginBottom: 10 }}
                        wrapperCol={{ span: 20, pull: focusItem === 0 ? 1 : 0 }}
                        labelCol={{ span: 3, pull: focusItem === 0 ? 1 : 0 }}
                        label={<span className='iconfont icon-User' style={{ opacity: focusItem === 0 ? 1 : 0.6 }} />}
                        colon={false}>
                        {getFieldDecorator('registerUsername', {
                            validateFirst: true,
                            rules: [
                                { required: true, message: '用户名不能为空' },
                                { pattern: /^[^\s']+$/, message: '不能输入特殊字符' },
                                { min: 3, message: '用户名至少为3位' }
                            ]
                        })(
                            <Input
                                maxLength={16}
                                className="myInput"
                                autoComplete="new-password"  //禁用表单自动填充(不管用？)
                                onFocus={() => this.setState({ focusItem: 0 })}
                                onBlur={() => this.setState({ focusItem: -1 })}
                                onPressEnter={this.onSubmit}
                                placeholder="用户名"
                            />
                        )}
                    </Form.Item>
                    <Form.Item
                        help={<Promptbox info={getFieldError('registerPassword') && getFieldError('registerPassword')[0]} />}
                        style={{ marginBottom: 10 }}
                        wrapperCol={{ span: 20, pull: focusItem === 1 ? 1 : 0 }}
                        labelCol={{ span: 3, pull: focusItem === 1 ? 1 : 0 }}
                        label={<span className='iconfont icon-suo1' style={{ opacity: focusItem === 1 ? 1 : 0.6 }} />}
                        colon={false}>
                        {getFieldDecorator('registerPassword', {
                            validateFirst: true,
                            rules: [
                                { required: true, message: '密码不能为空' },
                                { pattern: '^[^ ]+$', message: '密码不能有空格' },
                                { min: 3, message: '密码至少为3位' },
                            ]

                        })(
                            <Input
                                maxLength={16}
                                className="myInput"
                                type="password"
                                onFocus={() => this.setState({ focusItem: 1 })}
                                onBlur={() => this.setState({ focusItem: -1 })}
                                onPressEnter={this.onSubmit}
                                placeholder="密码"
                            />
                        )}
                    </Form.Item>
                    <Form.Item
                        help={<Promptbox info={getFieldError('confirmPassword') && getFieldError('confirmPassword')[0]} />}
                        style={{ marginBottom: 35 }}
                        wrapperCol={{ span: 20, pull: focusItem === 2 ? 1 : 0 }}
                        labelCol={{ span: 3, pull: focusItem === 2 ? 1 : 0 }}
                        label={<span className='iconfont icon-suo1' style={{ opacity: focusItem === 2 ? 1 : 0.6 }} />}
                        colon={false}>
                        {getFieldDecorator('confirmPassword', {
                            rules: [
                                { required: true, message: '请确认密码' },
                                {
                                    validator: (rule, value, callback) => {
                                        if (value && value !== getFieldValue('registerPassword')) {
                                            callback('两次输入不一致！')
                                        }
                                        callback()
                                    }
                                },
                            ]

                        })(
                            <Input
                                className="myInput"
                                type="password"
                                onFocus={() => this.setState({ focusItem: 2 })}
                                onBlur={() => this.setState({ focusItem: -1 })}
                                onPressEnter={this.onSubmit}
                                placeholder="确认密码"
                            />
                        )}
                    </Form.Item>
                    <Form.Item>
                        <div className="btn-box">
                            <div className="loginBtn" onClick={this.onSubmit}>注册</div>
                            <div className="registerBtn" onClick={this.backLogin}>返回登录</div>
                        </div>
                    </Form.Item>
                </Form>
                <div className="footer">欢迎登陆后台管理系统</div>
            </div>
        )
    }
}
RegisterForm = Form.create()(RegisterForm);
export default RegisterForm