import { renderComponent, expect} from '../test_helper'
import Root from '../../components/Root'

// Use "describe" to group together similar tests
describe('root_main_taskModal_taskList',function(){
    let component;

    beforeEach(()=>{

       component = renderComponent(Root)
    })

    it("Root_Main_TaskModal_TaskList element exists",()=>{
        expect(component.find('.Root_Main_TaskModal_TaskList')).to.exist
    });

    it("Root_Main_TaskModal_TaskList_table element exists",()=>{
        expect(component.find('.Root_Main_TaskModal_TaskList_table')).to.exist
    });







});

