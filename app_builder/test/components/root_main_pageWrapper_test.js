import { renderComponent, expect} from '../test_helper'
import Root from '../../components/Root'

// Use "describe" to group together similar tests
describe('root_main_pageWrapper',function(){
    this.timeout(150000)
    let component;


    let initialState= {
        todos_repository:[
            {
                id:0,
                remote:false,
                todos:[
                    {
                        id:0,
                        text:"something",
                        completed:false
                    }
                ],
                workspace_id:null,
                workspace_name:"local"
            }
        ],
        login:[
            {
                status:false
            }
        ],
        workspaceData:[

            {
                id:0,
                name:"Local Workspace",
                active:true
            }
        ]
    };

    let secondState= {
        todos_repository:[
            {
                id:0,
                remote:false,
                todos:[
                    {
                        id:0,
                        text:"firsts",
                        completed:true
                    },
                    {
                        id:1,
                        text:"seconds",
                        completed:true
                    },
                    {
                        id:2,
                        text:"thirds",
                        completed:false
                    },
                    {
                        id:3,
                        text:"fourth task element",
                        completed:false
                    }

                ],
                workspace_id:null,
                workspace_name:"local"
            }
        ],
        login:[
            {
                status:false
            }
        ],
        workspaceData:[

            {
                id:0,
                name:"Local Workspace",
                active:true
            }
        ]
    };

    beforeEach(()=>{

        component = renderComponent(Root,null,initialState)
    })

    it("Root_Main_PageWrapper element exists",()=>{
        expect(component.find('.Root_Main_PageWrapper')).to.exist
    });

    it("Next Task Title Container element exists",()=>{
        expect(component.find('.Root_Main_PageWrapper_nextTaskTitleContainer')).to.exist
    });



     it("Next Task Title element exists",()=>{
        expect(component.find('.Root_Main_PageWrapper_nextTaskTitle')).to.exist
    });

    it("Next Task Container element exists",()=>{
        expect(component.find('.Root_Main_PageWrapper_nextTaskContainer')).to.exist
    });

    it("Next Task Label element exists",()=>{
        expect(component.find('.Root_Main_PageWrapper_nextTaskLabel')).to.exist
    });

     it("Complete CheckBox element exists",()=>{
        expect(component.find('.Root_Main_PageWrapper_completeCheckBox')).to.exist
    });

     it("Next Task Text element exists",()=>{
        expect(component.find('.Root_Main_PageWrapper_nextTaskText')).to.exist
    });

      it("Next Task Text element exists",()=>{
          expect(component.find('.Root_Main_PageWrapper_nextTaskText')).to.have.text('something')
      });


    describe('Testing with second set of data.',function(){

        beforeEach(()=>{

            component = renderComponent(Root,null,secondState)
        })

        it("Next Task Text element excludes completed task.",()=>{
            expect(component.find('.Root_Main_PageWrapper_nextTaskText')).to.have.text('thirds')
        });

        it("Next Task Text element is not underlined before complete task is clicked.",()=>{
            expect(component.find('.Root_Main_PageWrapper_nextTaskText')).to.not.have.class('underlineText')
        });

        it("Next Task Text element has the right value after 1s of complete task click.",function(done){
            component.find('.Root_Main_PageWrapper_completeCheckBox').simulate('click')

            setTimeout( function () {
                __check( done, function() {
                    expect(component.find('.Root_Main_PageWrapper_nextTaskText')).to.have.text('fourth task element')
                } )
            }, 3000);

        });



        it("Next Task Text element is underlined after complete task click.",()=>{
           component.find('.Root_Main_PageWrapper_completeCheckBox').simulate('click')
           expect(component.find('.Root_Main_PageWrapper_nextTaskText')).to.have.class('underlineText')
        });


    })



    });

