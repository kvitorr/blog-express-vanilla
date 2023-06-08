const dom = {
    
    getPostTemplate: () => document.getElementById('post-template'),
    getCommentTemplate: () => document.getElementById('comment-template'),
    getCommentInsertCommentTemplate: () => document.getElementById('insert-comment-template'),

    createPostElement: () => {
        const template = dom.getPostTemplate()
        return document.importNode(template.content, true)
    },
 
    createCommentElement: () => {
        const template = dom.getCommentTemplate()
        return document.importNode(template.content, true)
    },

    createInsertCommentElement: () => {
        const template = dom.getInsertCommentTemplate()
        return document.importNode(template.content, true)
    },

    appendPost: (postElement) => {
        document.getElementById('timeline').append(postElement);
    },

    prependComment: (commentElement, commentsSection) => {
        commentsSection.prepend(commentElement)
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
    },


    openInsertCommentSection: (postId) => {
        const button = document.getElementById(`open-insert-comment-${postId}`);
        const insertCommentContainer = document.getElementById(`insert-comment-${postId}`);
        
        button.style.display = 'none';
        insertCommentContainer.style.display = 'block'
    },

    closeInsertCommentSection: (postId) => {
        const button = document.getElementById(`open-insert-comment-${postId}`);
        const insertCommentContainer = document.getElementById(`insert-comment-${postId}`);

        const textarea = insertCommentContainer.querySelector('textarea')

        textarea.value = ''
        
        button.style.display = 'block';
        insertCommentContainer.style.display = 'none'
    }
}

export default dom