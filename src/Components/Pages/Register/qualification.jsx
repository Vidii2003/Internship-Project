import { useState } from "react";
import './qualification.css';
import { useNavigate } from "react-router-dom";

function Qualification({ onNext, onPrevious }){
    let [value,Setvalue] = useState({})
    const handleNext = () => {
        onNext();
        }
    
    const navigate = useNavigate();

    function getvalue(e){
        e.preventDefault();
        const select = document.getElementById("select")
        const year = document.getElementById("year")
        const stream = document.getElementById("stream")
        const institute = document.getElementById("institute")
        const skills = document.getElementById("skills")
         Setvalue((pre)=>{
            return {...pre,[select.name]:[select.value],
            [year.name] : [year.value],
            [stream.name]:[stream.value],
            [institute.name]:[institute.value],
            [skills.name] : [skills.value]}
         })
    }

console.log(value)

    return(
        <div className="MAIN-container">
            <div className="form-container">
                <h3 className="form-topic">Qualification</h3>
                <form className="form-rapper">
                    <div className="input-div">
                        <label>Highest qualification</label>
                        <select name="Qualification" required id="select">
                            <option>---------------SELECT--------------</option>
                            <option value={"SSSLC"}>SSLC</option>
                            <option value={'HSC'}>HSC</option>
                            <option value={"DEGREE"}>Degree</option>
                            <option value={"M,sc."}>M,sc.</option>
                            <option value={"PHD"}>PHD</option>
                        </select>
                    </div>
                    <div className="input-div">
                        <label>Stream</label>
                        <input type="text" name="stream" required id="stream"></input>
                    </div>
                    <div className="input-div">
                        <label>Skills</label>
                        <input type="text" name="Skills" required id="skills"></input>
                        
                    </div>
                    <div className="input-div">
                        <label>Institute name</label>
                        <input type="text"  required name="Institute" id="institute"></input>
                    </div>
                    <div className="input-div">
                        <label>Passed out year</label>
                        <input type="number" required min={1990} max={2027} id="year" name="passedoutyear" ></input>
                    </div>
                    <div className='form-actions' style={{ marginTop: '20px' }}>
                        <button onClick={onPrevious} style={{ marginRight: '10px' }}>Prev</button>
                        <button onClick={handleNext}>Next</button>
                    </div>
                </form>
            </div>
        </div>
    )
}


export default Qualification;




{/* <div className="skills">
                            <div><input type="checkbox" id="checkbox" value={"JAVA"} onClick={getskil}></input>JAVA</div>
                            <div><input type="checkbox" id="checkbox" value={"PYTHON"} onClick={getskil}></input>PYTHON</div>
                            <div><input type="checkbox" id="checkbox" value={"C"} onChange={getskil}></input>C</div>
                            <div><input type="checkbox" id="checkbox" value={"C++"} onChange={getskil}></input>C++</div>
                            <div><input type="checkbox" id="checkbox" value={"HTML & CSS"} onChange={getskil}></input>HTML& CSS</div>
                            <div><input type="checkbox" id="checkbox" value={"JAVA SCRIPT"} onChange={getskil}></input>JAVA SCRIPT</div>
                            <div><input type="checkbox" id="checkbox" value={"REACTJS"} onChange={getskil}></input>REACTJS</div>
                            <div><input type="checkbox" id="checkbox" value={"SQL"} onChange={getskil}></input>SQL</div>
                            <div><input type="checkbox" id="checkbox" value={"MY SQL"} onChange={getskil}></input>MY SQL</div>
                            <div><input type="checkbox" id="checkbox" value={"MONGO DB"} onChange={getskil}></input>MONGO DB</div>
                        </div> */}



                        // const [skil,Setskil] = useState([])



                        // function getskil(e){
                        //     let {value,checked} = e.target
                        //     if(checked){
                        //         Setskil(pre=>[...pre,value])
                            
                        //     }
                        //    else{
                        //     Setskil(pre=>[...pre.filter(skill => skill !==value)])
                        //     }
                        // }