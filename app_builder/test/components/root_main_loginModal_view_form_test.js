import { renderComponent, expect} from '../test_helper'
import Root from '../../components/Root'

// Use "describe" to group together similar tests
describe('root_main_loginModal_view_form',function(){
    let component;

    beforeEach(()=>{

        component = renderComponent(Root)
    })


    it("shows the Root_Main_LoginModal_View_Form element",()=>{
        expect(component.find('.Root_Main_LoginModal_View_Form')).to.exist
    });



    describe('--Entering some text',function(){

        beforeEach(()=>{
            component.find('#username').simulate('change','username')
            component.find('#userpass').simulate('change','userpass')
        })

        it('shows that text is in the username',()=>{
            expect(component.find('#username')).to.have.value('username')
        })

        it('shows that text is in the userpass',()=>{
            expect(component.find('#userpass')).to.have.value('userpass')
        })



    })

});

