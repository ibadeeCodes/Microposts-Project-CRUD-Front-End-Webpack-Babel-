import { http } from './http';
import { ui } from './ui'

document.addEventListener('DOMContentLoaded', getposts())

function getposts() {
  http.get('http://localhost:3000/posts')
    .then(posts => ui.showPosts(posts))
    .catch(err => console.log(err))
}

ui.postSubmit.addEventListener('click', () => {

  const id = document.querySelector('#id').value

  let data = {
    title: ui.titleInput.value,
    body: ui.bodyInput.value
  }

  if(ui.titleInput.value != '' && ui.bodyInput.value != '') {

    if(id === '') {
      http.post('http://localhost:3000/posts', data)
      .then(posts => {
        ui.showAlert('Post Added Successfully!', 'alert alert-success'),
        getposts()
        ui.clearInput()
      })
      .catch(err => console.log(err))
    } else {
      http.put(`http://localhost:3000/posts/${id}`, data)
        .then(data => {
          ui.showAlert('Post Updated', 'alert alert-success')
          ui.changeformstate('add')
          getposts()
        })
    }



  }
  else {
    ui.showAlert('Please fill the fields!', 'alert alert-danger')
  }
})

document.querySelector('#posts').addEventListener('click', deletePost)

function deletePost(e) {
  e.preventDefault()

  if(e.target.parentElement.classList.contains('delete')) {
    const id = e.target.parentElement.dataset.id
    if(confirm('are you sure?')) {
      http.delete(`http://localhost:3000/posts/${id}`)
        .then(data => {
          ui.showAlert('Post deleted Successfully!', 'alert alert-success')
          ui.clearInput()
          getposts()
        }).catch(err => console.log(err))
    }
  }
}


document.querySelector('#posts').addEventListener('click', enableUpdate)

function enableUpdate(e) {

  e.preventDefault()

  if(e.target.parentElement.classList.contains('edit')) {


    
    let id = e.target.parentElement.dataset.id
    let title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent
    let  body = e.target.parentElement.previousElementSibling.textContent

    let data = {
      id,
      title,
      body
    }

    ui.fillForm(data)
    
  }

}

document.querySelector('.card-form').addEventListener('click', cancelEdit)

function cancelEdit(e) {
  if(e.target.classList.contains('post-cancel')) {
    ui.changeformstate('add')
  }
}

