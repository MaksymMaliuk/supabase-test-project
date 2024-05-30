import * as cheerio from 'cheerio'

export const parseBBC = (html: any) => {
  const $ = cheerio.load(html)

  const elemets = ['p']
  
  let description = '';
  
  elemets.some(element => {
    const el = $(element).first();
    if (element.length > 0) {
      description = el.text();
      return true;
    }
    return false;
  });

   const title = $('h1').first().text()
  
  const result = {
    title: title,
    description: description,
  }

  return result
}