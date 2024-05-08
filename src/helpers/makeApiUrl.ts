const makeApiUrl = (endpoint: string, queryParams?: Record<string, string>): string => {
  let url = `${process.env.NEXT_PUBLIC_API_URL}/${endpoint}`;

  // If query parameters are provided, append them to the URL
  if (queryParams) {
    const queryParamStrings = Object.entries(queryParams).map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
    url += `?${queryParamStrings.join('&')}`;
  }

  return url;
}

export default makeApiUrl;
