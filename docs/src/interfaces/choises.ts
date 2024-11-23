import branch from "./branch";
import role from "./role";

interface choises{
    branches : branch[];
    roles : role[];
    managers : {super_id : number}[];
}

export default choises;