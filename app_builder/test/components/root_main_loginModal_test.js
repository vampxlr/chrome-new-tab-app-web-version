import { renderComponent, expect} from '../test_helper'
import Root from '../../components/Root'

// Use "describe" to group together similar tests
describe('root_main_loginModal',function(){
    let component;

    beforeEach(()=>{

        component = renderComponent(Root)
    })


    it("shows the Root_Main_LoginModal element",()=>{
        expect(component.find('.Root_Main_LoginModal')).to.exist
    });


});

