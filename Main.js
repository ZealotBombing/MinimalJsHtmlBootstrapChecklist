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
    modal.style.display = 'none'

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
  
   if(btn_name === 'btn_delete' || btn_name === 'btn_ready'){

    localStorage.setItem('taskList',  JSON.stringify(lst))

    ListCards(lst)

   }

})

function ListCards(lst){

    let cards = ''

    lst.forEach(element => {

        cards += `<div class="p-2 row rounded justify-content-between bg-primary-subtle mt-3 ml-2 mr-2">
                    <div class="col-3">
                        <p class="fs-5">${element}</p>
                    </div>
                    <div class="row col-4 justify-content-between">
                        <a href="#" data-item="${lst.indexOf(element)}" name=""btn_ready class="col-5 btn btn-success">
                            Ready
                        </a>
                        <a href="#" data-item="${lst.indexOf(element)}" name="btn_delete" class="col-5 btn btn-danger">
                            Delete
                        </a>
                    </div>
                </div>`

        document.getElementById('lst_row').innerHTML = cards

    });
}