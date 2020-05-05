import {Injectable} from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor() {}

  getAllPosts() {
    // return this.posts;
  }

  // addNewPost(title: string, content: string) {
  //   const newKey = this.posts.length + 1;

  //   const newPost: PostData = {
  //     author: 'test123',
  //     content: content,
  //     creationDate: new Date().toString(),
  //     title: title,
  //     key: newKey.toString(10),
  //     img: 'https://placeimg.com/320/240/any/sepia'
  //   };

  //   this.posts.push(newPost);
  // }

  addNewPostAsync(title: string, content: string, author: string, imgUrl: string) {
    const firebaseUserId = firebase.auth().currentUser.uid;
    const newPostKey = firebase
      .database()
      .ref()
      .child(`posts/${firebaseUserId}`)
      .push().key;

    const newPostEntry = {
      author: author,
      content: content,
      title: title,
      created: new Date().getTime(),
      creationDate: new Date().toString(),
      img: imgUrl
    };

    // Objeto con todos los cambios por aplicar en la base de datos de Firebase
    // esto permite mandar varios cambios a la vez
    const updates = {};
    updates[`posts/${firebaseUserId}/${newPostKey}`] = newPostEntry;
    return firebase
      .database()
      .ref()
      .update(updates);

    // const promesa = new Promise((resolve, reject) => {
    //   const randomNumber = Math.random();

    //   if (randomNumber > 0.5) {
    //     setTimeout(() => {
    //       this.addNewPost(title, content);
    //       resolve('Publicación creada');
    //     }, 2000);
    //   } else {
    //     setTimeout(() => {
    //       reject('Error en el servidor');
    //     }, 3000);
    //   }
    // });

    // return promesa;
  }

  getPostsByAuthor(author: string) {
    // return this.posts.filter(post => {
    //   return post.author === author;
    // });
  }
}
