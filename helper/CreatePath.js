const path = require('path');

const CreatePath = file=>path.resolve(__dirname , '..' ,`views` , `${file}.ejs`);

module.exports = CreatePath;