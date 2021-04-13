import { Component, Inject, OnInit } from '@angular/core';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';
import { expand } from '../animations/app.animation';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  animations: [
    expand()
  ]
})
export class AboutComponent implements OnInit {

  leaders: Leader[];
  constructor(private leaderService: LeaderService, @Inject('BaseURL') private baseURL) { }

  ngOnInit() {
    this.leaderService.getLeaders().subscribe((leader) => this.leaders = leader);
  }

}
