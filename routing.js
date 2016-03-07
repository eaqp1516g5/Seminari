http.createServer(function(req,res){
	var path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase();
	switch(path) {
		case '':
			res.writeHead(200, { 'Content-Type': 'text/plain' });
			res.end('Inici');
		break;
		case '/profile':
			res.writeHead(200, { 'Content-Type': 'text/plain' });
			res.end('Perfil d\'usuari');
		break;
		default:
			res.writeHead(404, { 'Content-Type': 'text/plain' });
			res.end('La pàgina sol·licitada no es troba disponible');
		break;
		}
}).listen(80);
console.log('Server iniciat amb adreça localhost:80; useu Ctrl-C per finalitzar el servei....');
