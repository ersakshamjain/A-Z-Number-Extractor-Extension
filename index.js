function popup() {
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, { "message": "begin" });
    }
    )
}

popup();
var temp_arr = [];
var selectednumbers = [];
let selected_arr = [];
let condition = false;
var btnid;
let item;

chrome.runtime.onMessage.addListener(function (request, sender, response) {
    console.log("request from content js:", request);

    const { data } = request;
    console.log(data, "for data");

    let numberarray = new Set(data); // remove duplicate values
    console.log("For numberarray", numberarray);


    var numberdata;
    let str = Array.from(numberarray).map((item, index) => {
        btnid = index;
        console.log(btnid, "for btn id")
        numberdata = item;

        temp_arr.push(numberdata);

        return (`  <div class="check_box">
        <div class="box-1">
        <input type="checkbox" name="" id='${btnid}' value=${numberdata} class="checkbox1">
        </div>
        <div class="box-2">
            <p id="gmails">${numberdata}</p>
        </div>
       </div>`

        )
    }).join(' ');
    let append = document.getElementById("append").innerHTML = str;
    console.log(str, "this is for str(print)");


});

console.log(temp_arr, "this is our main array for clg");

// *****************************Select Options********************//


let chooseoption = document.getElementById('btn1');

chooseoption.addEventListener('click', () => {
    let checkboxget = document.querySelectorAll('.box-1');
    console.log(checkboxget);

    let selectallPermission = document.getElementById('box-5');
    let selectAllCheckBox = document.getElementById('selectall')
    selectallPermission.style.display = 'block';

    selectallPermission.addEventListener("click", () => {
        selected_arr = temp_arr;
        condition = true;
        console.log(selected_arr);
        console.log(condition);

        if (selectAllCheckBox.checked) {
            temp_arr.map((item, index) => {
                let chechedid = document.getElementById(index);
                console.log(chechedid);
                chechedid.checked = true;

            });
        }
        else {
            temp_arr.map((item, index) => {
                let chechedid = document.getElementById(index);
                console.log(chechedid);
                chechedid.checked = false;
            });
        }

    });

    let arr = Array.from(checkboxget);
    console.log(arr);

    arr.map((item) => {
        item.style.display = 'block';
    });
});

var selectednumbers = []

setTimeout(() => {
    console.log("line 109")
    temp_arr.map((item, index) => {
        console.log("line 112 ");
        let dat = document.getElementById(index);
        console.log(dat, "for dat");
        dat.addEventListener("click", (e) => {
            console.log("this is for dat line 232")
            console.log(e.target.value, "for new valu");
            console.log(e.target.checked, "for new id=========");

            if (!e.target.checked) {
                console.log(e.target.value, 'this is for value');
                selectednumbers = selectednumbers.filter((row) => {
                    if (row === e.target.value) {
                        return false;
                    }
                    else {
                        return true;
                    }
                })
                console.log(selectednumbers, "in if");

            }

            else {
                selectednumbers.push(temp_arr[e.target.id]);
                console.log(selectednumbers, "in else");

            }
        })


    })
}, 300);


// ********************** For heading print how many number are found *********

setTimeout(() => {

    let heading = document.getElementById("heading").innerHTML = `Total Numbers Found: ${temp_arr.length}`;
    if (temp_arr.length == 0) {
        let btn1 = document.querySelectorAll(".btn1");
        console.log(btn1, "for btn1")
        for (let i = 0; i < btn1.length; i++) {
            btn1[i].disabled = true
        }

        let found = document.getElementById("nofound").style.display = 'block'
        console.log(found, "cscs");
    }


}, 300);
// ************************************************************************



// *****************************Copy to Clipboard********************

let btn2 = document.getElementById("btn2")

btn2.addEventListener("click", () => {
    let selectall = document.getElementById("selectall");

    if (selectednumbers.length == 0) {
        console.log("in if");
        const copytoclip = navigator.clipboard
        let arrr = temp_arr.join('\r\n')
        copytoclip.writeText(arrr);
    }

    else if (selectall.checked) {
        const copytoclip = navigator.clipboard;
        copytoclip.writeText(temp_arr.join('\r\n'));
        console.log('ajaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
    }

 else {
        console.log("in else");
        const copytoclip = navigator.clipboard
        let arr = selectednumbers.join('\r\n')
        copytoclip.writeText(arr);
    }
    
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
    setTimeout(() => {
        popup.classList.toggle("show");
    }, 1000);

});


// ****************Function for Dowwnload************************//

function textdownload(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(text));


    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

//************************* Dowload in Text *************************

document.getElementById("download1").addEventListener("click", function () {

    console.log(item, "for item in download");


    var filename = "Number.txt";
    let selectall = document.getElementById("selectall");
    let downText = temp_arr.join('\r\n')
    if (selectednumbers.length == 0) {
        textdownload(filename, downText);

    }

    else if (selectall.checked) {
        textdownload(filename, downText);
    }

    else {
        textdownload(filename, selectednumbers.join('\r\n'))
    }
}, false);


// ************************* Dowload in CSV *************************

document.getElementById("download2").addEventListener("click", function () {

    console.log(item, "for item in download");


    var filename = "Number.csv";
    let selectall = document.getElementById("selectall");

    if (selectednumbers.length == 0) {
        textdownload(filename, temp_arr.join('\r\n'));

    }

    else if (selectall.checked) {
        textdownload(filename, temp_arr.join('\r\n'));
    }

    else {
        textdownload(filename, selectednumbers.join('\r\n'))
    }

    ;
}, false);

// *************************** Code End Here **************************************************






