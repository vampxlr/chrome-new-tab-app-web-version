import { renderComponent, expect} from '../test_helper'
import Root from '../../components/Root'
import Root2 from '../../components/Root'

// Use "describe" to group together similar tests
describe('root_main_taskModal_taskList_item',function(){
    this.timeout(150000);

    let component;
    var initialState= {
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

    var secondState = {
        todos_repository:[
            {
                id:0,
                remote:false,
                todos:[
                    {
                        id:0,
                        text:"first",
                        completed:false
                    },
                    {
                        id:1,
                        text:"second",
                        completed:true
                    },
                    {
                        id:2,
                        text:"third",
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

    it("Root_Main_TaskModal_TaskList_Item element exists",()=>{
        expect(component.find('.Root_Main_TaskModal_TaskList_Item')).to.exist;
    });

    it("Task list item has the correct text",()=>{
        expect(component.find('.Root_Main_TaskModal_TaskList_Item_TodoName')).to.have.text('something');
    });

    it("First todo is not complete",()=>{
        expect(component.find('.Root_Main_TaskModal_TaskList_Item_TodoName')).to.not.have.class('underlineText');
    });


    it("Total number of elements is one",()=>{
        expect(component.find('.Root_Main_TaskModal_TaskList_Item_TodoName').length).to.equal(1);
    });


    describe('Testing with second set of data',()=> {
        beforeEach(()=>{

            component = renderComponent(Root,null,secondState)


        })

        it("Total number of elements is four",()=>{
            expect(component.find('.Root_Main_TaskModal_TaskList_Item_TodoName').length).to.equal(4);
        });

        it("Shows the correct text of first task item",()=>{
            expect(component.find('.Root_Main_TaskModal_TaskList_Item_TodoName:eq( 0 )')).to.have.text('first')
        });

        it("Shows the correct text of second task item",()=>{
            expect(component.find('.Root_Main_TaskModal_TaskList_Item_TodoName:eq( 1 )')).to.have.text('second')
        });

        it("Shows the correct text of third task item",()=>{
            expect(component.find('.Root_Main_TaskModal_TaskList_Item_TodoName:eq( 2 )')).to.have.text('third')
        });

        it("Fourth task item has correct text",()=>{
            expect(component.find('.Root_Main_TaskModal_TaskList_Item_TodoName:eq( 3 )')).to.have.text('fourth task element')
        });

        it("First element move up simulation with accurate result",()=>{
            component.find('.Root_Main_TaskModal_TaskList_Item_move_up_btn:eq( 0 )').simulate('click')
            expect(component.find('.Root_Main_TaskModal_TaskList_Item_TodoName:eq( 0 )')).to.have.text('first')
        });

        it("Second element move up simulation with accurate result",()=>{
            component.find('.Root_Main_TaskModal_TaskList_Item_move_up_btn:eq( 1 )').simulate('click')
            expect(component.find('.Root_Main_TaskModal_TaskList_Item_TodoName:eq( 0 )')).to.have.text('second')
        });

        it("First element move down simulation with accurate result",()=>{
            component.find('.Root_Main_TaskModal_TaskList_Item_move_down_btn:eq( 0 )').simulate('click')
            expect(component.find('.Root_Main_TaskModal_TaskList_Item_TodoName:eq( 0 )')).to.have.text('first')
        });

        it("Fourth element move down simulation with accurate result",()=>{
            component.find('.Root_Main_TaskModal_TaskList_Item_move_down_btn:eq( 3 )').simulate('click')
            expect(component.find('.Root_Main_TaskModal_TaskList_Item_TodoName:eq( 3 )')).to.have.text('fourth task element')
        });

        it("Simulate adding new task and check for accurate result",()=>{
            component.find('.Root_Main_TaskModal_InputTask_inputTask_addTask').simulate('change','fifth task')
            component.find('.Root_Main_TaskModal_InputTask_inputTask_addTask').simulate('keyDown',null,{keyCode : 13});
            expect(component.find('.Root_Main_TaskModal_TaskList_Item_TodoName').length).to.equal(5);
        });

        it("Simulate deleting a task and check for accurate result",()=>{
            component.find('.Root_Main_TaskModal_TaskList_Item_delete_btn:eq( 4 )').simulate('click');
            expect(component.find('.Root_Main_TaskModal_TaskList_Item_TodoName').length).to.equal(4);
        });

        it("Simulate task completion check for accurate result",()=>{
            component.find('.Root_Main_TaskModal_TaskList_Item_complete_btn:eq( 0 )').simulate('click');
            expect(component.find('.Root_Main_TaskModal_TaskList_Item_TodoName:eq( 0 )')).to.have.class('underlineText');

        });

    });


    ( __asyncSkip ? describe.skip : describe)('Testing with remote weekplan api',()=> {
        beforeEach(()=>{
            var remoteState = {
                todos_repository:[
                    {
                        id:0,
                        remote:false,
                        todos:[
                            {
                                id:0,
                                text:"first",
                                completed:false
                            },
                            {
                                id:1,
                                text:"second",
                                completed:true
                            },
                            {
                                id:2,
                                text:"third",
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
            component = renderComponent(Root,null,remoteState)
            component.find('#username').simulate('change',__username)
            component.find('#userpass').simulate('change',__password)
            component.find('#login_btn').simulate('click')
            console.log("        * Logging in")
            setTimeout( function () {
                component.find('.Root_Main_Header_nextWorkspaceBtn').simulate('click')
                console.log("        * Changing workspace")
                console.log("        * Current workspace: "+component.find('.workspace_Name').text())
                console.log("        * Number of task items in current workspace: "+component.find('.Root_Main_TaskModal_TaskList_Item_TodoName').length);




            }, __asyncdelay);


        })

        it("Multiple workspaces detected after login",function(done){


            setTimeout( function () {
                __check( done, function() {
                    expect(component.find('.Root_Main_changeWorkSpaceModal_workspaceSelectItem').length).to.not.equal(1)
                    expect(component.find('.Root_Main_changeWorkSpaceModal_workspaceSelectItem').length).to.not.equal(0)

                } )
            }, __asyncdelay);

        });

        //dependent task don't delete or skip
        it("Deleting old task list and adding local todo list to remote",function(done){

            //Deleting old task list before adding local task list
            setTimeout( function () {
                var number_of_task_item = component.find('.Root_Main_TaskModal_TaskList_Item_TodoName').length
                    if(number_of_task_item!==0)
                    {
                        console.log("         * Deleting old task list before adding local task list")
                        for(var i = 0; i < number_of_task_item;i++){

                                component.find('.Root_Main_TaskModal_TaskList_Item_delete_btn:eq( '+ i + ' )').simulate('click');

                            console.log("             * Delete: "+i+ "th task delete request")

                        }
                    }



            }, __asyncdelay+(__asyncdelay/4));



            //Adding local list to remote
            setTimeout(function(){

                component.find('.Root_Main_TaskModal_addLocalTaskListBtn').simulate('click');

            },__asyncdelay*2)

            setTimeout( function () {
                __check( done, function() {

                    expect(component.find('.Root_Main_TaskModal_TaskList_Item_TodoName').length).to.equal(4);
                    expect(component.find('.Root_Main_TaskModal_TaskList_Item_TodoName:eq( 0 )')).to.have.text('first')
                    expect(component.find('.Root_Main_TaskModal_TaskList_Item_TodoName:eq( 1 )')).to.have.text('second')
                    expect(component.find('.Root_Main_TaskModal_TaskList_Item_TodoName:eq( 2 )')).to.have.text('third')

                } )
            }, __asyncdelay*3);

        });

        it("Total number of elements is four",function(done){

            setTimeout( function () {
                __check( done, function() {

                    expect(component.find('.Root_Main_TaskModal_TaskList_Item_TodoName').length).to.equal(4);
                 } )
            }, __asyncdelay+(__asyncdelay/4));

        });

        it("Shows the correct text of first task item",function(done){

            setTimeout( function () {
                __check( done, function() {
                    expect(component.find('.Root_Main_TaskModal_TaskList_Item_TodoName:eq( 0 )')).to.have.text('first')
                } )
            },__asyncdelay+(__asyncdelay/4));
        });

        it("Shows the correct text of second task item",function(done){
            setTimeout( function () {
                __check( done, function() {
                    expect(component.find('.Root_Main_TaskModal_TaskList_Item_TodoName:eq( 1 )')).to.have.text('second')
                } )
            }, __asyncdelay+(__asyncdelay/4));
        });

        it("Shows the correct text of third task item",function(done){
            setTimeout( function () {
                __check( done, function() {
                    expect(component.find('.Root_Main_TaskModal_TaskList_Item_TodoName:eq( 2 )')).to.have.text('third')
                } )
            }, __asyncdelay+(__asyncdelay/4));
        });

        it("Shows the correct text of fourth task item",function(done){
            setTimeout( function () {
                __check( done, function() {
                   expect(component.find('.Root_Main_TaskModal_TaskList_Item_TodoName:eq( 3 )')).to.have.text('fourth task element')
                } )
            }, __asyncdelay+(__asyncdelay/4));
        });

        it("First element move up simulation with accurate result",function(done){

            //move up simulation
            setTimeout( function () {
                component.find('.Root_Main_TaskModal_TaskList_Item_move_up_btn:eq( 0 )').simulate('click')
            }, __asyncdelay+(__asyncdelay/4));



            setTimeout( function () {
                __check( done, function() {
                    expect(component.find('.Root_Main_TaskModal_TaskList_Item_TodoName:eq( 0 )')).to.have.text('first')
                } )
            }, __asyncdelay*2);

        });

        it("Second element move up simulation with accurate result",function(done){

                 //move up simulation
                 setTimeout( function () {
                     component.find('.Root_Main_TaskModal_TaskList_Item_move_up_btn:eq( 1 )').simulate('click')
                 }, __asyncdelay+(__asyncdelay/4));


                //assertion
                 setTimeout( function () {
                     __check( done, function() {
                       expect(component.find('.Root_Main_TaskModal_TaskList_Item_TodoName:eq( 0 )')).to.have.text('second')
                     } )
                 }, __asyncdelay*2);

             });

        it("First element move down simulation with accurate result",function(done){

            //move down simulation
            setTimeout( function () {
                component.find('.Root_Main_TaskModal_TaskList_Item_move_down_btn:eq( 0 )').simulate('click')
            }, __asyncdelay+(__asyncdelay/4));


            //assertion
            setTimeout( function () {
                __check( done, function() {
                    expect(component.find('.Root_Main_TaskModal_TaskList_Item_TodoName:eq( 0 )')).to.have.text('first')
                } )
            }, __asyncdelay*2);

        });

        it("Fourth element move down simulation with accurate result",function(done){

            //move down simulation
            setTimeout( function () {
                component.find('.Root_Main_TaskModal_TaskList_Item_move_down_btn:eq( 3 )').simulate('click')
            }, __asyncdelay+(__asyncdelay/4));


            //assertion
            setTimeout( function () {
                __check( done, function() {
                    expect(component.find('.Root_Main_TaskModal_TaskList_Item_TodoName:eq( 3 )')).to.have.text('fourth task element')
                } )
            }, __asyncdelay*2);

        });

        it("Simulate adding new task and check for accurate result",function(done){

            //move down simulation
            setTimeout( function () {
                component.find('.Root_Main_TaskModal_InputTask_inputTask_addTask').simulate('change','fifth task')
                component.find('.Root_Main_TaskModal_InputTask_inputTask_addTask').simulate('keyDown',null,{keyCode : 13});
            }, __asyncdelay+(__asyncdelay/4));


            //assertion
            setTimeout( function () {
                __check( done, function() {
                    expect(component.find('.Root_Main_TaskModal_TaskList_Item_TodoName').length).to.equal(5);
                } )
            }, __asyncdelay*2);

        });

        it("Simulate deleting a task and check for accurate result",function(done){

            //move down simulation
            setTimeout( function () {
                component.find('.Root_Main_TaskModal_TaskList_Item_delete_btn:eq( 4 )').simulate('click');
            }, __asyncdelay+(__asyncdelay/4));


            //assertion
            setTimeout( function () {
                __check( done, function() {
                    expect(component.find('.Root_Main_TaskModal_TaskList_Item_TodoName').length).to.equal(4);
                } )
            }, __asyncdelay*2);

        });

        it("Simulate task completion check for accurate result",function(done){

            //move down simulation
            setTimeout( function () {
                component.find('.Root_Main_TaskModal_TaskList_Item_complete_btn:eq( 0 )').simulate('click');
            }, __asyncdelay+(__asyncdelay/4));


            //assertion
            setTimeout( function () {
                __check( done, function() {
                    expect(component.find('.Root_Main_TaskModal_TaskList_Item_TodoName:eq( 0 )')).to.have.class('underlineText');
                } )
            }, __asyncdelay*2);

        });

    });









});

