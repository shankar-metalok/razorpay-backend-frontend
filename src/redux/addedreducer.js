
const Addedcart = (state=[],action)=>{
    switch(action.type){
        case 'added' : return [...state,action.payload];
        case 'del' : return state.length;
        default : return state

    }

}

export default Addedcart