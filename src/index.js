let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  fetch("http://localhost:3000/toys")
  .then(resp => resp.json())
  .then(data => data.forEach(toy => renderData(toy)))
  const createForm = document.querySelector(".add-toy-form")
  createForm.addEventListener("submit", function(e){
    e.preventDefault()
    
    let name = e.target[0].value
    let url = e.target[1].value
    let data = {
      "name": `${name}`,
      "image": `${url}`,
      "likes": 0
    }
    fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(data)
      })
    .then(resp => resp.json())
    .then(data => renderData(data)) 
    createForm.reset()
  })

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });


  function renderData(data){
    const card = document.createElement('div')
    card.className = "card"
    const name = document.createElement('h2')
    name.textContent = data.name
    card.appendChild(name)
    const img = document.createElement('img')
    img.className = "toy-avatar"
    img.src = data.image
    card.appendChild(img)
    const likes = document.createElement('p')
    likes.textContent = `${data.likes} Likes`
    card.appendChild(likes)
    const btn = document.createElement('button')
    btn.className = "like-btn"
    btn.innerText = "Like ❤️"
    btn.id = data.id
    console.log(data.likes)
    btn.addEventListener("click", () => handleLike(data.likes, data.id))
    card.appendChild(btn)
    document.querySelector("#toy-collection").appendChild(card)
  }
  
  function handleLike(likes, dataId){ 
    likes++
    document.querySelector("#toy-collection").innerHTML = ""
    fetch(`http://localhost:3000/toys/${dataId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        "likes": likes
      })
  })
  fetch("http://localhost:3000/toys")
  .then(resp => resp.json())
  .then(data => data.forEach(toy => renderData(toy)))
 }
  
});

 


