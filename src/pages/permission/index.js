import React from 'react';
import { Card, Button, Modal, message, Form, Select, Input, Tree, Transfer } from 'antd';
import ETable from './../../components/ETable';
import Utils from './../../utils/utils';
import axios from './../../axios'
import menuConfig from './../../menuConfig';

const FormItem = Form.Item;
const Option = Select.Option;
const { TreeNode } = Tree;
export default class PermissUser extends React.Component {
    state = {}
    componentWillMount() {
        axios.requesList(this, '/role/list', {});
    }
    handleCreate = () => {
        this.setState({
            isroleShow: true
        })
    }
    // 权限设置
    handlePermission = () => {
        let data = this.state.selectedItem;
        if (!data) {
            Modal.info({
                content: '请选择一个角色'
            })
        } else {
            this.setState({
                isPermVisible: true,
                detailInfo: data,
                menuInfo: data.menus
            })
        }

    }
    // 确认提交权限
    handlePermEditSubmit = () => {
        let data = this.PermForm.props.form.getFieldsValue();
        data.role_id = this.state.selectedItem;
        data.menus = this.state.menuInfo;

        axios.ajax({
            url: "/role/create",//假装接口
            data: {
                params: { ...data }
            }
        }).then(res => {
            if (res.status === "10001") {
                this.setState({
                    isPermVisible: false,
                })
                message.success("设置成功");
                axios.requesList(this, '/role/list', {});
            }
        })
    }
    // 用户授权
    handleUserAuth = () => {
        let data = this.state.selectedItem;
        if (!data) {
            Modal.info({
                content: '请选择一个角色'
            })
        } else {
            this.setState({
                isAuthVisible: true,
                detailInfo: data
            })
            axios.ajax({
                url: "/role/user/list",
                data: {
                    params: { ...data }
                }
            }).then(res => {
                if (res) {
                    this.authUserList(res.result)
                }
            })
        }
    }
    // 筛选目标用户
    authUserList = (data) => {
        let mockSource = [];
        let targetKeys = [];
        if (data && data.length) {
            data.map(item => {
                let itemData = {
                    key: item.user_id,
                    title: item.user_name,
                    status: item.status
                };
                if (item.status == 1) {
                    targetKeys.push(itemData.key)
                }
                mockSource.push(itemData)
            })
            this.setState({
                mockSource, targetKeys
            })
        }
    }
    // 提交授权
    handleAuthUser=()=>{
        let data={};
        data.user_ids=this.state.targetKeys;
        data.role_id=this.state.selectedItem.id;
       axios.ajax({
           url:"/user_role_edit",
           data:{
               params:{...data}
           }
       }).then(res=>{
           if(res.status=="10001"){
               message.success('设置成功')
               this.setState({
                   isAuthVisible:false
               })
               axios.requesList(this, '/role/list', {});
           }
       })
    }
    handleSubmit = () => {
        let data = this.formRoleData.props.form.getFieldsValue();
        axios.ajax({
            url: "/role/create",
            data: {
                params: data
            }
        }).then(res => {
            if (res.status == '10001') {
                this.setState({
                    isroleShow: false
                })
                axios.requesList(this, '/role/list', {});
                this.formRoleData.props.form.resetFields();
                message.success("创建成功")
            }
        })
    }

    render() {
        const columns = [
            {
                title: "角色ID",
                dataIndex: "id"
            },
            {
                title: '角色名称',
                dataIndex: 'role_name'
            },
            {
                title: '创建时间',
                dataIndex: 'create_time'
            },
            {
                title: "使用状态",
                dataIndex: "status",
                render: (status) => {
                    return status === 1 ? "启用" : "停用";
                }
            },
            {
                title: "授权时间",
                dataIndex: "authorize_time",
                render(tiem) {
                    return Utils.formateDate(tiem);
                }
            }
            ,
            {
                title: "授权人",
                dataIndex: "authorize_user_name"
            }
        ]
        return (
            <div>
                <Card>
                    <Button type="primary" onClick={this.handleCreate}>创建角色</Button>
                    <Button type="primary" onClick={this.handlePermission} style={{ margin: "0 10px" }}>设置权限</Button>
                    <Button type="primary" onClick={this.handleUserAuth}>用户授权</Button>
                </Card>
                <div>
                    <ETable
                        updateSelectedItem={Utils.updateSelectedItem.bind(this)}
                        selectedRowKeys={this.state.selectedRowKeys}
                        selectedItem={this.state.selectedItem}
                        dataSource={this.state.dataSource}
                        columns={columns}
                    />
                </div>
                <Modal
                    title="创建角色"
                    visible={this.state.isroleShow}
                    onCancel={
                        () => {
                            this.formRoleData.props.form.resetFields();
                            this.setState({ isroleShow: false });
                        }
                    }
                    onOk={() => this.handleSubmit()}
                >
                    <FormRole wrappedComponentRef={info => this.formRoleData = info} />
                </Modal>
                <Modal
                    title="设置权限"
                    visible={this.state.isPermVisible}
                    width={600}
                    onOk={() => this.handlePermEditSubmit()}
                    onCancel={() => {
                        this.setState({
                            isPermVisible: false
                        })
                    }}
                >
                    <PermEditForm
                        wrappedComponentRef={info => this.PermForm = info}
                        detailInfo={this.state.detailInfo}
                        menuInfo={this.state.menuInfo}
                        patchMenuInfo={(checkedKeys) => {
                            this.setState({
                                menuInfo: checkedKeys
                            })
                        }}
                    />
                </Modal>
                <Modal
                    title="用户授权"
                    visible={this.state.isAuthVisible}
                    width={800}
                    onOk={() => this.handleAuthUser()}
                    onCancel={() => {
                        this.setState({
                            isAuthVisible: false
                        })
                    }}
                >
                    <RoleUserForm
                        wrappedComponentRef={info => this.authUserForm = info}
                        detailInfo={this.state.detailInfo}
                        dataSource={this.state.mockSource}
                        targetKeys={this.state.targetKeys}
                        authKeysChange={(targetKeys)=>this.setState({
                            targetKeys
                        })}
                    />
                </Modal>
            </div>
        )
    }
}





