const { v4: uuidv4 } = require ( `uuid` ),
			admission = require ( `../rules/admission.json` ),
			{ Engine } = require ( `json-rules-engine` ),
			engine = new Engine ();

module.exports = niitAdmissionService = async ( result ) => {
	const { name, sslc, puc, graduation, niitinterview } = result;

	console.log ( name, sslc, puc, graduation, niitinterview );

	engine.addRule ( admission );

	try {
		const conclusion = await engine.run ( { sslc, puc, graduation, niitinterview } );

		if ( conclusion.almanac.events.success.length > 0 ) {
			if ( niitinterview ) {
				return {
					status : 200,
					msg    : {
						apiVersion    : 1,
						admissionData : result,
						response      : {
							type    : `Checking for Eligibility`,
							message : `Congratulation, your eligible for PRODUCT Engineering Course.`,
						},
						timestamp : Date (),
						studentId : uuidv4 (),
					},
				};
			}

			return {
				status : 200,
				msg    : {
					apiVersion    : 1,
					admissionData : result,
					response      : {
						type    : `Checking for Eligibility`,
						message : `Congratulation, your eligible for SOFTWARE Engineering Course.`,
					},
					timestamp : Date (),
					studentId : uuidv4 (),
				},
			};
		}

		return {
			status : 404,
			msg    : {
				apiVersion    : 1,
				admissionData : result,
				response      : {
					type    : `Checking for Eligibility`,
					message : `Sorry your not Eligible.`,
				},
				timestamp : Date (),
			},
		};
	} catch ( error ) {
		console.error ( error );
		return {
			status : 500,
			msg    : {
				apiVersion    : 1,
				admissionData : result,
				response      : {
					type    : `Error.`,
					message : `Something went wrong..`,
				},
				timestamp : Date (),
			},
		};
	}
};