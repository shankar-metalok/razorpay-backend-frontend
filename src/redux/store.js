import {createStore} from 'redux'
import { combineReducers } from 'redux'

import Addedcart from '../redux/addedreducer'

const store = createStore(
    combineReducers({
        
        Addedcart:Addedcart

    })
)
export default store