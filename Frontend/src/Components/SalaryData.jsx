import React, { useEffect, useState } from 'react'
import NavBarCom from './Utils/NavBarCom'
import { Table } from 'antd';
import { fetchMainTableData, fetchYearData } from '../Services/Repository/SalaryDataRepo';
import LineGraph from './Utils/LineGraph';
import StatsCard from './Utils/StatsCard';
import TitleComp from './Utils/TitleComp';
import HorizontalScrollCards from './Utils/HorizontalScrollCards';

const SalaryData = () => {
    const data = [
        {
          key: '1',
          name: 'John Brown',
          age: 32,
          address: 'New York No. 1 Lake Park',
        },
        {
          key: '2',
          name: 'Jim Green',
          age: 42,
          address: 'London No. 1 Lake Park',
        },
        {
          key: '3',
          name: 'Joe Black',
          age: 32,
          address: 'Sydney No. 1 Lake Park',
        },
        {
          key: '4',
          name: 'Jim Red',
          age: 32,
          address: 'London No. 2 Lake Park',
        },
      ];
    const dummyStats = [
        {
          jobCount: 75,
          avgSalaryUSD: 102250.866666667,
          avgSalary: 356637.453333333,
          titleCount: 27,
          locationCount: 23
        }
      ];
    const [mainTableData, setMainTableData] = useState();
    const [modifiedData, setModifiedData] = useState();
    const [renderChart, setRenderChart] = useState(false);
    useEffect(()=>{
        const fetchdataFunc = async () => {
            const tempData = await fetchMainTableData();
            setMainTableData(tempData);
        };

        fetchdataFunc();
    },[]);
    useEffect(()=>{
        console.log(mainTableData);
        if(mainTableData && Object.keys(mainTableData).length > 0){
            const modifiedMainTableData = Object.values(mainTableData).map((record, index) => {
                const avgSalaryRounded = parseFloat(parseFloat(record.avg_salary_in_usd).toFixed(2));
                return {
                    key: (index + 1).toString(),
                    ...record,
                    avg_salary_in_usd: avgSalaryRounded,
                };
            });
            setModifiedData(modifiedMainTableData);
        }        
    },[mainTableData]);
    useEffect(()=>{
        if(modifiedData && Object.keys(modifiedData).length > 0){
            console.log(modifiedData);
            setRenderChart(true);
        }
    },[modifiedData]);

    const [selectedRow, setSelectedRow] = useState(null);

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const onSelectChange = (selectedKeys) => {
      setSelectedRowKeys(selectedKeys);
    };

    //on clicking the row FOLLOWING CODE..
    const handleRowClick = async (record) => {
      setSelectedRow(record);
      const yearSelected = record?.year;
      console.log(yearSelected);
        const data = await fetchYearData(yearSelected);
        const {stats, tableData} = data;
        setStatsData(stats);
        if(tableData && Object.keys(tableData).length > 0){
            const modifiedYearData = Object.values(tableData).map((record, index) => {
                return {
                    key: (index + 1).toString(),
                    ...record,
                };
            });
            setYearTableData(modifiedYearData);
        }

    };
    const [statsData, setStatsData] = useState();
    const [YearTableData, setYearTableData] = useState();
    useEffect(()=>{
        console.log(statsData);
    },[statsData]);

    useEffect(()=>{
        console.log(YearTableData);
    },[YearTableData]);

    const columnsYeartable = [
        {
          title: "Title",
          dataIndex: "job_title",
          sorter: (a, b) => a.job_title.length - b.job_title.length,
          defaultSortOrder: "descend",
        },
        {
          title: "Job Count",
          dataIndex: "count",
          defaultSortOrder: "descend",
          sorter: (a, b) => a.count - b.count,
        },
      ];
      const onChangeYearTable = (pagination, filters, sorter, extra) => {
        console.log("params", pagination, filters, sorter, extra);
      };



    const rowSelection = {
      selectedRowKeys,
      onChange: onSelectChange,
    };
    
    const columns = [
      {
        title: "Year",
        dataIndex: "year",
        showSorterTooltip: {
          target: "full-header",
        },
        sorter: (a, b) => a.year - b.year,
        //   sortDirections: ['descend'],
        defaultSortOrder: "descend",
      },
      {
        title: "Job Count",
        dataIndex: "no_of_jobs",
        defaultSortOrder: "descend",
        sorter: (a, b) => a.no_of_jobs - b.no_of_jobs,
      },
      {
        title: "Average Salary in USD",
        dataIndex: "avg_salary_in_usd",
        defaultSortOrder: "descend",
        sorter: (a, b) => a.avg_salary_in_usd - b.avg_salary_in_usd,
      },
    ];
    const onChange = (pagination, filters, sorter, extra) => {
      console.log("params", pagination, filters, sorter, extra);
    };
  return (
    <div className="flex flex-col gap-2 px-6">
      <NavBarCom />
      <div className="h-[12vh]"></div>
      <div className="flex flex-col w-full h-full items-center gap-5">
        {renderChart && (
          <div className="w-1/2">
            <LineGraph data={modifiedData} />
          </div>
        )}
        <Table
          className="w-full"
          columns={columns}
          dataSource={modifiedData}
          onChange={onChange}
          showSorterTooltip={{
            target: "sorter-icon",
          }}
          onRow={(record) => ({
            onClick: () => handleRowClick(record),
          })}
        />
      </div>
      {selectedRow && (
        <div className="fixed top-0 left-0 w-full h-full py-[2rem] px-[4rem] pt-[7rem] bg-gray-800 bg-opacity-50 flex justify-center items-center z-50 transition-all duration-700">
          <div className="flex flex-col items-center w-full h-full bg-white px-4 py-2 rounded-[1rem] shadow transition-all duration-700 gap-1">
            <div className="flex flex-row w-full justify-end">
              <button
                className="px-2 py-1 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all duration-700"
                onClick={() => setSelectedRow(null)}
              >
                <strong>X</strong>
              </button>
            </div>
            <p className=" absolute mb-2">Year: {selectedRow.year}</p>
            <div className="flex flex-row w-full h-full justify-start gap-5  overflow-y-auto scrollbar-hide">
              <div className="flex flex-col w-1/3">
                {Array.isArray(dummyStats) &&
                  dummyStats.map((item, id) => (
                    <div className="flex w-full h-1/3">
                      <StatsCard key={id} data={item} />
                    </div>
                  ))}
                <div className="flex flex-wrap gap-4 justify-center w-full">
                    <HorizontalScrollCards YearTableData={YearTableData} />
                </div>
              </div>
              <Table
                className="w-full"
                columns={columnsYeartable}
                dataSource={YearTableData}
                onChange={onChangeYearTable}
                showSorterTooltip={{
                  target: "sorter-icon",
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SalaryData