
const char = 'QWERTYUIOPASDFGHJKLZXCVBNM1234567890'

window.addEventListener('load',(e)=>{

    let data = localStorage.getItem('taskList')
    
    let lst = JSON.parse(data)

    ListCards(lst)
})

document.getElementById('task_form').addEventListener('submit', (e)=>{

    e.preventDefault()

    let form = e.target

    let fields = form.querySelectorAll('input, textarea')

    let formFill = true;

    fields.forEach(field => {

        if(field.value === null || field.value === '' || /^\s+$/.test(field.value) ){
            formFill = false
            field.style.borderColor = 'red'
        }
        else field.style.borderColor = ''
    })

    if(!formFill) return

    let taskList = localStorage.getItem('taskList')

    let taskId = generateId(taskList)

    let taskItem = {
        id: taskId,
        title: form.title.value,
        description: form.description.value,
        createDate: Date.now(),
        plannedDate: form.date.value,
        deleteDate: null,
        actualDate: null,
        updateDate: Date.now(),
        status: 0 //0:pendent, 1: ready
    }

    if(!taskList){

        let firstList = []
        firstList.push(taskItem)
        localStorage.setItem('taskList', JSON.stringify(firstList))
        ListCards(firstList)

    }else{
        
        let list = JSON.parse(taskList)
        list.push(taskItem)
        localStorage.setItem('taskList',  JSON.stringify(list))
        ListCards(list)
    }
    form.reset()

    document.getElementById('btn_close').click();
    
    alert('Save successfully')
})

document.getElementById('btn_cancel').addEventListener('click', (e)=>{
    let form = document.getElementById('task_form')
    form.reset()
})


document.getElementById('container_lst').addEventListener('click', (e)=>{

    let action;
    let taskId;

    if(e.target.tagName === 'I'){
        action = e.target.parentElement.dataset.action
        taskId = e.target.parentElement.dataset.itemId
    }
    else{
        action = e.target.dataset.action
        taskId = e.target.dataset.itemId
    }
    
    switch(action){
        case 'ready':
            readyTask(taskId)
            break

        case 'delete':
            deleteTask(taskId)
            break

        case 'detail':
            showDetails(taskId)
            break

        case 'edit':
            editTask(taskId)
            break
    }
    
    e.stopPropagation();
})

function ListCards(taskList){

    let lst = taskList.filter(task => task.status === 0)

    let container = document.getElementById('container_lst')

    if(!lst || lst.length <1){

        container.innerHTML = `<div id="lst_row" class="row d-flex justify-content-around text-bg-light">
                                <h2 class="text-center">No items</h2>
                            </div>`
    }else{

        container.innerHTML = ''

        let table = document.createElement('table')
        table.classList.add('table', 'table-striped', 'text-center', 'text-bordered')

        let tbody = document.createElement('tbody')

        let thead = document.createElement('thead')
        let tr = document.createElement('tr')
        let thTitle = document.createElement('th')
        thTitle.innerText = 'Title'

        let thDate = document.createElement('th')
        thDate.innerText = 'Date'

        let thActions = document.createElement('th')
        thActions.innerText = 'Actions'

        tr.append(thTitle, thDate, thActions)

        thead.append(tr)

        table.append(thead)

        container.append(table)
        let trs = ''

        lst.forEach(element => {

            trs += `<tr>
                        <td>${element.title}</td>
                        <td>${element.plannedDate}</td>
                        <td>
                            <div class="d-flex justify-content-end">
                                <a href="#" data-item-id="${element.id}" data-action="ready" name="btn_ready" data-bs-toggle="modal" data-bs-target="#readyModal" class="col-3 btn text-success">
                                    <i class="bi bi-check2-circle"></i>
                                </a>
                                <a href="#" data-item-id="${element.id}" data-action="delete" name="btn_delete" class="col-3 btn text-danger">
                                    <i class="bi bi-trash"></i>
                                </a>
                                <a href="#" data-item-id="${element.id}" data-action="detail" name="btn_detail" data-bs-toggle="modal" data-bs-target="#descModal" class="col-3 btn text-primary">
                                    <i class="bi bi-card-text"></i>
                                </a>
                                <a href="#" data-item-id="${element.id}" data-action="edit" name="btn_edit" data-bs-toggle="modal" data-bs-target="#editModal" class="col-3 btn text-secondary">
                                    <i class="bi bi-pencil-fill"></i>
                                </a>
                            </div> 
                        </td>
                    </tr>`
        });

        tbody.innerHTML = trs
        table.append(tbody)
        
    }
}

