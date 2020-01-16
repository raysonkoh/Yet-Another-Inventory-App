import React, {useState, useEffect} from 'react';
import {Modal, Button, Table, Divider, Tag} from 'antd';
import customAxios from '../helpers/customAxios';

function Dashboard(props) {
  const onClickDelete = (e, name) => {
    const {confirm} = Modal;
    confirm({
      title: `Confirm delete ${name}?`,
      content: 'DELETION IS IRREVIRSIBLE',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        console.log(`OK DELETE ${name}`);
      },
      onCancel() {
        console.log(`CANCEL DELETE ${name}`);
      },
    });
  };

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
            <Button type="danger" onClick={e => onClickDelete(e,record.name)}>
            Delete
          </Button>
        </span>
      ),
    },
  ];

  const [data, setData] = useState([]);

  useEffect(() => {
    customAxios
      .get('inventory/category/all')
      .then(res => {
        const catArr = res.data.catArr;
        const temp = [];
        let index = 0;
        catArr.forEach(cat => {
          const {itemArr, name} = cat;
          itemArr.forEach(item => {
            temp.push({
              key: index,
              name: item.name,
              itemDescription: item.description,
              itemQty: item.quantity,
              category: name,
            });
            index++;
          });
        });
        setData(temp);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      THIS IS THE DASHBOARD!
      <Table columns={columns} dataSource={data} />
    </div>
  );
}

export default Dashboard;
