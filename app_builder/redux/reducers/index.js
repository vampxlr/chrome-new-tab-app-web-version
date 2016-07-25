import {combineReducers} from 'redux'
import todoReducer from './todoReducer'
import loginReducer from './loginReducer'
import syncReducer from './syncReducer'
import jqueryReducer from './jqueryReducer'
import workspaceReducer from './workspaceReducer'

const rootReducer = combineReducers({
    todos_repository: todoReducer,
    login: loginReducer,
    sync: syncReducer,
    jqueryData: jqueryReducer,
    workspaceData: workspaceReducer
})

export default rootReducer