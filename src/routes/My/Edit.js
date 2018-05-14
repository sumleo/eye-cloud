import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Form,
  Input,
  DatePicker,
  Select,
  Button,
  Card,
  InputNumber,
  Radio,
  Icon,
  Tooltip,
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './style.less';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

@connect(({ loading }) => ({
  submitting: loading.effects['form/submitRegularForm'],
}))
@Form.create()
export default class Index extends PureComponent {
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
    const { getFieldDecorator, getFieldValue } = this.props.form;

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
      <PageHeaderLayout
        title="更改或完善个人信息"
      >
        <Card bordered={false}>
          <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
            <FormItem {...formItemLayout} label="用户名">
              {getFieldDecorator('title333', {
                rules: [
                  {
                    required: true,
                    message: '请输入用户名',
                  },
                ],
              })(<Input placeholder="Leo" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="注册邮箱">
              {getFieldDecorator('title3', {
                rules: [
                  {
                    required: true,
                    message: '请输入注册邮箱',
                  },
                ],
              })(<Input placeholder="11610522@mail.sustc.edu.cn" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="工作单位">
              {getFieldDecorator('title2', {
                rules: [
                  {
                    required: true,
                    message: '请输入工作单位',
                  },
                ],
              })(<Input placeholder="SUSTech" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="验证邮箱">
              {getFieldDecorator('title1', {
                rules: [
                  {
                    required: true,
                    message: '请输入验证邮箱',
                  },
                ],
              })(<Input placeholder="New Here" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="姓名">
              {getFieldDecorator('title', {
                rules: [
                  {
                    required: true,
                    message: '请输入姓名',
                  },
                ],
              })(<Input placeholder="Leo"/>)}
            </FormItem>
            <FormItem {...formItemLayout} label="职务">
              {getFieldDecorator('title', {
                rules: [
                  {
                    required: true,
                    message: '请输入职务',
                  },
                ],
              })(<Input placeholder="学生" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="地址">
              {getFieldDecorator('title', {
                rules: [
                  {
                    required: true,
                    message: '请输入地址',
                  },
                ],
              })(<Input placeholder="南方科技大学"  />)}
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
