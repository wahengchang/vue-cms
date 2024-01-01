import {listOfPosttype} from './const'
const _posttypeUrlList = []
for(let i=0;i<listOfPosttype.length;i++){
    const config = (await import(`./${listOfPosttype[i]}/const.js`))
    const name = config['POSTYPE_NAME']
    const path = '/'+config['API_PATH_SLUG']
    _posttypeUrlList.push({
        name, path
    })
}

export default  [..._posttypeUrlList]

