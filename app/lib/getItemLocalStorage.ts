export function getFormFIlled(key:string) {
    let form;
    if(localStorage.getItem(key)){
        form = localStorage.getItem(key)
    }
    return form;
}