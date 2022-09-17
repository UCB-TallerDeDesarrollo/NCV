import React from 'react'

function InputText (props) {
  const { label, onChange, ...rest } = props

  return (
        <div className="form-outline mb-4">
            <label className="form-label" htmlFor={rest.id}>{label}</label>
            <input {...rest} className="form-control form-control-lg" onChange={onChange}/>
        </div>
  )
}

export default InputText
