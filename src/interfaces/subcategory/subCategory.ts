 
class SubCategory{

    private id: string
    private name: string
    private categoryId: string

    constructor(id: string, name: string, categoryId: string){
        this.id = id
        this.name = name
        this.categoryId = categoryId
    }

    getProperties(){
       return {
        id: this.id,
        name: this.name,
        categoryId: this.categoryId }
    }
}

type ISubCategory = {
     id: string,
     name: string,
     categoryId: string
}


export { SubCategory, ISubCategory }