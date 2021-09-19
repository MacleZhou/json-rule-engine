const router  = require ( `express` ).Router ();

require ( `../controllers/niitAdmission.controller` ); // Importing niitAdmission Controller

// Add new routes below
router.post ( `/admission`, niitAdmissionController );

module.exports = router; // Exporting the router