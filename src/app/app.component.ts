import { Component, OnInit } from '@angular/core';
import { PostsService } from './shared/services/posts.service';

import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'nodeJsProject';

  public form = new FormGroup({
    name: new FormControl('', [
      Validators.required,
    ]),
    message: new FormControl('', [
      Validators.required,
      Validators.minLength(5)
    ])
  });

  public validationMessages = {
    name: [
      { type: 'required', message: 'Username is required' },
      { type: 'minlength', message: 'Username must be at least 6 characters long' },
      { type: 'maxlength', message: 'Username cannot be more than 20 characters long' },
      { type: 'pattern', message: 'Your username must contain only numbers and letters' },
      { type: 'usernameTaken', message: 'Your username has already been taken' }
    ],
    message: [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Enter a valid email' },
      { type: 'minlength', message: 'Password must be at least 6 characters long' },
      { type: 'emailTaken', message: 'Your email has already been taken' }
    ],
    confirmedPassword: [
      { type: 'required', message: 'Confirm password is required' },
      { type: 'notEqual', message: 'Password mismatch' }
    ],
    password: [
      { type: 'required', message: 'Password is required' },
      { type: 'minlength', message: 'Password must be at least 6 characters long' },
      { type: 'maxlength', message: 'Password cannot be more than 20 characters long' },
      { type: 'pattern', message: 'Your password must contain at least one uppercase, and one number' }
    ],
    terms: [
      { type: 'required', message: 'You must accept terms and conditions' }
    ]
  };

  public posts;

  constructor(private postsService: PostsService) { }

  ngOnInit() {
    this.postsService.getCars().subscribe((data) => {
    });
  }

  public check(formGroup, formControlName, validationType) {
    if (formGroup.get(formControlName).dirty || formGroup.get(formControlName).touched) {
      if (formGroup.get(formControlName).hasError(validationType)) {
        return true;
      }
    }
  }

  public sendMessage() {
    if (this.form.valid) {
      console.log('it works   ');
      const post = {
        name: this.form.controls.name.value,
        message: this.form.controls.message.value
      };

      this.postsService.addPost(post).subscribe(res => {
        console.log(res);
        this.posts.push(post)
      });
    } else {
      Object.keys(this.form.controls).forEach(controlName =>
        this.form.controls[controlName].markAsTouched());
      alert('Please fill all required fields');
    }
  }
}

