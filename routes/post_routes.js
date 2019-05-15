const db = require('../config/mysql')();
const fs = require('fs');

module.exports = function (app) {
    
    // Ads -----------------------------------------------------------------------
    
    // ----------- Create Ad ----------- //
    app.post('/admin/ads/create', (req, res, next) => {

        let success = true;
        let errorMessage;
    
        if( !req.fields.title || !req.fields.description || !req.files.photo || !req.fields.photo_alt || !req.fields.price ) {
            success = false;
            errorMessage = 'Et eller flere felter var tomme';
        }
            
        else if( req.files.photo.type.indexOf('image') === -1 ) {
            success = false;
            errorMessage = 'Du kan kun uploade billede filler';
        }
    
        if( success === true ) {
            const image = req.files.photo;
            const renammedFile = `${Date.now()}_${image.name}`;
        
            fs.readFile(image.path, (err, data) => {
                if (err) throw (err);
                fs.writeFile(`./public/img/${renammedFile}`, data, err => {
                    if (err) throw (err);
                    db.query(`INSERT INTO office_ads SET title = ?, description = ?, img_src = ?, img_alt = ?, price = ?; `, [ req.fields.title, req.fields.description, renammedFile, req.fields.photo_alt, req.fields.price ], (err, result) => {
                        if (err) throw (err);
                        res.redirect( '/admin/ads' );
                        return;
                    });
                });
            });
        } else {
            db.query( `SELECT office_ads.id, office_ads.title, office_ads.description, office_ads.price
            FROM office_ads ORDER BY office_ads.id DESC;`, ( err, results1 ) => {
                if (err) throw (err);
    
                res.render( 'admin_ads', { results1, errorMessage, ...req.fields } );
    
            });
                
        }
    });

    // ----------- Update Ad ----------- //

    // Update Text inputs
    app.post('/admin/ads/edit/:id', (req, res, next) => {
        let success = true;
        let errorMessage1;
    
        if( !req.fields.title || !req.fields.description || !req.fields.price ) {
            success = false;
            errorMessage1 = 'Et eller flere felter var tomme';
        }
    
        if( success === true ) {
            
            db.query(`UPDATE office_ads 
            SET title = ?, description = ?, price = ? WHERE office_ads.id = ?`, 
            [ req.fields.title, req.fields.description, req.fields.price, req.params.id ], ( err, result ) => {
                if (err) {
                    res.render('error_page'); 
                    console.error(err);
                }
                res.redirect('/admin/ads');
            });
        
        } else {
            db.query( `SELECT * FROM office_ads 
            WHERE office_ads.id = ?;`, [ req.params.id ], ( err, results1 ) => {
                if (err) {
                    res.render('error_page'); 
                    console.error(err);
                }
    
                res.render( 'admin_ads_edit', { results1, errorMessage1, ...req.fields } );
    
            });
                
        }
    });

    // Update Image
    app.post('/admin/ads/edit-img/:imgName', (req, res, next) => {

        let success = true;
        let errorMessage2;
    
        if( !req.files.photo || !req.fields.photo_alt ) {
            success = false;
            errorMessage2 = 'Et eller flere felter var tomme';
        }
            
        else if( req.files.photo.type.indexOf('image') === -1 ) {
            success = false;
            errorMessage2 = 'Du kan kun uploade billede filler';
        }
    
        if( success === true ) {
            const image = req.files.photo;
            const renammedFile = `${Date.now()}_${image.name}`;
        
            fs.readFile(image.path, (err, data) => {
                if (err) { 
                    res.render('error_page', { err }); 
                }
                fs.writeFile(`./public/img/${renammedFile}`, data, err => {
                    if (err) { 
                        res.render('error_page', { err }); 
                    }

                    fs.unlink( `./public/img/${[req.params.imgName]}`, (err, imgResults) => {
                        if (err) { 
                            res.render('error_page', { err }); 
                        }
                    });

                    db.query(`UPDATE office_ads 
                    SET img_src = ?, img_alt = ? WHERE office_ads.img_src = ?;`, [ renammedFile, req.fields.photo_alt, req.params.imgName ], (err, result) => {
                        if (err) { 
                            res.render('error_page', { err }); 
                        }
                        res.redirect( '/admin/ads' );
                    });
                });
            });
        } else {
            db.query( `SELECT * FROM office_ads WHERE office_ads.id = ?`, ( err, results1 ) => {
                if (err) throw (err);
    
                res.render( 'admin_ads_edit', { results1, errorMessage2, ...req.fields } );
    
            });
                
        }
    });

    // ----------- Delete Ad ----------- //

    app.post('/admin/ads/delete/:imgName', (req, res, next) => {
        fs.unlink( `./public/img/${[req.params.imgName]}`, (err, imgResults) => {
            if (err) { 
                res.render('error_page', { err }); 
            }
            db.query(`DELETE FROM office_ads WHERE office_ads.img_src = ?`, [ req.params.imgName ], (err, result) => {
                if (err) { 
                    res.render('error_page', { err }); 
                }

                res.redirect('/admin/ads');
            });
        });
    });


    // Booking -----------------------------------------------------------------------
    app.post('/booking', (req, res, next) => {

        let errorMessage;
        let success = true;


        if ( !req.fields.book_office || !req.fields.booked_date || !req.fields.unbooked_date ) {
            success = false; 
            errorMessage = 'Et eller flere felter var tomme';
        }


        if ( success === true ) {
            
            db.query(`UPDATE office_ads SET office_ads.booked_true_or_false = 1 WHERE office_ads.id = ?`, [ req.fields.book_office ], (err, result) => {
                if (err) { 
                    res.render('error_page', { err }); 
                }
                db.query(`INSERT INTO booked_offices (fk_user, fk_office, booked_date, unbooked_date)
                VALUES (?, ?, ?, ?);`, [ req.session.userId, req.fields.book_office, req.fields.booked_date, req.fields.unbooked_date ], (err, result) => {
                    res.render('booking_success');
                });
            });
            
        } else {
            db.query(`SELECT office_ads.id, office_ads.title, office_ads.price
            FROM office_ads 
            WHERE office_ads.booked_true_or_false = 0
            ORDER BY office_ads.id DESC;`, (err, results1) => {
                
                db.query(`SELECT office_ads.title, booked_offices.booked_date, booked_offices.unbooked_date, office_ads.booked_true_or_false
                FROM booked_offices 
                INNER JOIN office_ads ON booked_offices.fk_office = office_ads.id
                WHERE office_ads.booked_true_or_false = 1;`, (err, results2) => {

                    res.render('booking', { results1, results2, errorMessage, ...req.fields });

                });
            });
        }

    });

}
    
