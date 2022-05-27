import React, {useState} from "react";
import "./card.css";


const Card = ({pic,firstName,lastName,email,company,skill,averageGrade,grades,}) => {
 
  const [expandGrades, setExpandGrades] = useState(false);
  const [tags, setTags] = useState([]);
  const [tag, setTag] = useState("");

  const addTag = (event, tag, setTag) => {
    event.preventDefault();
    if (tag === "" || tag === null) return;
    if (tags) {
    tags.push(tag);
    } else {
    tags = [tag];
    }
    setTag("");
  };
  
  return (
  <>
   {/* student information */}
    <div className="student">
      <img src={pic} alt="avatar" className="avatar" />
     
      <div className="info-box">
        {/* expand grades button*/} 
        <div className="button-box">
         <button
          className="button"
           onClick={() => {
            setExpandGrades(!expandGrades);
             }}
            >
          {expandGrades ? "-" : "+"}
           </button>
         </div>

          <h1 className="name">{`${firstName.toUpperCase()} ${lastName.toUpperCase()}`}</h1>

         <div className="info"> Email: {email} </div>
         <div className="info"> Company: {company} </div>
         <div className="info"> Skill: {skill} </div>
         <div className="info"> Average: {averageGrade}%</div>
         <div>  
         </div>

        <div className="grade-box">
          {expandGrades &&
            grades.map((grade) => {
              return (
                <div className= 'grades' key={grade}>
                    Test: {grade}%{" "}
                </div>
              );
            })}
         </div>
         
      {/* tags form */}
       <form className="tag-form" onSubmit={(e) => addTag(e, tag, setTag)}>
          {tags && tags.length > 0
            ? tags.map((tag) => 
            <button className="tag-button">{tag}</button>)
            : ""}

               {/* tags input */}
                 <input
                  className="tag"
                  name="tag"
                  placeholder="Add a tag"
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  />
             </form>
          </div>
       </div>
   </>
)}  
        export default Card;