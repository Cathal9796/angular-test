import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Post, User } from 'src/app/models';

@Component({
  selector: 'app-create-post-modal',
  templateUrl: './create-post-modal.component.html',
  styleUrls: ['./create-post-modal.component.scss']
})
export class CreatePostModalComponent implements OnInit {
  
  postBody = '';
  postTitle = '';

  constructor(public dialogRef: MatDialogRef<CreatePostModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: User }) { }

  ngOnInit(): void {
  }

  closeDialog(createPost: boolean) {
    let post :Post = {
      author: this.data.user.userInfo.name,
      body: this.postBody,
      title: this.postTitle,
      userId: this.data.user.userInfo.id,
      id: -1
    };
    this.dialogRef.close({
      createPost,
      post
    });
  }

}
