import { renderComponent, expect} from '../test_helper'
import Root from '../../components/Root'


describe('root_Main',function(){
    let component;

    beforeEach(()=>{

        component = renderComponent(Root)
    })


    it("shows the Root_Main_Header element",()=>{
        expect(component.find('.Root_Main_Header')).to.exist
    });

  it("shows the Root_Main_PageWrapper element",()=>{
        expect(component.find('.Root_Main_PageWrapper')).to.exist
    });

  it("shows the Root_Main_TaskModal element",()=>{
        expect(component.find('.Root_Main_TaskModal')).to.exist
    });

  it("shows the Root_Main_LoginModal element",()=>{
        expect(component.find('.Root_Main_LoginModal')).to.exist
    });


  it("shows the Root_Main_ChangeWorkSpaceModal element",()=>{
        expect(component.find('.Root_Main_changeWorkSpaceModal')).to.exist
    });



});

