
function foodieInput( {type, placeholder, value, onChange} ) {
    const inputStyle = {
        backgroundColor: '#f2f2f2',
        borderRadius: '10px',
        padding: '8px',
        width: '400px',
        border: 'none',
        outline: 'none',
    }

    return (
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            style={inputStyle}
        />
    )
}

export default foodieInput;