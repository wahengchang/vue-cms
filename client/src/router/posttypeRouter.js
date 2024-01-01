export const listOfPosttype = [
    'Todos',
    'Foo'
]

const _posttypeUrlList = []
for(let i=0;i<listOfPosttype.length;i++){
    const config = (await import(`../views/Posttype/${listOfPosttype[i]}/const`))
    const name = config['POSTYPE_NAME']
    const path = '/'+config['API_PATH_SLUG']
    _posttypeUrlList.push({
        name, path
    })
}
export const posttypeUrlList = [..._posttypeUrlList]


