import React from 'react';

function InputText(props) {
    const { label, onChange , ...rest } = props;

    return (
        <div class="md-form mb-5">
            <i class="fas fa-envelope prefix grey-text"></i>
            <input {...rest} class="form-control validate" onChange={onChange} />
            <label data-error="wrong" data-success="right" htmlFor={rest.id}>{label}</label>
        </div>  
    );
}

export default InputText;