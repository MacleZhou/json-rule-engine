const express = require ( `express` ),
			{ v4: uuidv4 } = require ( `uuid` ),
			app = express (),
			port = 4400,
			admission = require ( `./rules/admission.json` ),
			{ Engine } = require ( `json-rules-engine` ),
			engine = new Engine ();

app.enable ( `trust proxy` );
app.use ( express.json () );
app.use ( express.urlencoded ( { extended : true } ) );

app.post ( `/api/v1/admission`, ( req, res, next ) => {
	const { body: { name, sslc, puc, graduation, niitinterview } } = req;

	engine.addRule ( admission );

	engine.run ( { sslc, puc, graduation, niitinterview } ).then ( ( conclusion ) => {
		if ( conclusion.almanac.events.success.length > 0 ) {
			if ( niitinterview === `true` ) {
				return res.status ( 200 ).json ( {
					apiVersion    : 1,
					admissionData : {
						name, sslc, puc, graduation, niitinterview,
					},
					response : {
						type    : `Checking for Eligibility`,
						message : `Congratulation, your eligible for Product Engineering Course.`,
					},
					timestamp : Date (),
					studentId : uuidv4 (),
				} );
			}

			return res.status ( 200 ).json ( {
				apiVersion    : 1,
				admissionData : {
					name, sslc, puc, graduation, niitinterview,
				},
				response : {
					type    : `Checking for Eligibility`,
					message : `Congratulation, your eligible for Software Engineering Course.`,
				},
				timestamp : Date (),
				studentId : uuidv4 (),
			} );
		}

		return res.status ( 404 ).json ( {
			apiVersion    : 1,
			admissionData : {
				name, sslc, puc, graduation, niitinterview,
			},
			response : {
				type    : `Checking for Eligibility`,
				message : `Sorry your not Eligible.`,
			},
			timestamp : Date (),
		} );
	} );
} );

app.listen ( port, () => {
	console.log ( `JSON Rule Engine listening at http://localhost:${ port }` );
} );