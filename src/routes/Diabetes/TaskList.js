import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Alert, Button, Card, Col, DatePicker, Form, Input, message, Row, Table } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

const { RangePicker } = DatePicker;
@connect(({ rule, loading, report }) => ({
  rule,
  loading: loading.models.rule,
  report,
}))
@Form.create()
export default class TaskList extends PureComponent {
  constructor(props) {
    super(props);
    const { dispatch } = this.props;
    dispatch({
      type: 'report/getReports',
    });
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'rule/fetch',
    });
  }
  handleClick = e => {
    e.preventDefault();
    message.success('操作成功');
  };
  render() {
    const that = this;
    console.log(this.props);
    let formatedData;
    if (this.props.report.data && this.props.report.data.data) {
      formatedData = this.props.report.data.data;
    }
    this.setState({ data: formatedData });
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

    console.log(formatedData);
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

    return (
      <PageHeaderLayout title="查询表格">
        <Card bordered={false}>
          <div hidden="true">
            <Alert message="Welcome!!!!" type="error"/>
          </div>
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
                  <Input placeholder={'Something'} />
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
              dataSource={formatedData || []}
              className="table"
            />
          </div>
        </Card>
      </PageHeaderLayout>
    );
  }
}
