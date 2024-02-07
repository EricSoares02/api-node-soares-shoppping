 
type SubCategoryType = {
    id: string,
    name: string,
    categoryId: string
}


class SubCategory implements SubCategoryType{

     id: string
     name: string
     categoryId: string

    constructor(id: string, name: string, categoryId: string){
        this.id = id
        this.name = name
        this.categoryId = categoryId
    }

    
}




export { SubCategory, SubCategoryType }