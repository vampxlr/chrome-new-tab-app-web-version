import { renderComponent, expect} from '../test_helper'
import Root from '../../components/Root'




// Use "describe" to group together similar tests
describe('root',function(){
    this.timeout(150000);
let component;

    beforeEach(()=>{

        component = renderComponent(Root)

    })


    it("shows the Root element",()=>{
        expect(component.find('.Root')).to.exist
    });

    it("shows the Root_SettingsListDrawer element",()=>{
        expect(component.find('.Root_SettingsListDrawer')).to.exist
    });

    it("shows the Root_Main element",()=>{
        expect(component.find('.Root_Main')).to.exist
    });


   /* it("hidden the task list modal",()=>{
        ///$('.Root').should.have.class('kkk');
        //expect($('#taskModal')).to.have.class('hide')
        expect(component.find('#taskModal')).to.have.class('hidden')
    });*/


    ( __asyncSkip ? describe.skip : describe)('Mock Login',()=> {
        beforeEach(()=>{
            component.find('#username').simulate('change',__username)
            component.find('#userpass').simulate('change',__password)

        })

        it("Username Text box has the correct text on data change",()=>{
            expect(component.find('#username')).to.have.value(__username)

        });

        it("Password Text box has the correct text on data change",()=>{
            expect(component.find('#userpass')).to.have.value(__password)

        });


        it("Change workspace does not exist when not logged in",()=>{
            expect(component.find('#change_workspace_btn')).to.not.exist

        });


        it("does show the change WorkSpace SelectList element when logged in",function(done){
             component.find('#login_btn').simulate('click')

            setTimeout( function () {
                __check( done, function() {
                    //expect(component.find('#Root_Main_changeWorkSpaceSelectList')).to.exist
                    expect(component.find('#change_workspace_btn')).to.exist

                } )
            }, __asyncdelay);

        });




    })

});

