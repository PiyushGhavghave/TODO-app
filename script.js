
let currDate = new Date().toLocaleDateString('default', {
    weekday : "long",
    day : "2-digit",
    month : "long",
    year : "numeric"
})
document.querySelector('.date').innerHTML = `<span>${currDate}</span>`

// ------------- Add task
const taskContainer = document.querySelector('#list-item');
const inputField = document.querySelector('#input-task')
function addTask(){
    if(inputField.value === ''){
        alert("Enter some Task!")
    }
    else{
        const uniqueId = 'task-checkbox-' + Date.now();
        const newli = document.createElement('li')

        const newinput = document.createElement('input')
        newinput.type = 'checkbox'
        newinput.id = `${uniqueId}`

        const newlabel = document.createElement('label')
        newlabel.setAttribute('for',`${uniqueId}`)
        newlabel.className = 'task-label'
        newlabel.innerHTML =`${inputField.value}`

        const newspan = document.createElement('span')
        newspan.className = 'delete_task'
        newspan.innerHTML = `&times;`

        newli.appendChild(newinput)
        newli.appendChild(newlabel)
        newli.appendChild(newspan)

        taskContainer.appendChild(newli)
        console.log(newli);

        saveData();
        inputField.value = '';

    }
} 

//------------------ mark complete and delete task
document.querySelectorAll('#list-item').forEach(function(liItem){
    liItem.addEventListener('click',function(e){
        if(e.target.tagName == 'INPUT'){
            if( e.target.hasAttribute('checked') ){
                e.target.removeAttribute('checked')
            }else{
                e.target.setAttribute('checked','')
            }
            saveData()
        }
        else if(e.target.tagName == 'SPAN'){
            e.target.parentElement.remove();
            saveData();
        }
    })
})
//---------------- OR use
// document.querySelector('#list-item').addEventListener('click',function(e){
//     if(e.target.tagName == 'SPAN'){
//         e.target.parentElement.remove();
//         console.log(e.target.parentElement);
//         saveData();
//     }
// })


function saveData(){
    localStorage.setItem('Data',taskContainer.innerHTML)
}
function showData(){
    taskContainer.innerHTML = localStorage.getItem('Data')
}
showData()