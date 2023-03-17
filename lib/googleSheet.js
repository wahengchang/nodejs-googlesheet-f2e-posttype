const fs = require('fs')
const path = require('path')
const { google } = require('googleapis');

const configString = process.env.GOOGLE_CONFIG
const fileNameTimestamp = process.env.ENV === 'dev' ? 'dev' : new Date().getTime()
const keyFileName = `_${fileNameTimestamp}.json`

const convertToObj = (sheetArray) => {
  const articlelist = []
  const keys = sheetArray[0]
  for(let i=1;i<sheetArray.length;i++){
    const obj = {}
    const item = sheetArray[i]

    for(let j=0;j<keys.length;j++){
      obj[keys[j]] = item[j]
    }
    articlelist.push(obj)
  }
  return articlelist
}

const fetchTable = async (table, isReturnJson = false, config = {}) => {
    const keyPath = `../${keyFileName}`

    if (!fs.existsSync(keyFileName)) {
      fs.writeFileSync(keyFileName, configString, 'utf8')
    }

    const configKey = require(keyPath)
    const {range = 'A:I'} = config
    if(!table) {
        throw new Error('[appendToSheet] table can not be null')
    }

    const auth = new google.auth.GoogleAuth({
        keyFile: path.join(__dirname, keyPath),
        scopes: "https://www.googleapis.com/auth/spreadsheets",
    });
    await auth.getClient()

    const sheets = google.sheets({ version: 'v4', auth });  
      
    const result = await sheets.spreadsheets.values.get({
        spreadsheetId: configKey.spreadsheetId,
        range: `${table}!${range}`, //sheet name and range of cells
    });

    if(!isReturnJson) return result.data.values
    return convertToObj(result.data.values)
}

module.exports = {
    fetchTable
}