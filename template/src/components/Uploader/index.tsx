import React from 'react';
import { UploadProps } from 'antd';
import { UploadRequestOption as RcCustomRequestOptions } from 'rc-upload/lib/interface';
//import ProField from '@ant-design/pro-field';
//import type { ProFormFieldItemProps } from '@ant-design/pro-form/es/interface';
//import createFiled from '@ant-design/pro-form/es/BaseForm/createField';
import { ProFormUploadButton } from '@ant-design/pro-form';

import {uploadSingle,uploadMulti,uploadCurl} from './service';

const services = {
  'single':uploadSingle,
  'multi':uploadMulti,
  'curl':uploadCurl
}

export type FieldUploaderType = UploadProps & {
  mode?:'edit'|'read'|'update'|'image'|'';
}
export type ProUploaderType = UploadProps & {
  mode?:'single'|'multi'|'curl';
  [prop:string]:any;
}
/*
const valueType = 'text';

const ProFormUploader = createFiled<ProFormFieldItemProps<FieldUploaderType>>(
  ({
    fieldProps,proFieldProps,...rest
  }:ProFormFieldItemProps<FieldUploaderType>) => {

    return (
      <ProField
        mode="read"
        valueType={valueType}
        fieldProps={{
          ...fieldProps,
          onChange: (...restParams: any) => {
            (fieldProps?.onChange as any)?.(...restParams);
            (rest as any)?.onChange?.(...restParams);
          },
        }}
        {...proFieldProps}
      />

    )
  }
)
*/
export default (props:ProUploaderType)=>{
  //
  const {mode='single',...otherProps} = props;
  const customRequest:any = async ({
    file,
    onSuccess = ()=>{},
    onError = ()=>{},
    // onProgress,
  }:RcCustomRequestOptions) => {
    //
    const request = services[mode] || services['single'];
    //
    return request(file).then(({code,data})=>{
      if(!code){
        //
        return onSuccess({
          ...data,
          url:data.path,
          status: 200
        },file as any)
      }
      //
      onError(new Error('文件上传校验失败，请重新上传！'));
    })
  }
  // action='http://127.0.0.1:7002/api/upload/single'
  return <>
    {/*<ProFormUploader
      {...otherProps}
      fieldProps={{
        mode: mode === 'curl' ? 'edit' : 'read'
      }}
    />*/}
    <ProFormUploadButton
      {...otherProps}
      fieldProps={{
        customRequest
      }}
    />
  </>
}