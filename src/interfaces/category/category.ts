
type CategoryType = {
    id: string
    name: string 
    //subcategories: string[] 
}


class Category implements CategoryType {

    id: string = ''
    name: string = ''

  constructor(data: CategoryType){
    this.id = data.id
    this.name = data.name
  }

}
export {Category, CategoryType}