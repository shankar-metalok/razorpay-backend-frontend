
const Addedcart = (state=[],action)=>{
    switch(action.type){
        case 'added' : return [...state,action.payload];
        case 'del' : return state.filter((each,index)=>{return index!==action.payload});
        default : return state

    }

}

export default Addedcart