import React, {useState, useEffect, useContext} from 'react';
import {Form, Input, Drawer, Modal, Button, Table, Divider} from 'antd';
import {UserContext} from '../contexts/UserContext';
import customAxios from '../helpers/customAxios';
import CreateItemForm from '../components/CreateItemForm';
import ModifyItemForm from '../components/ModifyItemForm';
import NavBar from '../components/NavBar';

function Dashboard(props) {
  const [user, customSetUser] = useContext(UserContext);
  const [data, setData] = useState([]);
  const [displayCreateForm, setDisplayCreateForm] = useState(false);
  const [currentlyModifying, setCurrentlyModifying] = useState({
    isModifying: false,
    record: null,
  });
  const [isDeleting, setIsDeleting] = useState(false);

  const onClickDelete = (e, itemId, catId, name) => {
    const {confirm} = Modal;
    confirm({
      title: `Confirm delete ${name}?`,
      content: 'DELETION IS IRREVIRSIBLE',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        setIsDeleting(true);
        customAxios
          .delete('inventory/item/delete', {
            headers: {'Content-Type': 'application/json'},
            data: {
              inventoryId: user.inventoryId,
              catId,
              itemId,
            },
          })
          .then(res => {
            if (res.status === 200) {
              console.log('delete success');
            } else {
              console.log(res.msg);
            }
            setIsDeleting(false);
          })
          .catch(err => console.log(err));
      },
      onCancel() {
        console.log(`CANCEL DELETE ${name}`);
      },
    });
  };

  const onClickModify = (e, record) => {
    const newObj = {
      isModifying: true,
      record: record,
    };
    setCurrentlyModifying(newObj);
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
          <Button
            type="primary"
            onClick={e => onClickModify(e, record)}
            style={{width: '20em'}}>
            Modify {record.name}
          </Button>
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
      .get(`inventory/${user.inventoryId}/category/all`)
      .then(res => {
        const catArr = res.data.categories;
        const temp = [];
        let index = 0;
        catArr.forEach(cat => {
          const {items, name} = cat;
          items.forEach(item => {
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
  }, [displayCreateForm, isDeleting, currentlyModifying, user.inventoryId]);

  return (
    <div>
      <NavBar />
      {displayCreateForm ? (
        <div style={{padding: '2em'}}>
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
        <div style={{padding: '2em'}}>
          <h1>WELCOME {user.name}!</h1>
          <Button
            type="primary"
            icon="plus"
            size="large"
            onClick={e => setDisplayCreateForm(!displayCreateForm)}>
            Add New Item
          </Button>
          <Table columns={columns} dataSource={data} />
          <ModifyItemForm
            record={currentlyModifying.record}
            visible={currentlyModifying.isModifying}
            onClose={e => {
              const newObj = {
                isModifying: false,
                record: null,
              };
              setCurrentlyModifying(newObj);
            }}
          />
        </div>
      )}
    </div>
  );
}

export default Dashboard;
