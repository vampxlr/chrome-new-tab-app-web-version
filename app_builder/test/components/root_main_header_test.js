import { renderComponent, expect} from '../test_helper'
import Root from '../../components/Root'

// Use "describe" to group together similar tests
describe('Before root_main_header',function(){
    this.timeout(150000);
    let component;

    beforeEach(()=>{

        component = renderComponent(Root)
    })

    it("Root_Main_Header element exists",()=>{
        expect(component.find('.Root_Main_Header')).to.exist
    });

    it("Workspace Title element exists",()=>{
        expect(component.find('#Root_Main_Header_workspaceTitle')).to.exist
    });

    it("Tasks Btn element exists",()=>{
        expect(component.find('.Root_Main_Header_tasksBtn')).to.exist
    });

    it("Refresh Btn does not exists before login",()=>{
        expect(component.find('.Root_Main_Header_refreshBtn')).to.not.exist
    });

    ( __asyncSkip ? describe.skip : describe)('After Login root_main_header',()=> {

        beforeEach(()=>{
            component.find('#username').simulate('change',__username)
            component.find('#userpass').simulate('change',__password)
            component.find('#login_btn').simulate('click')

        })

        it("Refresh Btn does exists after login",function(done){

            setTimeout( function () {
                __check( done, function() {
                    expect(component.find('.Root_Main_Header_refreshBtn')).to.exist

                } )
            }, __asyncdelay);

        });






    })

});

