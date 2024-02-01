
type CategoryType = {
    id: string
    name: string 
    //subcategories: string[] 
}

type CategoryParams = {
    id: string
    name: string
}

class Category implements CategoryType {

    id: string = ''
    name: string = ''
    subcategories: string[] = []

  constructor(data: CategoryType){
    this.id = data.id
    this.name = data.name
   // this.subcategories = data.subcategories
  }

  getProperties(){
    return {
        id:this.id,
        name: this.name,
        subcategories: this.subcategories
    }
  }

}
export {Category, CategoryType, CategoryParams}