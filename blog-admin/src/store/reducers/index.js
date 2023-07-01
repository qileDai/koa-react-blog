import { CHANGINPUT, ADDBBIMN, DELEMTITEM ,UPDATEINFO } from "../actions/actionTypes";
const defaultState = {
  token:'',
  userInfo: {
    username:'',
    user_id:'',
    roleType:''
  },
};
export default (state = defaultState, action) => {
  if (action.type === CHANGINPUT) {
    // Reducer 里只能接受 state 不能改变state
    let newStade = JSON.parse(JSON.stringify(state));
    newStade.inputValue = action.value;
    return newStade;
  }
  if (action.type === ADDBBIMN) {
    let newStade = JSON.parse(JSON.stringify(state));
    newStade.list.push(newStade.inputValue);
    return newStade;
  }
  if (action.type === DELEMTITEM) {
    let newStade = JSON.parse(JSON.stringify(state));
    newStade.list.splice(action.value, 1);
    return newStade;
  }
  if (action.type === UPDATEINFO){
      let newStade = JSON.parse(JSON.stringify(state));
      newStade.userInfo = action.value.user_info;
  /*     newStade.userInfo.user_id = action.value.user_id;
      newStade.userInfo.roleType = action.value.roleType; */
      newStade.token = action.value.token
        ? action.value.token
        : sessionStorage.getItem("token");
      return newStade;
  }
  return state;
};
