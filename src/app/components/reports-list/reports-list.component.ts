import { Component, OnInit } from '@angular/core';
import { TestService } from '../../test.service';

interface Report {
  _id: string;
  filename: string;
  originalName: string;
  mimetype: string;
  size: number;
  createdAt: string;
}

@Component({
  selector: 'app-reports-list',
  templateUrl: './reports-list.component.html',
  styleUrls: ['./reports-list.component.css']
})
export class ReportsListComponent implements OnInit {
  reports: Report[] = [];

  constructor(private testService: TestService) {}

  ngOnInit(): void {
    this.loadReports();
  }

  loadReports(): void {
    this.testService.getReports().subscribe({
      next: (res: any) => {
        this.reports = res.files || [];
      },
      error: (err) => console.error('Error loading reports:', err)
    });
  }
}
