import { Directive, ElementRef } from "@angular/core";
import { NgControl } from "@angular/forms";
import { KeyPatternControllerDirective } from "./key-pattern-controller.directive";

@Directive({
  selector: "input[numbersOnly], textarea[numbersOnly]",
})
export class NumbersOnlyDirective extends KeyPatternControllerDirective {
  protected pattern = /[0-9]*/g;

  constructor(protected element: ElementRef, protected control: NgControl) {
    super(element, control);
  }
}
