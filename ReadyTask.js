window.addEventListener('load',(e)=>{

    let data = localStorage.getItem('taskList')
    
    let lst = JSON.parse(data)
    
    ListCards(lst)
})

function ListCards(taskList){

    let lst = taskList.filter(task => task.status === 1)

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

        let thPlannedDate = document.createElement('th')
        thPlannedDate.innerText = 'Planned Date'

        let thActualDate = document.createElement('th')
        thActualDate.innerText = 'Actual Date'

        let thActions = document.createElement('th')
        thActions.innerText = 'Details'

        tr.append(thTitle, thPlannedDate, thActualDate, thActions)

        thead.append(tr)

        table.append(thead)

        container.append(table)
        
        let trs = ''

        lst.forEach(element => {

            let actualDate = new Date(element.actualDate)

            let actualMonth= parseInt(actualDate.getMonth()) < 10 ? `0${parseInt(actualDate.getMonth())}` : parseInt(actualDate.getMonth())
            let actualFormatedDate = `${actualMonth}-${actualDate.getDate()}-${actualDate.getFullYear()}` 

            trs += `<tr>
                        <td>${element.title}</td>
                        <td>${element.plannedDate}</td>
                        <td>${actualFormatedDate}</td>
                        <td>
                            <div class="d-flex justify-content-center">
                                <a href="#" data-item-id="${element.id}" data-action="detail" name="btn_detail" data-bs-toggle="modal" data-bs-target="#descModal" class="col-3 btn text-primary">
                                    <i class="bi bi-card-text" data-action="detail" name="btn_detail"></i>
                                </a>
                            </div>
                        </td>
                    </tr>`
        });
        tbody.innerHTML = trs
        table.append(tbody)
    }
}

document.getElementById('container_lst').addEventListener('click', (e)=>{
    e.stopPropagation()

    if(e.target.dataset.action === 'detail'){

        let data = localStorage.getItem('taskList')
    
        let taskList = JSON.parse(data)

        let taskId;
        
        if(e.target.tagName === 'I'){
            taskId = e.target.parentElement.dataset.itemId
        }else{
            taskId = e.target.dataset.itemId
        }

        let task = taskList.find(t => t.id === taskId)

        let createDate = new Date(task.createDate)
        let formatedCreatedMonth= parseInt(createDate.getMonth()) < 10 ? `0${parseInt(createDate.getMonth())}` : parseInt(createDate.getMonth())
        let detailCreateDate = `${formatedCreatedMonth}-${createDate.getDate()}-${createDate.getFullYear()}`
        
        let splitPlannedDate = task.plannedDate.split('-')
        let detailPlannedDate = `${splitPlannedDate[1]}-${splitPlannedDate[2]}-${splitPlannedDate[0]}`

        let updateDate = new Date(task.createDate)
        let updateCreatedMonth= parseInt(updateDate.getMonth()) < 10 ? `0${parseInt(updateDate.getMonth())}` : parseInt(updateDate.getMonth())
        let updateCreateDate = `${updateCreatedMonth}-${updateDate.getDate()}-${updateDate.getFullYear()}` 

        let actualDate = new Date(task.createDate)
        let actualCreatedMonth= parseInt(actualDate.getMonth()) < 10 ? `0${parseInt(actualDate.getMonth())}` : parseInt(actualDate.getMonth())
        let actualFormatedDate = `${actualCreatedMonth}-${actualDate.getDate()}-${actualDate.getFullYear()}` 

        document.getElementById('detail-title').innerText = task.title
        document.getElementById('detail-create').innerText = detailCreateDate
        document.getElementById('detail-planned').innerText = detailPlannedDate
        document.getElementById('detail-update').innerText = updateCreateDate
        document.getElementById('actual-date').innerHTML= actualFormatedDate
        document.getElementById('detail-description').innerText = task.description
    }
})