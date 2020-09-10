//Add Today's Date to Top of Page
var currentDay = moment().format('MM/DD/YY');

function dateRender() {
    document.getElementById("date").innerHTML = currentDay;
};

dateRender();