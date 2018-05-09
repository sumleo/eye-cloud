import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Alert, Table, Card, Form, Input, Row, Col, Button,DatePicker } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

const {RangePicker}=DatePicker;
@connect(({ rule, loading }) => ({
  rule,
  loading: loading.models.rule,
}))
@Form.create()
export default class TaskList extends PureComponent {
  state = {
    selectedRows: [],
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'rule/fetch',
    });
  }
  handleClick = e => {
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
    const that = this;
    function renderAction() {
      return (
        <div>
          <a onClick={e => that.handleClick(e)}>修改</a>
          <span> | </span>
          <a onClick={e => that.handleClick(e)}>删除</a>
          <span> | </span>
          <a onClick={e => that.handleClick(e)}>诊断报告预览</a>
          <span> | </span>
          <a onClick={e => that.handleClick(e)}>下载诊断结果</a>
        </div>
      );
    }

    function expandedRowRender(record) {
      return <div>{record.description}</div>;
    }
    const FormItem = Form.Item;
    const columns = [
      { title: '姓名', dataIndex: 'name', key: 'name' },
      { title: '年龄', dataIndex: 'age', key: 'age' },
      { title: '状态信息', dataIndex: 'info', key: 'info' },
      { title: '状态得分', dataIndex: 'score', key: 'score' },
      { title: '判断结果', dataIndex: 'result', key: 'result' },
      { title: '运行状态进度', dataIndex: 'progress', key: 'progress' },
      { title: '日期', dataIndex: 'date', key: 'date' },
      { title: '运算时间', dataIndex: 'computeTime', key: 'computeTime' },
      { title: '作者', dataIndex: 'author', key: 'author' },
      { title: '操作', dataIndex: '', key: 'x', render: renderAction },
    ];

    const data = [
      {
        key: 1,
        name: '胡彦斌',
        age: 32,
        info: '良好',
        score: '90',
        progress: '100%',
        result:"右眼",
        author: 'Leo Liu',
        date:'2018/5/9',
        computeTime:"0.2s",
        address: '西湖区湖底公园1号',
        description: '一些具体病情',
      },
      {
        key: 2,
        name: '吴彦祖',
        age: 42,
        info: '良好',
        score: '90',
        progress: '100%',
        result:"右眼",
        date:'2018/5/9',
        computeTime:"0.2s",
        author: 'Leo Liu',
        address: '西湖区湖底公园2号',
        description: '我是吴彦祖，今年42岁，住在西湖区湖底公园2号。',
      },
      {
        key: 3,
        name: '李大嘴',
        age: 32,
        info: '良好',
        score: '90',
        progress: '100%',
        author: 'Leo Liu',
        result:"左眼",
        date:'2018/5/9',
        computeTime:"0.2s",
        address: '西湖区湖底公园3号',
        description: '我是李大嘴，今年32岁，住在西湖区湖底公园3号。',
      },
    ];

    return (
      <PageHeaderLayout title="查询表格">
        <Card bordered={false}>
          <Alert message="Welcome!!!!" type="error" />
          <Form>
            <FormItem>
              <Row>
                <Col span={6}>
                  <Input placeholder="Search something" />
                </Col>
                <Col span={4} offset={1}>
                  <Button>Search</Button>
                </Col>
              </Row>
            </FormItem>
            <FormItem>
              <Row>
                <Col span={6}>
                  <RangePicker />
                </Col>
                <Col span={6} offset={1}>
                  <Input placeholder={"Something"} />
                </Col>
                <Col span={4} offset={1}>
                  <Button>Advance Search</Button>
                </Col>
              </Row>
            </FormItem>
          </Form>
          <div>
            <Table
              columns={columns}
              expandedRowRender={expandedRowRender}
              dataSource={data}
              className="table"
            />
          </div>
        </Card>
      </PageHeaderLayout>
    );
  }
}
