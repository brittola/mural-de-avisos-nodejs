let inTitle = document.getElementById('inTitle');
let inDesc = document.getElementById('inDesc');
let btPost = document.getElementById('btPost');
let outPosts = document.getElementById('outPosts');

async function refresh() {

    await fetch('http://10.0.0.105:3000/api/all')
        .then(res => {
            return res.json();
        })
        .then(json => {
            let posts = JSON.parse(json);
            outPosts.innerHTML = '';

            if(posts.length == 0){
                outPosts.innerHTML = 'Ainda não há publicações.';
                return;
            }

            posts.forEach(post => {
                outPosts.innerHTML += `
                    <div id="${post.id}" class="card text-dark my-4">
                        <div class="card-header h4 d-flex justify-content-between">
                            ${post.title}
                            <button class="btn btn-danger btn-sm" onclick="deletePost(event)">Apagar</button>
                        </div>
                        <div class="card-body">
                            <p class="card-text">${post.description}</p>
                        </div>
                    </div>`
            });
        });
}

async function newPost() {
    let title = inTitle.value;
    let description = inDesc.value;

    if(title == '' || description == ''){
        alert('Preencha os campos corretamente.');
        inTitle.focus();
        return;
    }

    let post = {title, description};

    const options = {
        method: "POST",
        headers: new Headers({"Content-Type": "application/json"}),
        body: JSON.stringify(post)
    }

    await fetch("http://10.0.0.105:3000/api/new", options);

    inTitle.value = '';
    inDesc.value = '';

    refresh();
}

async function deletePost(event) {
    let postId = event.target.parentElement.parentElement.id;

    const options = {
        method: "DELETE",
        headers: new Headers({"Content-Type": "application/json"}),
        body: JSON.stringify({id: postId})
    }

    await fetch("http://10.0.0.105:3000/api/delete", options);

    refresh();
}

btPost.addEventListener('click', newPost);

document.addEventListener('DOMContentLoaded', refresh);