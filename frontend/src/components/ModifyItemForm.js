import React, {useState, useEffect, useContext} from 'react';
import {Alert, Modal, Button, Form, Drawer, InputNumber, Input} from 'antd';
import customAxios from '../helpers/customAxios';
import {UserContext} from '../contexts/UserContext';

function ModifyItemForm(props) {
  const [user, customSetUser] = useContext(UserContext);
  const [newItemName, setNewItemName] = useState('');
  const [newItemDescription, setNewItemDescription] = useState('');
  const [newItemQty, setNewItemQty] = useState(-1);
  const [isSuccess, setIsSuccess] = useState(null);

  useEffect(() => {
    if (props.record !== null) {
      setNewItemName(props.record.name);
      setNewItemDescription(props.record.itemDescription);
      setNewItemQty(props.record.itemQty);
    }
  }, [props]);

  let title;
  if (props.record === null) {
    title = 'NULL';
  } else {
    title = `Modifying ${props.record.name}`;
  }

  const {confirm} = Modal;
  const showModifyConfirm = () => {
    confirm({
      title: 'Confirm Modifications?',
      content: 'CANNOT UNDO',
      onOk() {
        customAxios
          .patch('inventory/item/modify', {
            headers: {'Content-Type': 'application/json'},
            data: {
              inventoryId: user.inventoryId,
              catId: props.record.catId,
              itemId: props.record.itemId,
              newItemName,
              newItemDescription,
              newItemQuantity: newItemQty,
            },
          })
          .then(res => {
            if (res.status === 200) {
              setIsSuccess(true);
            } else {
              setIsSuccess(false);
            }
          })
          .catch(err => console.log(err));
      },
      onCancel() {
        console.log('CANCEL');
      },
    });
  };

  return (
    <Drawer
      title={title}
      visible={props.visible}
      onClose={props.onClose}
      width="35%">
      {(isSuccess && (
        <Alert type="success" message="Successfully modified item" />
      )) ||
        (isSuccess === false && (
          <Alert
            type="error"
            message="An error has occurred. Please try again."
          />
        ))}
      <Form>
        <Form.Item label="Item Name">
          <Input
            value={newItemName}
            onChange={e => setNewItemName(e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Item Description">
          <Input
            value={newItemDescription}
            onChange={e => setNewItemDescription(e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Item Quantity">
          <InputNumber value={newItemQty} onChange={e => setNewItemQty(e)} />
        </Form.Item>
        <Button size="large" type="primary" onClick={showModifyConfirm}>
          Submit Changes
        </Button>
      </Form>
    </Drawer>
  );
}

export default ModifyItemForm;
