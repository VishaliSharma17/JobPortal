import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import Job from "./ui/Job";
import FilterCards from "./ui/FilterCards";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
const Jobs = () => {
  const {allJobs,searchedQuery}=useSelector(store=>store.job);
  const [filterJobs,setFilterJobs]=useState(allJobs);
  useEffect(()=>{
    if(searchedQuery){
      const filteredJobs=allJobs.filter((job)=>{
        return job.title.toLowerCase().includes(searchedQuery.toLowerCase())||
        job.description.toLowerCase().includes(searchedQuery.toLowerCase())||
        job.location.toLowerCase().includes(searchedQuery.toLowerCase())

      })
      setFilterJobs(filteredJobs);

    }else{
      setFilterJobs(allJobs)
    }

  },[allJobs,searchedQuery]);
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex gap-5">
          <div className="w-20%">
            <FilterCards />
          </div>

          {filterJobs.length <= 0 ? (
            <span>Job not found</span>
          ) : (
            <div className="flex-1 h-[88 vh] overflow-y-auto pb-5 text-justify">
              <div className="grid grid-cols-3 gap-4">
                {allJobs.map((job) => (
                  <motion.div
                  initial={{opacity:0,x:100}} 
                  animate={{opacity:1,x:0}}
                  exit={{opacity:0,x:-100}}
                  transition={{duration:0.3}}key={job?._id}>
                    <Job job={job} />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
