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
  Upload,
  Row,
  Col,
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './style.less';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const Dragger = Upload.Dragger;

const props = {
  name: 'file',
  showUploadList: false,
  action: '/upload.do',
};
@connect(({ loading }) => ({
  submitting: loading.effects['form/submitRegularForm'],
}))
@Form.create()
export default class BasicForms extends PureComponent {
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
        title="上传图片"
        content="必须填写患者用户的姓名 必须填写性别 必须填写年龄 可填写最佳矫正视力 可文字填写糖尿病历史 这里全部都还是选用文字填写 因为文字填写比较稳定 选择文件直接进行上传 限定一张 图片最大10M的大小不能超过这个大小。"
      >
        <Card bordered={false}>
          <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
            <FormItem {...formItemLayout} label="姓名">
              {getFieldDecorator('title1', {
                rules: [
                  {
                    required: true,
                    message: '请输入姓名',
                  },
                ],
              })(<Input placeholder="XXX" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="性别">
              <div>
                {getFieldDecorator('public', {
                  initialValue: '1',
                })(
                  <Radio.Group>
                    <Radio value="1">男</Radio>
                    <Radio value="2">女</Radio>
                  </Radio.Group>
                )}
              </div>
            </FormItem>
            <FormItem {...formItemLayout} label="年龄">
              {getFieldDecorator('title2', {
                rules: [
                  {
                    required: true,
                    message: '请输入年龄',
                  },
                ],
              })(<Input placeholder="XXX" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="最佳矫正视力">
              {getFieldDecorator('title3', {
                rules: [
                  {
                    required: true,
                    message: '请输入最佳矫正视力',
                  },
                ],
              })(<Input placeholder="XXX" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="糖尿病史">
              {getFieldDecorator('goal', {
                rules: [
                  {
                    required: true,
                    message: '请输入糖尿病史',
                  },
                ],
              })(<TextArea style={{ minHeight: 32 }} placeholder="请输入病人糖尿病史" rows={4} />)}
            </FormItem>
            <FormItem>
              <Row>
                <Col span={10} offset={7}>
                  <Dragger {...props}>
                    <p className="ant-upload-drag-icon">
                      <Icon type="inbox" />
                    </p>
                    <p className="ant-upload-text">点击或将文件拖拽到此区域上传</p>
                    <p className="ant-upload-hint">支持单个或批量上传，严禁上传10MB以上的文件</p>
                  </Dragger>
                </Col>
              </Row>
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
