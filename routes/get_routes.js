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
    
    // ======================= HOME ======================= //
    readRoutes.benNormalGet(
        '/', 'error_page', 'home', 'Hjem', 
        `SELECT * FROM offices WHERE offices.id = 0`,
        `SELECT * FROM offices WHERE offices.id = 0`,
        `SELECT * FROM offices WHERE offices.id = 0`,
        `SELECT * FROM offices WHERE offices.id = 0`,
        `SELECT * FROM offices WHERE offices.id = 0`,
        `SELECT * FROM offices WHERE offices.id = 0`
    );
            
} // End of 'Module.Exports'