const db = require('../config/mysql')();
const bcrypt = require('bcryptjs');

module.exports = function (app) {
    
    // ===================== Sign Up ===================== //
    app.post('/signup', (req, res, next) => {
        
        db.query(`SELECT users.username 
        FROM users 
        WHERE users.username = ?;`, [req.fields.username], (err, result) => {

            let success = true;
            let errorMessage = '';

            if ( !req.fields.email || !req.fields.username || !req.fields.password || !req.fields.repeat_password ) {
                success = false; 
                errorMessage += 'Et eller flere felter var tomme | ';
            }

            if ( req.fields.email.indexOf('@') < 1 ) {
                success = false;
                errorMessage += 'Der mangler et "@" i din email adresse';
            }

            if ( result.length > 0 ) {
                success = false; 
                errorMessage += 'Brugernavn er taget | ';
            }

            if ( req.fields.password !== req.fields.repeat_password ) {
                success = false;
                errorMessage += 'Dit kodeord matchede ikke gentagelsen af dit kodeord | ';
            }
            
            if ( success === true ) {
                let inputPassword = req.fields.password;
        
                let hashedPassword = bcrypt.hashSync(inputPassword, 10);
        
                //console.log(hashedPassword);
        
                db.query(`INSERT INTO users SET email = ?, username = ?, password = ?`, [req.fields.email, req.fields.username, hashedPassword], (err, result) => {
                    if(err) throw(err);
                    res.redirect('/login');
                });
                return;

            } else {
                
                res.render('signup', { errorMessage, ...req.fields });
                return;
                
            }
        });   
    });

    // ===================== Sign in ===================== //
    app.post('/login', (req, res, next) => {
        
		db.query(`SELECT *
		FROM users
		WHERE users.username = ?;`, [req.fields.username], (err, result) => {
			if(err) throw(err);
			
            if (result.length < 1) {
				res.render('login', { 'errorMessage': 'Brugernavn eller adgangskode var forkert.', ...req.fields });
				return;
			}
			
			if ( bcrypt.compareSync( req.fields.password, result[0].password ) ) {

				req.session.userId                  = 	result[0].id;
                req.session.username 				= 	result[0].username;
                req.session.email                   =   result[0].email;
                req.session.userRole                =   result[0].fk_user_role;

				app.locals.showId 				    = 	result[0].id;
                app.locals.showUsername 			= 	result[0].username;
                app.locals.showEmail                =   result[0].email;
				
                app.locals.login 				    = 	true;
                
				res.redirect('/admin');
				return;

			} else {
			
				res.render('login', { 'errorMessage': 'Brugernavn eller adgangskode var forkert.', ...req.fields, 'title': 'Log Ind' });
                return;
                
            }
            
		});
    });


    // ===================== Sign out ===================== //
    app.get('/logud', (req, res, next) => {
        
        req.session.userId                  = 	null;
        req.session.username 				= 	null;
        req.session.email                   =   null;
        req.session.userRole                =   null;

		app.locals.showId 				    = 	null;
        app.locals.showUsername 			= 	null;
        app.locals.showEmail                =   null;
				
        app.locals.login 				    = 	true;
        
        res.redirect('/');

	});


}