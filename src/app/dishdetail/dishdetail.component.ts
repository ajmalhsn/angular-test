import { Component, OnInit,Input, ViewChild } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common'; 
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { single, switchMap } from 'rxjs/operators';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { Comment } from '../shared/comments';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {

  dish: Dish;
  prev: string;
  next: string;
  dishIds: string[];
  @Input()
  value = 5;
  single_comment: Comment;
  CommentForm: FormGroup;
  @ViewChild('cform') CommentFormDirective;
  constructor(private dishService: DishService, private location: Location,
     private route: ActivatedRoute, private fb:FormBuilder) { }

  formErrors = {
    author: '',
    comment: ''
  };  

  validationMessages = {
    'author': {
      'required': 'Name is required for comment',
      'minlength': 'min length is 2 characters',
      'maxlength': 'max length is 25 characters'
    },
    'comment': {
      'required': 'Comment is required',
    }
  };
  ngOnInit() {
    this.createForm();
    let id = this.route.snapshot.params['id'];
    this.dishService.getDish(id).subscribe((Dish) => this.dish = Dish);
    this.dishService.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    this.route.params
    .pipe(switchMap((params: Params) => this.dishService.getDish(params['id'])))
    .subscribe((dish) => {this.dish = dish; this.setPrevNext(dish.id); });

  }

  createForm() {
    this.CommentForm = this.fb.group({
      author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      rating: '',
      comment: ['', [Validators.required]],
    });
    this.CommentForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.CommentForm) { return; }
    const form = this.CommentForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }
  onSubmit() {
    console.log(this.CommentForm.value);
    this.single_comment = new Comment();
    this.single_comment.author = this.CommentForm.get('author').value;
    this.single_comment.comment = this.CommentForm.get('comment').value;
    this.single_comment.rating = this.CommentForm.get('rating').value;
    this.single_comment.date = new Date().toDateString();
    console.log(this.single_comment);
    this.dish.comments.push(this.single_comment);
  }
  formatLabel(value: number) {
    return value;
  }
  goBack(): void {
    this.location.back();
  }
  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }
}
