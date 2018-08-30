import React, { PureComponent } from 'react';
import { Card, Button } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

export default class Index extends PureComponent {

  handleClick=(e)=>{
    e.preventDefault();
    window.open("https://test0705.oss-cn-shenzhen.aliyuncs.com/The%20SUSTech-SYSU%20dataset%20for%20automatically%20segmenting%20and%20classifying%20corneal%20ulcers/The%20SUSTech-SYSU%20dataset%20for%20automatically%20segmenting%20and%20classifying%20corneal%20ulcers.rar?Expires=1535601664&OSSAccessKeyId=TMP.AQHx1vamy9_gp5WiuNolgAhHVcnU1H4yYsd_SsiJoWP_QpINZ3AjB9-TpvU5MC4CFQDrLmSs1P2DuxpPH_5ROUlInAcy2gIVANLqezm8J9op9sZEG0yVy07tHKt8&Signature=u6cH8ADwzZnM%2F%2BxcxCu%2FKsV63gY%3D");
  }

  render() {
    return (
      <PageHeaderLayout title="我的主页">
        <Card bordered={false}>
          <p><strong>The SUSTech-SYSU dataset for automatically segmenting and classifying corneal ulcers</strong></p>
          <Button type="primary" onClick={this.handleClick}>Download</Button>
        </Card>
      </PageHeaderLayout>
    );
  }
}
