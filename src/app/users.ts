export class Users {
    Username : string
    Password : string
}
export class Token{
    token: string;
}
export class Property{
    property : string;
}
export const dropdowntableSettings={
    idField: 'DeviceID',
    textField: 'dropdownText',
    allowSearchFilter : true,
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    clearSearchFilter :true
}
export const  dropdownpolarSettings={
    enableCheckAll : false,
    idField: 'name',
    textField: 'title',
    singleSelection:true,
    allowSearchFilter : true,
    itemsShowLimit: 3,
    closeDropDownOnSelection : true
}
export const dropdownbubbleSettings ={  
    idField: 'name',
    textField: 'title',
    singleSelection:false,
    allowSearchFilter : true,
    itemsShowLimit: 3,

}
export const charts=[
    dropdownbubbleSettings,dropdownpolarSettings
]