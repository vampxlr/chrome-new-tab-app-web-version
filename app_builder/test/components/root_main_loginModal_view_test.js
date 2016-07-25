import { renderComponent, expect} from '../test_helper'
import Root from '../../components/Root'

// Use "describe" to group together similar tests
describe('root_main_loginModal_view',function(){
    let component;

    beforeEach(()=>{

        component = renderComponent(Root)
    })

    it("shows the Root_Main_LoginModal_View element",()=>{
        expect(component.find('.Root_Main_LoginModal_View')).to.exist
    });

    it("shows Login Modal Title element",()=>{
        expect(component.find('.Root_Main_LoginModal_View_Title')).to.exist
    });

    it("shows Login Modal Login Button element",()=>{
        expect(component.find('.Root_Main_LoginModal_View_loginBtn')).to.exist
    });






});

