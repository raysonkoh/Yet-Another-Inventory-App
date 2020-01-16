import React, {useState, useEffect} from 'react';
import {Modal, Button, Table, Divider} from 'antd';
import customAxios from '../helpers/customAxios';
import CreateItemForm from '../components/CreateItemForm';

function Dashboard(props) {
  const [data, setData] = useState([]);
  const [displayCreateForm, setDisplayCreateForm] = useState(true);

  const onClickDelete = (e, itemId, catId, name) => {
    const {confirm} = Modal;
    confirm({
      title: `Confirm delete ${name}?`,
      content: 'DELETION IS IRREVIRSIBLE',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        customAxios
          .delete('inventory/category/delete', {
            headers: {'Content-Type': 'application/json'},
            data: {
              itemId,
              catId,
            },
          })
          .then(res => {
            if (res.status === 200) {
              console.log('delete success');
            } else {
              console.log(res.msg);
            }
          })
          .catch(err => console.log(err));
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
          <Button
            type="danger"
            onClick={e =>
              onClickDelete(e, record.itemId, record.catId, record.name)
            }>
            Delete
          </Button>
        </span>
      ),
    },
  ];

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
              catId: cat._id,
              itemId: item._id,
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
      <div>THIS IS THE DASHBOARD!</div>
      {displayCreateForm ? (
        <div>
          <Button
            type="primary"
            icon="close"
            size="large"
            onClick={e => setDisplayCreateForm(!displayCreateForm)}>
            Go Back
          </Button>
          <CreateItemForm />
        </div>
      ) : (
        <div>
          <Button
            type="primary"
            icon="plus"
            size="large"
            onClick={e => setDisplayCreateForm(!displayCreateForm)}>
            Add New Item
          </Button>
          <Table columns={columns} dataSource={data} />
        </div>
      )}
    </div>
  );
}

export default Dashboard;
