import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from "../../services/http.service";
import { MatProgressBarModule } from '@angular/material/progress-bar';


@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [MatProgressBarModule],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent {
  userId: string | null = '';
  user: any;
  isVisible = true;
  isLoading = true;
  err  = '';


  hideCard() {
    this.isVisible = false;
  }

  goBack() {
    this.router.navigate(['']);
  }
  constructor(
    private route: ActivatedRoute, 
    private router: Router, 
    private service: HttpService
  ) {}

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id');
    this.service.getUsersDetail(this.userId).subscribe(
      (res: any) => {
        if (res && res.data) {
          this.user = res.data;
          this.isLoading = false;
        }
      },
      (error: any) => {
        this.isLoading = false;
        this.err = "Error while getting Users Details";
        this.router.navigate(['/users']);
      }
    );
    
  }
}
