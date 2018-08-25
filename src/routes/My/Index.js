import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, DatePicker, Form, Input, Select } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

@connect(({ my, loading }) => ({
  submitting: loading.effects['form/submitRegularForm'],
  my,
}))
@Form.create()
export default class Index extends PureComponent {
  constructor(props) {
    super(props);
    const { dispatch } = this.props;
    dispatch({
      type: 'my/getUserInformation',
    });
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'form/submitRegularForm',
          payload: values,
        });
      }
    });
  };
  render() {
    const { submitting } = this.props;
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };
    const { my } = this.props;
    let data;
    let userInfo={};
    if (my && my.data&&my.data.userInfo) {
      userInfo=my.data.userInfo?JSON.parse(my.data.userInfo[0].userinfo):{};
    }
    return (
      <PageHeaderLayout title="我的主页">
        <Card bordered={false}>
          <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
            <FormItem {...formItemLayout} label="用户名">
              {getFieldDecorator('username', {
                initialValue: userInfo ? userInfo.userName || '未设置' : '未设置',
              })(<Input disabled/>)}
            </FormItem>
            <FormItem {...formItemLayout} label="注册邮箱">
              {getFieldDecorator('mail', {
                initialValue: data ? data.username || '未设置' : '未设置',
              })(<Input disabled/>)}
            </FormItem>
            <FormItem {...formItemLayout} label="工作单位">
              {getFieldDecorator('workPlace', {
                initialValue: userInfo ? userInfo.workPlace || '未设置' : '未设置',
              })(<Input disabled/>)}
            </FormItem>
            <FormItem {...formItemLayout} label="验证邮箱">
              {getFieldDecorator('verifyMail', {
                initialValue: userInfo ? userInfo.verifyMail || '未设置' : '未设置',
              })(<Input disabled/>)}
            </FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}
