import { renderComponent, expect} from '../test_helper'
import Root from '../../components/Root'

// Use "describe" to group together similar tests
describe('root_main_taskModal_inputTask',function(){
    let component;

    beforeEach(()=>{

        component = renderComponent(Root)
    })

  it("shows the Root_Main_TaskModal_InputTask element",()=>{
        expect(component.find('.Root_Main_TaskModal_InputTask')).to.exist
    });

  it("shows the Root_Main_TaskModal_InputTask_inputTask_addTask element",()=>{
        expect(component.find('.Root_Main_TaskModal_InputTask_inputTask_addTask')).to.exist
    });

  it("shows the Root_Main_TaskModal_InputLabel element",()=>{
        expect(component.find('.Root_Main_TaskModal_InputLabel')).to.exist
    });

    describe('Mock Enter Text in new task input',()=> {
        beforeEach(()=>{
            component.find('.Root_Main_TaskModal_InputTask_inputTask_addTask').simulate('change','new task')


        })

        it("check value entered",()=>{
            expect(component.find('.Root_Main_TaskModal_InputTask_inputTask_addTask')).to.have.value('new task')

        });

        describe('Mock Submit Text in new task input',()=> {
            beforeEach(()=>{
              // component.find('.Root_Main_TaskModal_InputTask_inputTask_addTask').simulate('keyDown',null,{keyCode : 13});


            })

            it("check value entered",()=>{
               // expect(component.find('.Root_Main_TaskModal_InputTask_inputTask_addTask')).to.have.value('new task')

            });

        })



    })

});

