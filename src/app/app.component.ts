import { Component, Renderer2 } from '@angular/core';
import { LoaderService } from 'src/interceptors/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'construct-tek';

  constructor(private loaderService: LoaderService,
    private renderer:Renderer2
    ){
    this.loaderService.httpProgress().subscribe((status: boolean) => {
      if (status) {
        this.renderer.addClass(document.body, 'busy');
      } else {
        this.renderer.removeClass(document.body, 'busy');
      }
    });
  }
}
