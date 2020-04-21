import {Component, OnInit} from '@angular/core';
import {PostData} from '../shared/models';
import {PostService} from '../shared/post.service';
import {NotificationService} from '../shared/notification.service';
import {NgForm} from '@angular/forms';
import {SpinnerService} from '../shared/spinner.service';
import * as firebase from 'firebase';
import {UserService} from '../shared/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private posts: PostData[] = [];
  postsRef: any;

  constructor(
    private postService: PostService,
    private notificationServie: NotificationService,
    private spinnerService: SpinnerService,
    private userService: UserService
  ) {}

  ngOnInit() {
    // this.posts = this.postService.getAllPosts();
    // console.log(this.posts);

    // Creo una referencia a la coleccion de "posts" en la base de datos
    // con ciertas reglas de cantidad y filtrado
    this.postsRef = firebase
      .database()
      .ref('posts')
      .child(firebase.auth().currentUser.uid)
      .limitToLast(100)
      .orderByChild('created');

    // Este evento se ejecuta cada vez que la aplicacion abre por primera vez (incluyendo un refresh)
    // o cuando se agrega un elemento a la coleccion posts/id_del_usuario en firebase
    this.postsRef.on('child_added', data => {
      console.log(data.val());
      console.log(data.key);

      const newPost: PostData = data.val();
      newPost.key = data.key;
      this.posts.push(newPost);
    });
  }

  onSubmit(form: NgForm) {
    const title = form.value.title;
    const content = form.value.content;

    // this.postService.addNewPost(title, content);

    // Refrescar lista de posts
    // this.posts = this.postService.getAllPosts();

    this.spinnerService.showMainSpinner();

    this.userService.getUserDataFromFirebase(firebase.auth().currentUser.uid).then(userData => {
      this.postService
        .addNewPostAsync(title, content, userData.val().userName)
        .then(results => {
          this.notificationServie.showSuccessMessage('Todo bien!', 'Publicación Creada');
          form.reset();
          // this.posts = this.postService.getAllPosts();
          this.spinnerService.hideMainSpinner();
        })
        .catch(error => {
          this.notificationServie.showErrorMessage('Error!!!', 'Error creando publicación');
          this.spinnerService.hideMainSpinner();
        });
    });
  }
}
