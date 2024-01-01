import {listOfPosttype} from './const'
const _vueRouterItem = []
for(let i=0;i<listOfPosttype.length;i++){
    const config = (await import(`./${listOfPosttype[i]}/router`))
    const configRouter = config['router']
    const pathList = [...configRouter]
    for(let j=0;j<pathList.length; j++) {
        _vueRouterItem.push(pathList[j])
    }
}

export default [..._vueRouterItem]