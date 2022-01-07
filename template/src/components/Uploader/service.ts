import request from '@/utils/request';

//
const options:any = {
  method:'post',
  // requestType:'form',
  // headers:{ 'Content-Type': 'multipart/form-data; boundary=toolne-form-upload' }
};


const handleForm=(file:any)=>{
  const form = new FormData();
  //
  /*const fields = Object.keys(params);;
  Array.prototype.forEach.call(fields, (field) => {
    //
    if(field !== 'file'){
      //
      form.append(field, params[field]);
    }
  });*/
  form.append('file',file);

  return form;
}

export function uploadSingle(params:any){
  //
  return request('/upload/single',{
    data:handleForm(params),
    ...options
  })
}
export function uploadMulti(params:any){
  //
  return request('/upload/multi',{
    data:params,
    ...options
  })
}

export function uploadCurl(params:any){
  //
  return request('/upload/curl',{
    data:params,
    ...options
  })
}