const loadPosts = async () => {
    const config = {
        'method': 'GET',
        'headers': {
            'Content-Type': 'application/json'
        },
    };

    const response = await fetch('http://localhost:3000/posts', config)
    const posts = await response.json();

    if (Array.isArray(posts)) {
        posts.forEach(post => {
            appendPost(post);
        });

    } 
}

const loadComments = async () => {
    const config = {
        'method': 'GET',
        'headers': {
            'Content-Type': 'application/json'
        },
    };

    const response = await fetch('http://localhost:3000/comments', config)
    const comments = await response.json();

    if (Array.isArray(comments)) {
        comments.forEach(comment => {
            appendComment(comment);
        });

    } 

}

const addPost = async() => {

    const newPost = {
        "titulo": document.getElementById('post-title').value,
        "conteudo": document.getElementById('post-text').value,
        "likes": 0
    };

    const config = {
        'method': 'POST',
        'headers': {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPost)
    };

    const response = await fetch('http://localhost:3000/posts', config);
    const post = await response.json();
    appendPost(post);
}


const appendPost = (post) => {
    const template = document.getElementById('post-template');
    const postElement = document.importNode(template.content, true);
    const article = postElement.querySelector('.post')
    const postTitle = postElement.querySelector('h3')
    const buttons = postElement.querySelectorAll('button')
    const postItens = postElement.querySelectorAll('p')
    const dialog = postElement.querySelector('dialog')
    const commentsSection = postElement.lastElementChild;


    article.id = post.cod_post
    commentsSection.id = `comments-section-${article.id}`
    dialog.id = `delete-dialog-container-${article.id}`
    postTitle.innerText = post.titulo;
    postItens[0].innerText = post.conteudo;
    postItens[1].innerText = post.likes + " like(s)";


    buttons[0].onclick = () => likePost(article.id);
    buttons[1].onclick = () => openDeleteDialog(article.id)
    buttons[2].onclick = () => deletePost(article.id);
    buttons[3].onclick = () => closeDeleteDialog(article.id)


    document.getElementById('timeline').append(postElement);
}


const updateLikePost = (idPost, likes) => {
    const post = document.getElementById(idPost)
    const buttonAddLike = post.querySelector('.displayLikes')
    buttonAddLike.innerText = likes + " like(s)"
}

const likePost = async (idPost) => {
    const config = {
        'method': 'PATCH',
        'headers': {
            'Content-Type': 'application/json'
        }
    };

    const response =  await fetch(`http://localhost:3000/posts/${idPost}/likes`, config)
    const updatedLikes = await response.json()
    updateLikePost(idPost, updatedLikes)
}


const openDeleteDialog = (idPost) => {
    const dialog = document.getElementById(`delete-dialog-container-${idPost}`)
    dialog.showModal();
}

const closeDeleteDialog = (idPost) => {
    const dialog = document.getElementById(`delete-dialog-container-${idPost}`)
    dialog.close();
}


const deletePost = async (idPost) => {

    const config = {
        'method': 'DELETE',
        'headers': {
            'Content-Type': 'application/json'
        },
    };

    await fetch(`http://localhost:3000/posts/${idPost}`, config)

    removeDeletedPostFromTimeline(idPost)
}

const removeDeletedPostFromTimeline = (idPost) => {
    const post = document.getElementById(`${idPost}`)
    post.remove()
}




const appendComment = (comment) => {
    console.log(comment)
    const template = document.getElementById('comment-template');
    const commentElement = document.importNode(template.content, true);

    const article = commentElement.querySelector('.comment')
    const content = commentElement.querySelector('.conteudo')
    const date = commentElement.querySelector('.dataCriacao')

    const data_formatada = new Date(comment.created_at).toLocaleDateString('pt-BR')
    date.innerText = data_formatada
    content.innerText = comment.conteudo

    document.getElementById(`comments-section-${comment.cod_post}`).append(commentElement)
}


window.onload = () => {
    const btnAddPost = document.getElementById('add-post')
    btnAddPost.onclick = addPost;
    loadPosts()
    loadComments()
}

