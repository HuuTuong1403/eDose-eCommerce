import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {
  type: string = '';
  constructor(private title: Title,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.title.setTitle('Xác thực email');
    this.route.queryParams.subscribe(params => {
      if(params['type'])
        this.type = params['type'];
      else
        this.type = '';
    });
  }

}
