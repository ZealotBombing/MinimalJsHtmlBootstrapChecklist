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
                                <a href="#" data-item-id="BRYHEESPQZ" data-action="detail" name="btn_detail" data-bs-toggle="modal" data-bs-target="#descModal" class="col-3 btn text-primary">
                                    <i class="bi bi-card-text"></i>
                                </a>
                            </div>
                        </td>
                    </tr>`
        });
        tbody.innerHTML = trs
        table.append(tbody)
    }
}