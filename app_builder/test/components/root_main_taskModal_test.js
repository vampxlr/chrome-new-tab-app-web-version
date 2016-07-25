import { renderComponent, expect} from '../test_helper'
import Root from '../../components/Root'

// Use "describe" to group together similar tests
describe('root_main_taskModal',function(){
    let component;

    beforeEach(()=>{

        component = renderComponent(Root)
    })

    it("shows the Root_Main_TaskModal element",()=>{
        expect(component.find('.Root_Main_TaskModal')).to.exist
    });

    it("shows the Root_Main_TaskModal_TaskList_table element",()=>{
        expect(component.find('.Root_Main_TaskModal_TaskList_table')).to.exist
    });




});

