import React, { useState } from "react";
import ProfileIcon from "../components/ProfileIcon";
import { NavLink, useLocation } from "react-router-dom";


const Profile = () => {

    const location= useLocation();
    const {selectedMember, index}= location.state || {};
    const [skills, setSkills] = useState(["Java", "SQL", "Pyhton", "ReactJS", "Tailwind CSS", "PostgreSQL", "MongoBD", "AWS",
        "DevOps", "Node JS"
    ]);
    const [newSkill, setNewSkill] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);


   
     return(
        <div className="bg-[#fff8f8] overflow-y-auto w-full h-full px-10 py-8 text-black">
            <div className="flex flex-col gap-10 max-w-[840px]">
                <div className="text-black font-bold text-2xl">Profile</div>

                {/*Selected Member Profile*/}
                    <div className="flex items-center gap-6">
                    <ProfileIcon index={index} className="w-40 h-40"/>
                        <div className="flex flex-col">
                            <div className="text-lg font-semibold">{selectedMember.name}</div>
                            <div className="text-sm text-gray-600">{selectedMember.role}</div>
                        </div>
                    </div>
                {/*About*/}
                    <div className="flex flex-col gap-2">
                        <div className="text-gray-950 text-xl font-semibold w-full">About</div>
                        <div className="text-gray-800">Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta fuga similique suscipit fugiat consectetur in numquam et ex inventore aperiam.
                        </div>
                    </div>
                {/*Skills */}
                    <div className="flex flex-wrap gap-4">
    
                        <div className="text-gray-950 text-xl font-semibold w-full">Skills</div>
                        {skills.map((skill) => (
                        <span
                        key={skill}
                        className="bg-gray-200 text-gray-700 px-3 py-2 rounded-full text-sm font-medium shadow-sm hover:bg-gray-300 transition"
                        >
                        {skill}
                        </span>
                        ))}
                    </div>
                {/* Add*/}
                <div className="mt-2">   
                    <button
                    onClick={() => setIsDialogOpen(true)}
                    className="text-sm text-[#00000080] px-3 py-2 font-semibold rounded-full w-fit bg-[#FFF8FE] border-0 cursor-pointer hover:text-black"
                    >
                    Add Skill +
                    </button>
                </div>        
                
                
                
            </div>

            {isDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
    <div className="bg-white p-6 rounded-lg shadow-lg w-80">
      <h2 className="text-lg font-semibold mb-3">Add a new skill</h2>
      <input
        type="text"
        placeholder="Enter skill"
        className="border w-full p-2 rounded mb-4"
        value={newSkill}
        onChange={(e) => setNewSkill(e.target.value)}
      />
      <div className="flex justify-end gap-2">
        <button
                onClick={() => setIsDialogOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
        <button
          className="px-4 py-2 bg-[#6358D5] text-white rounded"
          onClick={() => {
            if (newSkill.trim() !== "") {
              setSkills([...skills, newSkill]);
              setNewSkill("");
              setIsDialogOpen(false);
            }
          }}
        >
          Add
        </button>
      </div>
    </div>
  </div>
        
      )}
      
        </div>
        

    );


};
export default Profile;