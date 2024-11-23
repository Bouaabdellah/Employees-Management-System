import choises from "./choises";
import userInfoInterfase from "./userInfo";

interface rootState {
    userInformation : userInfoInterfase,
    sidebar : {
        displaySidebar : boolean;
    },
    choises : choises
}

export default rootState