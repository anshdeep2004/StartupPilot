import React from "react";

import { useState } from "react";

const ProjectDesc = ({ longDesc }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <div>
            <div className="line-clamp-3">
                {longDesc}
            </div>
            {/* {!expanded && (
                <button
                    onClick={() => setExpanded(true)}
                    className="text-blue-500 ml-1 hover:underline bg-white"
                    >
                    Read more
                </button>
            )} */}
        </div>
    );
};

export default ProjectDesc;