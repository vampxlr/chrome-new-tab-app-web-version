import React , { Component } from 'react'
import Root_Main_PageWrapper from './Root_Main_PageWrapper'
import Root_Main_TaskModal from './Root_Main_TaskModal'
import Root_Main_LoginModal from './Root_Main_LoginModal'
import Root_Main_ChangeWorkSpaceModal from './Root_Main_ChangeWorkSpaceModal'
import Root_Main_Header from './Root_Main_Header'

import {connect} from 'react-redux'

class Root_Main extends Component {

    render() {
    return (
        <main className="mdl-layout__content Root_Main">
            <Root_Main_Header actions={this.props.actions} workspaceData={this.props.workspaceData} login={this.props.login} />

            <Root_Main_PageWrapper workspaceData={this.props.workspaceData} actions={this.props.actions} todos={this.props.todos}  />

            <Root_Main_TaskModal todos_repository={this.props.todos_repository} actions={this.props.actions} todos={this.props.todos} workspaceData={this.props.workspaceData}/>

            <Root_Main_LoginModal actions={this.props.actions} login={this.props.login} />

            <Root_Main_ChangeWorkSpaceModal workspaceData={this.props.workspaceData} actions={this.props.actions}/>

        </main>
    );
}
}





export default Root_Main



