import { Button, Space, Table } from 'antd';
import { useEffect, useState } from 'react';
import './MainpageContent.css'
import { useDispatch, useSelector } from 'react-redux';
import { GetFirestoreData } from '../../findAll';
import { saveRooms } from '../../Redux/actions';
import { Link } from 'react-router-dom';

const MainpageContent = () => {

  const dispatch = useDispatch()

  useEffect(()=>{
    GetFirestoreData(dispatch)
  },[])

  let rooms = useSelector(state=>state.rooms)

  const EmptyRooms = () => {
    let ListOfEmptyRooms =  rooms?.filter(room=> room.guest === '')
    dispatch(saveRooms(ListOfEmptyRooms))
  }

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
    // setSortedInfo({
    //   order: 'descend',
    //   columnKey: 'age',
    // });
  };

  const clearAll = () => {
    setFilteredInfo({})
    setSortedInfo({})
    GetFirestoreData(dispatch)
  }

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
      render: (text, record, index)=> <Link to={`rooms/${text?.id}`}>
         <Button style={{ background: '#0478FF', color: 'white' }}>More information</Button>
        </Link>,
      ellipsis: true,
    },
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
        <Button onClick={clearAll}>Clear filters and sorters</Button>
      </Space>
      <Table columns={columns} dataSource={rooms} onChange={handleChange} />
    </div>
  );
};
export default MainpageContent;