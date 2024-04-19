
const cheerio = require('cheerio');

module.exports = (app) => {

    app.post('/scrape', (req, res) => {
        const { url, element } = req.body; // Obtiene la URL y el elemento del cuerpo de la solicitud
    
        if (!url || !element) {
            return res.status(400).send('URL and HTML element are required');
        }
    
        fetch(url)
            .then(response => response.text())
            .then(body => {
                const $ = cheerio.load(body);
                const result = [];
                const baseURL = new URL(url).origin; // Obtiene el dominio de la URL de la solicitud
    
                // Verifica si el elemento es una imagen
                if (element.toLowerCase() === 'img') {
                    $(element).each(function() {
                        let src = $(this).attr('src') || '';
    
                        // Resolver URLs relativas
                        if (src && !src.startsWith('http')) {
                            src = new URL(src, baseURL).href;
                        }
    
                        // Filtrar posibles src vacíos o no válidos
                        if (src.trim() !== '') {
                            result.push(src);
                        }
                    });
                } else {
                    // Para otros elementos, simplemente obtiene su texto
                    $(element).each(function() {
                        const text = $(this).text().trim();
                        if (text !== '') { // Filtra elementos sin texto
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