export function handleSelectOptions(data:any){
  //
  return data.map((item:any) => {
    //
    return {
      label:item.name,
      value:item.id
    }
  })
}

//
export function handleUploadFile(field:string,data:{}){
  const current = data[field] || [];
  if(!Array.isArray(current)){
    //
    return current;
  }
  const response = current?.[0]?.response || {};
  //
  return response.url;
}