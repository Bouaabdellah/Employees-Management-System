export const inputFormat = (date : string) : string => {
    const managedDate : string[] = date.split('/').map((ele) => ele = ele.padStart(2, '0'));
    return `${managedDate[2]}-${managedDate[0]}-${managedDate[1]}`;
}