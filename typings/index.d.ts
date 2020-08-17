/// <reference types='node' />

import { Plugin } from '@hapi/hapi';


declare module '@hapi/hapi' {
    interface Request {
      /**
       * Returns an object of merged request payload, path and query parameter
       * data. If a key is present in all three inputs, the query parameter
       * is prioritized over path parameters and payload.
       */
      all (): any

      /**
       * Returns an object containing only the selected `keys` from the
       * request payload, path parameters or query parameters.
       */
      only (keys: string | string[]): object

      /**
       * Returns an object containing all attributes from the request payload,
       * path parameters or query parameters except the given `keys`.
       */
      except (keys: string | string[]): object

      /**
       * Determine whether the request includes the given input `keys`.
       */
      has (keys: string | string[]): boolean

      /**
       * Determine whether the request is missing the given input `keys`.
       */
      missing (keys: string | string[]): boolean

      /**
       * Determine whether the request input includes a non-empty value for all `keys`.
       */
      filled (keys: string | string[]): boolean

      /**
       * Returns the request input from payload, params, or query params
       * identified by the given `key`. If the `key` is not present,
       * it returns the given `defaultValue`.
       */
      input<R> (key: string, defaultValue: R): R

      /**
       * Returns the request header value for the given `name`.
       */
      header (name: string): string | undefined

      /**
       * Determine whether the request contains a header with the given `name`.
       */
      hasHeader (name: string): boolean

      /**
       * Returns the bearer token from the authorization header. The returned
       * bearer token **does not** include the `Bearer ` prefix. Only
       * the actual token will be returned.
       */
      bearerToken (): string | undefined

      /**
       * Determine whether the request has a content type indicating JSON,
       * like `application/json` or `vnd+application/json`.
       */
      isJson (): boolean

      /**
       * Determine whether the response should be in JSON format. This checks
       * the `accept` header indicates JSON like `application/json`.
       *
       * @returns {Boolean}
       */
      wantsJson (): boolean

      /**
       * Determine whether the response should be HTML by checking
       * whether the `accept` header equals `text/html`.
       */
      wantsHtml (): boolean

      /**
       * Returns all request cookies.
       *
       * @returns {Object}
       */
      cookies (): object

      /**
       * Returns the selected request cookie identified by `name`.
       */
      cookie (name: string): object | undefined

      /**
       * Determine whether a cookie for the given `name` is present on the request.
       */
      hasCookie (name: string): boolean

      /**
       * Determine whether the request is successfully authenticated.
       */
      isAuthenticated (): boolean

      /**
       * Returns the authenticated credentials for authenticated requests.
       */
      user (): any

      /**
       * Returns the request’s root URL. For example, requesting `https://user:pass@example.com/posts?filter=withVideo`
       * returns `https://example.com`.
       */
      root (): string

      /**
       * Returns the request’s URL without query string.
       */
      uri (): string

      /**
       * Retrieve the request’s full URL as a string.
       */
      fullUrl (): string

      /**
       * Alias for `request.fullUrl` to comply with the available `request.uri` method.
       */
      fullUri (): string

      /**
       * Returns the client’s IP address.
       */
      ip (): string | undefined
    }
}


declare namespace HapiRequestUtilities {
  interface Options { }
}

declare var HapiRequestUtilities: Plugin<HapiRequestUtilities.Options>;

export = HapiRequestUtilities;
