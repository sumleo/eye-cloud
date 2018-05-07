import React, { Component } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Checkbox, Alert, Icon } from 'antd';
import Login from 'components/Login';
import styles from './Login.less';

const { Tab, UserName, Password, Mobile, Captcha, Submit } = Login;

@connect(({ login, loading }) => ({
  login,
  submitting: loading.effects['login/login'],
}))
export default class LoginPage extends Component {
  state = {
    type: 'account',
    autoLogin: true,
    errorTime:0,
  };

  onTabChange = type => {
    this.setState({ type });
  };

  handleSubmit = (err, values) => {
    const { type } = this.state;
    if (!err) {
      this.props.dispatch({
        type: 'login/login',
        payload: {
          ...values,
          type,
        },
      });
    }
  };

  changeAutoLogin = e => {
    this.setState({
      autoLogin: e.target.checked,
    });
  };
  renderMessage = content => {
    return <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />;
  };

  render() {
    const { login, submitting } = this.props;
    const { type } = this.state;
    return (
      <div className={styles.main}>
        <Login defaultActiveKey={type} onTabChange={this.onTabChange} onSubmit={this.handleSubmit}>
          {login.status === 'error' &&
            login.type === 'account' &&
            !login.submitting &&
            this.renderMessage('账户或密码错误，请检查大写键盘是否打开，错误三次将锁定账户（admin/888888）')}
          <UserName disable={this.state.errorTime===3} name="userName" placeholder="admin/user" />
          <Password disable={this.state.errorTime===3} name="password" placeholder="888888/123456" />
          <Submit loading={submitting}>登录</Submit>
          <div className={styles.other}>
            <a  >
              忘记密码
            </a>
            <Link className={styles.register} to="/user/register">
              注册账户
            </Link>
          </div>
        </Login>
      </div>
    );
  }
}
