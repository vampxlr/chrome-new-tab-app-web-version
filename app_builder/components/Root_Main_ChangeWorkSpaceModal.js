import React from 'react'
var Root_Main_ChangeWorkSpaceModal = React.createClass({

    //this.props.workspaceData.filter(this.filterActive)[0]
    filterActive: (obj)=>{
        return obj.active;
    },

    changeWorkspace: function(event){
        console.log(event.target.value)
        this.props.actions.workspace_local_setActiveWorkspace(event.target.value)
        this.props.actions.jquery_dom_closeAllModals()
    },
    render: function() {
        return (
            <div id="ChangeWorkSpaceModal" className="modal hidden Root_Main_changeWorkSpaceModal">

                <div id="change-workspace-view" className="mdl-card mdl-shadow--6dp">
                    <div id="change-workspace-title-container " className="mdl-card__title mdl-color-text--white Root_Main_changeWorkspaceTitleContainer">
                        <h2 className="mdl-card__title-text Root_Main_changeWorkspaceTitle">Workspace</h2>
                    </div>
                    <div className="mdl-card__supporting-text change-work-space-body">
                        <form action="#" id="Root_Main_changeWorkspaceForm">
                            <div className="mdl-select mdl-js-select mdl-select--floating-label">
                                <select id="Root_Main_changeWorkSpaceSelectList" onChange={this.changeWorkspace} value={this.props.workspaceData.filter(this.filterActive)[0].id} className="mdl-select__input Root_Main_changeWorkSpaceSelectList" id="workspace" name="workspace">


                                    { this.props.workspaceData.map(function(item) {
                                        return <option className="Root_Main_changeWorkSpaceModal_workspaceSelectItem" key={item.id} value={item.id}  >{item.name}</option>
                                    })
                                    }



                                </select>
                                <label className="mdl-select__label" htmlFor="workspace">Workspace</label>
                            </div>
                        </form>
                    </div>

                </div>


            </div>

        );
    }
});
export default Root_Main_ChangeWorkSpaceModal

