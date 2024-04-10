import type { PathParams } from 'msw';
import type { HttpRequestResolverExtras } from 'node_modules/msw/lib/core/handlers/HttpHandler';
import type { DefaultBodyType, ResponseResolverInfo } from 'node_modules/msw/lib/core/handlers/RequestHandler';

export type MockHttpRequest = ResponseResolverInfo<HttpRequestResolverExtras<PathParams>, DefaultBodyType>;
