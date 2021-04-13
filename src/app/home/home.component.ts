import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { Promotion } from '../shared/promotion';
import { Leader } from '../shared/leader';
import { DishService } from '../services/dish.service';
import { PromotionService } from '../services/promotion.service';
import { LeaderService } from '../services/leader.service';
import { flyInOut, expand, visibility } from '../animations/app.animation';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    visibility(),
    expand()
  ]
})
export class HomeComponent implements OnInit {

  dish: Dish;
  promotion: Promotion;
    leader: Leader;
    errMess: string;
  constructor(private dishservice: DishService,
     private promotionservice: PromotionService,
     private leader_service: LeaderService, @Inject('BaseURL') private baseURL) { }

  ngOnInit() {
    this.dishservice.getFeaturedDish().subscribe((dish) => this.dish = dish,errmess => this.errMess = <any>errmess);
    this.promotionservice.getFeaturedPromotion().subscribe((promotion) => this.promotion = promotion, errmess => this.errMess = <any>errmess);
    this.leader_service.getFeaturedLeader().subscribe((leader) => this.leader = leader, errmess => this.errMess = errmess);
  }

}
