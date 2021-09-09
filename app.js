const express = require ( `express` ),
			{ Engine } = require ( `json-rules-engine` ),
			admission = require ( `./admission-rule.json` ),
			app = express (),
			port = 4400,
			engine = new Engine ();

app.listen ( port, () => {
	console.log ( `JSON Rule Engine listening at http://localhost:${ port }` );
} );

engine.addRule ( admission );

app.get ( `/v1/admission/:name/:board/:marks`, ( req, res ) => {
	const { params: { name, board, marks } } = req;

	engine.run ( { board, marks } ).then ( ( conclusion ) => {
		conclusion.results.length > 0
			? res.status ( 200 ).send ( {
				apiVersion    : 1,
				status        : 200,
				admissionData : {
					name, board, marks,
				},
				response  : conclusion?.events[ 0 ],
				timestamp : Date (),
			} )
			: res.status ( 404 ).send ( {
				apiVersion    : 1,
				status        : 404,
				admissionData : {
					name, board, marks,
				},
				response : {
					type   : `Checking for Eligibility`,
					params : {
						type   : `Admission`,
						status : `Not Eligible`,
					},
				},
				timestamp : Date (),
			} );
	} );
} );