class FormRole extends React.Component {
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                span: 6
            },
            wrapperCol: {
                span: 14
            }
        }
        return (
            <Form>
                <FormItem label="角色名称" {...formItemLayout}>
                    {
                        getFieldDecorator("user_name", {
                            initialValue: ""
                        })(
                            <Input type="text" placeholder="请输入角色名称" />
                        )
                    }
                </FormItem>
                <FormItem label="是否开启" {...formItemLayout}>
                    {
                        getFieldDecorator("status", {
                            initialValue: 0
                        })(
                            <Select>
                                <Option value={1}>
                                    开启
                      </Option>
                                <Option value={0}>
                                    关闭
                      </Option>
                            </Select>
                        )
                    }
                </FormItem>

            </Form>
        )
    }
}
FormRole = Form.create({})(FormRole);

class PermEditForm extends React.Component {
    renderTreeNode = (data) => {
        return data.map(item => {
            if (item.children) {
                return (<TreeNode title={item.title} key={item.key}>
                    {this.renderTreeNode(item.children)}
                </TreeNode>)
            }
            return <TreeNode title={item.title} key={item.key}></TreeNode>
        })

    }
    onCheck = (checkedKeys) => {
        this.props.patchMenuInfo(checkedKeys);
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                span: 6
            },
            wrapperCol: {
                span: 19
            }
        }
        const { detailInfo, menuInfo } = this.props;


        return (
            <Form layout='horizontal' {...formItemLayout}>
                <FormItem label="角色名称">
                    <Input disabled placeholder={detailInfo.role_name} />
                </FormItem>
                <FormItem label="状态" {...formItemLayout}>
                    {
                        getFieldDecorator("state", {
                            initialValue: "0"
                        })(
                            <Select>
                                <Option value="0">停用</Option>
                                <Option value="1">
                                    启用
                              </Option>
                            </Select>
                        )
                    }
                </FormItem>
                <Tree
                    checkable
                    defaultExpandAll
                    onCheck={this.onCheck}
                    checkedKeys={menuInfo}
                >
                    <TreeNode title="英雄权限" key="platform_all">
                        {this.renderTreeNode(menuConfig)}
                    </TreeNode>
                </Tree>
            </Form>
        )
    }
}
PermEditForm = Form.create({})(PermEditForm);
class RoleUserForm extends React.Component {
    handleChange = (nextTargetKeys) => {
        this.props.authKeysChange( nextTargetKeys );
      };
    
    filterOption = (inputValue, option) => option.title.indexOf(inputValue) > -1;
    render() {
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: {
                span: 6
            },
            wrapperCol: {
                span: 19
            }
        }
        const { detailInfo, menuInfo } = this.props;


        return (
            <Form layout='horizontal' {...formItemLayout}>
                <FormItem label="角色名称">
                    <Input disabled placeholder={detailInfo.role_name} />
                </FormItem>
                <FormItem label="选择用户">
                    <Transfer
                        dataSource={this.props.dataSource}
                        listStyle={{width:200,height:400}}
                        titles={['未选用户', '已选用户']}
                        showSearch
                        locale={{ searchPlaceholder: "请输入用户名" }}
                        filterOption={this.filterOption}
                        targetKeys={this.props.targetKeys}
                        render={item => item.title}
                        onChange={this.handleChange}
                    />
                </FormItem>

            </Form>
        )
    }
}
RoleUserForm = Form.create({})(RoleUserForm);