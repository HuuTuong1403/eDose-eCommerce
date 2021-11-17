import { Component, OnInit } from '@angular/core';
import { NzSelectSizeType } from 'ng-zorro-antd/select';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-choose-role',
  templateUrl: './choose-role.component.html',
  styleUrls: ['./choose-role.component.scss']
})
export class ChooseRoleComponent implements OnInit {
  singleValue = "Khách hàng";
  size: NzSelectSizeType = 'large';

  constructor(private router: Router,) {
  }

  ngOnInit(): void {
  }

  onClick(): void{
    if(this.singleValue === "Doanh nghiệp"){
      this.router.navigate(['/business/signin']);
    }
    else if(this.singleValue === 'Khách hàng'){
      this.router.navigate(['/customer/signin']);
    }
    else{
      this.router.navigate(['/admin/signin']);
    }
  }

  onClickSignUp(): void{
    if(this.singleValue === "Doanh nghiệp"){
      this.router.navigate(['/business/signup']);
    }
    else{
      this.router.navigate(['/customer/signup']);
    }
  }
}
