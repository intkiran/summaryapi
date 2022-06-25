/**
 * Express Router configuration
 */
const express = require('express');
const router = express.Router();
const employeeRoutes = require('./employee.route');
const authRoutes = require('./auth.route');

var swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('../../swagger.json');
/**
 * GET /status
 */

router.get('/status', (req, res) => res.send('welcome OK'));
router.get('/', (req, res) => {
    // res.send('Welcome To Summary API Service');
    res.json({ message: 'Ok' });

});


router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

/* API routes */
router.use('/api/employees', employeeRoutes);
router.use('/api/authenticate', authRoutes);

module.exports = router;