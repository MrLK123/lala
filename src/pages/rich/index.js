import React from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {Card,Button,Modal} from 'antd';
import draftToHtml from 'draftjs-to-html';
export default class RichText extends React.Component{
    state={}
    // 监控文本
    onContentStateChange=(draftContent)=>{
        this.setState({
            draftContent
        })
    }
    // 清空
   
    handleClearContent=()=>{
        this.setState({
            editorState:"",
            draftContent:""
        })
    }
    onEditorStateChange=(editorState)=>{
                this.setState({
                    editorState
                })
    }
    // 获取富文本
    getHTML=()=>{
        if(draftToHtml(this.state.draftContent)){
            this.setState({
            showDraft:true
            })
        }else{
            Modal.info({
                title:"温馨提示",
                content:"文本处尚未编辑任何信息"
            })
        }
        
    }
    render(){
        const {editorState}=this.state;
        return (
            <div>
                <Card >
                    <Button type="primary" style={{marginRight:10}} onClick={this.handleClearContent}>清空内容</Button>
                    <Button type="primary" onClick={this.getHTML} >获取HTML文本</Button>
                </Card>
                <Card title="富文本编辑器">
                <Editor
                    editorState={editorState}
                    onContentStateChange={this.onContentStateChange}
                    onEditorStateChange={this.onEditorStateChange}
                    />
                </Card>
                <Modal title="富文本"
                    visible={this.state.showDraft}
                    onCancel={()=>{
                        this.setState({
                            showDraft:false
                        })
                    }}
                    footer={null}
                >
                {draftToHtml(this.state.draftContent)}
                </Modal>
            </div>
        )
    }
}