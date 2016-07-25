import { renderComponent, expect} from '../test_helper'
import Root from '../../components/Root'

// Use "describe" to group together similar tests
describe('Before Login root_settingsListDrawer',function(){
    this.timeout(150000);

    let component;

    beforeEach(()=>{

        component = renderComponent(Root)
    })

    it("shows the Root_SettingsListDrawer element",()=>{
        expect(component.find('.Root_SettingsListDrawer')).to.exist
    });

    it("Change workspace btn element does not exists before login",()=>{
        expect(component.find('.Root_SettingsListDrawer_change_workspace_btn')).to.not.exist
     });

    it("Login button element does exists before login",()=>{
        expect(component.find('.Root_SettingsListDrawer_login_btn')).to.exist
     });

    it("Logout button element does not exists before login",()=>{
        expect(component.find('.Root_SettingsListDrawer_logout_btn')).to.not.exist
     });




    ( __asyncSkip ? describe.skip : describe)('After Login root_settingsListDrawer',()=> {

        beforeEach(()=>{
            component.find('#username').simulate('change',__username)
            component.find('#userpass').simulate('change',__password)
            component.find('#login_btn').simulate('click')

        })

        it("Change workspace btn element does exists after login",function(done){

            setTimeout( function () {
                __check( done, function() {
                    expect(component.find('.Root_SettingsListDrawer_change_workspace_btn')).to.exist

                } )
            }, __asyncdelay);

        });


         it("Login button btn element does not exists after login",function(done){

            setTimeout( function () {
                __check( done, function() {
                    expect(component.find('.Root_SettingsListDrawer_login_btn')).to.not.exist

                } )
            }, __asyncdelay);

        });


        it("Logout button element does exists after login",function(done){

            setTimeout( function () {
                __check( done, function() {
                    expect(component.find('.Root_SettingsListDrawer_logout_btn')).to.exist

                } )
            }, __asyncdelay);

        });






    })



});

