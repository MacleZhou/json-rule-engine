const cors = require ( `cors` ),
			express = require ( `express` ),
			app = express (),
			port = 4400;

app.enable ( `trust proxy` );
app.use ( express.json () );
app.use ( express.urlencoded ( { extended : true } ) );

app.get ( `/`, ( req, res ) => {
	res.send ( `Welcome to JSON Rule Engine...` );
} );

app.listen ( port, () => {
	console.log ( `JSON Rule Engine listening at http://localhost:${ port }` );
} );

require ( `./servers/niitAdmission.server` );