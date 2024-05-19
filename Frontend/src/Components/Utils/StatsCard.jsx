import React from 'react';

const StatsCard = ({data }) => {
    console.log(data)
    const avgSalaryUSD = Number(data.avgSalaryUSD);
    const avgSalary = Number(data.avgSalary);
    return (
        <div className="max-w-sm w-full mx-auto rounded-xl shadow-md overflow-hidden bg-gradient-to-br from-purple-500 to-pink-500 transform transition-transform duration-500 hover:scale-105">
            <div className="p-6">
                    <p className="text-white text-sm mt-2">Unique Job Titles</p>
                    <h2 className="text-3xl font-semibold text-white"><strong>{data.titleCount}</strong></h2>
                <p className="text-white text-sm mt-4">Total Jobs: <strong  className="text-xl">{data.jobCount}</strong></p>
                <p className="text-white text-sm">Average Salary (USD): $ <strong className="text-xl">{avgSalaryUSD.toFixed(2)}</strong></p>
                <p className="text-white text-sm">Average Salary:  $ <strong className="text-xl">{avgSalary.toFixed(2)}</strong></p>
                <p className="text-white text-sm">Unique Locations: <strong className="text-xl">{data.locationCount}</strong></p>
            </div>
        </div>
    );
};

export default StatsCard;
