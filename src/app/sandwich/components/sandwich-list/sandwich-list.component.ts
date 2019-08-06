import { Component, OnInit, Inject } from '@angular/core';
import { Sandwich } from '../../models/sandwich';
import { SANDWICH_SERVICE_TOKEN_NAME, SandwichService } from '../../models/sandwich-service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sandwich-list',
  templateUrl: './sandwich-list.component.html',
  styleUrls: ['./sandwich-list.component.scss']
})
export class SandwichListComponent implements OnInit {

  sandwiches$: Observable<Array<Sandwich>>;

  constructor(@Inject(SANDWICH_SERVICE_TOKEN_NAME) private sandwichService: SandwichService) {}

  ngOnInit() {
    this.sandwiches$ = this.sandwichService.getAll();
  }

}
