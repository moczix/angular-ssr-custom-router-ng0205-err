import { Location } from '@angular/common';
import { Compiler, Injector, Type } from '@angular/core';
import {
  ChildrenOutletContexts,
  Router,
  Routes,
  UrlSerializer,
} from '@angular/router';

export class CustomRouter extends Router {
  constructor(
    protected _rootComponentType: Type<any> | null,
    protected _urlSerializer: UrlSerializer,
    protected _rootContexts: ChildrenOutletContexts,
    protected _location: Location,
    public injector: Injector,
    public compiler: Compiler,
    public override config: Routes
  ) {
    super(
      _rootComponentType,
      _urlSerializer,
      _rootContexts,
      _location,
      injector,
      compiler,
      config
    );
  }
}
