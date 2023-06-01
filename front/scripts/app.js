import api from "./api.js";
import dom from "./dom.js";
import utils from "./utils.js";


const app = {
    fetchPosts: async () => {
      try {
        const posts = await api.getPosts();

        for (const post of posts) {
          const commentsByPost = await api.getCommentsByPost(post.cod_post);

          
          app.appendPost(post, commentsByPost);
          
        }
      } catch (error) {
        console.error('Erro ao buscar os posts:', error);
      }
    },
    
    addPost: async () => {
      const newPost = {
        titulo: document.getElementById('post-title').value,
        conteudo: document.getElementById('post-text').value,
        likes: 0
      };
      
      try {
        const post = await api.addPost(newPost);
        app.appendPost(post);
      } catch (error) {
        console.error('Erro ao adicionar o post:', error);
      }
    },
    
    appendPost: async (post, responseCommentsByPost) => {

      const postElement = dom.createPostElement();
      const article = postElement.querySelector('.post');
      const postTitle = postElement.querySelector('h3');
      const buttons = postElement.querySelectorAll('button');
      const postItens = postElement.querySelectorAll('p');
      const dialog = postElement.querySelector('dialog');
      const commentsSection = postElement.querySelector('#comments-section');


      article.id = post.cod_post;
      commentsSection.id = `comments-section-${article.id}`;
      dialog.id = `delete-dialog-container-${article.id}`;
      postTitle.innerText = post.titulo;
      postItens[0].innerText = post.conteudo;
      postItens[1].innerText = post.likes + ' like(s)';
      
      buttons[0].onclick = () => app.likePost(article.id);
      buttons[1].onclick = () => dom.showDialog(dialog.id);
      buttons[2].onclick = () => app.deletePost(article.id);
      buttons[3].onclick = () => dom.closeDialog(dialog.id);
      buttons[4].onclick = () => app.loadMoreComments(article.id);
      buttons[4].id = `load-comments-${article.id}`;
      
      dom.appendPost(postElement);

      if (responseCommentsByPost.totalComments <= 3 || responseCommentsByPost.message) {
        dom.hideLoadMoreButton(article.id);
      }
      
      if (Array.isArray(responseCommentsByPost.comments)) {
        for (const comment of responseCommentsByPost.comments) {
          app.appendComment(comment);
        }
      }
    },
    
    loadMoreComments: async (postId) => {
      const element = document.getElementById(`comments-section-${postId}`);


      const nodes = element.querySelectorAll('.comment');
      const offset = nodes.length;
      const limit = 3;
      
      try {
        const commentsByPost = await api.getMoreComments(postId, limit,  offset);

        if (Array.isArray(commentsByPost.comments)) {
          for (const comment of commentsByPost.comments) {
            app.appendComment(comment);
          }
        }
        if (!commentsByPost.nextUrl) {
          dom.hideLoadMoreButton(postId);
        }
      } catch (error) {
        console.error('Erro ao carregar mais comentários:', error);
      }
    },
    
    likePost: async (postId) => {
      try {
        const updatedLikes = await api.likePost(postId);
        const postElement = document.getElementById(postId);
        dom.updateLikeCount(postElement, updatedLikes);
      } catch (error) {
        console.error('Erro ao curtir o post:', error);
      }
    },
    
    deletePost: async (postId) => {
      try {
        await api.deletePost(postId);
        app.removeDeletedPostFromTimeline(postId);
      } catch (error) {
        console.error('Erro ao excluir o post:', error);
      }
    },
    
    removeDeletedPostFromTimeline: (postId) => {
      const post = document.getElementById(postId);
      post.remove();
    },
    
    appendComment: (comment) => {
      const commentElement = dom.createCommentElement();
      const content = commentElement.querySelector('.conteudo');
      const date = commentElement.querySelector('.dataCriacao');
      
      const formattedDate = utils.formatDate(comment.created_at);
      date.innerText = formattedDate;
      content.innerText = comment.conteudo;
      
      const commentsSection = document.getElementById(`comments-section-${comment.cod_post}`);
      dom.appendComment(commentElement, commentsSection);
    },
    
    init: () => {
      const btnAddPost = document.getElementById('add-post');
      btnAddPost.onclick = app.addPost;
      app.fetchPosts();
    }
  };
  
  // Inicialização da aplicação
  window.onload = app.init;