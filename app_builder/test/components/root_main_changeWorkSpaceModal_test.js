import { renderComponent, expect} from '../test_helper'
import Root from '../../components/Root'



// Use "describe" to group together similar tests
 describe('root_main_changeWorkSpaceModal',function(){
    this.timeout(150000);

    let component;

    beforeEach(()=>{

        component = renderComponent(Root)
    })

    it("WorkSpace Modal element exists",()=>{
        expect(component.find('.Root_Main_changeWorkSpaceModal')).to.exist
    });

     it("Workspace Title Container element exists",()=>{
        expect(component.find('.Root_Main_changeWorkspaceTitleContainer')).to.exist
    });

     it("Workspace Title element exists",()=>{
        expect(component.find('.Root_Main_changeWorkspaceTitle')).to.exist
    });

     it("Workspace Form element exists",()=>{
        expect(component.find('#Root_Main_changeWorkspaceForm')).to.exist
     });

     it("does not show the change WorkSpace SelectList element when not logged in",()=>{
        expect(component.find('#Root_Main_changeWorkSpaceSelectList')).to.not.exist

     });

    it("does not show the change_workspace_btn element when not logged in",()=>{
        expect(component.find('#change_workspace_btn')).to.not.exist
    });

    it("Root_Main_changeWorkSpaceSelectList element exists",()=>{
        expect(component.find('.Root_Main_changeWorkSpaceSelectList')).to.exist
    });






});

