const db = require('../config/mysql')();

module.exports = function (app) {
    
    // =============================== READ =============================== //
    const readRoutes = {

        // Getting content without any SQL Queries
        benNoSqlGet: function ( urlName, viewTemplate, pageTitle ) {
            app.get( urlName, (req, res, next) => {
                res.render( viewTemplate, { 'title': pageTitle } );
            });
        },
        
        // Getting content with a tottaly normal get route
        benNormalGet: function ( urlName, viewTemplateError, viewTemplate, pageTitle, sqlQuery1, sqlQuery2, sqlQuery3, sqlQuery4, sqlQuery5, sqlQuery6 ) {
            app.get( urlName, ( req, res, next ) => {
    
                    db.query(sqlQuery1, ( err, results1 ) => {
                        if (err) { 
                            res.render(viewTemplateError, { err }); 
                        }
    
                        db.query(sqlQuery2, ( err, results2 ) => {
                            if (err) { 
                                res.render(viewTemplateError, { err }); 
                            }
    
                            db.query(sqlQuery3, ( err, results3 ) => {
                                if (err) { 
                                    res.render(viewTemplateError, { err }); 
                                }
    
                                db.query(sqlQuery4, ( err, results4 ) => { 
                                    if (err) { 
                                        res.render(viewTemplateError, { err }); 
                                    }
    
                                    db.query(sqlQuery5, ( err, results5 ) => {
                                        if (err) { 
                                            res.render(viewTemplateError, { err }); 
                                        }
    
                                        db.query(sqlQuery6, ( err, results6 ) => {
                                            if (err) { 
                                                res.render(viewTemplateError, { err }); 
                                            }
    
                                            res.render(viewTemplate, { 'title': pageTitle, results1, results2, results3, results4, results5, results6 });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            }, // End of 'benNormalGet'
    
        benParamsGet: function ( urlName, viewTemplateError, viewTemplate, pageTitle, sqlQuery1, sqlQuery2, sqlQuery3, sqlQuery4, sqlQuery5, sqlQuery6 ) {
            app.get( urlName, ( req, res, next ) => {
    
                    db.query(sqlQuery1, [req.params.id], ( err, results1 ) => {
                        if (err) { 
                            res.render(viewTemplateError, { err }); 
                        }
    
                        db.query(sqlQuery2, ( err, results2 ) => {
                            if (err) { 
                                res.render(viewTemplateError, { err }); 
                            }
    
                            db.query(sqlQuery3, ( err, results3 ) => {
                                if (err) { 
                                    res.render(viewTemplateError, { err }); 
                                }
    
                                db.query(sqlQuery4, ( err, results4 ) => { 
                                    if (err) { 
                                        res.render(viewTemplateError, { err }); 
                                    }
    
                                    db.query(sqlQuery5, ( err, results5 ) => {
                                        if (err) { 
                                            res.render(viewTemplateError, { err }); 
                                        }
    
                                        db.query(sqlQuery6, ( err, results6 ) => {
                                            if (err) { 
                                                res.render(viewTemplateError, { err }); 
                                            }
    
                                            res.render(viewTemplate, { 'title': pageTitle, results1, results2, results3, results4, results5, results6 });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            }, // End of 'benParamsGet'
    
    
        benSearchGet: function ( urlName, viewTemplateError, viewTemplate, pageTitle, sqlQuery1, sqlQuery2, sqlQuery3, sqlQuery4, sqlQuery5, sqlQuery6 ) {
                app.get( urlName, ( req, res, next ) => {
        
                        db.query(sqlQuery1, [`%${req.query.search_query}%`, `%${req.query.search_query}%`, `%${req.query.search_query}%`, `%${req.query.search_query}%`, `%${req.query.search_query}%`, `%${req.query.search_query}%`], ( err, results1 ) => {
                            if (err) { 
                                res.render(viewTemplateError, { err }); 
                            }
        
                            db.query(sqlQuery2, ( err, results2 ) => {
                                if (err) { 
                                    res.render(viewTemplateError, { err }); 
                                }
        
                                db.query(sqlQuery3, ( err, results3 ) => {
                                    if (err) { 
                                        res.render(viewTemplateError, { err }); 
                                    }
        
                                    db.query(sqlQuery4, ( err, results4 ) => { 
                                        if (err) { 
                                            res.render(viewTemplateError, { err }); 
                                        }
        
                                        db.query(sqlQuery5, ( err, results5 ) => {
                                            if (err) { 
                                                res.render(viewTemplateError, { err }); 
                                            }
        
                                            db.query(sqlQuery6, ( err, results6 ) => {
                                                if (err) { 
                                                    res.render(viewTemplateError, { err }); 
                                                }
    
                                                res.render(viewTemplate, { 'title': pageTitle, results1, results2, results3, results4, results5, results6 });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
            } // End of 'benSearchGet'

    }
    

    // HOME ======================================================================
    readRoutes.benNoSqlGet(
        '/', 'home', 'Hjem'
    );


    // ADS ======================================================================
    readRoutes.benNormalGet(
        '/ads', 'error_page', 'ads', 'Announcer', 
        `SELECT * FROM office_ads ORDER BY office_ads.booked_true_or_false ASC, office_ads.id DESC`,
        `SELECT * FROM office_ads WHERE office_ads.id = 0`,
        `SELECT * FROM office_ads WHERE office_ads.id = 0`,
        `SELECT * FROM office_ads WHERE office_ads.id = 0`,
        `SELECT * FROM office_ads WHERE office_ads.id = 0`,
        `SELECT * FROM office_ads WHERE office_ads.id = 0`
    );


    // Booking ======================================================================
    readRoutes.benNormalGet(
        '/booking', 'error_page', 'booking', 'Book Kontor',
        `SELECT office_ads.id, office_ads.title, office_ads.price
        FROM office_ads 
        WHERE office_ads.booked_true_or_false = 0
        ORDER BY office_ads.id DESC;`,
        `SELECT office_ads.title, booked_offices.booked_date, booked_offices.unbooked_date, office_ads.booked_true_or_false
        FROM booked_offices 
        INNER JOIN office_ads ON booked_offices.fk_office = office_ads.id
        WHERE office_ads.booked_true_or_false = 1
        ORDER BY booked_offices.id DESC;`,
        `SELECT * FROM office_ads WHERE office_ads.id = 0`,
        `SELECT * FROM office_ads WHERE office_ads.id = 0`,
        `SELECT * FROM office_ads WHERE office_ads.id = 0`,
        `SELECT * FROM office_ads WHERE office_ads.id = 0`
    );


    // Contact ======================================================================
    readRoutes.benNoSqlGet(
        '/contact', 'contact', 'Kontakt Os',     
    );


    // Login ======================================================================
    readRoutes.benNoSqlGet('/login', 'login', 'Log Ind');


    // Signup ======================================================================
    readRoutes.benNoSqlGet('/signup', 'signup', 'Opret Bruger');


    // ADMIN =============================================================================================== ====================================================================================================================================================================================================================================================================================================


    app.use('/admin', (req, res, next) => {
        
        if ( !req.session.userId || req.session.userRole !== 1 || req.session.userId === undefined || req.session.userId === null ) {
            
            if ( !req.session.userId || req.session.userId === undefined || req.session.userId === null ) {
                
                res.redirect('/login');
                return;

            } else {

                res.redirect('/');
                return;

            }

        } else {
            next();
        } 

    });

    // ======================= Admin Home ======================= //
    readRoutes.benNoSqlGet(
        '/admin', 'admin_home', 'Admin Panel'
    );


    // ======================= Admin Ads ======================= //

    // Main
    readRoutes.benNormalGet(
        '/admin/ads', 'error_page', 'admin_ads', '', 
        `SELECT office_ads.id, office_ads.title, office_ads.description, office_ads.price FROM office_ads ORDER BY office_ads.id DESC`,
        `SELECT * FROM office_ads WHERE office_ads.id = 0`,
        `SELECT * FROM office_ads WHERE office_ads.id = 0`,
        `SELECT * FROM office_ads WHERE office_ads.id = 0`,
        `SELECT * FROM office_ads WHERE office_ads.id = 0`,
        `SELECT * FROM office_ads WHERE office_ads.id = 0`
    );

    // Edit
    readRoutes.benParamsGet(
        '/admin/ads/edit/:id', 'error_page', 'admin_ads_edit', '', 
        `SELECT * FROM office_ads WHERE office_ads.id = ?`,
        `SELECT * FROM office_ads WHERE office_ads.id = 0`,
        `SELECT * FROM office_ads WHERE office_ads.id = 0`,
        `SELECT * FROM office_ads WHERE office_ads.id = 0`,
        `SELECT * FROM office_ads WHERE office_ads.id = 0`,
        `SELECT * FROM office_ads WHERE office_ads.id = 0`
    );

    // Delete 
    readRoutes.benParamsGet(
        '/admin/ads/delete-check/:id', 'error_page', 'admin_ads_delete', '', 
        `SELECT office_ads.title, office_ads.img_src
        FROM office_ads
        WHERE office_ads.id = ?`,
        `SELECT * FROM office_ads WHERE office_ads.id = 0`,
        `SELECT * FROM office_ads WHERE office_ads.id = 0`,
        `SELECT * FROM office_ads WHERE office_ads.id = 0`,
        `SELECT * FROM office_ads WHERE office_ads.id = 0`,
        `SELECT * FROM office_ads WHERE office_ads.id = 0`
    );

            
} // End of 'Module.Exports'