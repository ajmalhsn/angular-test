import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { Promotion } from '../shared/promotion';
import { Leader } from '../shared/leader';
import { DishService } from '../services/dish.service';
import { PromotionService } from '../services/promotion.service';
import { LeaderService } from '../services/leader.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
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
    this.promotionservice.getFeaturedPromotion().subscribe((promotion) => this.promotion = promotion);
    this.leader_service.getFeaturedLeader().subscribe((leader) => this.leader = leader);
  }

}
