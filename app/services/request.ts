export type HttpSuccessResponse<T> = {
  status: 200;
  elapsed: number;
  result: T;
};

export type HttpErrorResponse<T> = {
  error: string;
  stack?: string;
  elapsed: number;
  status: number;
  result?: T;
  configuredTimeout: number;
};

export type HttpResponse<T> = HttpSuccessResponse<T> | HttpErrorResponse<T>;

export const request = async <Result = Record<string, unknown>>({
  url,
  timeout = 300,
  parser = "json",
  method = "GET",
  payload,
  headers,
}: {
  url: string;
  timeout?: number;
  parser?: "text" | "json";
  method?: string;
  payload?: Record<string, unknown>;
  headers?: Record<string, string>;
}): Promise<HttpResponse<Result>> => {
  const start = Date.now();
  const elapsed = () => Date.now() - start;
  const ac = new AbortController();
  const timeoutRequest = setTimeout(() => {
    ac.abort();
  }, timeout);
  try {
    const raw = await fetch(url, {
      method,
      signal: ac.signal,
      ...(headers && { headers }),
      ...(payload && { body: JSON.stringify(payload) }),
    });

    const res = await raw[parser]() as Result;
    return {
      status: 200,
      result: res,
      elapsed: elapsed(),
    };
  } catch (error) {
    if ((error as Error)?.message === "Aborted") {
      return {
        error: "Request timed out",
        status: 408,
        stack: new Error().stack,
        configuredTimeout: timeout,
        elapsed: elapsed(),
      };
    }
    return {
      error: (error as Error)?.message,
      status: 500,
      stack: (error as Error)?.stack,
      configuredTimeout: timeout,
      elapsed: elapsed(),
    };
  } finally {
    clearTimeout(timeoutRequest);
  }
};
