import React, {useState, useEffect} from 'react';
import {Button, Table, Divider, Tag} from 'antd';
import customAxios from '../helpers/customAxios';

function Dashboard(props) {
  const columns = [
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Item Description',
      dataIndex: 'itemDescription',
      key: 'itemDescription',
    },
    {
      title: 'Item Quantity',
      dataIndex: 'itemQty',
      key: 'itemQty',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <Button type="primary">Modify {record.name}</Button>
          <Divider type="vertical" />
          <Button type="danger">Delete</Button>
        </span>
      ),
    },
  ];

    const [data, setData] = useState([]);

    useEffect(() => {
        customAxios.get('inventory/findCategories')
            .then(res => {
                const catArr = res.data.catArr;
                const temp = [];
                let index = 0;
                catArr.forEach(cat => {
                    const { itemArr, name } = cat;
                    itemArr.forEach(item => {
                        temp.push({
                            key: index,
                            name: item.name,
                            itemDescription: item.description,
                            itemQty: item.quantity,
                            category: name
                        });
                        index++;
                    });
                })
                setData(temp);
            })
            .catch(err => console.log(err));
    }, []);

    /*
  const data = [
    {
      key: '1',
      category: 'Food',
      name: 'fries',
      itemDescription: 'fried potatoes',
      itemQty: 10,
    },
    {
      key: '2',
      category: 'Food',
      name: 'burger',
      itemDescription: 'bread with patty',
      itemQty: 10,
    },
    {
      key: '3',
      category: 'Furniture',
      name: 'chair',
      itemDescription: 'something to sit on',
      itemQty: 10,
    },
  ];
    */

  return (
    <div>
      THIS IS THE DASHBOARD!
      <Table columns={columns} dataSource={data} />
    </div>
  );
}

export default Dashboard;
