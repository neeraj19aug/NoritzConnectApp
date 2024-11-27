import { DERCEASE_TIME, NEW_TIMER, RESET_TIMER } from "./types"


const inititalState = {
    Counter:0
}
const reducer = (state: State = inititalState, action) => {

    switch (action.type) {
        case DERCEASE_TIME :
            return{
                ...state,
                Counter : state.Counter -1


        }
        case RESET_TIMER :
            return{
                ...state,
                Counter : 0


        }
        case NEW_TIMER  :
            return{
                ...state,

                Counter : action.time


        }
        default:
            return state;
        }
}




export default reducer;