const dom = {
    
    getPostTemplate: () => document.getElementById('post-template'),
    getCommentTemplate: () => document.getElementById('comment-template'),

    createPostElement: () => {
        const template = dom.getPostTemplate()
        return document.importNode(template.content, true)
    },

    createCommentElement: () => {
        const template = dom.getCommentTemplate()
        return document.importNode(template.content, true)
    },

    appendPost: (postElement) => {
        document.getElementById('timeline').append(postElement);
    },

    appendComment: (commentElement, commentsSection) => {
        commentsSection.append(commentElement)
    },

    updateLikeCount: (postElement, likes) => {
        const buttonAddLike = postElement.querySelector('.displayLikes')
        buttonAddLike.innerText = likes + " like(s)"
    },

    showDialog: (idDialog) => {
        const dialog = document.getElementById(idDialog)
        dialog.showModal();
    },

    closeDialog: (idDialog) => {
        const dialog = document.getElementById(idDialog)
        dialog.close();
    },

    hideLoadMoreButton: (postId) => {
        const button = document.getElementById(`load-comments-${postId}`);
        button.style.display = 'none';
    }
}

export default dom