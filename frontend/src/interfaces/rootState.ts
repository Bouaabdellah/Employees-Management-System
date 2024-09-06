import userInfoInterfase from "./userInfo";

interface rootState {
    userInformation : userInfoInterfase,
    sidebar : {
        displaySidebar : boolean;
    }
}

export default rootState