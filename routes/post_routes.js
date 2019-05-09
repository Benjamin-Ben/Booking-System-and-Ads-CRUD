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

    app.post('/admin/ads/edit/:id', (req, res, next) => {
        let success = true;
        let errorMessage;
    
        if( !req.fields.title || !req.fields.description || !req.fields.price ) {
            success = false;
            errorMessage = 'Et eller flere felter var tomme';
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
    
                res.render( 'admin_ads_edit', { results1, errorMessage, ...req.fields } );
    
            });
                
        }
    });

}
    
