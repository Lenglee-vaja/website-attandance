
function RoleCheckBox({value,onChange,label,name,...props}) {
  const {disabled,errors} = props
  const teacherId= `${name}-teacher`;
  const studentId= `${name}-student`;

  return (
    <>
    <div>
      <p style={{fontSize:'1rem',fontWeight:600}}>{label? label : null}</p>
      <div style={{display:'flex',gap:'1rem',fontSize:'16px',marginTop:"-0.5rem"}}>
        <div style={{display:'flex',gap:'1rem',fontSize:'16px',alignItems:'center',marginLeft:'1rem'}}>
          <input id={studentId} type="radio" name={name} value="student" checked={value === "student"} onChange={(e) =>onChange(e)} disabled={disabled} className='cursor-pointer' />
          <label htmlFor={studentId}>ນັກສືຫສາ</label>
        </div>
        <div style={{display:'flex',gap:'1rem',fontSize:'16px',alignItems:'center'}}>
          <input id={teacherId} type="radio" name={name} value="teacher" checked={value === "teacher"} onChange={(e) => onChange(e)} disabled={disabled} className='cursor-pointer' />
          <label htmlFor={teacherId}>ອາຈານ</label>
        </div>
      </div>
      <div>{errors ? <small style={{ color: "red", fontSize: "12px" }}>{errors}</small> : null}</div>
    </div>
  </>
  );
}

export default RoleCheckBox;
