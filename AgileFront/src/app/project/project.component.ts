import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../services/post';
import { Clipboard } from '@angular/cdk/clipboard';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { User } from '../services/user';
import { DisplayProfileService } from '../services/display-profile/display-profile.service';
@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit {
  /**
   * Constructor of the project component
   * @param clip : Clipboard service to copy the URL to the clipboard
   * @param toast : Toastr service to display toast messages
   * @param route : ActivatedRoute to get the id of the post from the URL
   * @param firestore : Firestore service to fetch the post from the database
   */
  constructor(
    private clip: Clipboard,
    private toast: ToastrService,
    private route: ActivatedRoute,
    private firestore: Firestore,
    private displayService: DisplayProfileService,
  ) {}

  user: User = {
    name: '',
    surname: '',
    occupation: '',
    phoneNumber: '',
    email: '',
    bio: '',
    photoURL: '',
    address: '',
    town: '',
    postalCode: '',
  };

  /**
   * Method called when the component is initialized
   * It calls the async method fetchPost to fetch the post from the database if the id is specified in the URL
   * If the id is not specified, it displays an error message
   */
  ngOnInit(): void {
    const identifier = this.route.snapshot.queryParamMap.get('id');
    let fullURL = '';
    this.route.url.subscribe((seg) => {
      fullURL = seg.map((segment) => segment.path).join('/');
    });
    if (identifier && fullURL === 'post') {
      console.log('fetching post');
      this.fetchPost(identifier);
    } else if (fullURL === 'post' && !identifier) {
      this.toast.error('No specified ID on URL', 'ID Error');
    }

    if (this.post.userId) {
      this.pushUserDataForPost(this.post.userId);
    }
  }
  /**
   * Method to fetch the post from the database
   * @param identifier : id of the post to fetch from the database
   * @returns void
   */
  async fetchPost(identifier: string) {
    //console.log(querySnapshot.docs);
    //console.log("id : "+identifier);
    const docRef = doc(this.firestore, 'posts/' + identifier);
    const querySnapshot = await getDoc(docRef);
    if (querySnapshot.exists()) {
      this.post = {
        body: querySnapshot.get('body'),
        userId: querySnapshot.get('userId'),
        postId: querySnapshot.get('postId'),
        imageURL: querySnapshot.get('imageURL'),
        title: querySnapshot.get('title'),
        date: querySnapshot.get('date'),
      };
      return;
    }
    this.toast.error(
      "Couldn't find the specified ID in the database",
      'ID not found',
    );
  }

  /**
   * Post object to display in the component template
   */
  @Input() post!: Post;

  /**
   * Method to copy the URL of the post to the clipboard
   * It uses the Clipboard service from Angular CDK to copy the URL to the clipboard
   * It provides the url and shows a toast message to the user
   */
  copyToClipboard() {
    const url = window.location.origin + '/post?id=' + this.post.postId;
    console.log(url);
    this.clip.copy(url);
    this.toast.show('Copied URL to clipboard : \n' + url, 'Generated link');
  }

  async pushUserDataForPost(userID: string) {
    const documentSnapshot = await this.displayService.getUserWithUID(userID);
    const userData = documentSnapshot.data() as User;
    this.user.name = userData.name;
    this.user.surname = userData.surname;
    this.user.occupation = userData.occupation;
    this.user.phoneNumber = userData.phoneNumber;
    this.user.email = userData.email;
    this.user.bio = userData.bio;
    this.user.town = userData.town;
    this.user.address = userData.address;
    this.user.postalCode = userData.postalCode;
    this.user.photoURL = userData.photoURL;
  }
}
