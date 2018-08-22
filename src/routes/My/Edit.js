import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Button, Card, Form, Input } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

const FormItem = Form.Item;

@connect(({ my,loading }) => ({
  my,
  submitting: loading.effects['my/submitForm'],
}))
@Form.create()
export default class Index extends PureComponent {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'my/submitForm',
          payload: {
            userinfo: values,
          },
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

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };

    return (
      <PageHeaderLayout title="更改或完善个人信息">
        <Card bordered={false}>
          <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
            <FormItem {...formItemLayout} label="用户名">
              {getFieldDecorator('userName', {
                rules: [
                  {
                    required: true,
                    message: '请输入用户名',
                  },
                ],
              })(<Input placeholder="Leo" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="工作单位">
              {getFieldDecorator('workPlace', {
                rules: [
                  {
                    required: true,
                    message: '请输入工作单位',
                  },
                ],
              })(<Input placeholder="SUSTech" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="验证邮箱">
              {getFieldDecorator('verifyMail', {
                rules: [
                  {
                    required: true,
                    message: '请输入验证邮箱',
                  },
                ],
              })(<Input placeholder="New Here" />)}
            </FormItem>
            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                提交
              </Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}
