class CommentModel {
    constructor(type) {
        this.type = type;
        this.commentsList = readFromLS(this.type) || [];
    }

    getComments = (param = null) => {
        console.log('get comments');
        if (param === null) {
            return this.commentsList;
        } else {
            return this.commentsList.filter(comment => comment.name === param);
        }
    }

    addComment = (postName, comment) => {
        console.log('add comment');
        const newComment = {
            name: postName,
            content: comment,
            date: new Date()
        };
        
        this.commentsList.push(newComment);
        console.log(this.commentsList);
        writeToLS(this.type, this.commentsList);
    }
}

const writeToLS = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
}

const readFromLS = (key) => {
    return JSON.parse(window.localStorage.getItem(key));
}

const commentUI = `<div class="addComment">
  <h2>Add a Comment</h2>
  <input type="text" id="commentEntry" />
  <button id="commentSubmit">Comment</button>
  </div>
  <h2>Comments</h2>
  <ul class="comments"></ul>`;

  const renderCommentList = (element, commentsList) => {
    console.log('render comments list');
    element.innerHTML = '';

    commentsList.forEach(comment => {
        let commentLi = document.createElement('li');
        commentLi.innerHTML = `${comment.name}: ${comment.content}`;

        element.appendChild(commentLi);
    });
}


export default class Comments {
    constructor(type, elementId) {
        this.type = type;
        this.elementId = elementId;
        this.model = new CommentModel(this.type);
    }

    addSubmitListener = (postName) => {
        console.log('add submit listener');
        document.getElementById('commentSubmit').addEventListener('ontouchend', () => {
            this.model.addComment(postName, document.getElementById('commentEntry').value);
            
            document.getElementById('commentEntry').value = '';
            this.showCommentList(postName);
        });
    }

    showCommentList = (param = null) => {
        console.log('show comments list');
        try {
            const parent = document.getElementById(this.elementId);
            
            if (!parent) throw new Error('Could not find the comment parent.');
            
            if (parent.innerHTML === '') {
                parent.innerHTML = commentUI;
            }
            
            if (param !== null) {
                document.querySelector('.addComment').style.display = 'block';
                this.addSubmitListener(param);
            } else {
                document.querySelector('.addComment').style.display = 'none';
            }
            
            let commentsList = this.model.getComments(param);
            
            if (commentsList === null) {
                commentsList = [];
            }
            renderCommentList(parent.lastChild, commentsList);
        } catch (error) {
            console.log(error);
        }
    }
}

// export default Comments;


// FIRST DRAFT
// let commentsList = [];

// export default class Comments {
//     constructor(elementId) {
//         this.parentElement = document.getElementById(elementId);
//     }

//     getAllComments = () => {
//         if (!commentsList.length === 0 || !commentsList === null) {
//             let unparsedCommentsList = localStorage.getItem('comments');
//             commentsList = JSON.parse(unparsedCommentsList);

//             let ul = document.getElementById('comment-ul');
//             console.log(commentsList[0].name);

//             commentsList.forEach(index => {
//                 console.log("forEach");
//                 let li = document.createElement('li');
//                 li.textContent = commentsList[index].name;
//                 ul.appendChild(li);
//             });
//         }
//     }

//     filterCommentsByName = () => {

//     }

//     addComment = () => {
//         console.log('addComment');
//         let commentText = document.getElementById('comment-input');

//         const newComment = {
//             type: 'Hike',
//             name: document.querySelector('h2').textContent,
//             date: new Date(),
//             content: commentText
//         };

//         commentsList.push(newComment);
//         localStorage.setItem('comments', JSON.stringify(commentsList));
//         console.log(commentsList);
//     }
// }