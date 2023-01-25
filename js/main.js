const btnAdd = document.querySelector(".button--add");
const firstDiv = document.querySelector(".main-form__field-row");
const fieldWrapper = document.querySelector(".main-form__field-wrapper");
const fieldNum = document.querySelectorAll(".main-form__field").length;
// console.log(fieldNum);

btnAdd.addEventListener("click", function(evt) {
    evt.preventDefault();
    createRow();
});

// ставит eventListener на кнопку удаления переданного ряда
function deleteButtonHandler(row){
    row.querySelector(".button--delete").addEventListener("click", function(evt) {
        evt.preventDefault();
        deleteRow(row);
    });
} 

deleteButtonHandler(firstDiv);

// создает новый ряд
function createRow() {
    const newDiv = firstDiv.cloneNode(true);
    newDiv.querySelectorAll('input, textarea').forEach(item => {
        item.value ="";
    });
    
    deleteButtonHandler(newDiv);
    fieldWrapper.appendChild(newDiv);
}

// удаляет ряд
function deleteRow(item) {
    fieldWrapper.removeChild(item);
}

function validate(evt) {
    var theEvent = evt || window.event;
  
    if (theEvent.type === 'paste') {
        key = event.clipboardData.getData('text/plain');
    } else {
        var key = theEvent.keyCode || theEvent.which;
        key = String.fromCharCode(key);
    }
    var regex = /[0-9]|\./;
    if( !regex.test(key) ) {
      theEvent.returnValue = false;
      if(theEvent.preventDefault) theEvent.preventDefault();
    }
}

// отправка формы
const form = document.querySelector('.main-form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const myFormData = new FormData(e.target);
    // console.log(e.target);
    let arr = [];
    let formDataObj = {};
    let counter = 0;
    myFormData.forEach((value, key) => {
        formDataObj[key] = value;
        counter += 1;
        if (counter === fieldNum) {
            arr.push(JSON.parse(JSON.stringify(formDataObj)));
            // console.log(formDataObj);
            counter = 0;
        }
    });
    // console.log(arr);
    let json = JSON.stringify(arr);
    console.log(json);

    //- функция отправки данных
    const postData = async (url, data) => {
        let res = await fetch(url, {
            method: 'POST',
            mode: "same-origin",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json"
                },
            body: data
            
        });
    
        return await res.text();
    };

    postData("../server.php", json)
        .then(result => {
            console.log(result);
            if(result === 'true'){
                alert("Данные отправлены успешно");

                // очистка формы 
                const allRows = document.querySelectorAll('.main-form__field-row');
                allRows.forEach((item, i) => {
                    if (i > 0) {
                        deleteRow(item);
                    } else {
                        item.querySelectorAll('input, textarea').forEach(item => {
                            item.value ="";
                        });
                    }
                });
            }
        });
});