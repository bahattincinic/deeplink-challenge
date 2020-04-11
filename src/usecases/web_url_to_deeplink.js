import url from 'url';

export default async (webUrl) => {
  const parsedUrl = url.parse(webUrl);
  return parsedUrl.path;
};
