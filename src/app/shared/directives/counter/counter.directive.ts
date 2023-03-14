import {
  Directive, ViewContainerRef, TemplateRef, Input, SimpleChanges
} from "@angular/core";

@Directive({
  selector: "[counterOf]"
})
export class CounterDirective {

  constructor(private container: ViewContainerRef,
      private template: TemplateRef<Object>) {
  }

  @Input("counterOf")
  counter: number = 0;

  ngOnChanges(changes: SimpleChanges) {
      // kinda terrible implementation from the book that is very expensive to re-compute on every change...
      this.container.clear();
      for (let i = 0; i < this.counter; i++) {
          this.container.createEmbeddedView(this.template,
              new CounterDirectiveContext(i + 1));
      }
  }
}

class CounterDirectiveContext {
  constructor(public $implicit: any) { }
}
