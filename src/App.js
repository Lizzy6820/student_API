import React,{useEffect, useState} from "react";
import axios from 'axios';
import Card from "./components/card/card";
import FilterTag from "./components/card/FilterTag";

import "./App.css";

const App = () => {
  const [studentData, setStudentData] = useState([])
  const [filteredNames, setFilteredNames] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [tagFilter, setTagFilter] = useState("");
  

/* fetch data from API */
  useEffect(() => {
      axios.get(`https://api.hatchways.io/assessment/students`)
          .then((response) => {
              setStudentData(response.data.students);
          })
  }, [])

  studentData.forEach((student) => {
    student.tags = [];
  });

    /* search names using first and second name */
     const searchByName = (searchValue) => {
      setSearchName(searchValue)
       if (searchName !== '') {
          const filteredData = studentData.filter((student) => {
            const fullName = `${student.firstName} ${student.lastName}`
              return Object.values(fullName).join('').toLowerCase().includes(searchName.toLowerCase())
               })
              setFilteredNames(filteredData)
             }
          else{
        setFilteredNames(studentData)
      }
  }
 
  const searchTags = (tagInput) => {
    if (tagInput && tagInput.toLowerCase) {
      tagInput = tagInput.toLowerCase();
    }

    let searchTagsArray = [];
     studentData.forEach((student) => {
      let tagExists = false;
       student.tags.forEach((t) => {
        if (t.toLowerCase().includes(tagInput)) {
          tagExists = true;
        }
      });

    if (!tagInput || tagExists) {
        searchTagsArray.push(student);
         }
          });
        return searchTagsArray;
    };



  return (
      <div >
          <input 
           className = "searchName"
           type= 'text'
            placeholder='Search by name'
            onChange={(e) => searchByName(e.target.value)}
             />

               <div className="searchTag" fontFamily="Raleway">
                 <FilterTag handleSearchTag={searchTags} />
                </div>

                    {searchName.length> 1 ?  (
                      filteredNames.map((student)  => {
                       return (
                       <Card  key={student.id} {...student}  />
                       )
                      }) 

                  
                  ) : (

                  studentData.map((student) => {
                    function findAverage(array) {
                        let sum = 0;
                         for (let i = 0; i < array.length; i++) {
                          sum += parseInt(array[i]);
                           }
                            let average = sum / array.length;
                              return average;
                               }
                             const averageGrade = findAverage(student.grades);
                        
                               return (
                                 <>
                                  {" "}
                                 <Card  key={student.id} {...student} 
                                averageGrade={averageGrade}
                               student={student}
                             
                              />
                         </>
                      )
                    })
              )}
          </div>
         )
        }

export default App;


