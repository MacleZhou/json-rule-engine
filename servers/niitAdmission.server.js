const cors = require ( `cors` ),
			express = require ( `express` ),
			app = express (),
			port = 4401;

app.enable ( `trust proxy` );
app.use ( express.json () );
app.use ( express.urlencoded ( { extended : true } ) );
app.use ( cors () );
app.use ( `/api/v1/`, require ( `../routes/niitAdmission.route` ) );

app.listen ( port, () => console.log ( `NIIT Admission listening at http://localhost:${ port }` ) );