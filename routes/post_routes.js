const db = require('../config/mysql')();
const fs = require('fs');

module.exports = function (app) {
    
    // -----------------------------------------------  Ads ----------------------------------------------- //
    
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
                if (err) throw (err);
                fs.writeFile(`./public/img/${renammedFile}`, data, err => {
                    if (err) throw (err);

                    fs.unlink( `./public/img/${[req.params.imgName]}`, (err, imgResults) => {
                        if (err) { 
                            res.render(viewTemplateError, { err }); 
                        }
                    });

                    db.query(`UPDATE office_ads 
                    SET img_src = ?, img_alt = ? WHERE office_ads.img_src = ?;`, [ renammedFile, req.fields.photo_alt, req.params.imgName ], (err, result) => {
                        if (err) throw (err);
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

}
    
