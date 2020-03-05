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

  constructor() { }

  ngOnInit() {
  }

}

