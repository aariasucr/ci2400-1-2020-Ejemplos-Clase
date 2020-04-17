import {Component, OnInit} from '@angular/core';
import {PostData} from '../shared/models';
import {PostService} from '../shared/post.service';
import {NotificationService} from '../shared/notification.service';
import {NgForm} from '@angular/forms';
import {SpinnerService} from '../shared/spinner.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private posts: PostData[];

  constructor(
    private postService: PostService,
    private notificationServie: NotificationService,
    private spinnerService: SpinnerService
  ) {}

  ngOnInit() {
    this.posts = this.postService.getAllPosts();
    console.log(this.posts);
  }

  onSubmit(form: NgForm) {
    const title = form.value.title;
    const content = form.value.content;

    // this.postService.addNewPost(title, content);

    // Refrescar lista de posts
    // this.posts = this.postService.getAllPosts();

    this.spinnerService.showMainSpinner();

    this.postService
      .addNewPostAsync(title, content)
      .then(results => {
        this.notificationServie.showSuccessMessage('Todo bien!', 'Publicación Creada');
        form.reset();
        this.posts = this.postService.getAllPosts();
        this.spinnerService.hideMainSpinner();
      })
      .catch(error => {
        this.notificationServie.showErrorMessage('Error!!!', 'Error creando publicación');
        this.spinnerService.hideMainSpinner();
      });
  }
}
