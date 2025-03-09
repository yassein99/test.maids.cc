import { Component, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { MatTableDataSource } from "@angular/material/table";
import { PageEvent } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HttpService } from "../../services/http.service";
import { CardComponent } from "../card/card.component";
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { TooltipDirective } from '../../directives/tooltip.directive';
import { LocalService } from '../../services/local.service';


@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [
    MatProgressBarModule,
    MatCardModule,
    MatTableModule,
    MatTooltipModule,
    MatPaginatorModule,
    CardComponent,
    CommonModule,
    HeaderComponent,
    TooltipDirective
  ],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.scss'
})
export class UserDashboardComponent {

  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  userListDataSource = new MatTableDataSource([]);
  public userListColumns = [
    "avatar",
    /*"id",*/
    "name",
    "email",
  ];

  pageSize: number = 6;
  pageIndex: number = 0;
  totalUsers: number = 0;

  public isFirst = true;
  public isLoading: boolean = true;
  public searchInProgress: boolean = false;
  public dialogRef: any;
  public err: string = "";
  noUsersMessage = false;

  public filteredUser: any;
  public selectedSupervisor: any;

  public filterUserForm!: FormGroup;



  constructor( 
    private router: Router, 
    private service: HttpService,
    private localService: LocalService
   ) {}

  ngOnInit() {
    this.pageIndex = this.localService.getLocalData();
    this.filteredUser = { name: "", id: "" };
    this.selectedSupervisor = { name: "", id: "" };
    this.userListDataSource.sort = this.sort;
    this.getUsersList();
  }
  public detailUser(id : any): void {

  
    this.localService.updateLocalData(this.pageIndex);


    this.router.navigateByUrl(`/detailUser/${id}`);
  }

  handlePageEvent(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.getUsersList();
  }


  public getUsersList(): void {
    this.isLoading = true;
    this.service.getUsersPages(this.pageIndex + 1).subscribe(
      (res: any) => {
        if (res && res.data) {
          this.userListDataSource.data = res.data;
          this.totalUsers = res.total;
          this.isLoading = false;
          this.noUsersMessage = res.data.length === 0;
          if (this.searchInProgress) {
            this.dialogRef.close();
          }
          this.searchInProgress = false;
        }
      },
      (error: any) => {
        this.isLoading = false;
        this.searchInProgress = false;
        this.err = "Error while getting Users list";
      }
    );
  }
  
  public getAllUsersAndSearch(userID: number | null = null): void {
    this.isLoading = true;
    this.userListDataSource.data = []; 
    let allUsers: any = [];
      if(userID == null)
    {
      this.getUsersList();
      return;
    }
    const fetchPage = (page: number) => {
      this.service.getUsersPages(page).subscribe(
        (res: any) => {
          if (res && res.data) {
            allUsers = [...allUsers, ...res.data];
  
            if (page < res.total_pages) {
              fetchPage(page + 1); 
            } else {
              this.isLoading = false;
  
              if (userID !== null) {
                allUsers = allUsers.filter((user: any) => user.id === userID);
                this.noUsersMessage = allUsers.length === 0;
              }
              this.userListDataSource.data = allUsers;
            }
          }
        },
        (error: any) => {
          this.isLoading = false;
          console.log("Error: ", error);

        }
      );
    };
    fetchPage(1);
  }
  
  onSearchCleared() {
    this.getUsersList(); 
  }
}
