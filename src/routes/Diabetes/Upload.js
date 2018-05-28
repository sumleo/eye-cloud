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
  showUploadList: true,
  action: 'http://localhost:3000/upload/image',
  multiple: true,
  listType: 'picture',
};
@connect(({ loading }) => ({
  submitting: loading.effects['form/submitRegularForm'],
}))
@Form.create()
export default class BasicForms extends PureComponent {
  state = {
    fileList: [],
  };
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
  handleFileChange = item => {
    console.log(Object.keys(item));
    const { file, fileList, event } = item;
    console.log(file);
    console.log(fileList);
    console.log(event);
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
      <PageHeaderLayout title="上传图片">
        <Card bordered={false}>
          <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
            <FormItem {...formItemLayout} label="姓名">
              {getFieldDecorator('name', {
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
                {getFieldDecorator('sex', {
                  initialValue: '男',
                })(
                  <Radio.Group>
                    <Radio value="男">男</Radio>
                    <Radio value="女">女</Radio>
                  </Radio.Group>
                )}
              </div>
            </FormItem>
            <FormItem {...formItemLayout} label="年龄">
              {getFieldDecorator('age', {
                rules: [
                  {
                    required: true,
                    message: '请输入年龄',
                  },
                ],
              })(<Input placeholder="XXX" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="最佳矫正视力">
              {getFieldDecorator('vision', {
                rules: [
                  {
                    required: true,
                    message: '请输入最佳矫正视力',
                  },
                ],
              })(<Input placeholder="XXX" />)}
            </FormItem>
            {/*<FormItem {...formItemLayout} label="糖尿病史">*/}
            {/*{getFieldDecorator('goal', {*/}
            {/*rules: [*/}
            {/*{*/}
            {/*required: true,*/}
            {/*message: '请输入糖尿病史',*/}
            {/*},*/}
            {/*],*/}
            {/*})(<TextArea style={{ minHeight: 32 }} placeholder="请输入病人糖尿病史" rows={4} />)}*/}
            {/*</FormItem>*/}
            <FormItem {...formItemLayout} label="糖尿病史">
              <div>
                {getFieldDecorator('history', {
                  initialValue: '是',
                })(
                  <Radio.Group>
                    <Radio value="是">是:</Radio>
                    <Radio value="否:(情况不明)">否:(情况不明)</Radio>
                  </Radio.Group>
                )}
                <FormItem style={{ marginBottom: 0 }}>
                  {getFieldDecorator('years')(
                    <Input
                      placeholder="年"
                      style={{
                        margin: '8px 0',
                        display: getFieldValue('history') === '是' ? 'block' : 'none',
                      }}
                    />
                  )}
                </FormItem>
              </div>
            </FormItem>
            <FormItem>
              <Row>
                <Col span={10} offset={7}>
                  <Dragger {...props} onChange={this.handleFileChange}>
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
