import React from 'react';
import { Col, Row, Table, Button, Modal, Form, DatePicker, Radio, Input } from 'antd';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

class Welcome extends React.Component {

    constructor(props) {
        super(props);
        const dataSource = [{
            key: '1',
            name: '胡彦斌',
            age: 32,
            status: '01',
            address: '西湖区湖底公园1号'
        }, {
            key: '2',
            name: '胡彦祖',
            age: 42,
            status: '02',
            address: '西湖区湖底公园1号'
        }];
        this.state = {
            dataSource: dataSource,
            visible: false,
            start:undefined,
            end:undefined,
            startHalf:0,   // 0, 0.5
            endHalf:0.5,   // 0.5, 1
        }
        this.startDate=this.startDate.bind(this);
        this.endDate=this.endDate.bind(this);
        this.onChange=this.onChange.bind(this);
        this.startHalfChange = this.startHalfChange.bind(this);
        this.endHalfChange = this.endHalfChange.bind(this);
    }
    startDate(value){
        const onChange = this.onChange;
        this.setState({
            start: value
        },onChange)
    }
    endDate(value){
        const onChange = this.onChange;
        this.setState({
            end: value
        },onChange)
    }
    startHalfChange(e){
        const onChange = this.onChange;
        this.setState({
            startHalf: e.target.value==='AM'?0:0.5
        },onChange)
    }
    endHalfChange(e){
        const onChange = this.onChange;
        this.setState({
            endHalf: e.target.value==='AM'?0.5:1
        },onChange)
    }
    onChange(){
        const {start, end, startHalf, endHalf } = this.state;
        if (start&&end) {
            const days = end.diff(start, 'days')
            console.log("when both data selected",
            days)
            this.setState({
                days: days + endHalf-startHalf
            })
        }
    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    }

    handleOk = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }

    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }



    render() {
        const columns = [{
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: '年龄',
            dataIndex: 'age',
            key: 'age',
        }, {
            title: '住址',
            dataIndex: 'address',
            key: 'address',
        }, {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render: text => (text === '01' ? '有效' : '失效'),
        }];
        return (
            <div>
                <Row>
                    <Col>
                        <Button type="primary" onClick={this.showModal}>SHOW</Button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Table bordered={true} dataSource={this.state.dataSource} columns={columns} />
                    </Col>
                </Row>

                <Modal
                    title="Basic Modal"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}>
                    <Form>
                        <FormItem label="开始日期">{<div>
                            <DatePicker onChange={this.startDate}/>
                            <RadioGroup onChange={this.startHalfChange} defaultValue="AM">
                                <RadioButton value="AM">上午</RadioButton>
                                <RadioButton value="PM">下午</RadioButton>
                            </RadioGroup></div>}
                        </FormItem>
                        <FormItem label="结束日期">{<div>
                            <DatePicker  onChange={this.endDate}/>
                            <RadioGroup onChange={this.endHalfChange} defaultValue="AM">
                                <RadioButton value="AM">上午</RadioButton>
                                <RadioButton value="PM">下午</RadioButton>
                            </RadioGroup></div>}
                        </FormItem>
                        <FormItem label="天数">{<div>
                            <Input disabled='true' value={this.state.days}/></div>}
                        </FormItem>
                    </Form>


                </Modal>
            </div>
        );
    }
}

export default Welcome;