function generateId(){
    let taskId = ''
    
    for(let i = 0; i < 10; i++){

        taskId += char[Math.floor(Math.random() * char.length)]
    }

    return taskId
}

function deleteTask(id){

   let data = localStorage.getItem('taskList')
   
   let taskList = JSON.parse(data)

   let taskIndex = taskList.indexOf(taskList.find(t => t.id === id))

   taskList.splice(taskIndex,1)

   localStorage.setItem('taskList', JSON.stringify(taskList))

   ListCards(taskList)
}

function showDetails(taskId){

    let data = localStorage.getItem('taskList')
   
    let taskList = JSON.parse(data)
 
    let task = taskList.find(t => t.id === taskId)

    let createDate = new Date(task.createDate)
    let formatedCreatedMonth= parseInt(createDate.getMonth()) < 10 ? `0${parseInt(createDate.getMonth())}` : parseInt(createDate.getMonth())
    let detailCreateDate = `${formatedCreatedMonth}-${createDate.getDate()}-${createDate.getFullYear()}`
    
    let splitPlannedDate = task.plannedDate.split('-')
    let detailPlannedDate = `${splitPlannedDate[1]}-${splitPlannedDate[2]}-${splitPlannedDate[0]}`

    let updateDate = new Date(task.createDate)
    let updateCreatedMonth= parseInt(updateDate.getMonth()) < 10 ? `0${parseInt(updateDate.getMonth())}` : parseInt(updateDate.getMonth())
    let updateCreateDate = `${updateCreatedMonth}-${updateDate.getDate()}-${updateDate.getFullYear()}` 

    document.getElementById('detail-title').innerText = task.title
    document.getElementById('detail-create').innerText = detailCreateDate
    document.getElementById('detail-planned').innerText = detailPlannedDate
    document.getElementById('detail-update').innerText = updateCreateDate
    document.getElementById('detail-description').innerText = task.description
}

function editTask(taskId){

    let data = localStorage.getItem('taskList')
   
    let taskList = JSON.parse(data)
 
    let task = taskList.find(t => t.id === taskId)

    let form = document.getElementById('edit_form')

    form.id.value = task.id
    form.title.value = task.title
    form.date.value= task.plannedDate
    form.description.value = task.description
}

function readyTask(taskId){

    let data = localStorage.getItem('taskList')
   
    let taskList = JSON.parse(data)
 
    let task = taskList.find(t => t.id === taskId)
    
    document.getElementById('ready-id').value = task.id
    document.getElementById('ready-title').innerText = task.title
    document.getElementById('ready-planned-date').innerText = `Planned date: ${task.plannedDate}`
}

document.getElementById('edit_form').addEventListener('submit', (e)=>{
    
    e.preventDefault()

    let form = e.target

    let fields = form.querySelectorAll('input, textarea')

    let formFill = true;

    fields.forEach(field => {

        if(field.value === null || field.value === '' || /^\s+$/.test(field.value) ){
            formFill = false
            field.style.borderColor = 'red'
        }
        else field.style.borderColor = ''
    })

    if(!formFill) return

    let taskId = form.id.value

    let data = localStorage.getItem('taskList')
   
    let taskList = JSON.parse(data)
 
    let task = taskList.find(t => t.id === taskId)

    task.title = form.title.value
    task.plannedDate = form.date.value
    task.description = form.description.value
    task.updateDate = Date.now()

    localStorage.setItem('taskList',  JSON.stringify(taskList))

    ListCards(taskList)

    document.getElementById('btn_close_edit').click()
    alert("Save changes")
})

document.getElementById('ready_form').addEventListener('submit', (e)=>{
    e.preventDefault()
    
    let taskId = e.target.id.value

    let data = localStorage.getItem('taskList')
   
    let taskList = JSON.parse(data)
 
    let task = taskList.find(t => t.id === taskId)

    task.status = 1
    task.actualDate = Date.now()

    localStorage.setItem('taskList',  JSON.stringify(taskList))

    ListCards(taskList)

    document.getElementById('btn_close_ready').click()
})