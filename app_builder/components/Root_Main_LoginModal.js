import React, {Component} from 'react'
import Root_Main_LoginModal_View from './Root_Main_LoginModal_View'

class Root_Main_LoginModal extends Component {




    render() {

    return (
        <div id="loginModal" className="modal hidden Root_Main_LoginModal">

            <Root_Main_LoginModal_View actions={this.props.actions} login={this.props.login}/>


        </div>


    );
}

}



export default Root_Main_LoginModal
