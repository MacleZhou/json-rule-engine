require ( `../services/niitAdmission.service` ); // Importing niitAdmission Service

module.exports = niitAdmissionController = async ( req, res ) => {
	const { status, msg } = await niitAdmissionService ( req.body );

	return res.status ( status ).json ( msg );
};