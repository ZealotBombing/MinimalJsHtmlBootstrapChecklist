'use strict'

window.addEventListener('load',(e)=>{

    let data = localStorage.getItem('taskList')
    
    let lst = JSON.parse(data)
    
    ListCards(lst)
})

document.getElementById('btn_add').addEventListener('click', (e)=>{
    
    let input = document.getElementById('inp_task')
    
    let task = input.value

    let taskList = localStorage.getItem('taskList')

    let modal = document.getElementById('exampleModal')

    if(task === null || task === '' || /^\s+$/.test(task)){

        input.style.borderColor = 'red'
        return 
    }else{
        input.style.borderColor = ''
    }

    if(!taskList){

        let firstList = []
        firstList.push(task)
        localStorage.setItem('taskList', JSON.stringify(firstList))
        ListCards(firstList)

    }else{
        
        let list = JSON.parse(taskList)
        list.push(task)
        localStorage.setItem('taskList',  JSON.stringify(list))
        ListCards(list)
    }

    input.value =''
    modal.classList.remove('show')
    // modal.style.display = 'none'

})

document.getElementById('btn_cancel').addEventListener('click', (e)=>{
    document.getElementById('inp_task').value= ''
})

document.getElementById('lst_row').addEventListener('click', (e)=>{

    let btn_name = e.target.name

    let data = localStorage.getItem('taskList')
    let lst = JSON.parse(data)

    let index = e.target.dataset.item

   if(btn_name === 'btn_delete'){

    lst.splice(index,1)

   }else if(btn_name === 'btn_ready'){

   }
   localStorage.setItem('taskList',  JSON.stringify(lst))

   ListCards(lst)

})

function ListCards(lst){

    let cards = ''

    lst.forEach(element => {

        cards += `<div class="col-md-4 col-sm-6 mb-4">
                    <div class="card" style="width: 18rem;">
                        <div class="card-body">
                            <h5 class="card-title">${element}</h5>
                            <a href="#" data-item="${lst.indexOf(element)}" name="btn_delete" class="btn btn-danger">Delete</a>
                            <a href="#" data-item="${lst.indexOf(element)}" name=""btn_ready class="btn btn-success">Ready</a>
                        </div>
                    </div>
                </div>`

        document.getElementById('lst_row').innerHTML = cards

    });
}