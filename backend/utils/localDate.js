const localDate = (globalDate) => {
    // convert date from global date to local date
    let date = new Date(globalDate);
    let localDate = date.toLocaleDateString('en-US',{timeZone : 'Africa/Algiers'});
    return localDate;   
}

export default localDate;