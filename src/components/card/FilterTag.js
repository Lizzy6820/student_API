import React from "react";

const FilterTag = ({handleSearchTag}) => {

    return (
      <div className = 'search'> 
      <input 
          onChange= {(event) => handleSearchTag(event.target.value)}
          type= 'text'
          placeholder= "Search by tag"
      />
    </div>
       
    )
  }

export default FilterTag;