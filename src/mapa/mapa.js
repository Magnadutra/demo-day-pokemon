/* function highlight_map_states(){
  if($(".states_section").length>0){
     $(".states_section .list_states .item .link").hover(function(){
       var a="#state_"+$(this).text().toLowerCase();
       $(a).attr("class","state hover")
     },function(){
       var a="#state_"+$(this).text().toLowerCase();
       $(a).attr("class","state")
     })
  }
}; */


const showModal = () => {
  const getState = document.querySelectorAll("[data-people]")
  for (let person of getState) {
    person.addEventListener('click', (e) => {
      const target = e.target;
      const dataValue = target.dataset.people
      const pessoa = document.querySelector(`#people-${dataValue}`)
      pessoa.style.display = 'block'
    })
  }
}

showModal()