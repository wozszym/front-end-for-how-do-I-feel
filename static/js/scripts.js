

// Set value for a range element
function setValueFroRange(event) {
    console.log(event)
    const x = document.getElementById("generalFeeling").value;
    console.log('Range value = ' + x)
    document.getElementById("generalFeelingRangeValue").innerHTML = x;
}

const elem = document.getElementById("generalFeeling");
elem.addEventListener("change", setValueFroRange);