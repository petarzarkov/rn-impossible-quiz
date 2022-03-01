export const request = async ({
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
}) => {
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

    const res = await raw[parser]();
    return {
      result: res,
      elapsed: elapsed(),
      status: raw.status || 200,
    };
  } catch (error) {
    if ((error as Error)?.message === "Aborted") {
      return {
        error: "Request timed out",
        method,
        url,
        status: 408,
        stack: new Error().stack,
        configuredTimeout: timeout,
        elapsed: elapsed(),
      };
    }
    return {
      error: (error as Error)?.message,
      method,
      url,
      status: 500,
      stack: (error as Error)?.stack,
      configuredTimeout: timeout,
      elapsed: elapsed(),
    };
  } finally {
    clearTimeout(timeoutRequest);
  }
};
