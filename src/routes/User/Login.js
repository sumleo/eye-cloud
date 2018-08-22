import React, { Component } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Alert } from 'antd';
import Login from 'components/Login';
import styles from './Login.less';
import md5 from 'blueimp-md5';

const { Tab, UserName, Password, Submit } = Login;

@connect(({ login, loading }) => ({
  login,
  submitting: loading.effects['login/login'],
}))
export default class LoginPage extends Component {
  state = {
    type: 'account',
  };

  onTabChange = type => {
    this.setState({ type });
  };

  handleSubmit = (err, values) => {
    if (!err) {
      let {password}=values;
      values.password=md5(password);
      this.props.dispatch({
        type: 'login/login',
        payload: {
          ...values,
        },
      });
    }
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
            this.renderMessage('账户或密码错误')}
          <UserName name="username" placeholder="E-mail"/>
            <Password name="password" placeholder="Password"/>
          <Submit loading={submitting}>登录</Submit>
        </Login>
        <div className={styles.other}>
          <Link className={styles.register} to="/user/register">
            注册账户
          </Link>
        </div>
      </div>
    );
  }
}
