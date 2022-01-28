const debug = false

// Set value for a range element
function setValueFroRange(event) {
    event.preventDefault();
    if (debug) console.log(event)
    const x = document.getElementById("generalFeeling").value;
    if (debug) console.log('Range value = ' + x)
    document.getElementById("generalFeelingRangeValue").innerHTML = x;
}

const elem = document.getElementById("generalFeeling");
elem.addEventListener("change", setValueFroRange);
elem.addEventListener("input", setValueFroRange);

function parse(data) {
    if (data) {
        return JSON.parse(data)
    }
    return []
}

// handle form. Probably TODO: remove when back end will handle forms
function addResultToCache(newItem) {
    let items = parse(localStorage.getItem('data'))
    if (debug) console.log(items)
    if (items) {
        items.push(newItem)
    }
    else {
        items = [newItem]
    }
    if (debug) console.log(items)
    localStorage.setItem('data', JSON.stringify(items))
}

// return bucket counts and labels
// Function is not very efective as that logic would be most likely in backend
function bucketCounts(data, min, max, nBuckets) {
    const step = Math.round((max - min) / nBuckets)

    let buckets = []
    let last = 0
    for (let i = 0; i < nBuckets - 1; i++) {
        buckets.push(step + last)
        last += step
    }

    let labels = []
    last = 0
    for (let i = 0; i < nBuckets - 1; i++) {
        labels.push(`[${last}-${buckets[i]})`)
        last += step
    }
    labels.push(`[${last}-${max}]`)

    let counts = new Array(nBuckets).fill(0)
    data.forEach(item => {
        let idx = buckets.findIndex(bucketTreshold => bucketTreshold > item)
        if (idx == -1) { // move to last bucket
            idx = nBuckets - 1
        }
        counts[idx]++;
    })

    console.log({ buckets, labels, counts })

    return { buckets, labels, counts }
}

function getGeneralFeeling(data) {
    return data.map(item => item.generalFeeling)
}

// Display simple histogram
function displaySimpleHistogram() {
    const ctx = document.getElementById('histogram');
    const dataFromStorage = parse(localStorage.getItem('data'))
    const bucketData = bucketCounts(getGeneralFeeling(dataFromStorage), 0, 100, 10)

    const n = dataFromStorage.length
    document.getElementById("numberOfDataPoints").innerHTML = n

    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: bucketData.labels,
            datasets: [{
                label: '# of Votes',
                data: bucketData.counts,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(130, 159, 64, 0.2)',
                    'rgba(180, 159, 64, 0.2)',
                    'rgba(190, 159, 64, 0.2)',
                    'rgba(230, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(130, 159, 64, 1)',
                    'rgba(180, 159, 64, 1)',
                    'rgba(190, 159, 64, 1)',
                    'rgba(230, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function handleHistogram() {
    let histogramBox = document.getElementById("histogramBox");
    histogramBox.classList.remove("noDisplay");

    // remove previously created chart
    $("#histogram").remove();
    $("#histogramParent").append('<canvas id="histogram" width="400" height="230"></canvas>');

    displaySimpleHistogram()
}

function saveFormDataToLocalCache() {
    const sex = document.querySelector('input[name="sex"]:checked').value;
    const country = document.getElementById('country').value
    const postCode = document.getElementById('postcode').value
    const generalFeeling = document.getElementById('generalFeeling').value

    const formResult = {
        sex,
        country,
        postCode,
        generalFeeling
    }

    addResultToCache(formResult)
}

function handleSubmitButton(event) {
    event.preventDefault()

    const warrningBox = document.getElementById("warningBox");
    warrningBox.classList.add('noDisplay')

    try {
        saveFormDataToLocalCache()
        handleHistogram()
    } catch (e) { // Can only happen (to the current state of knowledge) if sex was not specified
        console.log(e)
        warrningBox.innerHTML = 'Please provide Sex value (others are optional)'
        warrningBox.classList.remove('noDisplay')
    }

}


const submitButton = document.getElementById("mainSubmitButton");
submitButton.addEventListener("click", handleSubmitButton);

// cookies info
$(document).ready(function () {
    setTimeout(function () {
        $("#cookieConsent").fadeIn(200)
    }, 500)
    $("#closeCookieConsent, .cookieConsentOK").click(function () {
        $("#cookieConsent").fadeOut(200)
        localStorage.setItem('agreedToCookies', 'true')
    })
})