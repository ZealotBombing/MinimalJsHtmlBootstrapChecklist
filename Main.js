
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
        actualDate: null
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
            console.log('ready')
            break

        case 'delete':
            deleteTask(taskId)
            break

        case 'detail':
            console.log('detail')
            break

        case 'edit':
            console.log('edit')
            break
    }
    
    e.stopPropagation();
})

function ListCards(lst){

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
        
        lst.forEach(element => {

            let trBody = document.createElement('tr')

            let tdBTitle = document.createElement('td')
            tdBTitle.innerText = element.title

            let tdBDate = document.createElement('td')
            tdBDate.innerText = element.plannedDate

            let tdBAction = document.createElement('td')
            tdBAction.innerHTML = `<div class="d-flex justify-content-end">
                                    <a href="#" data-item-id="${element.id}" data-action="ready" name="btn_ready" class="col-3 btn text-success">
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
                                </div> `
    
            trBody.append(tdBTitle, tdBDate, tdBAction)

            tbody.append(trBody)
        });

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