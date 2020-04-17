import {Injectable} from '@angular/core';
import {PostData} from './models';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private posts: PostData[] = [
    {
      key: '1',
      creationDate: new Date().toString(),
      title: 'Primer Post',
      content: 'Lorem ipsum',
      author: 'test1',
      img: 'https://placeimg.com/320/240/any/sepia'
    },
    {
      key: '2',
      creationDate: new Date().toString(),
      title: 'Segundo Post',
      content: 'Lorem ipsum',
      author: 'test1',
      img: 'https://placeimg.com/320/240/any/sepia'
    },
    {
      key: '3',
      creationDate: new Date().toString(),
      title: 'Tercer Post',
      content: 'Lorem ipsum',
      author: 'test2',
      img: 'https://placeimg.com/320/240/any/sepia'
    },
    {
      key: '4',
      creationDate: new Date().toString(),
      title: 'Cuarto Post',
      content: 'Lorem ipsum',
      author: 'test2',
      img: 'https://placeimg.com/320/240/any/sepia'
    }
  ];

  constructor() {}

  getAllPosts() {
    return this.posts;
  }

  addNewPost(title: string, content: string) {
    const newKey = this.posts.length + 1;

    const newPost: PostData = {
      author: 'test123',
      content: content,
      creationDate: new Date().toString(),
      title: title,
      key: newKey.toString(10),
      img: 'https://placeimg.com/320/240/any/sepia'
    };

    this.posts.push(newPost);
  }

  addNewPostAsync(title: string, content: string) {
    const promesa = new Promise((resolve, reject) => {
      const randomNumber = Math.random();

      if (randomNumber > 0.5) {
        setTimeout(() => {
          this.addNewPost(title, content);
          resolve('Publicación creada');
        }, 2000);
      } else {
        setTimeout(() => {
          reject('Error en el servidor');
        }, 3000);
      }
    });

    return promesa;
  }

  getPostsByAuthor(author: string) {
    return this.posts.filter(post => {
      return post.author === author;
    });
  }
}
