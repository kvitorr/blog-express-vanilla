const api = {

    getPosts: async () => {
        const response = await fetch('http://localhost:3000/posts', {
            'method': 'GET',
            'headers': {
                'Content-Type': 'application/json',
            }
        });
        return await response.json();
    },

    getCommentsByPost: async (cod_post) => {
        const response = await fetch(`http://localhost:3000/posts/${cod_post}/comments`,  {
            'method': 'GET',
            'headers': {
                'Content-Type': 'application/json',
            }
        })

        return await response.json()
    },

    addPost: async (newPost) => {
        const response = await fetch('http://localhost:3000/posts', {
            'method': 'POST',
            'headers': {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newPost)
        });
        return await response.json();
    },

    getMoreComments: async (idPost, limit, offset) => {

        const responseCommentsByPost = await fetch(`http://localhost:3000/posts/${idPost}/comments?offset=${offset}&limit=${limit}`, {
            'method': 'GET',
            'headers': {
                'Content-Type': 'application/json'
            },
        })
        return await responseCommentsByPost.json()
    },

    likePost: async (idPost) => {
        const response =  await fetch(`http://localhost:3000/posts/${idPost}/likes`, {
            'method': 'PATCH',
            'headers': {
                'Content-Type': 'application/json'
            }
        })
        return await response.json()
    },

    deletePost: async (idPost) => {
        await fetch(`http://localhost:3000/posts/${idPost}`, {
            'method': 'DELETE',
            'headers': {
                'Content-Type': 'application/json'
            },
        })
    },

    addComment: async (newComment) => {
        const response = await fetch('http://localhost:3000/comments', {
            'method': 'POST',
            'headers': {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newComment)
        });
        return await response.json();
    }
}

export default api