import { Location } from '@angular/common';
import { Compiler, FactoryProvider, Injector, Optional } from '@angular/core';
import {
  ChildrenOutletContexts,
  Event,
  ExtraOptions,
  Route,
  Router,
  RouteReuseStrategy,
  ROUTER_CONFIGURATION,
  ROUTES,
  UrlHandlingStrategy,
  UrlSerializer,
} from '@angular/router';
import { CustomRouter } from './custom-router';

function flatten<T>(arr: T[][]): T[] {
  return Array.prototype.concat.apply([], arr);
}

export function assignExtraOptionsToRouter(
  opts: ExtraOptions,
  router: Router
): void {
  if (opts.errorHandler) {
    router.errorHandler = opts.errorHandler;
  }

  if (opts.malformedUriErrorHandler) {
    router.malformedUriErrorHandler = opts.malformedUriErrorHandler;
  }

  if (opts.onSameUrlNavigation) {
    router.onSameUrlNavigation = opts.onSameUrlNavigation;
  }

  if (opts.paramsInheritanceStrategy) {
    router.paramsInheritanceStrategy = opts.paramsInheritanceStrategy;
  }

  if (opts.relativeLinkResolution) {
    router.relativeLinkResolution = opts.relativeLinkResolution;
  }

  if (opts.urlUpdateStrategy) {
    router.urlUpdateStrategy = opts.urlUpdateStrategy;
  }

  if (opts.canceledNavigationResolution) {
    router.canceledNavigationResolution = opts.canceledNavigationResolution;
  }
}

export function factoryCustomRouter(
  urlSerializer: UrlSerializer,
  contexts: ChildrenOutletContexts,
  location: Location,
  injector: Injector,
  compiler: Compiler,
  config: Route[][],
  opts: ExtraOptions = {},
  urlHandlingStrategy?: UrlHandlingStrategy,
  routeReuseStrategy?: RouteReuseStrategy
): CustomRouter {
  const router: CustomRouter = new CustomRouter(
    null,
    urlSerializer,
    contexts,
    location,
    injector,
    compiler,
    flatten(config)
  );

  if (urlHandlingStrategy) {
    router.urlHandlingStrategy = urlHandlingStrategy;
  }

  if (routeReuseStrategy) {
    router.routeReuseStrategy = routeReuseStrategy;
  }

  assignExtraOptionsToRouter(opts, router);

  if (opts.enableTracing) {
    router.events.subscribe((e: Event) => {
      // tslint:disable:no-console
      console.group?.(`Router Event: ${(<any>e.constructor).name}`);
      console.log(e.toString());
      console.log(e);
      console.groupEnd?.();
      // tslint:enable:no-console
    });
  }

  return router;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const CUSTOM_ROUTER_PROVIDER: FactoryProvider = {
  provide: Router,
  useFactory: factoryCustomRouter,
  deps: [
    UrlSerializer,
    ChildrenOutletContexts,
    Location,
    Injector,
    Compiler,
    ROUTES,
    ROUTER_CONFIGURATION,
    [UrlHandlingStrategy, new Optional()],
    [RouteReuseStrategy, new Optional()],
  ],
};
