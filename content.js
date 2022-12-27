chrome.runtime.onMessage.addListener(
    function (request, shipper, shipperResponse) {
        if (request.message === "begin") {
            begin();
        }
    }
);

let array_numbers;

function begin() {


        const str = document.body.innerText;
        // const regexp = new RegExp("\\+?\\(?\\d*\\)? ?\\(?\\d+\\)?\\d*([\\s./-]?\\d{2,})+", "g");

        var re = /(?:[-+() ]*\d){10,13}/gm;
        var res = str.match(re).map(function (s) { return s.trim(); });
        let arr = [];
        // console.log(res.length);
        for (let i = 0; i < res.length; i++) {
            arr.push(res[i])
        }

        // let match;
        // while ((match = regexp.exec(str)) !== null) {
        //     console.log(match, "match")

        //      if (match[0].length > 7 && match[0].length < 15)
        //         arr.push(match[0]);
        //     console.log(`${match[0]}`);
        // }

        console.log(arr, "for array_number");

    sendMessage({ data: arr })
        .then((result) => { console.log(" func then :", result) })
        .catch((error) => { console.log(" func catch :", error) })
    console.log("first console");
}


function sendMessage(item) {

    return new Promise((resolve, reject) => {
        chrome.runtime.sendMessage(item, (response) => {
            console.log("recieved success :", response);
            if (response) {
                resolve();
            } else {
                reject();
            }
        })
    });
}

