import React from 'react';

const AllIssuesFilters = ({ filters, setFilters }) => {

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

            {/* Search field*/}

            <input
                type="text"
                name="search"
                placeholder="Search issue..."
                className="input input-bordered input-sm"
                value={filters.search}
                onChange={handleChange}
            />

            {/* By  Category */}
            <select
                name="category"
                className="select select-sm select-bordered"
                value={filters.category}
                onChange={handleChange}
            >
                <option value="">All Categories</option>
                <option>Broken streetlights</option>
                <option>Potholes</option>
                <option>Water leakage</option>
                <option>Garbage overflow</option>
                <option>Damaged footpaths</option>
            </select>



            {/* By  Status */}
            <select
                name="status"
                className="select select-sm select-bordered"
                value={filters.status}
                onChange={handleChange}
            >
                <option value="">All Status</option>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="working">Working</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
            </select>



            {/* BY  Priority */}
            <select
                name="priority"
                className="select select-sm select-bordered"
                value={filters.priority}
                onChange={handleChange}
            >
                <option value="">All Priority</option>
                <option value="high">High</option>
                <option value="normal">Normal</option>
            </select>

        </div>
    );
};

export default AllIssuesFilters;
