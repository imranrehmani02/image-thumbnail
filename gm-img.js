
var gm = require('gm')
    .subClass({ imageMagick: true })
const path = require('path');
const fs = require('fs');


var directoryPath = path.join(__dirname,'/images/');
thumbnailpath = path.join(__dirname,'/thumbnail-image/');

fs.readdir(directoryPath, function (err, files) {

    if (err) {
      return console.log('Unable to scan directory: ' + err);
    }
  
    for (let i = 0; i < files.length; i++) {

 response = fs.readFileSync(directoryPath+files[i]);

// constants
var MAX_WIDTH = 100;
var MAX_HEIGHT = 100;


gm(response).size(function(error, size)
{
    if(error){
        throw error
    }
    else
    {
        var scalingFactor = Math.min(
                    MAX_WIDTH / size.width,
                    MAX_HEIGHT / size.height
                );
                var width = scalingFactor * size.width;
                var height = scalingFactor * size.height;

                console.log(width);
                console.log(height);

        this.resize(width, height)
                    // .toBuffer('PNG', function (err, buffer) {
                    //     if (err) {
                    //      //console.log(err)
                    //        throw err;
                    //     } else {
                    //      console.log('response buffer:-'+buffer);
                            
                    //     }
                    // })
        .write(`${thumbnailpath}thumbnail-${Date.now()}.png`, function (error,result) 
        {
            if (error)
            { 
                console.log(error);
            }
            else{
                console.log('done:- '+result)
            }
        });
        
    }
})
    }
})
