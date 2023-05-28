import { Button, Space, Table } from 'antd';
import { useEffect, useState } from 'react';
import './MainpageContent.css'
import { useDispatch, useSelector } from 'react-redux';
import { GetFirestoreData } from '../../findAll';
import { saveRooms } from '../../Redux/actions';
// import { saveData } from '../../Redux/actions';

const MainpageContent = () => {

  const dispatch = useDispatch()

  useEffect(()=>{
    GetFirestoreData(dispatch)
  },[])

  let rooms = useSelector(state=>state.rooms)

  // console.log(rooms)

  const EmptyRooms = () => {
    let ListOfEmptyRooms =  rooms?.filter(room=> room.guest === '')

    dispatch(saveRooms(ListOfEmptyRooms))

    console.log(rooms);
  }

  // console.log(rooms?.filter(room=> room.guest === ''));

  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const [free, setFree] = useState(true)

  const handleChange = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  const clearFilters = () => {
    setFilteredInfo({});
    GetFirestoreData(dispatch)
  };

  const onlyFreeRooms = () => {
    setFree(!free)
    freeSorter()
  };

  const freeSorter = () => {
    if (free) {
      EmptyRooms()
    }
  };

  const setAgeSort = () => {
    onlyFreeRooms()
    setSortedInfo({
      order: 'descend',
      columnKey: 'age',
    });
  };
  
  const columns = [
    {
      title: 'Number',
      dataIndex: 'number',
      key: 'number',
      ellipsis: true,
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      filters: [
        {
          text: 'suite',
          value: 'suite',
        },
        {
          text: 'standard',
          value: 'standard',
        },
        {
          text: 'deluxe',
          value: 'deluxe',
        },
      ],
      filteredValue: filteredInfo.type || null,
      onFilter: (value, record) => record.type.includes(value),
      ellipsis: true,
    },
    {
      title: 'Occupancy',
      dataIndex: 'occupancy',
      key: 'occupancy',
      filters: [
        {
          text: '4',
          value: '4',
        },
        {
          text: '3',
          value: '3',
        },
        {
          text: '2',
          value: '2',
        },
      ],
      filteredValue: filteredInfo.occupancy || null,
      onFilter: (value, record) => value == record.occupancy,
      ellipsis: true,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      
      sorter: (a, b) => a.price - b.price,
      sortOrder: sortedInfo.columnKey === 'price' ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: 'Guest',
      dataIndex: 'guest',
      key: 'guest',
      filters: [
        {
          text: 'Ratliff Schwartz',
          value: 'Ratliff Schwartz',
        },
        {
          text: 'Golden Branch',
          value: 'Golden Branch',
        },
        {
          text: 'Merritt Page',
          value: 'Merritt Page',
        },
        {
          text: 'Maggie Rollins',
          value: 'Maggie Rollins',
        },
        {
          text: 'Barker Frost',
          value: 'Barker Frost',
        },
        {
          text: 'Macias Nash',
          value: 'Macias Nash',
        },
        {
          text: 'Natalia Soto',
          value: 'Natalia Soto',
        },
        {
          text: 'Page Walton',
          value: 'Page Walton',
        },
        {
          text: 'Shelia Sanders',
          value: 'Shelia Sanders',
        },
        {
          text: 'Morgan Reed',
          value: 'Morgan Reed',
        },
        {
          text: 'Delgado Santana',
          value: 'Delgado Santana',
        },
        {
          text: 'Horne Downs',
          value: 'Horne Downs',
        },
      ],
      filteredValue: filteredInfo.guest || null,
      onFilter: (value, record) => record.guest.includes(value),
      ellipsis: true,
    },
    {
      title: '',
      dataIndex: '',
      key: '',
      ellipsis: true,
    }
  ];
  return (
    <div className='contant_table'>
      <Space
        style={{
          marginBottom: 16,
        }}
      >
        <Button style={{ background: '#0478FF', color: 'white' }} onClick={clearFilters}>Clear filters</Button>
        <Button onClick={setAgeSort}>Free rooms only</Button>
      </Space>
      <Table columns={columns} dataSource={rooms} onChange={handleChange} />
    </div>
  );
};
export default MainpageContent;