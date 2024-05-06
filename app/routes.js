
const cheerio = require('cheerio');

module.exports = (app) => {

    app.post('/scrape', (req, res) => {
        const { url, element } = req.body; 
    
        if (!url || !element) {
            return res.status(400).send('URL and HTML element are required');
        }
    
        fetch(url)
            .then(response => response.text())
            .then(body => {
                const $ = cheerio.load(body);
                const result = [];
                const baseURL = new URL(url).origin; 
    
                
                if (element.toLowerCase() === 'img') {
                    $(element).each(function() {
                        let src = $(this).attr('src') || '';
    
                        
                        if (src && !src.startsWith('http')) {
                            src = new URL(src, baseURL).href;
                        }
    
                       
                        if (src.trim() !== '') {
                            result.push(src);
                        }
                    });
                } else {
                    
                    $(element).each(function() {
                        const text = $(this).text().trim();
                        if (text !== '') { 
                            result.push(text);
                        }
                    });
                }
    
                res.json(result);
            })
            .catch(error => {
                console.error('Scraping failed:', error);
                res.status(500).send('Scraping failed');
            });
    });
    

};
