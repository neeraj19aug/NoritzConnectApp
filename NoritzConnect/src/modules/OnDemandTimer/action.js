import { DERCEASE_TIME, RESET_TIMER, NEW_TIMER } from "./types";






export const TimerSetting = () => (
    dispatch: ReduxDispatch

) => {
    dispatch({
        type: DERCEASE_TIME
        
      });

    
}

export const NewTimerSet = (time) => (
    dispatch: ReduxDispatch

) => {
    dispatch({
        type: NEW_TIMER,
        time

        
      });

    
}

export const ResetTimer = () => (
    dispatch: ReduxDispatch

) => {
    dispatch({
        type: RESET_TIMER,
    

        
      });

    
}






// export function DerceaseTimer() {
//     return {
//       type: DERCEASE_TIME,
//     };
//   }



//   export function ResetTimer() {
//     return {
//       type: RESET_TIMER,
//     };
//   }