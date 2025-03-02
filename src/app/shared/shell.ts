import { Component, Injector, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { AppComponent } from 'src/app/app.component';





export class Shell
{

static injector:Injector;
static IsJsonString(str) {
  try {
      JSON.parse(str);
  } catch (e) {
      return false;
  }
  return true;
}
static Main: AppComponent;

}
