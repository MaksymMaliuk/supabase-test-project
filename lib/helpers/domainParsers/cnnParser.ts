import * as cheerio from 'cheerio'

export const parseCNN = (html: any) => {
  const $ = cheerio.load(html)

  const attributes = ['[data-editable="description"]', '[data-editable="content"]']
  
  let description = '';
  
  attributes.some(attribute => {
    const element = $(attribute).first();
    if (element.length > 0) {
      description = element.text();
      return true;
    }
    return false;
  });

   const title = $('h1').first().text() || $('.video-resource__headline').first().text();
  
  const result = {
    title: title,
    description: description,
  }

  return result
}